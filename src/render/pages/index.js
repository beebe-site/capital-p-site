import { home } from "./home.js";
import { about } from "./about.js";
import { aiPolicyIndex } from "./aiPolicyIndex.js";
import { makeAiPolicyVersion } from "./aiPolicyDetail.js";
import { reel } from "./reel.js";
import { work } from "./work.js";
import { makeProjectDetail } from "./projectDetail.js";
import { team } from "./team.js";
import { makeBio } from "./bio.js";
import { contact } from "./contact.js";
import { PROJECTS, BIOS, AI_POLICY_VERSIONS } from "../../data/content.js";

const MODULES = {
  home,
  about,
  "ai-policy": aiPolicyIndex,
  reel,
  work,
  "wk-sense": makeProjectDetail(PROJECTS["wk-sense"]),
  "wk-marriage": makeProjectDetail(PROJECTS["wk-marriage"]),
  team,
  "bio-beebe": makeBio(BIOS["bio-beebe"]),
  "bio-burns": makeBio(BIOS["bio-burns"]),
  "bio-jake": makeBio(BIOS["bio-jake"]),
  "bio-kali": makeBio(BIOS["bio-kali"]),
  "bio-luke": makeBio(BIOS["bio-luke"]),
  contact,
};

// One detail page per published policy version, keyed off each entry's own
// `key` — adding a new version to AI_POLICY_VERSIONS is enough to route it.
for (const version of AI_POLICY_VERSIONS) {
  MODULES[version.key] = makeAiPolicyVersion(version);
}

export function getPageModule(key) {
  return MODULES[key] || home;
}
