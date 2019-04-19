import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CompletionItem,
  workspace
} from "vscode";
import { getLocalFiles, getRelativePath, getCurrentPath } from "../utils/utils";
import { dirname } from "path";
import { ImportCompletionItem } from "./ImportCompletionItem";
import { shouldProvide } from "./shouldProvide";
import { IntellisenseState } from "./IntellisenseState";

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

    // return shouldProvide(state)
    //   ? provide(state, getConfig(), fsf)
    //   : Promise.resolve([]);
    return shouldProvide(state) ? provide(state) : Promise.resolve([]);
  }
}

async function provide(state: IntellisenseState) {
  //TODO: This is a repeated formula (see ../commands/formImport.ts). We should extract it.
  const files = await getLocalFiles();
  const currentPath = getCurrentPath();
  return files
    .map((file: { path: string }) => getRelativePath(currentPath, file.path))
    .map(dependency => toCompletionItem(dependency, state));
}

function toCompletionItem(dependency: string, state: IntellisenseState) {
  return new ImportCompletionItem(dependency, state);
}
