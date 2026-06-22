// Stub for eez-studio-shared/util - browser-safe replacements

export function parseXmlString(xmlString: string) {
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");
}

export function getBoundingClientRectOfChildNodes(element: Element) {
    return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
}

export function getBoundingClientRectIncludingChildNodes(element: Element) {
    return element.getBoundingClientRect();
}

export function formatNumber(value: number, base: number, width: number): string {
    return ("0".repeat(width) + value.toString(base)).substr(-width).toUpperCase();
}

export function formatTransferSpeed(speed: number) {
    return `${speed} B/s`;
}

export function objectClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function objectEqual<T>(a: T, b: T) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function getMoment() {
    console.warn("getMoment disabled in browser");
    return {
        duration: () => ({ asMilliseconds: () => 0, humanize: () => "" }),
    };
}

export function formatDateTimeLong(date: Date) {
    return date.toISOString();
}

export function formatDate(date: Date, format?: string) {
    return date.toISOString();
}

export function formatDuration(duration: number) {
    return `${duration}ms`;
}

export function formatDurationWithParam(duration: number, format: string) {
    return `${duration}`;
}

export function getFirstDayOfWeek() {
    return 1; // Monday
}

export function getDayOfWeek(date: Date) {
    return date.getDay();
}

export function getDayOfWeekName(dayOfWeek: number) {
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return names[dayOfWeek] || "";
}

export function getWeekNumber(date: Date) {
    return 1;
}

export async function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const studioVersion = "0.0.0";

export function compareVersions(v1: string, v2: string) {
    const a = v1.split(".").map(Number);
    const b = v2.split(".").map(Number);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if ((a[i] || 0) > (b[i] || 0)) return 1;
        if ((a[i] || 0) < (b[i] || 0)) return -1;
    }
    return 0;
}

export function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function sourceRootDir() {
    return "/";
}

export function isArray(arg: any): arg is any[] {
    return Array.isArray(arg);
}
