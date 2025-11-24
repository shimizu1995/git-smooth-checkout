# Git Smooth Checkout

A VS Code extension that streamlines Git checkout operations by allowing direct checkout in the current repository, without the need to select a repository—even in projects with submodules.

## Features

- Checkout branches directly in the currently selected repository
- No extra repository selection steps required
- Works seamlessly with submodules

## Usage

1. Open a Git repository in VS Code
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type "Git: Checkout to in the current repository"
4. Select a branch to checkout

## How to Test Locally

*If you already have the extension installed, please disable it before testing.*

1. Clone or download this repository.
2. Install dependencies:

    ```zsh
    npm install
    ```

3. Open this folder in VS Code.
4. Press F5 or select "Extension" from the "Run and Debug" panel to start debugging.
5. In the newly launched Extension Development Host window, open the Command Palette and run "Git: Checkout to in the current repository" to verify the extension works.
