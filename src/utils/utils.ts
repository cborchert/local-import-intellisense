import { window, workspace } from "vscode";
import * as path from "path";
import { getConfig } from "../utils/config";

/**
 * Given a source directory and a target filename, return the relative
 * file path from source to target.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path (e.g. "../../style.css") as {String}
 */
export function getRelativePath(source: string, target: string) {
  const relativePath = path.relative(
    path.dirname(source),
    path.dirname(target)
  );
  const prefix = relativePath.indexOf("..") === -1 ? "./" : "";
  const suffix = relativePath.length > 0 ? "/" : "";
  const relativeFile = `${prefix}${relativePath}${suffix}${path.basename(
    target
  )}`;
  return relativeFile;
}

/**
 * @return The path of the currently open file or the root path of the project (or, an empty string)
 */
export function getCurrentPath() {
  return window.activeTextEditor
    ? window.activeTextEditor.document.uri.fsPath
    : workspace.workspaceFolders
    ? workspace.workspaceFolders[0].uri.fsPath
    : "";
}

/**
 * List the files in the local workspace
 */
export function getLocalFiles() {
  const config = getConfig();
  //TODO: Is there a better way to do this that imitates the quickFind functionality of VSCode?
  // e.g. This list of files should be stored in a cache or store of kind which is updated whenever:
  // a) The extension starts
  // b) The user's root directory changes
  // c) A file is created or deleted
  const files = workspace.findFiles(
    // Argument 1: A GlobPattern which identifies what files to match
    // e.g. "**/*.{js,ts,css}"
    // see: https://code.visualstudio.com/api/references/vscode-api#GlobPattern
    config.importMatch,
    // Argument 2: A GlobPattern which identifies what files to ignore
    // e.g. "**/node_modules/**"
    config.importIgnore
  );
  return files;
}

export async function getRelativeFilePaths() {
  const files = await getLocalFiles();
  const currentPath = getCurrentPath();
  return files.map((file: { path: string }) =>
    getRelativePath(currentPath, file.path)
  );
}

// TODO: Add useful comment
export const guessVariableName = (packageName: string): string =>
  packageName.replace(/-\w/gm, (sub: string, args: any[]) =>
    sub.replace("-", "").toUpperCase()
  );
