import { attachAboutTyping, renderAboutFinished } from "../../aboutTyping.js";

export const about = {
  html(ctx) {
    // Phone/tablet: no gimmick, no autofocus-adjacent behavior — just the
    // completed passage, statically, since there's no reliable "type
    // anywhere" input stream on touch devices.
    if (ctx.aboutRestricted) {
      return `
        <div class="about-wrap">
          <div class="about-frame bevel-raised">
            <div class="caption-bar"><span>about.txt</span></div>
            <div class="about-body bevel-inset" data-about-finished></div>
          </div>
        </div>
      `;
    }

    return `
      <div class="about-wrap">
        <div class="about-frame bevel-raised">
          <div class="caption-bar"><span>about.txt</span><span class="caption-bar-hint">type anything</span></div>
          <div class="about-body bevel-inset" data-about-reveal></div>
        </div>
      </div>
    `;
  },

  mount(pane, ctx) {
    if (ctx.aboutRestricted) {
      renderAboutFinished(pane.querySelector("[data-about-finished]"));
      return null;
    }
    const container = pane.querySelector("[data-about-reveal]");
    return attachAboutTyping(container, pane);
  },
};
