import { AI_POLICY_VERSIONS } from "../../data/content.js";

// Index of every published policy version, newest first (index 0). Today
// that's a single row; the layout already reads fine with one item and
// scales cleanly once older versions accumulate.
function row(version, isCurrent) {
  return `
    <button type="button" class="policy-row raised-btn" data-nav="${version.key}">
      <div class="policy-row-text">
        <div class="policy-date">${version.date}</div>
        <div class="policy-tag">${isCurrent ? "[current policy]" : "[superseded]"}</div>
      </div>
      <span class="team-chevron">&gt;</span>
    </button>
  `;
}

export const aiPolicyIndex = {
  html() {
    const rows = AI_POLICY_VERSIONS.map((v, i) => row(v, i === 0)).join("");
    return `<div class="policy-list">${rows}</div>`;
  },
};
