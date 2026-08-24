// All copy is final and verbatim — curly apostrophes, double-hyphen dashes,
// and every <b> emphasis in the bios are preserved exactly as handed off.

// Each paragraph is a list of runs so a bolded sentence can sit mid-paragraph
// instead of only ever being a whole standalone paragraph.
export const ABOUT_PARAGRAPHS = [
  [
    {
      text: "Capital P is a company offering full-service production of music videos, commercials, brand campaigns, social media rollouts, sound design, and audio mastering.",
    },
  ],
  [
    {
      text: "Our team, based in LA, NY, and beyond, bring expertise in visuals and audio that ensures trends are not followed, but broken. ",
    },
    {
      text: "We challenge norms, break boundaries, and always bring a capital-p Punch.",
      bold: true,
    },
  ],
];

export const WORK_ITEMS = [
  {
    title: "PORTRAITS OF TRACY - 2026 EP ROLLOUT",
    glyph: "external",
    href: "https://www.youtube.com/playlist?list=PLsMjHJ1O7c9fQBkiEiGcnPgenAZeFlc7K",
    image: "assets/wk-tracy-16x9.jpg",
    alt: "Portraits of Tracy",
    description: "visualizer campaign, music videos, social media promotional, press photos",
  },
  {
    title: "MAKE SENSE",
    glyph: "internal",
    nav: "wk-sense",
    image: "assets/wk-makesense.jpg",
    alt: "Make Sense",
    description: "narrative horror drama set in the high-stakes culinary world, played at prestigious oscar-qualifying film festivals",
  },
  {
    title: "DUMMY - ALBUM ROLLOUT",
    glyph: "external",
    href: "https://www.youtube.com/watch?v=VvAp7355C0U",
    image: "assets/wk-dummy.jpg",
    alt: "Dummy",
    description: "two music videos and full social media rollout",
  },
  {
    title: "MEMORIES OF A MARRIAGE",
    glyph: "internal",
    nav: "wk-marriage",
    image: "assets/wk-marriage.jpg",
    alt: "Memories of a Marriage",
    description: "narrative romantic drama about the history of a fraught marriage",
  },
];

export const PROJECTS = {
  "wk-sense": {
    title: "MAKE SENSE",
    image: "assets/wk-makesense.jpg",
    alt: "Make Sense",
    description: "narrative horror drama set in the high-stakes culinary world, played at prestigious oscar-qualifying film festivals",
    vimeo: "https://vimeo.com/1079519579?share=copy",
    password: "bringalow",
    copyKey: "sense",
  },
  "wk-marriage": {
    title: "MEMORIES OF A MARRIAGE",
    image: "assets/wk-marriage.jpg",
    alt: "Memories of a Marriage",
    description: "narrative romantic drama about the history of a fraught marriage",
    vimeo: "https://vimeo.com/1203330080",
    password: "marriage2026",
    copyKey: "marriage",
  },
};

export const TEAM_LIST = [
  { nav: "bio-beebe", name: "Beebe", role: "[Founder]", image: "assets/tm-beebe.jpg", alt: "Jackson Beebe" },
  { nav: "bio-burns", name: "Burns", role: "[Founder]", image: "assets/tm-burns.jpg", alt: "Jackson Burns" },
  { nav: "bio-jake", name: "Jake Joseph", role: "[Creative Director]", image: "assets/tm-jake.jpg", alt: "Jake Joseph" },
  { nav: "bio-kali", name: "Kali Slavich", role: "[Head of Audio]", image: "assets/tm-kali.jpg", alt: "Kali Slavich" },
  { nav: "bio-luke", name: "Luke Stone", role: "[Post-Production Coordinator]", image: "assets/tm-luke.jpg", alt: "Luke Stone" },
];

