export const reel = {
  html() {
    return `
      <div class="reel-pane">
        <div class="reel-frame bevel-raised">
          <div class="caption-bar"><span>reel.mp4</span><span class="caption-bar-hint">2026</span></div>
          <div class="reel-video-well bevel-inset">
            <iframe
              src="https://player.vimeo.com/video/1059867610?h=1a5766d4cc&title=0&byline=0&portrait=0&dnt=1"
              title="Capital P reel"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    `;
  },
};
