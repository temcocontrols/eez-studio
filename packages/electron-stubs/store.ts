// Stub for eez-studio-shared/store - browser-safe replacements
import { observable, toJS } from "mobx";

export type StoreOperation =
    | "create"
    | "restore"
    | "read"
    | "update"
    | "delete";

export function createStoreObjectsCollection<
    T extends {
        id: string;
        deleted?: boolean;
        afterCreate?(): void;
        afterRestore?(): void;
        afterDelete?(): void;
    }
>(_isDeletedCollection?: boolean) {
    const objects = observable.map<string, T>();

    return {
        objects,

        createObject(object: T, _op: StoreOperation, _options?: IStoreOperationOptions) {
            objects.set(object.id, object);
            if (_op === "create" && object.afterCreate) object.afterCreate();
            if (_op === "restore" && object.afterRestore) object.afterRestore();
        },

        updateObject(changes: Partial<T>, _op: StoreOperation, _options?: IStoreOperationOptions) {
            const obj = objects.get(changes.id!);
            if (obj) Object.assign(obj, changes);
        },

        deleteObject(object: T, _op: StoreOperation, _options?: IStoreOperationOptions) {
            const obj = objects.get(object.id);
            if (obj) {
                if (obj.afterDelete && !(_options && _options.deletePermanently)) {
                    obj.afterDelete();
                }
                objects.delete(object.id);
            }
        },
    };
}

export const types = {
    id: { transient: true },
    foreign: {
        fromDB: (value: any) => (value != null ? value.toString() : null),
        toDB: (value: any) => value,
    },
    any: {},
    string: {},
    boolean: {
        fromDB: (value: any) => !!Number(value),
        toDB: (value: any) => (value ? 1 : 0),
    },
    integer: {
        fromDB: (value: any) => Number(value),
        toDB: (value: any) => value,
    },
    object: {
        fromDB: (value: any) => (value ? JSON.parse(value) : undefined),
        toDB: (value: any) => JSON.stringify(toJS(value)),
    },
    date: {
        fromDB: (value: any) => (value ? new Date(Number(value)) : null),
        toDB: (value: any) => {
            if (value == null) return null;
            if (typeof value === "string") return new Date(value).getTime();
            return value && value.getTime();
        },
    },
    transient: (type: any, defaultValue?: any) =>
        Object.assign({}, type, { transient: true, defaultValue }),
    lazy: (type: any) => Object.assign({}, type, { lazy: true }),
};

export interface IFilterSpecification {
    skipInitialQuery?: boolean;
    deletedOption?: "exclude" | "include" | "only";
}

export interface IStoreOperationOptions {
    undoable?: boolean;
    deletePermanently?: boolean;
    transaction?: string;
}

export interface IStore {
    storeName: string;
}

export function createStore(_config: any) {
    const storeName = _config?.storeName || "stub";
    const result: any = {
        storeName,
        objects: observable.map(),
        deletedObjects: observable.map(),
        store: { storeName },
        notifySource: {
            id: storeName,
            info: (msg: string) => console.log(`[${storeName}]`, msg),
            error: (msg: string) => console.error(`[${storeName}]`, msg),
            success: (msg: string) => console.log(`[${storeName}]`, msg),
        },

        watch(collection: any) {
            // Connect collection to this store — no-op in browser
        },

        createObject(props: any, _options?: IStoreOperationOptions) {
            const object = typeof _config?.create === "function"
                ? _config.create(props)
                : { id: String(Date.now()), ...props };
            result.objects.set(object.id, object);
            return object.id;
        },

        updateObject(changes: any, _options?: IStoreOperationOptions) {
            const obj = result.objects.get(changes.id);
            if (obj) Object.assign(obj, changes);
        },

        deleteObject(object: any, _options?: IStoreOperationOptions) {
            result.objects.delete(object.id);
        },
    };

    allStores[storeName] = result;
    return result;
}

export const allStores: Record<string, any> = {};

export const undoManager = {
    beginTransaction: (_label: string) => {},
    commitTransaction: () => {},
    undo: () => {},
    redo: () => {},
};

export function beginTransaction(label: string) {
    undoManager.beginTransaction(label);
}

export function commitTransaction() {
    undoManager.commitTransaction();
}

export function undo() {
    undoManager.undo();
}

export function redo() {
    undoManager.redo();
}
