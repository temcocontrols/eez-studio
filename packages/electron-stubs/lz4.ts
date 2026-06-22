// Browser-safe LZ4 stub (no compression)
export function encode(input: Uint8Array | Buffer) {
  // return input unchanged
  return input;
}

export function decode(input: Uint8Array | Buffer) {
  // return input unchanged
  return input;
}

export default { encode, decode };
