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
