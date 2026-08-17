import { copyToClipboard } from "../../clipboard.js";
import { externalArrowGlyph } from "../../glyphs.js";

const COPY_LABEL = "COPY PASSWORD";
const COPIED_LABEL = "COPIED!";

export function makeProjectDetail(data) {
  return {
    html() {
      return `
        <div class="detail-wrap">
          <div class="detail-still bevel-inset">
            <img src="${data.image}" alt="${data.alt}">
          </div>
          <div class="detail-body">
            <div class="detail-title">${data.title}</div>
            <div class="detail-description">${data.description}</div>
            <div class="detail-actions">
              <a class="detail-action raised-btn" href="${data.vimeo}" target="_blank" rel="noopener noreferrer">
                <span>WATCH ON VIMEO</span>${externalArrowGlyph()}
              </a>
              <button type="button" class="detail-action raised-btn" data-copy>${COPY_LABEL}</button>
            </div>
            <div class="detail-password-row">
              <div class="detail-password-label">PASSWORD</div>
              <div class="detail-password-value">${data.password}</div>
            </div>
          </div>
        </div>
      `;
    },

    mount(pane) {
      const btn = pane.querySelector("[data-copy]");
      let timer = null;
      btn.addEventListener("click", () => {
        copyToClipboard(data.password, () => {
          btn.textContent = COPIED_LABEL;
          clearTimeout(timer);
          timer = setTimeout(() => {
            btn.textContent = COPY_LABEL;
          }, 1800);
        });
      });
      return null;
    },
  };
}
