import {
  aboutGlyph,
  reelGlyph,
  workGlyph,
  teamGlyph,
  envelopeGlyph,
  aiPolicyGlyph,
} from "../../glyphs.js";
import { CONFIG } from "../../config.js";

export const home = {
  html() {
    const buttons = [
      { nav: "about", glyph: aboutGlyph(), label: "ABOUT" },
      { nav: "reel", glyph: reelGlyph(), label: "REEL" },
      { nav: "work", glyph: workGlyph(), label: "WORK" },
      { nav: "team", glyph: teamGlyph(), label: "TEAM" },
      { nav: "contact", glyph: envelopeGlyph(), label: "CONTACT" },
    ];
    if (CONFIG.showAiPolicy) {
      buttons.push({ nav: "ai-policy", glyph: aiPolicyGlyph(), label: "AI POLICY" });
    }

    const buttonsHTML = buttons
      .map(
        (b) => `
      <button type="button" class="icon-btn raised-btn" data-nav="${b.nav}">
        ${b.glyph}
        <span class="icon-btn-label">${b.label}</span>
      </button>`
      )
      .join("");

    return `
      <div class="home-pane">
        <img src="assets/cpp-logo.png" alt="Capital P" class="home-logo">
        <div class="home-tagline">full-service, at your service.</div>
        <div class="home-rule dashed-on-chrome"></div>
        <div class="home-grid">${buttonsHTML}</div>
      </div>
    `;
  },
};
