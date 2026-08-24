// The prototype exposes these as tweakable props; here they're fixed constants.
export const CONFIG = {
  showVideo: true,
  showScanlines: true,
  bootScreen: true,
  cascadeStep: 40,

  // about.txt's "possessed typewriter" easter egg: the panel starts holding
  // only "Capital P is a", and every keystroke (whatever key it is) reveals
  // the next real character of the copy instead of inserting what was
  // actually typed — like the passage is typing itself through you.
  // Backspace rewinds the reveal. Disabled at and below this width (phone
  // AND tablet — no reliable "type anywhere" input stream on touch),
  // falling back to the finished, static text. This is intentionally wider
  // than the 640px cascade breakpoint below, which governs window layout
  // only. 1024px is the conventional tablet-landscape ceiling; adjust here
  // if you want a different cutoff.
  aboutRestrictedMaxWidth: 1024,

  // Kill switch for the AI POLICY icon/pages — see AI_POLICY_VERSIONS in
  // src/data/content.js for the actual published versions. There's no URL
  // routing in this app (see README), so hiding the home button makes the
  // pages fully unreachable, not just unlinked.
  showAiPolicy: true,
};
