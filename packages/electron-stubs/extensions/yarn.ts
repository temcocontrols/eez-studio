export async function yarnInstall(_extensionToInstall?: any) {
    console.warn("yarnInstall disabled in browser");
}

export async function yarnUninstall(_moduleName: string) {
    console.warn("yarnUninstall disabled in browser");
}

export function getNodeModuleFolders() {
    console.warn("getNodeModuleFolders disabled in browser");
    return [];
}
