// The interface for the "state" of the intellisense class: basically, what does VSCode know about that we will use ?
export interface IntellisenseState {
  rootPath?: string;
  filePath: string;
  textCurrentLine: string;
  cursorPosition: number;
  cursorLine: number;
}
