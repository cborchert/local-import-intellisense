import { window } from "vscode";
import { getCurrentPath, getRelativePath, getLocalFiles } from "../utils/utils";

/**
 * Creates a JS import statement and adds it to the text
 */
export default async function formImport() {
  // Get the user's current directory's path
  const currentPath = getCurrentPath();
  const files = await getLocalFiles();

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
