# Tauri + SvelteKit + TypeScript

This template should help get you started developing with Tauri, SvelteKit and TypeScript in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

## Build a Windows installer

Install Node.js and Rust on the development computer, then run:

```powershell
npm install
npm run tauri build
```

The production build creates installers in:

```text
src-tauri\target\release\bundle\
```

Share the `.exe` installer from the `nsis` folder with your friend. They can run it to install the app. The `.msi` installer in the `msi` folder is an alternative for Windows systems that use MSI deployment.

The first build can take several minutes because Rust compiles the desktop application. The installed computer needs Microsoft Edge WebView2, which is already included with most current Windows installations.

## Frontend structure

The Svelte frontend is organized by responsibility:

```text
src/
  lib/
    components/       Reusable lesson and practice UI
    lesson-data.ts    Lesson definitions and exercise classification
    practice-content.ts
                      Practice text selection and lesson content
    typing-state.ts   Input editing and focus behavior
    hindi-keyboard.ts Hindi keyboard mapping
  routes/
    +page.svelte      Page orchestration and feature wiring
```

When adding a feature, prefer adding data or reusable behavior under `src\lib` and keep `src\routes\+page.svelte` focused on coordinating components and state.
