import { window } from "vscode";
import { getRelativeFilePaths, guessVariableName } from "../utils/utils";
import { getConfig } from "../utils/config";

/**
 * Creates a JS import statement and adds it to the text
 */
export default async function formImport() {
  // Get the user's current directory's path
  const relativePaths = await getRelativeFilePaths();

  // Show a quickPick with a list of the project's current files as relative paths
  window.showQuickPick(relativePaths).then(
    // When the user makes their selection,
    // add the selection to the current marker placement
    path => {
      if (!path || !window || !window.activeTextEditor) {
        return;
      }

      // Get the config
      const config = getConfig();

      // Form the import statement
      // Formerly, simply:
      // let statement = `import {} from "${path}";`;
      let statement = "";
      // A bit more clear than in NpmIntellisense, if less efficient
      if (config.importES6) {
        statement = `import {} from "${path}";`;
      } else {
        const name = guessVariableName(path);
        const declaration = config.importDeclarationType;
        statement = `${declaration} ${name} = require("${path}");`;
      }
      // Use config to replace quotes, etc.
      statement = statement.replace('"', config.importQuotes);
      statement = statement.replace(";", config.importLinebreak);

      // TODO: Remove .js | .ts via config ?
      // TODO: Remove /index.js | index.ts via config

      // Insert the statement to the current cursor location
      const insertLocation = window.activeTextEditor.selection.start;
      window.activeTextEditor.edit(edit =>
        edit.insert(insertLocation, statement)
      );
    }
  );
}
