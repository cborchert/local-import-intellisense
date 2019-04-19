import { workspace, window } from "vscode";
import { getCurrentPath, getRelativePath } from "../utils/utils";

/**
 * Adds an import
 */
export default async function formImport() {
  //TODO: This list of files should be stored in a cache or store of kind which is updated whenever:
  // a) The extension starts
  // b) The user's root directory changes
  // c) A file is created or deleted
  const files = await workspace.findFiles(
    // TODO: This should be more inclusive (maybe even all files)
    // TODO: This should be pulled fom a config file
    "**/*.js",
    // TODO: This should be pulled from a config file
    "**/node_modules/**"
  );

  // Get the user's current directory's path
  const currentPath = getCurrentPath();

  window
    .showQuickPick(
      // Show a quickPick with a list of the project's current files as relative paths
      files.map((file: { path: string }) =>
        getRelativePath(currentPath, file.path)
      )
    )
    .then(
      // When the user makes their selection,
      // add the selection to the current marker placement
      path => {
        if (!path) {
          return;
        }
        // TODO: Steal more from NPMIntellisense: This should be based on config
        const statement = `import {} from "${path}";`;
        if (window && window.activeTextEditor) {
          const insertLocation = window.activeTextEditor.selection.start;
          window.activeTextEditor.edit(edit =>
            edit.insert(insertLocation, statement)
          );
        }
      }
    );
}
