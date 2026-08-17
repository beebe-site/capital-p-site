import { CONFIG } from "./config.js";
import { createStore } from "./state.js";
import { kickVideoAutoplay } from "./video.js";
import { preloadAssets, ASSETS } from "./preload.js";
import { renderBootIcon, mountLoader, rebuildWindowStack } from "./render/desktop.js";

const store = createStore();

const videoEl = document.getElementById("bg-video");
const scanlinesEl = document.getElementById("scanlines");
const windowStackEl = document.getElementById("window-stack");
const desktopIconEl = document.getElementById("desktop-icon-layer");
const loaderEl = document.getElementById("loader-layer");

if (!CONFIG.showVideo) {
  videoEl.remove();
} else {
  kickVideoAutoplay(videoEl);
}
if (!CONFIG.showScanlines) scanlinesEl.remove();

let cleanups = [];

function buildCtx() {
  const s = store.get();
  return {
    phone: s.phone,
    aboutRestricted: s.aboutRestricted,
    // opening a page spawns a new pop-up window, offset from the one below it
    open(page) {
      const st = store.get().stack;
      if (st[st.length - 1] === page) return; // no-op guard for double clicks
      store.set({ stack: [...st, page] });
      rebuild();
    },
    // X on window i kills that window and every window above it
    closeAt(index) {
      store.set({ stack: store.get().stack.slice(0, index) });
      rebuild();
    },
    // HOME on any window collapses back to the lone index window
    home() {
      store.set({ stack: ["home"] });
      rebuild();
    },
  };
}

// Full rebuild of the window stack — every window's cascade offset shifts
// whenever depth or breakpoint changes, so every mount replays cpPop together.
function rebuild() {
  cleanups.forEach((fn) => fn());
  const s = store.get();
  cleanups = rebuildWindowStack(windowStackEl, { stack: s.stack, phone: s.phone }, buildCtx());
}

function boot() {
  desktopIconEl.innerHTML = "";
  const loader = mountLoader(loaderEl);
  store.set({ phase: "loading", loaded: 0, current: ASSETS[0] });
  loader.update(0, ASSETS[0]);

  preloadAssets(
    (loaded, current) => {
      store.set({ loaded, current });
      loader.update(loaded, current);
    },
    () => {
      loaderEl.innerHTML = "";
      store.set({ phase: "ready", stack: ["home"] });
      rebuild();
    }
  );
}

if (store.get().phase === "desktop") {
  renderBootIcon(desktopIconEl, boot);
} else {
  rebuild();
}

// Cascade breakpoint, tracked with matchMedia + a change listener (not a CSS
// media query) since the cascade math needs the boolean in JS.
const mq = window.matchMedia("(max-width: 640px)");
mq.addEventListener("change", (e) => {
  store.set({ phone: e.matches });
  if (store.get().phase === "ready") rebuild();
});

// Separate, wider breakpoint gating the about.txt keyboard gimmick (both
// variants) — phone AND tablet fall back to the finished static text.
const aboutMq = window.matchMedia(`(max-width: ${CONFIG.aboutRestrictedMaxWidth}px)`);
aboutMq.addEventListener("change", (e) => {
  store.set({ aboutRestricted: e.matches });
  if (store.get().phase === "ready") rebuild();
});

// Escape pops one level, only past the root index window, only once ready.
window.addEventListener(
  "keydown",
  (e) => {
    if (store.get().phase !== "ready") return;
    if (e.key !== "Escape") return;
    const st = store.get().stack;
    if (st.length > 1) {
      store.set({ stack: st.slice(0, -1) });
      rebuild();
    }
  },
  true
);
