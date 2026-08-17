// Browsers still block autoplay inconsistently, so force it imperatively:
// set the flags, call play() and swallow the rejection, then retry once on
// canplay and once on the first document pointerdown.
export function kickVideoAutoplay(el) {
  if (!el) return;
  el.muted = true;
  el.defaultMuted = true;
  el.loop = true;
  el.playsInline = true;
  el.autoplay = true;

  const kick = () => {
    const p = el.play();
    if (p && p.catch) p.catch(() => {});
  };

  kick();
  el.addEventListener("canplay", kick, { once: true });
  document.addEventListener("pointerdown", kick, { once: true });
}
