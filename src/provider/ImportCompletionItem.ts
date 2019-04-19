import { CompletionItem, CompletionItemKind, TextEdit, Range } from "vscode";
import { IntellisenseState } from "./IntellisenseState";

export class ImportCompletionItem extends CompletionItem {
  constructor(label: string, state: IntellisenseState) {
    super(label);
    this.kind = CompletionItemKind.Module;
    this.textEdit = TextEdit.replace(this.importStringRange(state), label);
  }

  importStringRange({
    textCurrentLine,
    cursorLine,
    cursorPosition
  }: IntellisenseState): Range {
    const textToPosition = textCurrentLine.substring(0, cursorPosition);
    const quotationPosition = Math.max(
      textToPosition.lastIndexOf('"'),
      textToPosition.lastIndexOf("'")
    );
    return new Range(
      cursorLine,
      quotationPosition + 1,
      cursorLine,
      cursorPosition
    );
  }
}
