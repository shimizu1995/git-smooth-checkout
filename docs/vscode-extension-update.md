
# Manual Update Procedure for VS Code Extension

## Overview

This document describes how to manually update a VS Code extension by uploading a `.vsix` file via the Visual Studio Marketplace management screen.

## Steps

1. Package the extension
   - Run the following command in your project root to generate a `.vsix` file:

     ```sh
     vsce package
     ```

2. Access the Marketplace management screen
   - Go to [Visual Studio Marketplace Management](https://marketplace.visualstudio.com/manage) and log in.

3. Click the "Update" button for the target extension
   - Select the extension you want to update and click the "Update" button.

4. Upload the `.vsix` file
   - Choose the generated `.vsix` file and upload it.

5. Review and complete the update
   - Confirm the update details and finish the process.

## Notes

- This method is a manual upload, not an automatic publish via `vsce publish`.
- No access token is required.
- Make sure to update the `version` field in `package.json` appropriately for version management and changelog.

---
Keep this procedure up to date and refer to it whenever you need to update the extension manually.
