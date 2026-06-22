export async function confirmSave(_args: {
    description: string;
    saveCallback: () => void;
    dontSaveCallback: () => void;
    cancelCallback: () => void;
}) {
    console.warn("confirmSave disabled in browser");
    _args.dontSaveCallback();
}

export function sendSimpleMessage(message: string, args: any) {
    console.warn("sendSimpleMessage disabled in browser", message, args);
}

export function onSimpleMessage(
    message: string,
    _callback: (...args: any[]) => void
) {
    console.warn("onSimpleMessage disabled in browser", message);
}

export function isReserverdKeybinding(keybinding: string) {
    return false;
}
