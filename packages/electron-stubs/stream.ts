// Browser-safe stream stub
export class Stream extends EventTarget {}
export const Readable = Stream;
export const Writable = Stream;
export const Duplex = Stream;
export const Transform = Stream;
export const PassThrough = Stream;
export default { Stream, Readable, Writable, Duplex, Transform, PassThrough };
