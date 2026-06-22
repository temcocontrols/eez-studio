import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Specific eez-studio-shared stubs (checked in order, MUST come before general fallback)
const eezeStudioSharedStubs: Record<string, string> = {
    "eez-studio-shared/store": "../electron-stubs/store.ts",
    "eez-studio-shared/db": "../electron-stubs/db.ts",
    "eez-studio-shared/notify": "../electron-stubs/notify.ts",
    "eez-studio-shared/util-electron": "../electron-stubs/util-electron.ts",
    "eez-studio-shared/i10n": "../electron-stubs/i10n.ts",
    "eez-studio-shared/util": "../electron-stubs/eez-studio-shared-util.ts",
    "eez-studio-shared/util-renderer": "../electron-stubs/util-renderer.ts",
    "eez-studio-shared/service": "../electron-stubs/service.ts",
    "eez-studio-shared/extensions/extension": "../electron-stubs/extensions/extension.ts",
    "eez-studio-shared/extensions/extensions": "../electron-stubs/extensions/extensions.ts",
    "eez-studio-shared/extensions/extension-folder": "../electron-stubs/extensions/extension-folder.ts",
    "eez-studio-shared/extensions/yarn": "../electron-stubs/extensions/yarn.ts",
};

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: [
            // Package aliases
            { find: "home", replacement: path.resolve(__dirname, "./") },
            { find: "instrument", replacement: path.resolve(__dirname, "../instrument") },
            { find: "db-services", replacement: path.resolve(__dirname, "../db-services") },
            { find: "shortcuts", replacement: path.resolve(__dirname, "../shortcuts") },
            { find: "eez-studio-ui", replacement: path.resolve(__dirname, "../eez-studio-ui") },
            { find: "project-editor", replacement: path.resolve(__dirname, "../project-editor") },
            { find: "brace", replacement: path.resolve(__dirname, "../../libs/brace-0.11.1") },

            // Electron main process stubs
            { find: "main", replacement: path.resolve(__dirname, "../electron-stubs/main") },
            { find: "pdf-services", replacement: path.resolve(__dirname, "../electron-stubs/pdf-services") },

            // Node stubs
            { find: "fs", replacement: path.resolve(__dirname, "../electron-stubs/fs.ts") },
            { find: "fs/promises", replacement: path.resolve(__dirname, "../electron-stubs/fs-promises.ts") },
            { find: "path", replacement: path.resolve(__dirname, "../electron-stubs/path.ts") },
            { find: "chokidar", replacement: path.resolve(__dirname, "../electron-stubs/chokidar.ts") },
            { find: "koffi", replacement: path.resolve(__dirname, "../electron-stubs/koffi.ts") },
            { find: "lz4", replacement: path.resolve(__dirname, "../electron-stubs/lz4.ts") },
            { find: "util", replacement: path.resolve(__dirname, "../electron-stubs/util.ts") },
            { find: "stream", replacement: path.resolve(__dirname, "../electron-stubs/stream.ts") },
            { find: "url", replacement: path.resolve(__dirname, "../electron-stubs/url.ts") },
            { find: "buffer", replacement: path.resolve(__dirname, "../electron-stubs/buffer.ts") },
            { find: "child_process", replacement: path.resolve(__dirname, "../electron-stubs/child_process.ts") },
            { find: "os", replacement: path.resolve(__dirname, "../electron-stubs/os.ts") },
            { find: "better-sqlite3", replacement: path.resolve(__dirname, "../electron-stubs/better-sqlite3.ts") },

            // Electron stubs
            { find: "electron", replacement: path.resolve(__dirname, "../electron-stubs/electron") },
            { find: "@electron/remote", replacement: path.resolve(__dirname, "../electron-stubs/electron") },
            { find: "@electron/remote/main", replacement: path.resolve(__dirname, "../electron-stubs/electron") },
            { find: "electron_remote", replacement: path.resolve(__dirname, "../electron-stubs/electron") },
            { find: "electron_remote.js", replacement: path.resolve(__dirname, "../electron-stubs/electron") },
            { find: "electron/main", replacement: path.resolve(__dirname, "../electron-stubs/electron-main.ts") },
            { find: "electron/main.js", replacement: path.resolve(__dirname, "../electron-stubs/electron") },
            { find: "electron/index.js", replacement: path.resolve(__dirname, "../electron-stubs/electron") },

            // Process stub
            { find: "process", replacement: path.resolve(__dirname, "../electron-stubs/process") },

            { find: "store", replacement: path.resolve(__dirname, "../electron-stubs/store.ts") },

            // eez-studio-shared specific stubs (BEFORE general fallback)
            ...Object.entries(eezeStudioSharedStubs).map(([find, replacement]) => ({
                find,
                replacement: path.resolve(__dirname, replacement),
            })),

            // General eez-studio-shared fallback (LAST — serves all non-stubbed sub-paths from real source)
            { find: "eez-studio-shared", replacement: path.resolve(__dirname, "../eez-studio-shared") },
        ]
    },

    // Allow .pegjs files as raw text assets
    assetsInclude: ["**/*.pegjs"],

    // Prevent Vite from trying to optimize Node builtins
    optimizeDeps: {
        exclude: ["fs", "fs/promises", "path", "electron", "buffer"]
    },

    ssr: {
        external: []
    },

    define: {
        'process.env': {},
        'process.platform': '"browser"',
        'process.type': '"browser"',
        'process.version': '"0.0.0"',
        'process.versions': '{}',
        'process': '{}',
        'global': 'globalThis'
    },

    server: {
        port: 5173,
        strictPort: true,
        fs: {
            // Allow serving files from the workspace root (needed for resources/, packages/, etc.)
            allow: ["../.."]
        }
    }
});
