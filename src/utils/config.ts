import { workspace } from "vscode";

export interface Config {
  importES6: boolean;
  importQuotes: string;
  importLinebreak: string;
  importDeclarationType: string;
  languageSelectors: Array<{}>;
  importMatch: string;
  importIgnore: string;
}

export function getConfig(): Config {
  const configuration = workspace.getConfiguration("local-import-intellisense");

  // TODO: Can any of these configs be taken from the workspace configs ?
  return {
    importES6: configuration["importES6"],
    importQuotes: configuration["importQuotes"],
    importLinebreak: configuration["importLinebreak"],
    importDeclarationType: configuration["importDeclarationType"],
    languageSelectors: configuration["languageSelectors"],
    importMatch: configuration["importMatch"],
    importIgnore: configuration["importIgnore"]
  };
}
