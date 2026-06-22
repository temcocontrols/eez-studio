export const preInstalledExtensionsFolderPath = "/tmp/extensions";
export const extensionsFolderPath = "/tmp/extensions";

export function getExtensionFolderPath(extensionId: string) {
    return `/tmp/extensions/${extensionId}`;
}
