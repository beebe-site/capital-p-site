import { CONTACT_CARDS } from "../../data/content.js";
import { envelopeGlyph, instagramRingGlyph, externalArrowGlyph } from "../../glyphs.js";

const GLYPHS = {
  envelope: envelopeGlyph,
  instagram: instagramRingGlyph,
};

function card(c) {
  const target = c.external ? ` target="_blank" rel="noopener noreferrer"` : "";
  const arrow = c.external ? ` ${externalArrowGlyph()}` : "";
  return `
    <a class="contact-card raised-btn" href="${c.href}"${target}>
      ${GLYPHS[c.kind]()}
      <span class="contact-card-label">${c.label}${arrow}</span>
      <span class="contact-card-value">${c.value}</span>
    </a>
  `;
}

export const contact = {
  html() {
    return `
      <div class="contact-wrap">
        <div class="contact-heading">contact us</div>
        <div class="dashed-on-chrome"></div>
        <div class="contact-grid">${CONTACT_CARDS.map(card).join("")}</div>
      </div>
    `;
  },
};
