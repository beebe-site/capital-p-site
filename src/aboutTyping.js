import { ABOUT_PARAGRAPHS } from "./data/content.js";

// The "possessed typewriter" about.txt easter egg: the panel starts holding
// only the seed below, and every keystroke anywhere in the window reveals
// the next real character of the copy — regardless of which key was
// actually pressed. Backspace rewinds the reveal; once the whole passage is
// out, further forward keystrokes are absorbed and do nothing.
//
// Reveals one character at a time up through WORD_MODE_THRESHOLD (enough to
// sell the gimmick), then switches to revealing a whole word per keystroke —
// mashing out ~340 characters one at a time got tedious in practice. A
// word-jump never crosses a paragraph break in one keystroke, so paragraph
// transitions still land as a distinct beat.
export const ABOUT_SEED = "Capital P is a ";

const FLAT_TEXT = ABOUT_PARAGRAPHS.map((runs) => runs.map((r) => r.text).join("")).join("");
const TOTAL_LENGTH = FLAT_TEXT.length;
const LAST_PARAGRAPH_INDEX = ABOUT_PARAGRAPHS.length - 1;

const PARAGRAPH_END_OFFSETS = (() => {
  let offset = 0;
  return ABOUT_PARAGRAPHS.map((runs) => {
    offset += runs.reduce((s, r) => s + r.text.length, 0);
    return offset;
  });
})();

const WORD_MODE_MARKER = "Capital P is a company offering";
const WORD_MODE_THRESHOLD = FLAT_TEXT.startsWith(WORD_MODE_MARKER)
  ? WORD_MODE_MARKER.length
  : ABOUT_SEED.length;

function paragraphEndFor(pos) {
  for (const end of PARAGRAPH_END_OFFSETS) {
    if (pos < end) return end;
  }
  return TOTAL_LENGTH;
}

function paragraphStartFor(pos) {
  let start = 0;
  for (const end of PARAGRAPH_END_OFFSETS) {
    if (pos < end) return start;
    start = end;
  }
  return start;
}

function nextWordBoundary(pos) {
  const cap = paragraphEndFor(pos);
  let i = pos;
  while (i < cap && FLAT_TEXT[i] === " ") i++;
  while (i < cap && FLAT_TEXT[i] !== " ") i++;
  return i;
}

function prevWordBoundary(pos) {
  const floor = Math.max(WORD_MODE_THRESHOLD, paragraphStartFor(pos - 1));
  let i = pos;
  while (i > floor && FLAT_TEXT[i - 1] === " ") i--;
  while (i > floor && FLAT_TEXT[i - 1] !== " ") i--;
  return i;
}

function locate(revealedCount) {
  let offset = 0;
  for (let p = 0; p < ABOUT_PARAGRAPHS.length; p++) {
    const runs = ABOUT_PARAGRAPHS[p];
    for (let r = 0; r < runs.length; r++) {
      const len = runs[r].text.length;
      if (revealedCount <= offset + len) {
        return { paragraphIndex: p, runIndex: r, charIndex: revealedCount - offset };
      }
      offset += len;
    }
  }
  const lastRuns = ABOUT_PARAGRAPHS[LAST_PARAGRAPH_INDEX];
  return {
    paragraphIndex: LAST_PARAGRAPH_INDEX,
    runIndex: lastRuns.length - 1,
    charIndex: lastRuns[lastRuns.length - 1].text.length,
  };
}

function wrap(text, bold) {
  return bold ? `<b>${text}</b>` : text;
}

export function renderAboutReveal(containerEl, revealedCount) {
  const { paragraphIndex, runIndex, charIndex } = locate(revealedCount);
  const html = [];
  for (let p = 0; p <= paragraphIndex; p++) {
    const runs = ABOUT_PARAGRAPHS[p];
    const isCurrentParagraph = p === paragraphIndex;
    const segments = [];
    for (let r = 0; r < runs.length; r++) {
      if (!isCurrentParagraph || r < runIndex) {
        segments.push(wrap(runs[r].text, runs[r].bold));
      } else if (r === runIndex) {
        segments.push(wrap(runs[r].text.slice(0, charIndex), runs[r].bold));
        segments.push(`<span class="ghost-caret"></span>`);
      }
      // r > runIndex: not reached yet, omit entirely
    }
    html.push(`<p class="ghost-p">${segments.join("")}</p>`);
  }
  containerEl.innerHTML = html.join("");
}

export function renderAboutFinished(containerEl) {
  const html = ABOUT_PARAGRAPHS.map(
    (runs) => `<p class="ghost-p">${runs.map((run) => wrap(run.text, run.bold)).join("")}</p>`
  ).join("");
  containerEl.innerHTML = html;
}

export function attachAboutTyping(containerEl, pane) {
  let revealedCount = ABOUT_SEED.length;

  const paint = () => {
    renderAboutReveal(containerEl, revealedCount);
    if (pane) pane.scrollTop = pane.scrollHeight;
  };

  const onKey = (e) => {
    // modifier combos pass through untouched so browser shortcuts still work
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const printable = e.key.length === 1;
    const isBackspace = e.key === "Backspace";
    const isEnter = e.key === "Enter";
    if (!printable && !isBackspace && !isEnter) return;
    e.preventDefault();
    if (isBackspace) {
      revealedCount =
        revealedCount > WORD_MODE_THRESHOLD
          ? prevWordBoundary(revealedCount)
          : Math.max(0, revealedCount - 1);
    } else {
      revealedCount =
        revealedCount >= WORD_MODE_THRESHOLD
          ? Math.min(TOTAL_LENGTH, nextWordBoundary(revealedCount))
          : Math.min(TOTAL_LENGTH, revealedCount + 1);
    }
    paint();
  };
  window.addEventListener("keydown", onKey, true);

  paint();

  return () => {
    window.removeEventListener("keydown", onKey, true);
  };
}
