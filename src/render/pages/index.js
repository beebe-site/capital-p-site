import { home } from "./home.js";
import { about } from "./about.js";
import { reel } from "./reel.js";
import { work } from "./work.js";
import { makeProjectDetail } from "./projectDetail.js";
import { team } from "./team.js";
import { makeBio } from "./bio.js";
import { contact } from "./contact.js";
import { PROJECTS, BIOS } from "../../data/content.js";

const MODULES = {
  home,
  about,
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

export function getPageModule(key) {
  return MODULES[key] || home;
}
