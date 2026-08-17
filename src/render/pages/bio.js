import { externalArrowGlyph } from "../../glyphs.js";

export function makeBio(data) {
  return {
    html() {
      const paragraphs = data.paragraphs.map((p) => `<p>${p}</p>`).join("");

      const rows = [
        {
          label: "INSTAGRAM",
          valueHTML: `<a href="${data.instagram.href}" target="_blank" rel="noopener noreferrer">${data.instagram.handle} ${externalArrowGlyph()}</a>`,
        },
        {
          label: "EMAIL",
          valueHTML: `<a href="mailto:${data.email}">${data.email}</a>`,
        },
      ];
      if (data.site) {
        rows.push({
          label: "SITE",
          valueHTML: `<a href="${data.site.href}" target="_blank" rel="noopener noreferrer">${data.site.label} ${externalArrowGlyph()}</a>`,
        });
      }

      const rowsHTML = rows
        .map(
          (r) => `
        <div class="bio-contact-row">
          <div class="bio-contact-label">${r.label}</div>
          <div class="bio-contact-value">${r.valueHTML}</div>
        </div>`
        )
        .join("");

      return `
        <div class="bio-wrap">
          <div class="bio-portrait bevel-inset">
            <img src="${data.image}" alt="${data.alt}">
          </div>
          <div class="bio-text-col">
            <div class="bio-name-block">
              <div class="bio-name">${data.name}</div>
              <div class="bio-role">${data.role}</div>
            </div>
            <div class="bio-prose bevel-inset">${paragraphs}</div>
            <div class="bio-contact-rows">${rowsHTML}</div>
          </div>
        </div>
      `;
    },
  };
}
