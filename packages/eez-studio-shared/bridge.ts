/**
 * Central API Bridge — replaces ALL Electron, Node.js, and IPC dependencies.
 *
 * In Electron mode, these functions talk to ipcRenderer / @electron/remote / fs.
 * In web (browser) mode, these functions talk to the Rust backend via fetch().
 *
 * The hosting application (T3000Webview) calls setBridgeAPI() with its own
 * implementation before mounting any EEZ Studio component.
 */

////////////////////////////////////////////////////////////////////////////////
// Types
////////////////////////////////////////////////////////////////////////////////

export interface OpenDialogOptions {
    title?: string;
    filters?: { name: string; extensions: string[] }[];
    properties?: ("openFile" | "openDirectory" | "multiSelections")[];
    defaultPath?: string;
}

export interface SaveDialogOptions {
    title?: string;
    filters?: { name: string; extensions: string[] }[];
    defaultPath?: string;
}

export interface MessageBoxOptions {
    type: "info" | "error" | "question" | "warning";
    title: string;
    message: string;
    detail?: string;
    buttons: string[];
    cancelId?: number;
    noLink?: boolean;
}

export interface MessageBoxResult {
    response: number;
}

export interface BridgeAPI {
    // ── File System ────────────────────────────────────────────
    /** Read a file and return its content as an ArrayBuffer. */
    readFile(filePath: string): Promise<ArrayBuffer>;
    /** Write binary data to a file. */
    writeFile(filePath: string, data: ArrayBuffer): Promise<void>;
    /** Read a text file. */
    readTextFile(filePath: string): Promise<string>;
    /** Write a text file. */
    writeTextFile(filePath: string, data: string): Promise<void>;
    /** Recursively create a directory. */
    makeFolder(folderPath: string): Promise<void>;
    /** Check if a file or directory exists. */
    fileExists(filePath: string): Promise<boolean>;
    /** Delete a file. */
    deleteFile(filePath: string): Promise<void>;
    /** List files in a directory (non-recursive). */
    listFiles(dirPath: string): Promise<string[]>;
    /** Get the size of a file in bytes. */
    getFileSize(filePath: string): Promise<number>;
    /** Check if a path is a directory. */
    isDirectory(dirPath: string): Promise<boolean>;

    // ── Dialogs ─────────────────────────────────────────────────
    /** Show an open file dialog. Returns selected file paths. */
    showOpenDialog(options: OpenDialogOptions): Promise<string[]>;
    /** Show a save file dialog. Returns the chosen path or undefined. */
    showSaveDialog(options: SaveDialogOptions): Promise<string | undefined>;
    /** Show a message box and return the button index. */
    showMessageBox(options: MessageBoxOptions): Promise<MessageBoxResult>;

    // ── App Info ────────────────────────────────────────────────
    /** Get the data path for user data (settings, extensions, etc.). */
    getUserDataPath(subPath: string): string;
    /** Get the application version string. */
    getAppVersion(): string;
    /** Is this running in development mode? */
    isDev(): boolean;

    // ── Project Operations ──────────────────────────────────────
    /** Open a .eez-project file by path. Returns parsed project JSON. */
    openProject(filePath: string): Promise<any>;
    /** Save a project to disk. */
    saveProject(filePath: string, data: any): Promise<void>;

    // ── Build ───────────────────────────────────────────────────
    /** Trigger a project build. onMessage receives build progress lines. */
    buildProject(
        filePath: string,
        onMessage: (message: string) => void
    ): Promise<void>;
}

////////////////////////////////////////////////////////////////////////////////
// Singleton
////////////////////////////////////////////////////////////////////////////////

let _api: BridgeAPI | null = null;

/**
 * Set the bridge API implementation.
 * Must be called BEFORE any EEZ Studio component mounts.
 */
export function setBridgeAPI(api: BridgeAPI): void {
    _api = api;
}

/**
 * Get the current bridge API.
 * Throws if not yet initialized.
 */
export function getBridgeAPI(): BridgeAPI {
    if (!_api) {
        throw new Error(
            "Bridge API not initialized. Call setBridgeAPI() before using EEZ Studio."
        );
    }
    return _api;
}

/**
 * Returns true if the bridge API has been initialized.
 */
export function isBridgeInitialized(): boolean {
    return _api !== null;
}
