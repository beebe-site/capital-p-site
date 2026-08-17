// Cascade math — the signature of this design. Get this exactly right.
//
// Desktop: the whole stack is centered as a group, so the cluster stays
// visually balanced no matter how deep the stack is. Deeper stacks shrink
// every window together so the cascade always fits the viewport.
//
// Phone (<=640px): the FRONT window is centered and older windows peek out
// behind it up and to the left. No size shrinking.
export function computeCascade(stackLength, index, phone, step) {
  const top = stackLength - 1;
  const stepY = Math.round(step * 0.78);

  const spanX = top * step;
  const spanY = top * stepY;

  const dx = phone ? (index - top) * step : index * step - spanX / 2;
  const dy = phone ? (index - top) * stepY : index * stepY - spanY / 2;

  const width = `min(900px, 94vw - ${phone ? 0 : spanX}px)`;
  const height = `min(660px, 92vh - ${phone ? 0 : spanY}px)`;

  return { dx, dy, width, height };
}
