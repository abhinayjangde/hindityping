<script lang="ts">
  import type { Lesson } from "$lib/lesson-data";

  let {
    lessons,
    activeLesson,
    onSelect
  }: {
    lessons: Lesson[];
    activeLesson: number;
    onSelect: (index: number) => void;
  } = $props();
</script>

<header class="lesson-bar" aria-label="Lessons">
  <nav>
    {#each lessons as lesson, index}
      <button
        class:active={activeLesson === index}
        class="lesson-button"
        type="button"
        aria-current={activeLesson === index ? "page" : undefined}
        onclick={() => onSelect(index)}
      >
        {lesson.name}
      </button>
    {/each}
  </nav>
</header>
