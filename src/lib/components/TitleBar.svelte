<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import HelpMenu from "$lib/components/HelpMenu.svelte";

  const appWindow = getCurrentWindow();

  async function minimize() {
    await appWindow.minimize();
  }

  async function toggleMaximize() {
    await appWindow.toggleMaximize();
  }

  async function close() {
    await appWindow.close();
  }

  async function startWindowDrag(event: MouseEvent) {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button")) {
      return;
    }

    await appWindow.startDragging();
  }
</script>

<header class="title-bar" data-tauri-drag-region>
  <div
    class="title-content"
    data-tauri-drag-region
    role="toolbar"
    aria-label="Window title bar"
    tabindex="0"
    onmousedown={startWindowDrag}
  >
    <img src="/favicon.png" alt="" width="16" height="16" />
    <span>Chikoo</span>
    <HelpMenu />
  </div>
  <div class="window-controls">
    <button type="button" aria-label="Minimize" onclick={minimize}>−</button>
    <button type="button" aria-label="Maximize or restore" onclick={toggleMaximize}>□</button>
    <button class="close-button" type="button" aria-label="Close" onclick={close}>×</button>
  </div>
</header>

<style>
  .title-bar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    flex: 0 0 32px;
    color: #fff;
    background: #101010;
    user-select: none;
  }

  .title-content {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8px;
    padding-left: 10px;
    font-size: 0.82rem;
    font-weight: 600;
  }

  .title-content img {
    object-fit: contain;
  }

  .title-content :global(.help-menu) {
    margin-left: 10px;
  }

  .title-content :global(.help-button) {
    padding: 5px 10px;
    color: #fff;
  }

  .title-content :global(.help-button:hover),
  .title-content :global(.help-button.open) {
    background: #6076cd;
  }

  .title-content :global(.menu-items) {
    top: calc(100% + 1px);
  }

  .window-controls {
    display: flex;
    height: 100%;
  }

  .window-controls button {
    width: 46px;
    height: 100%;
    padding: 0;
    color: #fff;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 1rem;
  }

  .window-controls button:hover {
    background: #333;
  }

  .window-controls .close-button:hover {
    background: #c42b1c;
  }
</style>
