// Browser stub for better-sqlite3 — no native bindings in browser
class StubDatabase {
    constructor(_filePath: string, _options?: any) {
        console.warn("better-sqlite3: Database disabled in browser");
    }
    prepare(_sql: string) {
        return {
            get: () => undefined,
            all: () => [],
            run: () => ({ changes: 0, lastInsertRowid: 0 }),
        };
    }
    exec(_sql: string) {}
    close() {}
    pragma(_key: string, _options?: any) { return ""; }
    defaultSafeIntegers(_toggle?: boolean) { return this; }
    backup(_dest: any) { return Promise.resolve(); }
    transaction(_fn: Function) { return _fn(); }
}

const Database = StubDatabase as any;
Database.Database = StubDatabase;

export default Database;
