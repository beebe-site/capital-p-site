import { TEAM_LIST } from "../../data/content.js";

function row(person) {
  return `
    <button type="button" class="team-row raised-btn" data-nav="${person.nav}">
      <div class="team-portrait bevel-inset">
        <img src="${person.image}" alt="${person.alt}">
      </div>
      <div class="team-text">
        <div class="team-name">${person.name}</div>
        <div class="team-role">${person.role}</div>
      </div>
      <span class="team-chevron">&gt;</span>
    </button>
  `;
}

export const team = {
  html() {
    return `<div class="team-list">${TEAM_LIST.map(row).join("")}</div>`;
  },
};
