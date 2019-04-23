import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CompletionItem,
  workspace
} from "vscode";
import { getRelativeFilePaths } from "../utils/utils";
import { dirname } from "path";
import { ImportCompletionItem } from "./ImportCompletionItem";
import { shouldProvide } from "./shouldProvide";
import { IntellisenseState } from "./IntellisenseState";

// TODO: Add explanitory comments
export default class IntellisenseProvider implements CompletionItemProvider {
  provideCompletionItems(
    document: TextDocument,
    position: Position
  ): Thenable<CompletionItem[]> {
    const state: IntellisenseState = {
      rootPath: workspace.rootPath,
      filePath: dirname(document.fileName),
      textCurrentLine: document.lineAt(position).text,
      cursorPosition: position.character,
      cursorLine: position.line
    };

    return shouldProvide(state) ? provide(state) : Promise.resolve([]);
  }
}

async function provide(state: IntellisenseState) {
  // Return relative paths as completion items
  const relativePaths = await getRelativeFilePaths();
  return relativePaths.map(dependency => toCompletionItem(dependency, state));
}

// TODO: Add explanitory comments
function toCompletionItem(dependency: string, state: IntellisenseState) {
  return new ImportCompletionItem(dependency, state);
}
