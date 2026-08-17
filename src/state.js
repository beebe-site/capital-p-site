import { CONFIG } from "./config.js";

// Minimal mutable store — no pub/sub. Callers mutate via set() then decide
// exactly which DOM to touch (see main.js); there's no generic re-render loop.
export function createStore() {
  let state = {
    phase: CONFIG.bootScreen ? "desktop" : "ready",
    stack: ["home"],
    loaded: 0,
    current: "",
    copied: null,
    phone: window.matchMedia("(max-width: 640px)").matches,
    aboutRestricted: window.matchMedia(`(max-width: ${CONFIG.aboutRestrictedMaxWidth}px)`).matches,
  };

  return {
    get: () => state,
    set: (patch) => {
      state = { ...state, ...patch };
    },
  };
}
