export function createEmptyTypedLines(lineCount: number): string[] {
  return Array.from({ length: lineCount }, () => "");
}

export function insertAtSelection(
  value: string,
  selectionStart: number | null,
  selectionEnd: number | null,
  insertedText: string
): { value: string; cursor: number } {
  const start = selectionStart ?? value.length;
  const end = selectionEnd ?? start;

  return {
    value: `${value.slice(0, start)}${insertedText}${value.slice(end)}`,
    cursor: start + insertedText.length
  };
}

export function shouldFocusNextLine(
  index: number,
  lineCount: number,
  value: string,
  target: string
): boolean {
  return index < lineCount - 1 && Array.from(value).length >= Array.from(target).length;
}
