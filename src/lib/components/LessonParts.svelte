<script lang="ts">
  let {
    parts,
    activePart,
    onSelect
  }: {
    parts: string[];
    activePart: number;
    onSelect: (index: number) => void;
  } = $props();
</script>

<aside class="parts-panel" aria-label="Lesson parts">
  <div class="parts-heading">अभ्यास</div>
  {#each parts as part, index}
    <button
      class:active={activePart === index}
      class="part-button"
      type="button"
      aria-current={activePart === index ? "page" : undefined}
      onclick={() => onSelect(index)}
    >
      {part}
    </button>
  {/each}
</aside>
