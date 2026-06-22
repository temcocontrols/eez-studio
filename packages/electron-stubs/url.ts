// Browser-safe url stub
export function pathToFileURL(path: string): URL {
    return new URL(`file://${path.replace(/\\/g, "/")}`);
}

export function fileURLToPath(url: string | URL): string {
    const u = typeof url === "string" ? new URL(url) : url;
    return u.pathname;
}

export const URL = globalThis.URL;
export const URLSearchParams = globalThis.URLSearchParams;

export function format(urlObject: any): string {
    return urlObject.href || urlObject.pathname || "";
}

export function parse(urlString: string, _parseQueryString?: boolean): any {
    const u = new URL(urlString);
    return {
        protocol: u.protocol,
        host: u.host,
        hostname: u.hostname,
        port: u.port,
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        href: u.href,
    };
}

export function resolve(from: string, to: string): string {
    return new URL(to, new URL(from, "file:///")).href;
}

export default {
    pathToFileURL,
    fileURLToPath,
    URL,
    URLSearchParams,
    format,
    parse,
    resolve,
};
