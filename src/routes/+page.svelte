<script lang="ts">
  import LessonHeader from "$lib/components/LessonHeader.svelte";
  import LessonParts from "$lib/components/LessonParts.svelte";
  import PracticeList from "$lib/components/PracticeList.svelte";
  import { getHindiKeyMapping } from "$lib/hindi-keyboard";
  import { isKrutiDevExercise, isStoryExercise } from "$lib/lesson-data";
  import { lessons } from "$lib/lesson-data";
  import { getPracticeLines } from "$lib/practice-content";
  import {
    createEmptyTypedLines,
    insertAtSelection,
    shouldFocusNextLine,
    shouldFocusPreviousLine
  } from "$lib/typing-state";

  let activeLesson = $state(0);
  let activePart = $state(0);
  const activeLessonParts = $derived(lessons[activeLesson].parts);
  const practiceLines = $derived(getPracticeLines(activeLesson, activePart));
  let typedLines = $state<string[]>(createEmptyTypedLines(getPracticeLines(0, 0).length));
  let inputElements = $state<(HTMLInputElement | undefined)[]>([]);

  function chooseLesson(index: number) {
    activeLesson = index;
    activePart = 0;
    typedLines = createEmptyTypedLines(getPracticeLines(index, 0).length);
    inputElements = [];
  }

  function choosePart(index: number) {
    activePart = index;
    typedLines = createEmptyTypedLines(getPracticeLines(activeLesson, index).length);
    inputElements = [];
  }

  function registerInputElement(index: number, element: HTMLInputElement | undefined) {
    inputElements[index] = element;
    inputElements = inputElements;
  }

  function updateLine(index: number, event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    typedLines[index] = target.value;
    typedLines = typedLines;
    if (shouldFocusNextLine(index, practiceLines.length, target.value, practiceLines[index])) {
      inputElements[index + 1]?.focus();
    }
  }

  function insertText(index: number, target: HTMLInputElement, insertedText: string) {
    const result = insertAtSelection(
      target.value,
      target.selectionStart,
      target.selectionEnd,
      insertedText
    );
    typedLines[index] = result.value;
    typedLines = typedLines;

    requestAnimationFrame(() => {
      target.setSelectionRange(result.cursor, result.cursor);
      if (shouldFocusNextLine(index, practiceLines.length, result.value, practiceLines[index])) {
        inputElements[index + 1]?.focus();
      }
    });
  }

  function handleKeydown(index: number, event: KeyboardEvent) {
    const target = event.currentTarget as HTMLInputElement;
    if (event.key === "Enter" && index < practiceLines.length - 1) {
      event.preventDefault();
      inputElements[index + 1]?.focus();
      return;
    }

    if (event.key === "Backspace" && shouldFocusPreviousLine(index, target.value)) {
      event.preventDefault();
      const previousInput = inputElements[index - 1];
      previousInput?.focus();
      const cursor = previousInput?.value.length ?? 0;
      previousInput?.setSelectionRange(cursor, cursor);
      return;
    }

    const usesKrutiDevInput =
      isKrutiDevExercise(activeLesson, activePart) && !isStoryExercise(activeLesson, activePart);
    const insertedText = usesKrutiDevInput ? undefined : getHindiKeyMapping(event);
    if (!insertedText) {
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
  <LessonHeader {lessons} {activeLesson} onSelect={chooseLesson} />

  <div class="workspace">
    <LessonParts parts={activeLessonParts} {activePart} onSelect={choosePart} />
    <PracticeList
      lines={practiceLines}
      {typedLines}
      isKrutiDev={isKrutiDevExercise(activeLesson, activePart)}
      isStory={isStoryExercise(activeLesson, activePart)}
      onInputElement={registerInputElement}
      onInput={updateLine}
      onKeydown={handleKeydown}
    />
  </div>
</main>

<style>
  :global {
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
    color: #000000;
    font-size: 1.3rem;
    font-weight: 700;
    white-space: nowrap;
    margin-right: 62px;
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
    background: #6076cd;
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
    min-height: 52px;
    padding: 9px 13px 5px;
    overflow: hidden;
    color: #202020;
    background: #fff;
    font-family: "Nirmala UI", "Noto Sans Devanagari", "Mangal", sans-serif;
    font-size: clamp(20px, 1.8vw, 20px);
    line-height: 1.65;
    white-space: nowrap;
  }

  .kruti-dev {
    font-family: "Kruti Dev 010", "Kruti Dev", sans-serif;
  }

  .unicode-dev {
    font-family: "Nirmala UI", "Noto Sans Devanagari", "Mangal", sans-serif;
  }

  .prompt.kruti-dev {
    min-height: 60px;
    font-size: clamp(24px, 2.4vw, 30px);
    line-height: 1.45;
  }

  input {
    display: block;
    width: 100%;
    height: 52px;
    padding: 7px 13px;
    color: #252525;
    background: #e1e1e1;
    border: 0;
    outline: 0;
    font-family: "Nirmala UI", "Noto Sans Devanagari", "Mangal", sans-serif;
    font-size: clamp(20px, 1.8vw, 20px);
    line-height: 1.6;
    unicode-bidi: plaintext;
  }

  input.kruti-dev {
    height: 60px;
    font-size: clamp(24px, 2.4vw, 30px);
    line-height: 1.45;
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
  }
</style>
