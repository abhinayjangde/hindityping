<script lang="ts">
  type InputElement = HTMLInputElement | undefined;

  let {
    lines,
    typedLines,
    isKrutiDev,
    isStory,
    inputElements,
    onInput,
    onKeydown
  }: {
    lines: string[];
    typedLines: string[];
    isKrutiDev: boolean;
    isStory: boolean;
    inputElements: InputElement[];
    onInput: (index: number, event: Event) => void;
    onKeydown: (index: number, event: KeyboardEvent) => void;
  } = $props();
</script>

<section class="practice-panel" aria-labelledby="practice-title">
  <div class="exercise-list">
    {#each lines as line, index}
      <div class="exercise-row">
        <div class:kruti-dev={isKrutiDev} class:unicode-dev={isStory} class="prompt">
          {line}
        </div>
        <input
          class:kruti-dev={isKrutiDev}
          bind:this={inputElements[index]}
          value={typedLines[index]}
          oninput={(event) => onInput(index, event)}
          onkeydown={(event) => onKeydown(index, event)}
          aria-label={`अभ्यास पंक्ति ${index + 1}`}
          inputmode="text"
          lang="hi"
          dir="ltr"
          spellcheck="false"
        />
      </div>
    {/each}
  </div>
</section>
