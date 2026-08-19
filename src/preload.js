export const ASSETS = [
  "assets/cpp-logo.png",
  "assets/tm-beebe.jpg", "assets/tm-burns.jpg", "assets/tm-jake.jpg", "assets/tm-kali.jpg", "assets/tm-luke.jpg",
  "assets/bio-beebe.jpg", "assets/bio-burns.jpg", "assets/bio-jake.jpg", "assets/bio-kali.jpg", "assets/bio-luke.jpg",
  "assets/wk-tracy-16x9.jpg", "assets/wk-makesense.jpg", "assets/wk-dummy.jpg", "assets/wk-marriage.jpg",
  "assets/ai-policy-icon-512.png",
];

// Everything is fetched up front so work/team never buffer mid-browse.
// Runs for a minimum of 900ms so a warm cache still shows the loader animate.
export function preloadAssets(onProgress, onDone) {
  const t0 = Date.now();
  let done = 0;
  ASSETS.forEach((src) => {
    const img = new Image();
    const tick = () => {
      done += 1;
      onProgress(done, src);
      if (done < ASSETS.length) return;
      setTimeout(onDone, Math.max(0, 900 - (Date.now() - t0)));
    };
    img.onload = tick;
    img.onerror = tick;
    img.src = src;
  });
}
