import { window, workspace } from "vscode";
import * as path from "path";

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
