import { observable, runInAction, makeObservable } from "mobx";

import {
    getUserDataPath,
    fileExists,
    readJsObjectFromFile,
    writeJsObjectToFile
} from "eez-studio-shared/util-electron";

import * as notification from "eez-studio-ui/notification";

import { IExtension } from "eez-studio-shared/extensions/extension";

export const DEFAULT_EXTENSIONS_CATALOG_VERSION_DOWNLOAD_URL =
    "https://github.com/eez-open/studio-extensions/raw/master/build/catalog-version.json";

export const DEFAULT_EXTENSIONS_CATALOG_DOWNLOAD_URL =
    "https://github.com/eez-open/studio-extensions/raw/master/build/catalog.zip";

interface ICatalogVersion {
    lastModified: Date;
}

class ExtensionsCatalog {
    catalog: IExtension[] = [];
    catalogVersion: ICatalogVersion;

    constructor() {
        makeObservable(this, {
            catalog: observable
        });
    }

    load() {
        this._loadCatalog()
            .then(catalog => {
                runInAction(() => (this.catalog = catalog));
            })
            .catch(error =>
                notification.error(
                    `Failed to load extensions catalog (${error})`
                )
            );

        this._loadCatalogVersion()
            .then(catalogVersion => {
                runInAction(() => (this.catalogVersion = catalogVersion));

                this.checkNewVersionOfCatalog();
            })
            .catch(error =>
                notification.error(`Failed to load catalog version (${error})`)
            );
    }

    get catalogPath() {
        return getUserDataPath("catalog.json");
    }

    async _loadCatalog() {
        let catalogPath = this.catalogPath;
        if (!(await fileExists(catalogPath))) {
            return [];
        }
        return (await readJsObjectFromFile(catalogPath)) as IExtension[];
    }

    get catalogVersionPath() {
        return getUserDataPath("catalog-version.json");
    }

    async _loadCatalogVersion() {
        let catalogVersion;

        let catalogVersionPath = this.catalogVersionPath;
        if (await fileExists(catalogVersionPath)) {
            try {
                catalogVersion = await readJsObjectFromFile(catalogVersionPath);
                catalogVersion.lastModified = new Date(
                    catalogVersion.lastModified
                );
            } catch (err) {
                console.error(err);
            }
        }

        return catalogVersion;
    }

    async checkNewVersionOfCatalog(forceDownload: boolean = false) {
        try {
            const catalogVersion = await this.downloadCatalogVersion();

            if (
                !this.catalogVersion ||
                catalogVersion.lastModified > this.catalogVersion.lastModified
            ) {
                runInAction(() => (this.catalogVersion = catalogVersion));
                this.downloadCatalog();
            } else {
                // no new version
                if (forceDownload) {
                    this.downloadCatalog();
                    return true;
                }
                return false;
            }
        } catch (error) {
            console.error(error);
            notification.error(`Failed to download extensions catalog version`);
        }

        return true;
    }

    downloadCatalogVersion() {
        // Hardcoded: skip network request (CORS blocked in browser)
        return Promise.resolve({ lastModified: new Date(0) } as ICatalogVersion);
    }

    downloadCatalog() {
        // Hardcoded: skip network request (CORS blocked in browser)
    }
}

export const extensionsCatalog = new ExtensionsCatalog();
