import { PAGES } from "../data/pages.js";
import { computeCascade } from "../cascade.js";
import { CONFIG } from "../config.js";

// Builds the identical shell (frame/titlebar/pane/statusbar/scrim) for one
// stack entry, then delegates the pane's inner content to the page module.
// `pageModule` must export `html(ctx)` and may export `mount(paneEl, ctx)`.
export function renderWindowFrame({ page, index, stackLength, phone, ctx, pageModule }) {
  const meta = PAGES[page] || PAGES.home;
  const top = stackLength - 1;
  const isTop = index === top;
  const showChrome = index > 0; // root index window has no HOME/X, cannot be closed

  const { dx, dy, width, height } = computeCascade(stackLength, index, phone, CONFIG.cascadeStep);

  const frame = document.createElement("div");
  frame.className = "window-frame";
  frame.dataset.inactive = isTop ? "0" : "1";
  frame.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  frame.style.width = width;
  frame.style.height = height;
  frame.style.zIndex = String(10 + index);

  const inner = document.createElement("div");
  inner.className = "window-inner bevel-window-frame";

  const titlebar = document.createElement("div");
  titlebar.className = "window-titlebar bevel-titlebar";

  if (showChrome) {
    const homeBtn = document.createElement("button");
    homeBtn.type = "button";
    homeBtn.title = "Home";
    homeBtn.className = "titlebar-btn titlebar-btn--home";
    homeBtn.textContent = "HOME";
    homeBtn.addEventListener("click", () => ctx.home());
    titlebar.appendChild(homeBtn);
  }

  titlebar.appendChild(dashedRule("blue"));

  const title = document.createElement("div");
  title.className = "window-title";
  title.textContent = meta.title;
  titlebar.appendChild(title);

  titlebar.appendChild(dashedRule("blue"));

  if (showChrome) {
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.title = "Close";
    closeBtn.className = "titlebar-btn titlebar-btn--close";
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => ctx.closeAt(index));
    titlebar.appendChild(closeBtn);
  }

  const pane = document.createElement("div");
  pane.className = "window-pane";
  pane.dataset.pane = "1";
  pane.innerHTML = pageModule.html(ctx);

  // Navigation buttons/links declare their target via data-nav; wire once here
  // so page modules don't each need their own click plumbing for simple pushes.
  pane.addEventListener("click", (e) => {
    const navEl = e.target.closest("[data-nav]");
    if (navEl) {
      ctx.open(navEl.dataset.nav);
      return;
    }
    // Every "leaves the site" link (the ↗ glyph) is marked target="_blank"
    // in its own markup; force the new-tab open explicitly here too rather
    // than trusting the anchor's native behavior, since some host/embedding
    // contexts (preview panes, sandboxed iframes) rewrite target="_blank"
    // navigations to the current tab instead of honoring it.
    const externalLink = e.target.closest('a[target="_blank"]');
    if (externalLink) {
      e.preventDefault();
      window.open(externalLink.href, "_blank", "noopener,noreferrer");
    }
  });

  const statusbar = document.createElement("div");
  statusbar.className = "window-statusbar";
  const statusLeft = document.createElement("div");
  statusLeft.className = "status-left";
  statusLeft.textContent = meta.path;
  const statusRight = document.createElement("div");
  statusRight.className = "status-right";
  statusRight.textContent = meta.status;
  statusbar.appendChild(statusLeft);
  statusbar.appendChild(statusRight);

  inner.appendChild(titlebar);
  inner.appendChild(pane);
  inner.appendChild(statusbar);

  if (!isTop) {
    const scrim = document.createElement("div");
    scrim.className = "window-scrim";
    inner.appendChild(scrim);
  }

  frame.appendChild(inner);

  // mount() must run only after the caller connects `frame` to the live
  // document — contentEditable.focus() (about.js's autofocus) is a silent
  // no-op on a still-detached node, so page modules get a `mount` callback
  // to invoke post-append rather than mounting eagerly here.
  const mount = () => (pageModule.mount ? pageModule.mount(pane, ctx) : null);

  return { frame, mount };
}

function dashedRule(variant) {
  const el = document.createElement("div");
  el.className = variant === "blue" ? "dashed-on-blue" : "dashed-on-chrome";
  el.style.flex = "1 1 auto";
  el.style.minWidth = "6px";
  return el;
}
