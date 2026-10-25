<script lang="ts">
  const lessons = Array.from({ length: 10 }, (_, index) => `lesson ${index + 1}`);
  const parts = ["Part 01", "Part 02", "Part 03", "Part 04", "Part 05", "Part 06", "Part 07", "Part 08", "Part 09", "Part 10"];

  let activeLesson = $state(0);
  let activePart = $state(0);
  const practiceText = "ेकिही ष्यसार";
  const practiceLines = $derived(
    Array.from(
      { length: 10 },
      () =>
        activeLesson === 0 && activePart === 1
          ? "dkdk dkdk dkdk dkdk dkdk dkdk dkdk dkdk dkdk dkdk"
          : `${practiceText} ${practiceText} ${practiceText} ${practiceText} ${practiceText} ${practiceText} ${practiceText} ${practiceText} ${practiceText} ${practiceText}`
    )
  );
  let typedLines = $state<string[]>(Array.from({ length: 10 }, () => ""));
  let inputElements: HTMLInputElement[] = [];

  function chooseLesson(index: number) {
    activeLesson = index;
    typedLines = practiceLines.map(() => "");
  }

  function choosePart(index: number) {
    activePart = index;
    typedLines = practiceLines.map(() => "");
  }

  function isKrutiDevExercise() {
    return activeLesson === 0 && activePart === 1;
  }

  function updateLine(index: number, event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    typedLines[index] = target.value;
    typedLines = typedLines;
    focusNextLine(index, target.value);
  }

  function focusNextLine(index: number, value: string) {
    if (
      index < practiceLines.length - 1 &&
      Array.from(value).length >= Array.from(practiceLines[index]).length
    ) {
      inputElements[index + 1]?.focus();
    }
  }

  function insertText(index: number, target: HTMLInputElement, insertedText: string) {
    const start = target.selectionStart ?? target.value.length;
    const end = target.selectionEnd ?? start;
    const nextValue = `${target.value.slice(0, start)}${insertedText}${target.value.slice(end)}`;
    typedLines[index] = nextValue;
    typedLines = typedLines;

    requestAnimationFrame(() => {
      const cursor = start + insertedText.length;
      target.setSelectionRange(cursor, cursor);
      focusNextLine(index, nextValue);
    });
  }

  function handleKeydown(index: number, event: KeyboardEvent) {
    const target = event.currentTarget as HTMLInputElement;
    if (isKrutiDevExercise()) {
      return;
    }

    const keyMappings: Record<string, string> = {
      KeyS: "े",
      KeyD: "क",
      KeyF: "ि",
      KeyG: "ह",
      KeyH: "ी",
      Semicolon: "य",
      KeyL: "स",
      KeyK: "ा",
      KeyJ: "र"
    };
    let insertedText = keyMappings[event.code];

    if (event.code === "Quote") {
      insertedText = event.shiftKey || event.getModifierState("CapsLock") ? "श्" : "ष्";
    }

    if (!insertedText || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    event.preventDefault();
    insertText(index, target, insertedText);
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

      <div class="exercise-list">
        {#each practiceLines as line, index}
          <div class="exercise-row">
            <div class:kruti-dev={isKrutiDevExercise()} class="prompt">{line}</div>
            <input
              class:kruti-dev={isKrutiDevExercise()}
              bind:this={inputElements[index]}
              value={typedLines[index]}
              oninput={(event) => updateLine(index, event)}
              onkeydown={(event) => handleKeydown(index, event)}
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
    width: 100%;
    min-height: 100%;
    background: #202020;
  }

  :global(body) {
    width: 100%;
    min-width: 0;
    min-height: 100%;
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
    width: 100%;
    min-height: 100vh;
    margin: 0;
    background: #d2d2d2;
    box-shadow: 0 0 0 1px #111, 0 12px 35px rgb(0 0 0 / 35%);
  }

  .lesson-bar {
    position: sticky;
    top: 0;
    z-index: 10;
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
    position: sticky;
    top: 70px;
    height: calc(100vh - 70px);
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



  .exercise-list {
    display: flex;
    flex-direction: column;
    gap: 17px;
  }

  .exercise-row {
    overflow: hidden;
    background: #f1f1f1;
  }

  .prompt {
    min-height: 43px;
    padding: 9px 13px 5px;
    overflow: hidden;
    color: #202020;
    background: #fff;
    font-family: "Nirmala UI", "Noto Sans Devanagari", "Mangal", sans-serif;
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    line-height: 1.65;
    white-space: nowrap;
  }

  .kruti-dev {
    font-family: "Kruti Dev 010", "Kruti Dev", sans-serif;
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
    font-family: "Nirmala UI", "Noto Sans Devanagari", "Mangal", sans-serif;
    font-size: 1.02rem;
    line-height: 1.6;
    unicode-bidi: plaintext;
  }

  input::placeholder {
    color: #a3a3a3;
  }

  input:focus {
    background: #d5ebe3;
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
