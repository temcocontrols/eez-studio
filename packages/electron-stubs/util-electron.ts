// Stub for eez-studio-shared/util-electron — browser-safe replacements

export const app: any = {
    getPath: () => "/tmp",
    getAppPath: () => "/tmp",
    getName: () => "EEZ Studio",
};

export const isDev = false;

export function isRenderer() {
    return true;
}

export function getUserDataPath(relativePath?: string) {
    return relativePath ? `/tmp/${relativePath}` : "/tmp";
}

export function getHomePath(relativePath?: string) {
    return relativePath ? `/tmp/${relativePath}` : "/tmp";
}

export function localPathToFileUrl(localPath: string) {
    return `file://${localPath}`;
}

export async function zipExtract(_zipFilePath: string, _destFolderPath: string) {
    console.warn("zipExtract disabled in browser");
}

export async function makeFolder(_folderPath: string) {
    console.warn("makeFolder disabled in browser");
}

export function removeFolder(_folderPath: string) {
    console.warn("removeFolder disabled in browser");
}

export function removeFile(_filePath: string) {
    console.warn("removeFile disabled in browser");
}

export function renameFile(_oldPath: string, _newPath: string) {
    console.warn("renameFile disabled in browser");
}

const KNOWN_TEST_PATHS = [
    "C:\\Users\\Double\\eez-projects\\1111\\1111.eez-project",
];

export function fileExists(_filePath: string) {
    return KNOWN_TEST_PATHS.includes(_filePath);
}

export function fileExistsSync(_filePath: string) {
    return false;
}

export function copyFile(_srcFilePath: string, _destFilePath: string) {
    console.warn("copyFile disabled in browser");
}

export function copyDir(_srcPath: string, _destPath: string) {
    console.warn("copyDir disabled in browser");
}

export function getFileSizeInBytes(_filePath: string) {
    return 0;
}

export function openFile(_filePath: string) {
    console.warn("openFile disabled in browser");
}

export function readFile(_filePath: string, _options?: any): Promise<Buffer> {
    console.warn("readFile disabled in browser");
    return Promise.resolve(Buffer.from(""));
}

export function closeFile(_fd: any) {
    console.warn("closeFile disabled in browser");
}

export function readTextFile(_filePath: string): Promise<string> {
    console.warn("readTextFile disabled in browser");
    return Promise.resolve("");
}

export function readBinaryFile(_filePath: string): Promise<Buffer> {
    console.warn("readBinaryFile disabled in browser");
    return Promise.resolve(Buffer.from(""));
}

export async function readJsObjectFromFile(_filePath: string) {
    throw new Error("readJsObjectFromFile: not available in browser");
}

export async function readCsvFile(_filePath: string, _options?: any): Promise<any[]> {
    console.warn("readCsvFile disabled in browser");
    return [];
}

export function makeCsvData(_columns: any[], _rows: any[]) {
    return "";
}

export async function writeCsvFile(_filePath: string, _data: string) {
    console.warn("writeCsvFile disabled in browser");
}

export async function writeTextFile(_filePath: string, _data: string) {
    console.warn("writeTextFile disabled in browser");
}

export async function writeJsObjectToFile(_filePath: string, _jsObject: any) {
    console.warn("writeJsObjectToFile disabled in browser");
}

export async function writeBinaryData(_filePath: string, _data: string | Buffer) {
    console.warn("writeBinaryData disabled in browser");
}

export function createEmptyFile(_filePath: string) {
    console.warn("createEmptyFile disabled in browser");
}

export function readFolder(_folderPath: string) {
    console.warn("readFolder disabled in browser");
    return [];
}

export function getFileName(filePath: string) {
    const parts = filePath.replace(/\\/g, "/").split("/");
    return parts[parts.length - 1] || "";
}

export function getFileNameWithoutExtension(filePath: string) {
    const name = getFileName(filePath);
    const dot = name.lastIndexOf(".");
    return dot > 0 ? name.substring(0, dot) : name;
}

export function getFolderName(filePath: string) {
    const parts = filePath.replace(/\\/g, "/").split("/");
    if (parts.length >= 2) {
        return parts[parts.length - 2];
    }
    return "";
}

export function getFileNameExtension(filePath: string) {
    const name = getFileName(filePath);
    const dot = name.lastIndexOf(".");
    return dot > 0 ? name.substring(dot + 1) : "";
}

export function getValidFileNameFromFileName(fileName: string) {
    return fileName.replace(/[<>:"/\\|?*]/g, "_");
}

export function getShortFileName(filePath: string) {
    return getFileNameWithoutExtension(filePath);
}

export function isValidFileName(fileName: string, _shortFileName: boolean) {
    return /^[^<>:"/\\|?*]+$/.test(fileName);
}

export function isValidPath(_path: string, _shortFileName: boolean) {
    return true;
}

export async function getTempFilePath(_options?: any) {
    return `/tmp/temp_${Date.now()}`;
}

export async function getTempDirPath(_options?: any) {
    return `/tmp/tempdir_${Date.now()}`;
}

export async function fetchUrlOrReadFromCache(
    url: string,
    resultType: "json" | "buffer"
) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    if (resultType == "json") {
        return await response.json();
    } else {
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
}
