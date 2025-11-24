import * as vscode from "vscode";
import { API, Repository } from "@/types/git";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "git-smooth-checkout.checkout",
    async () => {
      const gitExtension = vscode.extensions.getExtension("vscode.git");
      if (!gitExtension) {
        vscode.window.showErrorMessage("Git extension not found");
        return;
      }

      // Activate git extension if not already active
      if (!gitExtension.isActive) {
        await gitExtension.activate();
      }

      const api: API = gitExtension.exports.getAPI(1);

      // Check if there are any repositories
      if (!api.repositories || api.repositories.length === 0) {
        vscode.window.showErrorMessage("No git repositories found");
        return;
      }

      // Get the target repository with priority:
      // 1. Repository at workspace root folder
      // 2. Currently selected repository
      // 3. First repository in the list
      const targetRepository = getTargetRepository(api.repositories);

      if (!targetRepository) {
        vscode.window.showErrorMessage("Could not determine target repository");
        return;
      }

      // Execute checkout command with the target repository
      vscode.commands.executeCommand("git.checkout", targetRepository);
    }
  );

  context.subscriptions.push(disposable);
}

/**
 * Get the active workspace folder based on the active text editor
 */
function getActiveWorkspaceFolder(): vscode.WorkspaceFolder | undefined {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return undefined;
  }
  const uri = editor.document.uri;
  return vscode.workspace.getWorkspaceFolder(uri);
}

/**
 * Get the target repository with the following priority:
 * 1. Repository at workspace root folder (main repository)
 * 2. Currently selected repository
 * 3. First repository in the list
 */
function getTargetRepository(repositories: Repository[]): Repository | undefined {
  if (repositories.length === 0) {
    return undefined;
  }

  // Priority 1: Get workspace root folder repository
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    const rootFolderUri = (() => {
      if (workspaceFolders.length === 1) {
        return workspaceFolders[0].uri;
      }
      const activeFolder = getActiveWorkspaceFolder();
      if (activeFolder) {
        return activeFolder.uri;
      }
      return workspaceFolders[0].uri;
    })();

    const rootRepository = repositories.find(
      (repo) => repo.rootUri.toString() === rootFolderUri.toString()
    );
    if (rootRepository) {
      return rootRepository;
    }
  }

  // Priority 2: Get currently selected repository
  const selectedRepository = repositories.find(
    (repo) => repo.ui.selected === true
  );
  if (selectedRepository) {
    return selectedRepository;
  }

  // Priority 3: Return first repository
  return repositories[0];
}
