// Browser-safe Buffer polyfill
export class Buffer extends Uint8Array {
    static from(data: string | ArrayBuffer | Uint8Array, encoding?: string): Buffer {
        if (typeof data === "string") {
            const encoder = new TextEncoder();
            return new Buffer(encoder.encode(data));
        }
        if (data instanceof ArrayBuffer) {
            return new Buffer(new Uint8Array(data));
        }
        return new Buffer(data);
    }

    static alloc(size: number): Buffer {
        return new Buffer(new Uint8Array(size));
    }

    static isBuffer(obj: any): obj is Buffer {
        return obj instanceof Buffer;
    }

    toString(encoding?: string): string {
        const decoder = new TextDecoder(encoding);
        return decoder.decode(this);
    }
}

// Install as global
if (typeof window !== "undefined") {
    (window as any).Buffer = Buffer;
}
if (typeof globalThis !== "undefined") {
    (globalThis as any).Buffer = Buffer;
}

export default Buffer;
