/**
 * eez-studio-web-entry.tsx — Browser entry point for EEZ Studio
 *
 * This replaces the Electron bootstrap in home/main.tsx.
 * The hosting application (T3000Webview) calls createEezStudioApp()
 * after setting up the bridge API.
 *
 * Usage from T3000Webview:
 *   import { createEezStudioApp } from "eez-studio/eez-studio-web-entry";
 *   import { createT3000Bridge } from "./bridge/t3000-bridge";
 *   import { setBridgeAPI } from "eez-studio-shared/bridge";
 *
 *   const bridge = createT3000Bridge();
 *   setBridgeAPI(bridge);
 *   const cleanup = await createEezStudioApp(containerElement);
 */

/// <reference path="./home/globals.d.ts"/>

// EEZ Studio CSS (all styles in one LESS entry — variables shared across components)
import "./eez-studio.less";
import "@eez-studio-build/eez-studio-ui/_stylesheets/material-icons.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { configure } from "mobx";

import { loadExtensions } from "eez-studio-shared/extensions/extensions";
import { tabs, loadTabs } from "home/tabs-store";

import { App } from "home/app";

// Import settings and extensions so side-effects run
import "home/settings";
import "eez-studio-ui/side-dock";

import { initProjectEditor } from "project-editor/project-editor-bootstrap";

// Import so LineMarkers are registered
import "project-editor/flow/connection-line/ConnectionLineComponent";

configure({ enforceActions: "observed", useProxies: "always" });

////////////////////////////////////////////////////////////////////////////////

function blurAll() {
    const tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
}

////////////////////////////////////////////////////////////////////////////////

export interface EezStudioAppHandle {
    /** Programmatically unmount the entire EEZ Studio UI. */
    unmount(): void;
}

/**
 * Create and mount the EEZ Studio application into the given DOM container.
 *
 * @param container - The DOM element to render EEZ Studio into.
 * @returns A handle with an `unmount()` method.
 */
export async function createEezStudioApp(
    container: HTMLElement
): Promise<EezStudioAppHandle> {
    // Load pre-installed extensions (empty array = no extra paths)
    try { await loadExtensions([]); } catch (e) { console.warn("loadExtensions failed:", e); }

    try { await initProjectEditor(undefined, undefined as any); } catch (e) { console.warn("initProjectEditor failed:", e); }

    // Restore previously open tabs from local storage
    loadTabs();

    const root = createRoot(container);
    root.render(<App />);

    // Register beforeunload handler (replaces Electron's before-quit)
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
        blurAll();
        for (const tab of tabs.tabs) {
            if (tab.beforeAppClose) {
                if (!(await tab.beforeAppClose())) {
                    e.preventDefault();
                    e.returnValue = "";
                    return;
                }
            }
        }
        // Save tabs state
        try {
            localStorage.setItem(
                "eez-studio-tabs",
                JSON.stringify(tabs.tabs.map(t => t.titleStr))
            );
        } catch (_) {
            // localStorage may be unavailable
        }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return {
        unmount() {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            root.unmount();
        }
    };
}
