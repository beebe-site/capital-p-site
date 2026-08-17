// Every pictorial tile glyph is CSS boxes — no icon font. Each function
// returns a full 64x64 blue tile, ready to drop into a button/card template.
const TILE_OPEN = `<span style="width:64px;height:64px;display:grid;place-items:center;background:var(--ink)">`;
const TILE_CLOSE = `</span>`;

// The one exception: the small inline "leaves the site" indicator is exact
// vector geometry rather than a CSS border hack, so the shaft and arrowhead
// share a coordinate by construction instead of being eyeballed into
// roughly meeting. See styles/pages.css .arrow-external for sizing.
export function externalArrowGlyph() {
  return `<svg class="arrow-external" viewBox="0 0 10 10" aria-hidden="true"><path d="M2.2 7.8 L7.8 2.2 M4.4 2.2 H7.8 V5.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

export function aboutGlyph() {
  return `${TILE_OPEN}
    <span style="width:38px;height:38px;border-radius:50%;background:var(--cream);display:grid;place-items:center;font-family:var(--font-silkscreen);font-size:20px;color:var(--ink);padding-bottom:2px">?</span>
  ${TILE_CLOSE}`;
}

export function reelGlyph() {
  const sprocket = `<span style="flex:0 0 6px;display:flex;flex-direction:column;justify-content:space-between">
    <span style="height:5px;background:var(--ink)"></span>
    <span style="height:5px;background:var(--ink)"></span>
    <span style="height:5px;background:var(--ink)"></span>
    <span style="height:5px;background:var(--ink)"></span>
  </span>`;
  return `${TILE_OPEN}
    <span style="display:flex;align-items:stretch;justify-content:space-between;width:46px;height:38px;padding:4px;border-radius:5px;background:var(--cream)">
      ${sprocket}
      <span style="flex:1 1 auto;display:grid;place-items:center;padding:0 3px">
        <span style="width:100%;height:6px;border-radius:3px;background:var(--ink)"></span>
      </span>
      ${sprocket}
    </span>
  ${TILE_CLOSE}`;
}

export function workGlyph() {
  return `${TILE_OPEN}
    <span style="display:flex;flex-direction:column;gap:6px;width:38px">
      <span style="height:6px;background:var(--cream)"></span>
      <span style="height:6px;background:var(--cream)"></span>
      <span style="height:6px;background:var(--cream)"></span>
    </span>
  ${TILE_CLOSE}`;
}

export function teamGlyph() {
  const person = (transform, z) => `<span style="position:relative;width:26px;height:30px;flex:0 0 auto;grid-area:1 / 1;transform:${transform};${z}">
    <span style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:13px;height:13px;border-radius:50%;background:var(--cream);box-shadow:0 0 0 3px var(--ink)"></span>
    <span style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:24px;height:13px;border-radius:12px 12px 0 0;background:var(--cream);box-shadow:0 0 0 3px var(--ink)"></span>
  </span>`;
  return `${TILE_OPEN}
    ${person("translate(-8px,-4px)", "")}
    ${person("translate(9px,4px)", "z-index:1")}
  ${TILE_CLOSE}`;
}

export function envelopeGlyph() {
  return `${TILE_OPEN}
    <span style="width:40px;height:28px;background:var(--cream);position:relative;overflow:hidden;box-shadow:inset 0 0 0 3px var(--ink)">
      <span style="position:absolute;left:50%;top:-11px;width:26px;height:26px;background:var(--cream);transform:translateX(-50%) rotate(45deg);box-shadow:inset 0 0 0 3px var(--ink)"></span>
    </span>
  ${TILE_CLOSE}`;
}

export function instagramRingGlyph() {
  return `${TILE_OPEN}
    <span style="width:38px;height:38px;display:grid;place-items:center;box-shadow:inset 0 0 0 4px var(--cream)">
      <span style="width:14px;height:14px;border-radius:50%;box-shadow:0 0 0 4px var(--cream)"></span>
    </span>
  ${TILE_CLOSE}`;
}
