import { workspace, commands, ExtensionContext, languages } from "vscode";
import IntellisenseProvider from "./provider/IntellisenseProvider";
import formImport from "./commands/formImport";
import { getConfig } from "./utils/config";

export function activate(context: ExtensionContext) {
  // local imports don't make sense if you're not in a workspace
  if (workspace.rootPath) {
    // Set up Intellisense part of the Extension
    const provider = new IntellisenseProvider();
    // What will trigger the end of intellisense tip
    const triggers = ['"', "'", "`"];
    const languageSelectors = getConfig().languageSelectors;

    // When the user is typing in import statement, it will trigger an intellisense of local files
    context.subscriptions.push(
      languages.registerCompletionItemProvider(
        languageSelectors,
        provider,
        ...triggers
      )
    );

    // Set up the manual command portion of the extensions
    // When the user runs the command, it should insert an import statement based on their choice
    context.subscriptions.push(
      // The command has been defined in the package.json file
      // Now provide the implementation of the command with registerCommand
      // The commandId parameter must match the command field in package.json
      commands.registerCommand(
        "local-import-intellisense.form-import",
        formImport
      )
    );
  }
  console.log("Extension Local Import Intellisense Activated :)");
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("Extension Local Import Intellisense Dectivated :C");
}
