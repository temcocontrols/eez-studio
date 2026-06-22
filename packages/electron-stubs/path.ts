// Browser-safe path stub

export const sep = "/";
export const delimiter = ":";

export const join = (...args: string[]) => args.join("/");
export const resolve = (...args: string[]) => args.join("/");
export const dirname = () => "";
export const basename = (p: string) => p.split("/").pop() || "";
export const extname = (p: string) => {
  const i = p.lastIndexOf(".");
  return i >= 0 ? p.slice(i) : "";
};
export const relative = (from: string, to: string) => {
    // Simple relative path
    const fromParts = from.replace(/\\/g, "/").split("/").filter(Boolean);
    const toParts = to.replace(/\\/g, "/").split("/").filter(Boolean);
    let i = 0;
    while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) i++;
    const ups = fromParts.slice(i).map(() => "..");
    return [...ups, ...toParts.slice(i)].join("/") || ".";
};

export default {
  join,
  resolve,
  dirname,
  basename,
  extname,
  relative,
};
