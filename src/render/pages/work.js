import { WORK_ITEMS } from "../../data/content.js";
import { externalArrowGlyph } from "../../glyphs.js";

function row(item) {
  const glyph =
    item.glyph === "external"
      ? externalArrowGlyph()
      : `<span class="glyph-internal">&gt;</span>`;

  const inner = `
    <div class="work-thumb bevel-inset">
      <img src="${item.image}" alt="${item.alt}">
    </div>
    <div class="work-text">
      <div class="work-title">${item.title}&nbsp;${glyph}</div>
      <div class="work-description">${item.description}</div>
    </div>
  `;

  if (item.glyph === "external") {
    return `<a class="work-row raised-btn" href="${item.href}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  }
  return `<button type="button" class="work-row raised-btn" data-nav="${item.nav}">${inner}</button>`;
}

export const work = {
  html() {
    return `<div class="work-list">${WORK_ITEMS.map(row).join("")}</div>`;
  },
};
