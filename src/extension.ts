import { workspace, commands, ExtensionContext, languages } from "vscode";
import IntellisenseProvider from "./provider/IntellisenseProvider";
import formImport from "./commands/formImport";

export function activate(context: ExtensionContext) {
  // local imports don't make sense if you're not in a workspace
  if (workspace.rootPath) {
    const provider = new IntellisenseProvider();
    // What initially
    const triggers = ['"', "'", "`"];
    // TODO: This should probably come from config as well
    const selector = [
      "typescript",
      "javascript",
      "javascriptreact",
      "typescriptreact"
    ];

    // When the user is typing in import statement, it will trigger an intellisense of local files
    context.subscriptions.push(
      languages.registerCompletionItemProvider(selector, provider, ...triggers)
    );

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
}

// this method is called when your extension is deactivated
export function deactivate() {}
