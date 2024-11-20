import * as vscode from "vscode";
import { API } from "@/types/git";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "git-smooth-checkout.checkout",
    async () => {
      const gitExtension = vscode.extensions.getExtension("vscode.git");
      if (!gitExtension) {
        vscode.window.showInformationMessage("vscode.git not found");
        return;
      }

      const api: API = gitExtension.exports.getAPI(1);

      const selectedRepository = api.repositories.find(
        (repo) => repo.ui.selected === true
      );
      vscode.commands.executeCommand("git.checkout", selectedRepository);
    }
  );

  context.subscriptions.push(disposable);
}
