export interface INotifySource {
    id: string;
    info(message: string, options?: any): void;
    error(message: string, options?: any): void;
    success(message: string, options?: any): void;
}

export function registerSource(_source: INotifySource) {
    // no-op in browser
}

export function unregisterSource(_source: INotifySource) {
    // no-op in browser
}

export function sendMessage(
    _targetId: string,
    _message: any,
    _args?: any
) {
    console.warn("sendMessage disabled in browser", _targetId, _message);
}

export function watch(
    _targetId: string,
    _callback: (...args: any[]) => void
) {
    console.warn("watch disabled in browser", _targetId);
}

export function unwatch(_targetId: string) {
    // no-op in browser
}
