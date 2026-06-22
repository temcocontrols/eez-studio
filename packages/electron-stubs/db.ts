import { observable, computed, makeObservable, runInAction } from "mobx";

export let getActiveDbPath: () => string = () => "";
export let getDbPaths: () => any[] = () => [];
export let setDbPaths: (dbPaths: any[]) => void = () => {};

export const db = {
    prepare: () => ({
        get: () => undefined,
        run: () => {},
        all: () => [],
    }),
    exec: () => {},
    close: () => {},
};

export class InstrumentDatabase {
    filePath: string;
    isActive: boolean;
    timeOfLastDatabaseCompactOperation: number;
    description: string = "";
    databaseSize: number = 0;

    constructor(
        filePath: string,
        isActive: boolean,
        timeOfLastDatabaseCompactOperation: number | undefined
    ) {
        this.filePath = filePath;
        this.isActive = isActive;
        this.timeOfLastDatabaseCompactOperation =
            timeOfLastDatabaseCompactOperation ?? Date.now();

        makeObservable(this, {
            filePath: observable,
            isActive: observable,
            timeOfLastDatabaseCompactOperation: observable,
            description: observable,
        });
    }

    get isCompactDatabaseAdvisable() {
        return false;
    }

    getDescription() {
        return "";
    }

    storeDescription() {
        console.warn("storeDescription disabled in browser");
    }
}

export function storeDescription(_db: any, _description: string) {
    console.warn("storeDescription disabled in browser");
}

export function initInstrumentDatabase(_filePath: string) {
    console.warn("initInstrumentDatabase disabled in browser");
    return Promise.resolve();
}

class InstrumentDatabases {
    activeDatabasePath: string = "";
    databases: InstrumentDatabase[] = [];

    constructor() {
        makeObservable(this, {
            databases: observable,
            activeDatabase: computed,
        });
    }

    get activeDatabase() {
        return this.databases.find((db) => db.isActive);
    }

    getDatabaseByFilePath(filePath: string) {
        return this.databases.find((db) => db.filePath === filePath);
    }

    addDatabase(filePath: string, isActive: boolean) {
        runInAction(() => {
            if (isActive && this.activeDatabase) {
                this.activeDatabase.isActive = false;
            }

            const database = this.databases.find(
                (database) => database.filePath == filePath
            );

            if (database) {
                database.isActive = isActive;
            } else {
                this.databases.push(
                    new InstrumentDatabase(filePath, isActive, Date.now())
                );
            }
        });
    }

    removeDatabase(database: InstrumentDatabase) {
        const i = this.databases.indexOf(database);
        if (i != -1) {
            runInAction(() => {
                this.databases.splice(i, 1);
            });
        }
    }
}

export const instrumentDatabases = new InstrumentDatabases();
