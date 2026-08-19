// Same framed-panel look as about.txt (caption bar + white prose well), but
// fully static — no reveal gimmick, no typing, always just the finished
// text. One instance per dated version; old versions get this exact same
// read-only treatment, never a special "archived" styling, since the point
// is that they remain exactly as originally published.
export function makeAiPolicyVersion(version) {
  return {
    html() {
      const paragraphs = version.paragraphs.map((p) => `<p class="ghost-p">${p}</p>`).join("");
      const signature = `<p class="ghost-p ai-policy-signature">${version.signature}</p>`;

      return `
        <div class="about-wrap">
          <div class="about-frame bevel-raised">
            <div class="caption-bar"><span>ai-policy.txt</span><span class="caption-bar-hint">${version.date}</span></div>
            <div class="about-body bevel-inset">${paragraphs}${signature}</div>
          </div>
        </div>
      `;
    },
  };
}
