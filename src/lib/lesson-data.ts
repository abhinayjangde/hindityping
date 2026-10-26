export type Lesson = {
  name: string;
  parts: string[];
};

const defaultParts = [
  "Part 01",
  "Part 02",
  "Part 03",
  "Part 04",
  "Part 05",
  "Part 06",
  "Part 07",
  "Part 08",
  "Part 09",
  "Part 10"
];

export const lessons: Lesson[] = [
  "Lesson 01 - Basics",
  "Lesson 02",
  "Lesson 03",
  "Lesson 04",
  "Lesson 05",
  "Lesson 06",
  "Lession 07 - Stories",
  "Lesson 08",
  "Lesson 09",
  "Lesson 10"
].map((name) => ({ name, parts: [...defaultParts] }));

export const storyLessonIndex = 6;

export function isStoryExercise(lessonIndex: number, partIndex: number): boolean {
  return lessonIndex === storyLessonIndex && partIndex === 0;
}

export function isKrutiDevExercise(lessonIndex: number, partIndex: number): boolean {
  return (
    (lessonIndex === 0 && partIndex >= 1 && partIndex <= 4) ||
    (lessonIndex === 1 && partIndex === 0) ||
    (lessonIndex === 2 && partIndex === 0) ||
    isStoryExercise(lessonIndex, partIndex)
  );
}
