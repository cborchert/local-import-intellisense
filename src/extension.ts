import { workspace, commands, ExtensionContext } from "vscode";
import formImport from "./commands/formImport";

export function activate(context: ExtensionContext) {
  // local imports don't make sense if you're not in a workspace
  if (workspace.rootPath) {
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