export const BIOS = {
  "bio-beebe": {
    name: "Jackson Beebe",
    role: "[Founder]",
    image: "assets/bio-beebe.jpg",
    alt: "Jackson Beebe",
    paragraphs: [
      "Jackson Beebe is a <b>writer/director, producer, </b>and<b> editor</b> based out of <b>Los Angeles</b> and <b>New York City</b>.",
      "After meeting Jackson Burns at Chapman University’s film program, they founded Capital P Productions together, which has made <b>ads, music visuals, and short films</b> that have gone on to play in <b>Oscar-qualifying</b> festivals like <b>Palm Springs ShortFest </b>and<b> HollyShorts</b>.",
      "He is <b>seriously unserious.</b>",
    ],
    instagram: { handle: "@whosbeebe", href: "https://instagram.com/whosbeebe" },
    email: "beebe@capital-p.com",
    site: { label: "jacksonbeebe.com", href: "https://jacksonbeebe.com/" },
  },
  "bio-burns": {
    name: "Jackson Burns",
    role: "[Founder]",
    image: "assets/bio-burns.jpg",
    alt: "Jackson Burns",
    paragraphs: [
      "Jackson Burns is a <b>cinematographer</b> born and raised in <b>Los Angeles</b> and studied from <b>Chapman University</b>. With a fervent passion for movies, and a love for the form, Jackson’s dream is to blend <b>old techniques with modern filmmaking technology</b> to create visually stunning images for fresh audiences. Separate from Capital P, he is the co-owner of Peer To Peer Gear, a local rental house that gives our agency access to top-of-the-line equipment.",
    ],
    instagram: { handle: "@burns.mov", href: "https://www.instagram.com/burns.mov/" },
    email: "burns@capital-p.com",
    site: { label: "jacksonburns.co", href: "https://jacksonburns.co/" },
  },
  "bio-jake": {
    name: "Jake Joseph",
    role: "[Creative Director]",
    image: "assets/bio-jake.jpg",
    alt: "Jake Joseph",
    paragraphs: [
      "Jake Joseph is a <b>graphic designer</b>, with an emphasis on <b>branding &amp; campaign direction</b>. A cohesive, interesting, and unique visual identity is non-negotiable and he looks to achieve all three and then some. Working in many styles and mediums, both digital and analog, his works demands attention and is a perfect fit for anyone looking for visuals that are anything but average.",
    ],
    instagram: { handle: "@abucketofjake", href: "https://www.instagram.com/abucketofjake/" },
    email: "jake@capital-p.com",
    site: { label: "jakejosephcreative.com", href: "http://jakejosephcreative.com/" },
  },
  "bio-kali": {
    name: "Kali Slavich",
    role: "[Head of Audio]",
    image: "assets/bio-kali.jpg",
    alt: "Kali Slavich",
    paragraphs: [
      "Based in <b>Los Angeles</b>, Kali Slavich is a passionate <b>sound editor, mixer,</b> and <b>designer</b>. She’s helped bring <b>films to life</b> alongside <b>Grammy nominated </b>mixers and musicians, and worked hand in hand with editors experienced on critically acclaimed and<b> Oscar-winning films</b>. As Capital P's Head of Audio, she creates auditory experiences which never allow the audience to look away.",
    ],
    instagram: { handle: "@kali.mp3", href: "https://www.instagram.com/kali.mp3/" },
    email: "kali@capital-p.com",
    site: null,
  },
  "bio-luke": {
    name: "Luke Stone",
    role: "[Post-Production Coordinator]",
    image: "assets/bio-luke.jpg",
    alt: "Luke Stone",
    paragraphs: [
      "Luke Stone is a filmmaker who specializes in <b>editing</b>. Stone holds a deep appreciation for all things <b>analog, grainy, and vintage</b>. He believes that any project, no matter the budget, can resonate with audiences as long as there is sincerity, passion, and care put behind it.",
    ],
    instagram: { handle: "@lukeondemand", href: "https://www.instagram.com/lukeondemand/" },
    email: "luke@capital-p.com",
    site: null,
  },
};

