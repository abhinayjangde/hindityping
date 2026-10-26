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
