import { renderWindowFrame } from "./windowShell.js";
import { getPageModule } from "./pages/index.js";
import { ASSETS } from "../preload.js";

// If the boot icon sits unclicked for 5s, a hint fades in nudging the user
// toward it — wording keyed off input type (touch vs mouse), not viewport
// width, since a tablet can be wider than the phone breakpoint yet still
// touch-primary.
const BOOT_HINT_DELAY = 5000;

export function renderBootIcon(container, onOpen) {
  container.innerHTML = `
    <button type="button" class="boot-icon-btn">
      <span class="boot-icon-tile">
        <span class="boot-icon-glyph">P</span>
      </span>
      <span class="boot-icon-label">CAPITAL_P.EXE</span>
      <span class="boot-icon-hint" data-boot-hint></span>
    </button>
  `;
  const btn = container.querySelector("button");
  const hint = container.querySelector("[data-boot-hint]");
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  hint.textContent = isTouch ? "(tap it)" : "(you're supposed to click it)";

  const hintTimer = setTimeout(() => {
    hint.dataset.visible = "1";
  }, BOOT_HINT_DELAY);

  btn.addEventListener(
    "click",
    () => {
      clearTimeout(hintTimer);
      onOpen();
    },
    { once: true }
  );
}

export function mountLoader(container) {
  container.innerHTML = `
    <div class="loader-inner bevel-window-frame">
      <div class="loader-titlebar bevel-titlebar">
        <div class="dashed-on-blue" style="flex:1 1 auto;min-width:6px"></div>
        <div class="loader-title">loading.exe</div>
        <div class="dashed-on-blue" style="flex:1 1 auto;min-width:6px"></div>
      </div>
      <div class="loader-body">
        <div class="loader-heading">COPYING FILES...</div>
        <div class="loader-trough bevel-inset">
          <div class="loader-fill" data-loader-fill style="width:0%"></div>
        </div>
        <div class="loader-footer">
          <span class="loader-filename" data-loader-filename></span>
          <span class="loader-pct" data-loader-pct>0%</span>
        </div>
      </div>
    </div>
  `;
  const fill = container.querySelector("[data-loader-fill]");
  const filenameEl = container.querySelector("[data-loader-filename]");
  const pctEl = container.querySelector("[data-loader-pct]");

  return {
    update(loaded, current) {
      const pct = Math.round((loaded / ASSETS.length) * 100);
      fill.style.width = pct + "%";
      filenameEl.textContent = current || "";
      pctEl.textContent = pct + "%";
    },
  };
}

// Full rebuild of the window stack — every window's cascade offset shifts
// whenever depth changes, so every mount replays cpPop together.
export function rebuildWindowStack(container, { stack, phone }, ctx) {
  container.innerHTML = "";
  const cleanups = [];
  stack.forEach((page, index) => {
    const pageModule = getPageModule(page);
    const { frame, mount } = renderWindowFrame({
      page,
      index,
      stackLength: stack.length,
      phone,
      ctx,
      pageModule,
    });
    container.appendChild(frame);
    const cleanup = mount();
    if (cleanup) cleanups.push(cleanup);
  });
  return cleanups;
}
