<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";

  let name = $state("अभ्यासक");
  let greetMsg = $state("");

  async function greet(event: Event) {
    event.preventDefault();
    greetMsg = await invoke("greet", { name });
  }
</script>

<svelte:head>
  <title>हिंदी टाइपिंग अभ्यास</title>
  <meta
    name="description"
    content="A Hindi typing practice app built with Rust, Tauri, and Svelte."
  />
</svelte:head>

<main class="page-shell">
  <section class="hero-card">
    <p class="eyebrow">Rust + Tauri + Svelte</p>
    <h1>नमस्ते, हिंदी टाइपिंग!</h1>
    <p class="intro">
      आपका हिंदी टाइपिंग सीखने का सफर यहाँ से शुरू होता है।
    </p>

    <form onsubmit={greet}>
      <label for="name">अपना नाम लिखें</label>
      <div class="input-row">
        <input id="name" placeholder="जैसे: अनिल" bind:value={name} />
        <button type="submit">अभिवादन करें</button>
      </div>
    </form>

    {#if greetMsg}
      <p class="greeting" role="status">{greetMsg}</p>
    {/if}

    <div class="next-step">
      <span class="icon" aria-hidden="true">⌨</span>
      <div>
        <strong>जल्द आ रहा है</strong>
        <p>पाठ, अभ्यास और आपकी प्रगति एक ही जगह।</p>
      </div>
    </div>
  </section>
</main>

<style>
:root {
  font-family: "Noto Sans Devanagari", "Nirmala UI", "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #172033;
  background: #f5f7fb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  box-sizing: border-box;
  background:
    radial-gradient(circle at 15% 20%, #d9f4ee 0, transparent 28rem),
    radial-gradient(circle at 85% 80%, #e5ddff 0, transparent 30rem),
    #f5f7fb;
}

.hero-card {
  width: min(100%, 680px);
  padding: clamp(2rem, 6vw, 4.5rem);
  box-sizing: border-box;
  background: rgb(255 255 255 / 88%);
  border: 1px solid rgb(255 255 255 / 80%);
  border-radius: 28px;
  box-shadow: 0 24px 70px rgb(53 64 96 / 14%);
  backdrop-filter: blur(12px);
}

.eyebrow {
  margin: 0 0 1rem;
  color: #168b75;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  max-width: 12ch;
  margin: 0;
  color: #18233b;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  line-height: 1.15;
  letter-spacing: -0.04em;
}

.intro {
  max-width: 38rem;
  margin: 1.5rem 0 2.5rem;
  color: #58657c;
  font-size: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #34415b;
  font-weight: 700;
}

.input-row {
  display: flex;
  gap: 0.75rem;
}

input,
button {
  min-height: 3.25rem;
  box-sizing: border-box;
  border-radius: 12px;
  font: inherit;
}

input {
  min-width: 0;
  flex: 1;
  padding: 0 1rem;
  color: #18233b;
  background: #fff;
  border: 1px solid #d6ddeb;
}

input:focus {
  outline: 3px solid rgb(22 139 117 / 20%);
  border-color: #168b75;
}

button {
  padding: 0 1.25rem;
  color: #fff;
  background: #168b75;
  border: 0;
  box-shadow: 0 8px 18px rgb(22 139 117 / 22%);
  cursor: pointer;
  font-weight: 700;
  transition: transform 120ms ease, background 120ms ease;
}

button:hover {
  background: #117662;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.greeting {
  margin: 1.25rem 0 0;
  padding: 1rem;
  color: #136b5b;
  background: #e9f8f3;
  border-radius: 12px;
  font-weight: 700;
}

.next-step {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e4e8f0;
}

.icon {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  color: #7157bd;
  background: #f0edff;
  border-radius: 10px;
  font-size: 1.4rem;
}

.next-step strong {
  color: #34415b;
}

.next-step p {
  margin: 0.15rem 0 0;
  color: #738097;
}

@media (max-width: 560px) {
  .page-shell {
    padding: 1rem;
  }

  .hero-card {
    padding: 2rem 1.5rem;
  }

  .input-row {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>
