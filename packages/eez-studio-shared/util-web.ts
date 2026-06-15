/**
 * util-web.ts — Browser-compatible replacement for util-electron.ts
 *
 * Same public API as util-electron.ts, but all implementations go through
 * the BridgeAPI (bridge.ts) instead of Electron / Node.js built-ins.
 *
 * Usage:
 *   In all files that previously did:
 *     import { readTextFile, writeTextFile, ... } from "eez-studio-shared/util-electron";
 *   Now do:
 *     import { readTextFile, writeTextFile, ... } from "eez-studio-shared/util-web";
 */

import { getBridgeAPI } from "./bridge";

////////////////////////////////////////////////////////////////////////////////

// In the browser, we are always the renderer.
export function isRenderer(): boolean {
    return true;
}

// In the browser, process is always available (bundled), but we aren't in Electron.
// We use the bridge's isDev() to decide.
export const isDev: boolean =
    typeof process !== "undefined" &&
    (process.env?.NODE_ENV === "development" ||
        process.env?.EEZ_STUDIO_CLI_MODE === "1");

////////////////////////////////////////////////////////////////////////////////
// Path helpers
////////////////////////////////////////////////////////////////////////////////

export function getUserDataPath(relativePath: string): string {
    return getBridgeAPI().getUserDataPath(relativePath);
}

export function getHomePath(relativePath: string): string {
    return "/eez-home/" + relativePath;
}

export function localPathToFileUrl(localPath: string): string {
    // In browser context, paths are virtual — return as-is or use a blob URL
    return localPath;
}

////////////////////////////////////////////////////////////////////////////////
// File system
////////////////////////////////////////////////////////////////////////////////

export async function readTextFile(filePath: string): Promise<string> {
    return getBridgeAPI().readTextFile(filePath);
}

export async function writeTextFile(
    filePath: string,
    data: string
): Promise<void> {
    return getBridgeAPI().writeTextFile(filePath, data);
}

export async function readBinaryData(
    filePath: string
): Promise<ArrayBuffer> {
    return getBridgeAPI().readFile(filePath);
}

export async function writeBinaryData(
    filePath: string,
    data: ArrayBuffer
): Promise<void> {
    return getBridgeAPI().writeFile(filePath, data);
}

export async function makeFolder(folderPath: string): Promise<void> {
    return getBridgeAPI().makeFolder(folderPath);
}

export async function fileExists(filePath: string): Promise<boolean> {
    return getBridgeAPI().fileExists(filePath);
}

export async function deleteFile(filePath: string): Promise<void> {
    return getBridgeAPI().deleteFile(filePath);
}

export async function listFiles(dirPath: string): Promise<string[]> {
    return getBridgeAPI().listFiles(dirPath);
}

////////////////////////////////////////////////////////////////////////////////
// Zip extraction (in browser, delegate to bridge or use JSZip inline)
////////////////////////////////////////////////////////////////////////////////

export async function zipExtract(
    zipFilePath: string,
    destFolderPath: string
): Promise<void> {
    // In browser, we fetch the zip and extract with JSZip
    const data = await getBridgeAPI().readFile(zipFilePath);
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(data);

    const promises: Promise<void>[] = [];
    zip.forEach((relativePath, file) => {
        if (!file.dir) {
            const fullPath = destFolderPath + "/" + relativePath;
            promises.push(
                file.async("arraybuffer").then(buf =>
                    getBridgeAPI().writeFile(fullPath, buf)
                )
            );
        } else {
            promises.push(
                getBridgeAPI().makeFolder(
                    destFolderPath + "/" + relativePath
                )
            );
        }
    });
    await Promise.all(promises);
}

////////////////////////////////////////////////////////////////////////////////
// Empty file creation
////////////////////////////////////////////////////////////////////////////////

export async function createEmptyFile(filePath: string): Promise<void> {
    await getBridgeAPI().writeFile(filePath, new ArrayBuffer(0));
}

////////////////////////////////////////////////////////////////////////////////
// Source root directory (project source location)
////////////////////////////////////////////////////////////////////////////////

export function sourceRootDir(): string {
    // In the browser, the "source root" is the virtual file system root
    // managed by the Rust backend.
    return "/eez-projects";
}

////////////////////////////////////////////////////////////////////////////////
// Additional file operations used by extensions
////////////////////////////////////////////////////////////////////////////////

export async function copyFile(
    sourcePath: string,
    destPath: string
): Promise<void> {
    const data = await getBridgeAPI().readFile(sourcePath);
    await getBridgeAPI().writeFile(destPath, data);
}

export async function readJsObjectFromFile<T>(
    filePath: string
): Promise<T> {
    const text = await getBridgeAPI().readTextFile(filePath);
    return JSON.parse(text);
}

export async function removeFolder(folderPath: string): Promise<void> {
    // Recursive delete — list files and delete each
    try {
        const files = await getBridgeAPI().listFiles(folderPath);
        for (const file of files) {
            await getBridgeAPI().deleteFile(folderPath + "/" + file);
        }
    } catch (_) {
        // Folder might not exist
    }
    try {
        await getBridgeAPI().deleteFile(folderPath);
    } catch (_) {
        // Folder might not exist
    }
}

export async function renameFile(
    oldPath: string,
    newPath: string
): Promise<void> {
    const data = await getBridgeAPI().readFile(oldPath);
    await getBridgeAPI().writeFile(newPath, data);
    await getBridgeAPI().deleteFile(oldPath);
}

export async function readFolder(
    folderPath: string
): Promise<string[]> {
    return getBridgeAPI().listFiles(folderPath);
}
