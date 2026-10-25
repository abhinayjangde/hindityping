<script lang="ts">
  const lessons = Array.from({ length: 10 }, (_, index) => `lesson ${index + 1}`);
  const parts = ["part 1", "part 2", "part 3", "part 4", "part 5", "part 6", "part 7", "part 8", "part 9"];
  const practiceLines = [
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास",
    "कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास कैसे प्रयास"
  ];

  let activeLesson = $state(0);
  let activePart = $state(0);
  let typedLines = $state<string[]>(practiceLines.map(() => ""));

  function chooseLesson(index: number) {
    activeLesson = index;
    typedLines = practiceLines.map(() => "");
  }

  function choosePart(index: number) {
    activePart = index;
    typedLines = practiceLines.map(() => "");
  }

  function updateLine(index: number, event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    typedLines[index] = target.value;
    typedLines = typedLines;
  }
</script>

<svelte:head>
  <title>हिंदी टाइपिंग अभ्यास</title>
  <meta name="description" content="हिंदी टाइपिंग सीखने और अभ्यास करने का सरल तरीका।" />
</svelte:head>

<main class="app-window" lang="hi">
  <header class="lesson-bar" aria-label="Lessons">
    <span class="window-title">हिंदी टाइपिंग</span>
    <nav>
      {#each lessons as lesson, index}
        <button
          class:active={activeLesson === index}
          class="lesson-button"
          type="button"
          aria-current={activeLesson === index ? "page" : undefined}
          onclick={() => chooseLesson(index)}
        >
          {lesson}
        </button>
      {/each}
    </nav>
  </header>

  <div class="workspace">
    <aside class="parts-panel" aria-label="Lesson parts">
      <div class="parts-heading">अभ्यास</div>
      {#each parts as part, index}
        <button
          class:active={activePart === index}
          class="part-button"
          type="button"
          aria-current={activePart === index ? "page" : undefined}
          onclick={() => choosePart(index)}
        >
          {part}
        </button>
      {/each}
    </aside>

    <section class="practice-panel" aria-labelledby="practice-title">
      <div class="practice-header">
        <div>
          <p class="breadcrumb">lesson {activeLesson + 1} <span>/</span> {parts[activePart]}</p>
          <h1 id="practice-title">हिंदी टाइपिंग अभ्यास</h1>
        </div>
        <div class="progress" aria-label="Practice progress">
          <span>{typedLines.filter((line) => line.length > 0).length} / {practiceLines.length}</span>
          <div class="progress-track"><div class="progress-value" style={`width: ${(typedLines.filter((line) => line.length > 0).length / practiceLines.length) * 100}%`}></div></div>
        </div>
      </div>

      <div class="instructions">
        <span class="keyboard-icon" aria-hidden="true">⌨</span>
        <span>ऊपर दिए गए शब्दों को नीचे के बॉक्स में टाइप करें</span>
      </div>

      <div class="exercise-list">
        {#each practiceLines as line, index}
          <div class="exercise-row">
            <div class="prompt">{line}</div>
            <input
              value={typedLines[index]}
              oninput={(event) => updateLine(index, event)}
              aria-label={`अभ्यास पंक्ति ${index + 1}`}
              placeholder="यहाँ टाइप करें..."
              inputmode="text"
              lang="hi"
              dir="ltr"
              spellcheck="false"
            />
          </div>
        {/each}
      </div>
    </section>
  </div>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    background: #202020;
  }

  :global(body) {
    min-width: 760px;
    margin: 0;
    font-family: "Nirmala UI", "Noto Sans Devanagari", "Mangal", "Segoe UI", sans-serif;
    color: #161616;
    background: #202020;
  }

  button,
  input {
    font: inherit;
  }

  .app-window {
    width: min(100%, 1180px);
    min-height: 100vh;
    margin: 0 auto;
    background: #d2d2d2;
    box-shadow: 0 0 0 1px #111, 0 12px 35px rgb(0 0 0 / 35%);
  }

  .lesson-bar {
    display: flex;
    align-items: center;
    min-height: 70px;
    padding: 0 27px;
    gap: 22px;
    background: #d3d3d3;
    border-bottom: 1px solid #bcbcbc;
  }

  .window-title {
    width: 112px;
    color: #27745e;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .lesson-button,
  .part-button {
    border: 0;
    color: #0a0a0a;
    background: #2e8068;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease, transform 120ms ease;
  }

  .lesson-button {
    padding: 5px 10px 6px;
    font-size: 0.98rem;
  }

  .lesson-button:hover,
  .part-button:hover {
    background: #22644f;
    color: white;
  }

  .lesson-button.active,
  .part-button.active {
    color: #fff;
    background: #1f6953;
    box-shadow: inset 0 -3px 0 #12513f;
  }

  .workspace {
    display: grid;
    grid-template-columns: 224px minmax(0, 1fr);
    min-height: calc(100vh - 70px);
  }

  .parts-panel {
    padding: 25px 14px 30px;
    background: #d3d3d3;
    border-right: 1px solid #c3c3c3;
  }

  .parts-heading {
    margin: 0 15px 17px;
    color: #333;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .part-button {
    display: block;
    width: 164px;
    min-height: 43px;
    margin: 0 0 18px;
    padding: 7px 12px;
    text-align: left;
    font-size: 1rem;
  }

  .practice-panel {
    min-width: 0;
    padding: 30px 49px 50px;
    background: #fff;
  }

  .practice-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 25px;
    margin: 0 0 21px;
  }

  .breadcrumb {
    margin: 0 0 4px;
    color: #2e8068;
    font-size: 0.88rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  .breadcrumb span {
    padding: 0 5px;
    color: #9c9c9c;
  }

  h1 {
    margin: 0;
    font-size: clamp(1.35rem, 2.6vw, 1.9rem);
    font-weight: 700;
  }

  .progress {
    width: 145px;
    color: #6d6d6d;
    font-size: 0.8rem;
    text-align: right;
  }

  .progress-track {
    height: 5px;
    margin-top: 6px;
    overflow: hidden;
    background: #e1e1e1;
    border-radius: 5px;
  }

  .progress-value {
    height: 100%;
    background: #2e8068;
    transition: width 150ms ease;
  }

  .instructions {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 17px;
    color: #686868;
    font-size: 0.9rem;
  }

  .keyboard-icon {
    color: #2e8068;
    font-size: 1.1rem;
  }

  .exercise-list {
    display: flex;
    flex-direction: column;
    gap: 17px;
  }

  .exercise-row {
    overflow: hidden;
    border: 1px solid #e4e4e4;
    background: #f1f1f1;
  }

  .prompt {
    min-height: 43px;
    padding: 9px 13px 5px;
    overflow: hidden;
    color: #202020;
    background: #fff;
    font-family: "Kruti Dev 010", "Kruti Dev", "Nirmala UI", "Noto Sans Devanagari", sans-serif;
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    line-height: 1.65;
    white-space: nowrap;
  }

  input {
    display: block;
    width: 100%;
    height: 43px;
    padding: 7px 13px;
    color: #252525;
    background: #e1e1e1;
    border: 0;
    outline: 0;
    font-family: "Kruti Dev 010", "Kruti Dev", "Nirmala UI", "Noto Sans Devanagari", sans-serif;
    font-size: 1.02rem;
    line-height: 1.6;
    unicode-bidi: plaintext;
  }

  input::placeholder {
    color: #a3a3a3;
  }

  input:focus {
    background: #d5ebe3;
    box-shadow: inset 0 0 0 2px #2e8068;
  }

  @media (max-width: 900px) {
    .window-title {
      display: none;
    }

    .lesson-bar {
      padding: 12px 18px;
    }

    .workspace {
      grid-template-columns: 175px minmax(0, 1fr);
    }

    .part-button {
      width: 140px;
    }

    .practice-panel {
      padding: 25px 28px 40px;
    }
  }
</style>
