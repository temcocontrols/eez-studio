import { ipcRenderer } from "eez-studio-shared/ipc";

export async function confirmSave({
    description,
    saveCallback,
    dontSaveCallback,
    cancelCallback
}: {
    description: string;
    saveCallback: () => void;
    dontSaveCallback: () => void;
    cancelCallback: () => void;
}) {
    // Browser-compatible: use native confirm dialog
    const result = confirm(
        "Do you want to save changes?\n\n" +
            description +
            "Your changes will be lost if you don't save them."
    );
    if (result) {
        saveCallback();
    } else {
        dontSaveCallback();
    }
}

export function sendSimpleMessage(message: string, args: any) {
    ipcRenderer.send("shared/simple-message", {
        message,
        args
    });
}

export function onSimpleMessage(
    message: string,
    callback: (args: any) => void
) {
    ipcRenderer.on(
        "shared/simple-message",
        (
            event: any,
            args: {
                message: string;
                args: any;
            }
        ) => {
            if (args.message === message) {
                callback(args.args);
            }
        }
    );
}

let reservedKeybindings: string[] | undefined = undefined;

function getReservedKeybindings() {
    if (!reservedKeybindings) {
        reservedKeybindings = ipcRenderer
            .sendSync("getReservedKeybindings")
            .concat([
                "Insert",
                "Delete",
                "Home",
                "End",
                "Pageup",
                "Pagedown",
                "Scrolllock",
                "Pause",
                "Arrowleft",
                "Arrowright",
                "Arrowup",
                "Arrowdown",
                "Backspace",
                "Tab",
                "Ctrl+C",
                "Ctrl+V"
            ]);
        console.log("Reserved keybindings", reservedKeybindings);
    }
    return reservedKeybindings!;
}

function keybindingEqual(keybinding1: string, keybinding2: string) {
    const keybinding1Parts = keybinding1.toLowerCase().split("+");
    const keybinding2Parts = keybinding2.toLowerCase().split("+");

    if (keybinding1Parts.length !== keybinding2Parts.length) {
        return false;
    }

    for (let i = 0; i < keybinding1Parts.length; i++) {
        if (keybinding2Parts.indexOf(keybinding1Parts[i]) === -1) {
            return false;
        }
    }

    return true;
}

export function isReserverdKeybinding(keybinding: string) {
    let reservedKeybindings = getReservedKeybindings();

    for (let i = 0; i < reservedKeybindings.length; i++) {
        if (keybindingEqual(keybinding, reservedKeybindings[i])) {
            return true;
        }
    }

    return false;
}
