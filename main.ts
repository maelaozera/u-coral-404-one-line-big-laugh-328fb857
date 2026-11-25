import { mkdirSync, writeFileSync } from "node:fs";

// One Line, Big Laugh — u-coral-404-one-line-big-laugh-328fb857
// A single self-contained funny line, written to /output/entry.txt.
//
// The entry itself is a fixed string literal. Everything around it is
// plumbing: the gate the competition enforces on the file (UTF-8 text,
// 1 to 200 characters, not only white space, exactly one line) plus the
// write to disk. The text is never transformed — no trimming, no case
// changes, no added newline — so what is validated is what is written.

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";

const ENTRY =
  "I asked my GPS for the scenic route and it drove me past my ex's house, my therapist's office, and a billboard that just said 'RUN.'";

// Gate limits, kept as named constants so the rules are visible in one
// place instead of buried inside the checks below.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Count characters the way a reader sees them: spread into code points
// so an astral character (emoji, rare glyph) counts once, not twice.
function countChars(text: string): number {
  return [...text].length;
}

// The gate requires 1 to 200 characters.
function assertLength(text: string): number {
  const length = countChars(text);
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `Entry is ${length} characters; must be ${MIN_CHARS} to ${MAX_CHARS}.`,
    );
  }
  return length;
}

// The gate requires the entry to contain something besides white space.
function assertNotBlank(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only white space.");
  }
}

// The gate requires exactly one line: no newline characters at all.
function assertSingleLine(text: string): void {
  if (text.includes("\n")) {
    throw new Error("Entry must be a single line.");
  }
}

// Run every gate check in order and return the validated length, so
// the caller can report exactly how long the accepted entry is.
function validateLine(text: string): number {
  const length = assertLength(text);
  assertNotBlank(text);
  assertSingleLine(text);
  return length;
}

// The entry needs no formatting — it is already the final text — so
// this step exists to make that explicit: the string that passes
// validation is the string that gets written, byte for byte, with no
// trailing newline appended by the writer either.
function formatEntry(text: string): string {
  return text;
}

// Create the output directory if needed, then write the entry exactly
// as given (UTF-8, no trailing newline added).
function writeEntry(text: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, text, "utf8");
}

const length = validateLine(ENTRY);
writeEntry(formatEntry(ENTRY));
console.log(`Wrote ${length} characters to ${OUTPUT_FILE}`);