export const CONTACT_CARDS = [
  { kind: "envelope", label: "EMAIL", value: "beebe@capital-p.com", href: "mailto:beebe@capital-p.com", external: false },
  { kind: "instagram", label: "INSTAGRAM", value: "@capitalpproductions", href: "https://www.instagram.com/capitalpproductions/", external: true },
];

// AI usage policy — static, fully written (no reveal gimmick). Inline
// citation links are plain <a> tags (not the arrow-glyph treatment used for
// standalone contact/action links) since there are a dozen of them woven
// through the prose; an icon after each would break the reading flow.
//
// Modeled as a list of dated versions (like WORK_ITEMS -> PROJECTS, or
// TEAM_LIST -> BIOS): AI POLICY on the home page opens an index of every
// version ever published, each opening its own read-only detail window.
// Old versions are never edited or removed once superseded — that's the
// point, for accountability. To publish a new version, add a new entry at
// the FRONT of this array (index 0 is treated as the current policy) with
// a fresh `key`; nothing else needs to change, the index list, page
// registry, and routing all derive from this array.
const EXT = (href, label) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

export const AI_POLICY_VERSIONS = [
  {
    key: "ai-policy-2026-08-24",
    date: "August 24, 2026",
    paragraphs: [
      `We believe the cheery “${EXT("https://en.wikipedia.org/wiki/Artificial_intelligence", "AI")} is just a tool!” argument is a slippery slope to the complete automation of humanity, because a tool used without care quickly becomes a weapon.`,
      `Capital P will <b>not</b> use ${EXT("https://en.wikipedia.org/wiki/Generative_AI", "generative")} ${EXT("https://en.wikipedia.org/wiki/Text-to-video_model", "video")}, ${EXT("https://en.wikipedia.org/wiki/Generative_audio", "audio")}, or ${EXT("https://en.wikipedia.org/wiki/Text-to-image_model", "photo")} in any stage of any of our projects, whether that be development, pre-production, production, post-production, or promotion. This includes visual modifications (i.e. ${EXT("https://en.wikipedia.org/wiki/Adobe_Firefly", "Adobe Firefly")} used in ${EXT("https://en.wikipedia.org/wiki/Adobe_Photoshop", "Photoshop")}). Tools that ${EXT("https://en.wikipedia.org/wiki/PatchMatch", "manipulate pixels algorithmically within the existing artboard")} and not from sampling visuals from generative AI models are permitted (i.e. content aware fill and spot healing in Photoshop). All ${EXT("https://en.wikipedia.org/wiki/PDF", "PDFs")} will be manually created by our in-house graphics team.`,
      `Capital P permits the use of ${EXT("https://en.wikipedia.org/wiki/Large_language_model", "LLMs")} for research; as a search engine alternative wherein all results are compiled and thoroughly vetted for accuracy. LLMs may also be used to help code (i.e. websites/spreadsheets).`,
      `AI-generated text will <b>not</b> be copied into any projects or emailed/texted to clients on behalf of Capital P.`,
      `Capital P is of the opinion that confidential information, or even basic client information, <b>cannot</b> be considered protected if it is uploaded to an ${EXT("https://en.wikipedia.org/wiki/Large_language_model", "LLM")}. Therefore, in the rare cases human/manual resources have been exhausted/are not applicable, Capital P will only upload information to LLMs (i.e. extracting large information in threads/meetings, clarification on legalese) which has been scrubbed/anonymized of all sensitive information by hand. The use of local LLMs (including local ${EXT("https://en.wikipedia.org/wiki/Natural_language_generation", "NLG")} tools) are permitted, because the information fed to them cannot reach a third party connected to the internet.`,
      `This policy will be available to view as long as this website is public, allowing us to be held accountable for previous commitments if a new draft of the policy takes effect.`,
      `It is a company’s responsibility to provide transparency for use of dangerous technologies, so if there are any areas you feel are omitted from this draft of the policy, please reach out.`,
    ],
    signature: "-The team at Capital P Productions",
  },
];
