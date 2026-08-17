import { ABOUT_PARAGRAPHS } from "./data/content.js";

// The "possessed typewriter" about.txt easter egg: the panel starts holding
// only the seed below, and every keystroke anywhere in the window reveals
// the next real character of the copy — regardless of which key was
// actually pressed. Backspace rewinds the reveal by one character; once the
// whole passage is out, further forward keystrokes are absorbed and do
// nothing (there's nothing left to reveal).
export const ABOUT_SEED = "Capital P is a";

const TOTAL_LENGTH = ABOUT_PARAGRAPHS.reduce(
  (sum, runs) => sum + runs.reduce((s, run) => s + run.text.length, 0),
  0
);
const LAST_PARAGRAPH_INDEX = ABOUT_PARAGRAPHS.length - 1;

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
    revealedCount = isBackspace
      ? Math.max(0, revealedCount - 1)
      : Math.min(TOTAL_LENGTH, revealedCount + 1);
    paint();
  };
  window.addEventListener("keydown", onKey, true);

  paint();

  return () => {
    window.removeEventListener("keydown", onKey, true);
  };
}
