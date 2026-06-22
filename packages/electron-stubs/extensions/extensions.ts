import { observable } from "mobx";
import type { IExtension } from "./extension";

export const CONF_EEZ_STUDIO_PROPERTY_NAME = "eez-studio";
export const CONF_MAIN_SCRIPT_PROPERTY_NAME = "main";
export const CONF_NODE_MODULE_PROPERTY_NAME = "node-module";

export const extensions = observable(new Map<string, IExtension>());

export function registerExtension(extension: IExtension) {
    console.warn("registerExtension disabled in browser", extension.id);
}

export async function reloadExtension(folder: string) {
    console.warn("reloadExtension disabled in browser", folder);
}

export async function loadExtensions(nodeModuleFolders: string[]) {
    console.warn("loadExtensions disabled in browser", nodeModuleFolders);
}

export async function loadPreinstalledExtension(name: string) {
    console.warn("loadPreinstalledExtension disabled in browser", name);
}

export async function loadExtensionById(id: string) {
    console.warn("loadExtensionById disabled in browser", id);
}

export async function importExtensionToFolder(
    extensionFilePath: string,
    folderPath: string
) {
    console.warn("importExtensionToFolder disabled in browser");
}

export async function importExtensionToTempFolder(extensionFilePath: string) {
    console.warn("importExtensionToTempFolder disabled in browser");
    return "";
}

export function destroyExtensions() {
    console.warn("destroyExtensions disabled in browser");
}

export async function installExtension(
    extension: IExtension,
    options?: any
) {
    console.warn("installExtension disabled in browser", extension.id);
}

export async function uninstallExtension(extensionId: string) {
    console.warn("uninstallExtension disabled in browser", extensionId);
}

export const notifySource = {
    info: (msg: string) => console.log(msg),
    error: (msg: string) => console.error(msg),
};

export interface ExtensionChangeEvent {
    extensionId: string;
    type: string;
}

export async function changeExtensionImage(
    extensionId: string,
    imagePath: string
) {
    console.warn("changeExtensionImage disabled in browser", extensionId);
}

export async function exportExtension(
    extensionId: string,
    targetPath: string
) {
    console.warn("exportExtension disabled in browser", extensionId);
}

export function getManufacturer(extension: IExtension) {
    return extension.id.split("-")[0] || "Unknown";
}

export function isInstrumentExtension(extension: IExtension) {
    return false;
}
