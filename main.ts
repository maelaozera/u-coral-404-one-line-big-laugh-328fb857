import { mkdirSync, writeFileSync } from "node:fs";

// One Line, Big Laugh — u-coral-404-one-line-big-laugh-328fb857
// A single self-contained funny line, written to /output/entry.txt.

const ENTRY =
  "I asked my GPS for the scenic route and it drove me past my ex's house, my therapist's office, and a billboard that just said 'RUN.'";

const MAX_CHARS = 200;

// Self-check: the gate requires UTF-8 text of 1 to 200 characters,
// not only white space, and a single line.
const length = [...ENTRY].length;
if (length < 1 || length > MAX_CHARS) {
  throw new Error(`Entry is ${length} characters; must be 1 to ${MAX_CHARS}.`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only white space.");
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote ${length} characters to /output/entry.txt`);
