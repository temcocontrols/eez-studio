// Stub for main/window (Electron main process - not available in browser)
import { observable } from "mobx";

export interface IWindowSate {
    x?: number;
    y?: number;
    width: number;
    height: number;
    isMaximized: boolean;
}

export interface IWindowParams {
    url: string;
    args?: any;
}

export interface IWindow {
    browserWindow: any;
    params: IWindowParams;
}

export const windows = observable<IWindow>([]);

export function setForceQuit() {}
export function createWindow(_params: IWindowParams) {}
export function findWindowByParams(_params: IWindowParams): IWindow | undefined { return undefined; }
export function findWindowByBrowserWindow(_bw: any): IWindow | undefined { return undefined; }
export function findWindowByWebContents(_wc: any): IWindow | undefined { return undefined; }
export function openWindow(_params: IWindowParams) {}
export function closeWindow(_params: IWindowParams) {}
export function isCrashed(_window: any) { return false; }
