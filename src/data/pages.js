import { AI_POLICY_VERSIONS } from "./content.js";

// Page registry — title bar + status bar text, verbatim.
export const PAGES = {
  "home": { title: "index.html", path: "C:\\CAPITAL_P\\INDEX.HTML", status: "6 item(s)" },
  "about": { title: "about.html", path: "C:\\CAPITAL_P\\ABOUT.HTML", status: "read/write" },
  "ai-policy": {
    title: "ai-policy.html",
    path: "C:\\CAPITAL_P\\AI-POLICY.HTML",
    status: `${AI_POLICY_VERSIONS.length} item(s)`,
  },
  "reel": { title: "reel.html", path: "C:\\CAPITAL_P\\REEL.HTML", status: "1 video" },
  "work": { title: "work.html", path: "C:\\CAPITAL_P\\WORK.HTML", status: "4 item(s)" },
  "wk-sense": { title: "makesense.html", path: "C:\\CAPITAL_P\\WORK\\MAKESENSE.HTML", status: "1 video" },
  "wk-marriage": { title: "marriage.html", path: "C:\\CAPITAL_P\\WORK\\MARRIAGE.HTML", status: "1 video" },
  "team": { title: "team.html", path: "C:\\CAPITAL_P\\TEAM.HTML", status: "5 item(s)" },
  "contact": { title: "contact.html", path: "C:\\CAPITAL_P\\CONTACT.HTML", status: "1 file" },
  "bio-beebe": { title: "beebe.html", path: "C:\\CAPITAL_P\\TEAM\\BEEBE.HTML", status: "1 file" },
  "bio-burns": { title: "burns.html", path: "C:\\CAPITAL_P\\TEAM\\BURNS.HTML", status: "1 file" },
  "bio-jake": { title: "jake.html", path: "C:\\CAPITAL_P\\TEAM\\JAKE.HTML", status: "1 file" },
  "bio-kali": { title: "kali.html", path: "C:\\CAPITAL_P\\TEAM\\KALI.HTML", status: "1 file" },
  "bio-luke": { title: "luke.html", path: "C:\\CAPITAL_P\\TEAM\\LUKE.HTML", status: "1 file" },
};

// One registry entry per published policy version, derived from its key
// (e.g. "ai-policy-2026-08-18" -> "2026-08-18.html") so a new version added
// to AI_POLICY_VERSIONS is automatically routable without touching this file.
for (const version of AI_POLICY_VERSIONS) {
  const slug = version.key.replace(/^ai-policy-/, "");
  PAGES[version.key] = {
    title: `${slug}.html`,
    path: `C:\\CAPITAL_P\\AI-POLICY\\${slug.toUpperCase()}.HTML`,
    status: "read only",
  };
}
