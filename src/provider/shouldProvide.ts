import { IntellisenseState } from "./IntellisenseState";

// Lifted almost directly from NPMIntellisense.
// TODO: Add explanitory comments
export function shouldProvide(state: IntellisenseState) {
  return isImportOrRequire(state.textCurrentLine, state.cursorPosition);
}

function isImportOrRequire(textCurrentLine: string, position: number): boolean {
  let isImport = textCurrentLine.substring(0, 6) === "import";
  let isRequire = textCurrentLine.indexOf("require(") != -1;
  return (
    (isImport &&
      (isAfterFrom(textCurrentLine, position) ||
        isImportWithoutFrom(textCurrentLine, position))) ||
    isRequire
  );
}

function isAfterFrom(textCurrentLine: string, position: number) {
  let fromPosition = stringMatches(textCurrentLine, [
    " from '",
    ' from "',
    "}from '",
    '}from "'
  ]);

  return fromPosition != -1 && fromPosition < position;
}

function isImportWithoutFrom(textCurrentLine: string, postition: number) {
  let modulePosition = stringMatches(
    textCurrentLine,
    [
      " '", // spec calls for a space, e.g. `import 'module-name';`
      "'", // tested with babel, it doesn't care if there is a space, so `import'module-name';` is valid too,
      '"',
      ' "'
    ],
    true
  );
  return modulePosition != -1 && modulePosition < postition;
}

function stringMatches(
  textCurrentLine: string,
  strings: string[],
  searchFromStart = false
): number {
  return strings.reduce((position, str) => {
    let textPosition = searchFromStart
      ? textCurrentLine.indexOf(str)
      : textCurrentLine.lastIndexOf(str);

    return Math.max(position, textPosition);
  }, -1);
}
