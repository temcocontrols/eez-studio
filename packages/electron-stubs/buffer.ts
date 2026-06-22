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

    writeUInt8(value: number, offset: number): void {
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint8(offset, value);
    }

    writeUInt16LE(value: number, offset: number): void {
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint16(offset, value, true);
    }

    writeUInt32LE(value: number, offset: number): void {
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value, true);
    }

    writeInt32LE(value: number, offset: number): void {
        new DataView(this.buffer, this.byteOffset, this.byteLength).setInt32(offset, value, true);
    }

    readUInt8(offset: number): number {
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint8(offset);
    }

    readUInt32LE(offset: number): number {
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint32(offset, true);
    }

    readUInt16LE(offset: number): number {
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint16(offset, true);
    }

    copy(target: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number {
        const data = new Uint8Array(this.buffer, this.byteOffset + (sourceStart || 0), (sourceEnd || this.length) - (sourceStart || 0));
        (target as Uint8Array).set(data, targetStart || 0);
        return data.length;
    }

    slice(start?: number, end?: number): Buffer {
        return new Buffer(new Uint8Array(this.buffer, this.byteOffset + (start || 0), (end || this.length) - (start || 0)));
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
