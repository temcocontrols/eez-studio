import { autorun } from "mobx";

import { Message, ProjectStore, Section } from "project-editor/store";

import { initProjectEditor } from "project-editor/project-editor-bootstrap";
import { getBridgeAPI } from "eez-studio-shared/bridge";
import { ipcRenderer } from "eez-studio-shared/ipc";

export async function buildProject(filePath: string) {
    const sendMessage = (msg: string | undefined) => {
        ipcRenderer.send("on-build-project-message", msg);
    };

    sendMessage("Build project: " + filePath);

    try {
        await initProjectEditor(undefined, undefined as any);

        const projectStore = ProjectStore.create({
            type: "read-only"
        });

        await projectStore.openFile(filePath);

        // dump build messages
        const messages =
            projectStore.outputSectionsStore.sections[Section.OUTPUT].messages;
        let lastMessageIndexDumped = -1;
        autorun(() => {
            let messageIndex = 0;
            function dumpMessages(messages: Message[], indent: string) {
                for (let i = 0; i < messages.length; i++, messageIndex++) {
                    const message = messages[i];
                    if (messageIndex > lastMessageIndexDumped) {
                        lastMessageIndexDumped = messageIndex;

                        sendMessage(
                            indent + message.text
                        );
                    }
                    if (message.messages) {
                        dumpMessages(message.messages, indent + "\t");
                    }
                }
            }
            dumpMessages(messages.messages, "");
        });

        await projectStore.build();
    } catch (err) {
        sendMessage(
            "Unhandled error: " + err.toString()
        );
    }

    sendMessage(undefined);
}
