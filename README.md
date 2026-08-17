# Handoff: capital-p.com — retro pop-up window site

## Overview
A single-page site for Capital P Productions (creative production agency). The whole site lives inside a Windows-95-style pop-up window floating over a full-bleed looping video desktop. Navigating "deeper" (Home → Work → a project) spawns a **new window stacked on top of the previous one, offset down-right in a cascade**. Closing a window pops back one level. There is no scrolling page and no traditional nav bar — the window stack *is* the navigation.

Boot sequence: empty desktop with a `CAPITAL_P.EXE` icon → click → fake "COPYING FILES..." progress loader (which really does preload all imagery) → the index window opens.

## About the Design Files
The files in `reference/` are **design references created in HTML** — a working prototype showing intended look and behavior, not production code to lift wholesale. `Capital P.dc.html` uses a proprietary in-house template runtime (`support.js`, `<x-dc>`, `<sc-if>`, `<sc-for>`, `{{ }}` holes) that you should **not** try to port. Read it for exact markup, values, and logic, then **recreate the design in the target codebase's own environment** using its established patterns and libraries. If no codebase exists yet, pick the framework you'd choose for a small marketing site — React + Vite, Next.js, Astro, or even hand-written HTML/CSS/JS, since there is no data layer, no backend, and no routing requirement beyond client state.

Mapping the runtime to normal React, for reading purposes:
- `<sc-if value="{{ x }}">` → `{x && (…)}`
- `<sc-for list="{{ items }}" as="w">` → `items.map(w => …)`
- `renderVals()` → the values a function component computes before its `return`
- `this.props.x ?? default` → ordinary props with defaults
- `style="a:b;c:d"` → these are literal inline styles; convert freely to CSS modules / Tailwind / styled-components as the codebase prefers.

## Fidelity
**High-fidelity.** Colors, typography, spacing, bevel shadows, animation timings, and copy are all final. Recreate pixel-perfectly. Every hex value and pixel measurement in this README is authoritative and appears verbatim in the reference file.

---

## ⚠️ Post-handoff changes

The rest of this document is the **original** design handoff and is left intact as a historical record — but the shipped site has since diverged from it in the ways below, at the client's request, during implementation. Where the two disagree, **this section wins**, not the sections further down.

- **about.txt easter egg — mechanic changed.** The "typing easter egg" described later in this doc (§ about.html, the `contentEditable` free-typing behavior) was replaced with a different one: the panel opens holding only the seed text **"Capital P is a"**, and every keystroke anywhere in the window — regardless of which key — reveals the next real character of the copy instead of inserting what was actually typed, like the passage is typing itself through you. Backspace rewinds the reveal by one character; reaching the end just stops (no wraparound, no fallback to literal typing). Still gated the same way structurally, but the disabled range is now **phone and tablet** (≤1024px), not just phone (≤640px) — the original 640px breakpoint still governs window cascade sizing only.
- **about.txt copy — rewritten.** The verbatim paragraphs quoted later in this doc are the *original* copy. The current text is:

  > "Capital P is a company offering full-service production of music videos, commercials, brand campaigns, social media rollouts, sound design, and audio mastering.
  >
  > Our team, based in LA, NY, and beyond, bring expertise in visuals and audio that ensures trends are not followed, but broken. **We challenge norms, break boundaries, and always bring a capital-p Punch.**"

  Only that closing sentence is bold — not the whole paragraph, unlike the original's standalone bold closer.
- **contact.html — LinkedIn card removed.** The page now has two cards (EMAIL, INSTAGRAM), not three. The LINKEDIN row described later in this doc no longer exists.
- **team.html — Burns' thumbnail re-cropped.** The original `tm-burns.jpg` cropped out his face. It's been replaced with a proper headshot crop from a higher-resolution source photo the client supplied; no special-case CSS needed for it anymore.
- **The `↗` "leaves the site" indicator is drawn as inline SVG, not the Unicode character.** In every font tried (Silkscreen, Courier New), the ↗ glyph fell back to a symbol font with different vertical metrics than the surrounding text and never centered correctly against it, in every context it appears (work list titles, the WATCH ON VIMEO button, bio contact links, the contact page). It's now a small hand-built SVG arrow (shaft + arrowhead as one continuous path, so the join is exact by construction) sized in `em` off `.arrow-external` in `styles/pages.css`. Behaves identically, looks correct.
- **External links also fire `window.open()` explicitly**, not just `target="_blank"`, since some hosting/embedding contexts silently ignore the anchor's native new-tab behavior.

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Ink / brand blue | `#1A1870` | Title bars, all headings and body copy, icon backgrounds, links |
| Bevel blue light | `#4A46B8` | Title bar top-left inner bevel; link hover |
| Bevel blue dark | `#0D0B45` | Title bar bottom-right inner bevel |
| Cream / phosphor | `#EFEFB9` | Title bar text, icon glyphs, dashed rules on blue |
| Chrome face | `#D6D6D2` | Window frame, buttons, cards |
| Chrome highlight | `#FFFFFF` | Outer bevel highlight; text-panel background |
| Chrome light | `#E9E9E5` | Inner bevel highlight |
| Chrome hover | `#E4E4E0` | Button/card hover face |
| Chrome shadow | `#9A9A96` | Inner bevel shadow |
| Chrome shadow dark | `#4A4A55` | Outer bevel shadow; team role labels |
| Pane background | `#EBEBEB` | Window content area, image mat |
| Body dark | `#3A3A46` | Status bar text, work-item descriptions |
| Muted | `#5C5C68` | Contact card sub-labels |
| Desktop void | `#0B0B14` | Page background behind video |

### Typography
Three faces, no others.
- **Silkscreen** (Google Fonts, weights 400 + 700) — all UI chrome: window titles, buttons, labels, status bar, section headings, work descriptions. Fallback `monospace`.
  Import: `https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap`
- **Verdana** (stack: `Verdana, Tahoma, Geneva, sans-serif`) — work item titles and team member names, always `font-weight:700`.
- **Courier New** (stack: `'Courier New', Courier, monospace`) — all long-form prose (about text, bios), passwords, email/handle values.

Sizes as used (px unless noted; `clamp()` values are literal):
| Element | Font | Size | Other |
|---|---|---|---|
| Window title | Silkscreen | `clamp(12px,1.9vw,16px)` | `letter-spacing:0.5px`, `color:#EFEFB9` |
| Home tagline | Silkscreen | `clamp(13px,1.9vw,16px)` | `line-height:1.6`, centered, `max-width:44ch` |
| Icon button label | Silkscreen | 15 | `letter-spacing:0.5px` |
| HOME / X buttons | Silkscreen | 12 / 14 | |
| Status bar | Silkscreen | 11 | `letter-spacing:0.5px`, `color:#3A3A46` |
| Panel caption bar (`about.txt`, `reel.mp4`) | Silkscreen | 11 | `letter-spacing:1px`, `color:#EFEFB9` on `#1A1870` |
| Work item title | Verdana 700 | `clamp(13px,1.8vw,16px)` | `letter-spacing:0.4px`, `line-height:1.4` |
| Work item description | Silkscreen | 11 | `line-height:2`, `letter-spacing:0.4px`, `color:#3A3A46` |
| Project detail title | Verdana 700 | `clamp(19px,2.6vw,26px)` | `line-height:1.35` |
| Project detail description | Silkscreen | 14 | `line-height:1.9` |
| Team name | Verdana 700 | `clamp(15px,2.1vw,18px)` | `letter-spacing:-0.2px` |
| Team role `[Founder]` | Silkscreen | 11 | `letter-spacing:1px`, `color:#4A4A55` |
| Bio name | Silkscreen | `clamp(17px,2.6vw,23px)` | `line-height:1.4` |
| Body prose | Courier New | 15 | `line-height:1.9` (about) / `1.85` (bios) |
| Contact heading | Silkscreen | `clamp(18px,3vw,26px)` | `line-height:1.5` |
| Contact card label / value | Silkscreen 14 / Courier 13 | | value `color:#5C5C68`, `overflow-wrap:anywhere` |
| Password value | Courier New | 17 | |

### Spacing
Not a strict scale — the design uses `3px` bevel gutters throughout and these repeating values: `3, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22`. Fluid paddings use `clamp(16px,3vw,30px)` (window pane), `clamp(14px,2.4vw,22px)` (text panels), `clamp(12px,2vw,18px)` (grid gaps).

### Border radius
**Zero everywhere**, with three deliberate exceptions inside icon glyphs only: the `?` ABOUT circle and INSTAGRAM ring (`border-radius:50%`), the REEL filmstrip (`5px` / `3px`), and the TEAM person head/shoulders (`50%` / `12px 12px 0 0`).

### The bevel system (the single most important visual detail)
Every raised and inset surface is a stack of four inset shadows — no `border` properties anywhere. Reproduce these exactly; they define the entire aesthetic.

```css
/* RAISED — window frame, buttons, cards */
box-shadow: inset  1px  1px 0 #FFFFFF,
            inset -1px -1px 0 #4A4A55,
            inset  2px  2px 0 #E9E9E5,
            inset -2px -2px 0 #9A9A96;

/* PRESSED — :active on every raised button (highlights and shadows swap) */
box-shadow: inset  1px  1px 0 #9A9A96,
            inset -1px -1px 0 #FFFFFF,
            inset  2px  2px 0 #4A4A55,
            inset -2px -2px 0 #E9E9E5;

/* INSET — content pane, image mats, text panels, progress trough */
box-shadow: inset  1px  1px 0 #9A9A96,
            inset -1px -1px 0 #FFFFFF,
            inset  2px  2px 0 #4A4A55,
            inset -2px -2px 0 #E9E9E5;

/* TITLE BAR (blue) */
box-shadow: inset 1px 1px 0 #4A46B8, inset -1px -1px 0 #0D0B45;

/* WINDOW DROP SHADOW — hard, no blur */
box-shadow: <raised bevel above>, 6px 6px 0 rgba(0,0,0,0.45);
```

Dashed rule motif (used in the title bar either side of the title, and as horizontal dividers):
```css
/* on blue */  background: repeating-linear-gradient(90deg,#EFEFB9 0 5px,transparent 5px 9px); height:3px;
/* on chrome */background: repeating-linear-gradient(90deg,#1A1870 0 5px,transparent 5px 9px); height:3px;
```

Status bar cells use a 2-shadow half-bevel only: `inset 1px 1px 0 #9A9A96, inset -1px -1px 0 #FFFFFF`.

---

## Global structure

```
<body>  html,body { margin:0; height:100%; overflow:hidden; background:#0B0B14 }
└─ desktop  position:fixed; inset:0; overflow:hidden;
            background:#0B0B14 url(assets/bg-poster.png) center/cover no-repeat;
            font-family:Verdana,Tahoma,Geneva,sans-serif; -webkit-font-smoothing:antialiased
   ├─ <video> bg.mp4      z-index:1  inset:0; width/height:100%; object-fit:cover
   │                       autoplay muted loop playsinline preload=auto, poster=bg-poster.png
   ├─ scanline overlay    z-index:2  pointer-events:none
   │    background: repeating-linear-gradient(180deg,rgba(0,0,0,0.16) 0 1px,transparent 1px 3px)
   ├─ desktop icon        z-index:3  (only while phase === "desktop")
   ├─ window stack        z-index:10 + index  (one window per stack entry)
   └─ boot loader         z-index:20 (only while phase === "loading")
```

Two keyframes:
```css
@keyframes cpPop { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }
@keyframes cpBlink { 0%,49% { opacity:1 } 50%,100% { opacity:0 } }
```
`cpPop` runs `120ms ease-out both` on each window's inner frame as it appears. Every window mount animates, including re-mounts.

### The window shell (identical for all 13 pages)
Outer positioning element, computed per stack index (see *Cascade math*):
```
position:absolute; left:50%; top:50%;
transform:translate(calc(-50% + DXpx), calc(-50% + DYpx));
width:  min(900px, 94vw - SPAN_Xpx);
height: min(660px, 92vh - SPAN_Ypx);
z-index: 10 + index;
pointer-events: none   /* on every window except the topmost */
```
Inner frame: `position:relative; width/height:100%; display:flex; flex-direction:column; background:#D6D6D2; padding:3px;` + raised bevel + `6px 6px 0 rgba(0,0,0,0.45)` + `animation:cpPop 120ms ease-out both`.

Three flex children:
1. **Title bar** — `flex:0 0 auto; display:flex; align-items:center; gap:clamp(4px,1vw,10px); background:#1A1870; padding:5px;` + title-bar bevel. Contents left→right: optional `HOME` button (32px tall, `padding:0 13px`) shown only when index > 0; flexible dashed rule; the title (`white-space:nowrap`); flexible dashed rule; optional `X` button (`34×32px`) shown only when index > 0. **The root index window has no HOME and no X — it cannot be closed.**
2. **Content pane** — `flex:1 1 auto; min-height:0; overflow-y:auto; overscroll-behavior:contain; margin:3px 0; background:#EBEBEB; padding:clamp(16px,3vw,30px);` + inset bevel. Carries `data-pane="1"` (used for programmatic scroll).
3. **Status bar** — `flex:0 0 auto; display:flex; gap:3px; align-items:stretch`. Left cell `flex:1 1 auto; min-width:0; padding:7px 10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis` holds the fake DOS path; right cell `flex:0 0 auto; padding:7px 12px` holds the item count.

Plus, on every non-topmost window, an absolutely positioned scrim: `position:absolute; inset:0; background:rgba(11,11,20,0.34); pointer-events:none`.

### Page registry (title bar + status bar text — use verbatim)
| key | title | status left | status right |
|---|---|---|---|
| `home` | `index.html` | `C:\CAPITAL_P\INDEX.HTML` | `5 item(s)` |
| `about` | `about.html` | `C:\CAPITAL_P\ABOUT.HTML` | `read/write` |
| `reel` | `reel.html` | `C:\CAPITAL_P\REEL.HTML` | `1 video` |
| `work` | `work.html` | `C:\CAPITAL_P\WORK.HTML` | `4 item(s)` |
| `wk-sense` | `makesense.html` | `C:\CAPITAL_P\WORK\MAKESENSE.HTML` | `1 video` |
| `wk-marriage` | `marriage.html` | `C:\CAPITAL_P\WORK\MARRIAGE.HTML` | `1 video` |
| `team` | `team.html` | `C:\CAPITAL_P\TEAM.HTML` | `5 item(s)` |
| `contact` | `contact.html` | `C:\CAPITAL_P\CONTACT.HTML` | `1 file` |
| `bio-beebe` | `beebe.html` | `C:\CAPITAL_P\TEAM\BEEBE.HTML` | `1 file` |
| `bio-burns` | `burns.html` | `C:\CAPITAL_P\TEAM\BURNS.HTML` | `1 file` |
| `bio-jake` | `jake.html` | `C:\CAPITAL_P\TEAM\JAKE.HTML` | `1 file` |
| `bio-kali` | `kali.html` | `C:\CAPITAL_P\TEAM\KALI.HTML` | `1 file` |
| `bio-luke` | `luke.html` | `C:\CAPITAL_P\TEAM\LUKE.HTML` | `1 file` |

---

## Screens / Views

### 0. Desktop (boot)
**Purpose:** entry gate; establishes the OS metaphor before any content.
Full-bleed video + scanlines, nothing else but a centered icon button (`z-index:3`, flex-centered, `padding:24px`). Icon button: `display:flex; flex-direction:column; align-items:center; gap:12px; background:transparent; border:0; padding:10px; cursor:pointer`.
- Glyph tile: `76×76px`, `display:grid; place-items:center; background:#1A1870`, `box-shadow: inset 2px 2px 0 #4A46B8, inset -2px -2px 0 #0D0B45, 4px 4px 0 rgba(0,0,0,0.42)`, containing `P` in Silkscreen `38px`, `line-height:1`, `color:#EFEFB9`, `padding-bottom:4px` (optical centering for Silkscreen's baseline).
- Label: `CAPITAL_P.EXE`, Silkscreen 12, `letter-spacing:1px`, `color:#EFEFB9`, `background:#1A1870`, `padding:5px 9px`.

Clicking it starts the loader.

### 1. Loader
**Purpose:** in-fiction install screen that doubles as a real image preload.
Centered window (`z-index:20`, `width:min(520px,92vw)`), same chrome as a page window but titled `loading.exe` with **no** HOME/X and dashed rules on both sides of the title. Body: `background:#EBEBEB; padding:clamp(18px,3vw,26px); display:flex; flex-direction:column; gap:16px` + inset bevel.
- Heading `COPYING FILES...` — Silkscreen 13, `letter-spacing:0.5px`, `#1A1870`.
- Trough: `height:26px; background:#FFFFFF; padding:3px` + inset bevel. Fill: `height:100%; width:<pct>%; transition:width 120ms linear`, `background: repeating-linear-gradient(90deg,#1A1870 0 14px,#EBEBEB 14px 17px)` (segmented blocks, not a solid bar).
- Footer row: `display:flex; flex-wrap:wrap; justify-content:space-between; gap:6px 14px` — left, the current filename in Courier 13 `#5C5C68` truncated with ellipsis; right, `NN%` in Silkscreen 12 `#1A1870`.

**Behavior:** on click, phase → `loading`, then all 15 images in the preload list are fetched in parallel via `new Image()`; each load *or error* increments the counter. When all finish, wait out the remainder of a **900ms minimum** (`Math.max(0, 900 - elapsed)`) so a warm cache still shows the animation, then phase → `ready` with stack `["home"]`. The bar percentage is `round(loaded / 15 * 100)`.

Preload list (15): `cpp-logo.png`, `tm-{beebe,burns,jake,kali,luke}.jpg`, `bio-{beebe,burns,jake,kali,luke}.jpg`, `wk-tracy-16x9.jpg`, `wk-makesense.jpg`, `wk-dummy.jpg`, `wk-marriage.jpg`.

### 2. index.html (home)
**Purpose:** the launcher — five destinations, nothing else.
Pane content: `min-height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:clamp(10px,1.6vw,16px)`.
1. `assets/cpp-logo.png` — `display:block; width:min(300px,100%); height:auto`.
2. Tagline: **"full-service, at your service."** (Silkscreen, centered, `text-wrap:pretty`).
3. Full-width dashed rule (blue-on-chrome variant, `height:3px`).
4. Icon grid: `width:100%; display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:clamp(12px,2vw,18px)`.

Five icon buttons — **ABOUT, REEL, WORK, TEAM, CONTACT** — each: `display:flex; flex-direction:column; align-items:center; gap:14px; background:#D6D6D2; padding:20px 10px; border:0; cursor:pointer` + raised bevel, `:hover` → `background:#E4E4E0`, `:active` → pressed bevel. Each holds a `64×64px` `#1A1870` tile (`display:grid; place-items:center`) plus a Silkscreen-15 label.

The five icon glyphs are built from divs (no SVG, no icon font) — rebuild them the same way or as SVG if your codebase prefers, but keep the 2-color pixel look:
- **ABOUT** — `38px` cream circle, `?` in Silkscreen 20 `#1A1870`, `padding-bottom:2px`.
- **REEL** — a `46×38px` cream filmstrip, `border-radius:5px`, `padding:4px`, `display:flex; justify-content:space-between`: two `6px` sprocket columns each holding four `5px` blue blocks (`justify-content:space-between`), and a center cell with a `100%×6px` blue bar, `border-radius:3px`.
- **WORK** — three `38px × 6px` cream bars stacked with `gap:6px` (a document/list).
- **TEAM** — two overlapping head-and-shoulders silhouettes on a single grid cell (`grid-area:1/1`), one `translate(-8px,-4px)` and one `translate(9px,4px); z-index:1`. Each is `26×30px` with a `13px` cream circle head (`box-shadow:0 0 0 3px #1A1870`) and a `24×13px` cream shoulder block, `border-radius:12px 12px 0 0`, same 3px blue ring — the ring is what separates the two figures.
- **CONTACT** — `40×28px` cream envelope, `overflow:hidden`, `box-shadow:inset 0 0 0 3px #1A1870`, with a `26×26px` cream square rotated `45deg` at `top:-11px; left:50%` (also 3px inset ring) forming the flap.

### 3. about.html
**Purpose:** the agency statement, presented as an editable text file.
`max-width:720px; margin:0 auto`. A framed panel (chrome face + `padding:3px` + raised bevel) containing:
- Caption bar `#1A1870`, `padding:5px 8px`, `display:flex; justify-content:space-between; gap:10px`: `about.txt` on the left; on desktop only, `type anything` at `opacity:0.75` on the right.
- Text body: `margin-top:3px; background:#FFFFFF; padding:clamp(14px,2.4vw,22px)`, Courier 15 / `line-height:1.9` / `#1A1870`, `caret-color:#1A1870`, `caret-shape:block`, `outline:0`, `cursor:text`, inset bevel. `:focus` → `box-shadow: inset 0 0 0 2px #4A46B8, inset 1px 1px 0 #9A9A96, inset -1px -1px 0 #FFFFFF`.

Four paragraphs, first three `margin:0 0 1.4em`, last `margin:0; font-weight:700`, all `text-wrap:pretty` (copy verbatim, note the double-hyphen `––` dashes and curly apostrophes):
1. "Capital P is a new creative agency offering full-service production–– music videos, commercials, brand campaigns, social media rollouts, VFX, sound design, and audio mastering."
2. "Our team, based in LA, NY, and beyond, brings their own expertise in directing, cinematography, editing, and audio."
3. "We don’t follow trends–– we set them, thanks to a team of specialists who bring fresh perspectives and original ideas to every project. We challenge norms, break boundaries, and always bring a capital-p Punch."
4. **"We’re bold, and it works."**

**The typing easter egg (desktop ≥641px only):** the panel is `contentEditable` and self-focuses the moment about.html opens, caret collapsed to the end of the last paragraph. A window-level `keydown` listener (capture phase) means the user can just start typing from anywhere in the window: any printable key, Backspace, or Enter is intercepted, focus is moved into the panel, and the character is inserted (`insertText` / `delete` / `insertLineBreak`). A `pointerdown` listener re-focuses the panel after any click that isn't on a `button` or `a` and isn't inside the panel. If the panel already has focus the caret is left alone — never yank it mid-sentence. Modifier combos (meta/ctrl/alt) pass through untouched so copy/paste and browser shortcuts still work. When focusing, the pane is also scrolled to its bottom.

**On phones (≤640px) this is entirely disabled:** not editable, no autofocus, no key interception, and the `type anything` hint is hidden — the passage is static text. (Otherwise a mobile keyboard fires on open.)

### 4. reel.html
Pane content: `min-height:100%; display:flex; flex-direction:column; justify-content:center; gap:14px`. One framed panel: caption bar with `reel.mp4` left / `2026` right (`opacity:0.75`); body `margin-top:3px; background:#000; aspect-ratio:16/9` + inset bevel, holding a borderless full-size iframe:
`https://player.vimeo.com/video/1059867610?h=1a5766d4cc&title=0&byline=0&portrait=0&dnt=1`, title "Capital P reel", `allow="autoplay; fullscreen; picture-in-picture"`, `allowfullscreen`.

### 5. work.html
`max-width:840px; margin:0 auto; display:flex; flex-direction:column; gap:12px`. Four rows in this order. Each row: `display:flex; align-items:center; gap:clamp(12px,2vw,18px); background:#D6D6D2; padding:10px` + raised bevel, `:hover` → `#E4E4E0`. Buttons additionally get `border:0; width:100%; text-align:left; cursor:pointer` and a pressed `:active`; links get `text-decoration:none`.
- Thumbnail: `flex:0 0 auto; width:clamp(104px,34vw,340px); aspect-ratio:16/9; padding:3px; background:#EBEBEB` + inset bevel, image `width/height:100%; object-fit:cover`.
- Text column: `flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:8px` — Verdana-700 title then Silkscreen-11 description.
- **Affordance convention:** titles end with `&nbsp;` then a glyph — `↗` (Silkscreen 20, `font-weight:400`, `line-height:0`) means *leaves the site in a new tab*; `>` (Silkscreen 15) means *opens another window in the stack*. Keep this distinction.

| # | Title | Glyph | Target | Description |
|---|---|---|---|---|
| 1 | PORTRAITS OF TRACY - 2026 EP ROLLOUT | ↗ | YouTube playlist `PLsMjHJ1O7c9fQBkiEiGcnPgenAZeFlc7K`, new tab | visualizer campaign, music videos, social media promotional, press photos |
| 2 | MAKE SENSE | > | window `wk-sense` | narrative horror drama set in the high-stakes culinary world, played at prestigious oscar-qualifying film festivals |
| 3 | DUMMY - ALBUM ROLLOUT | ↗ | `youtube.com/watch?v=VvAp7355C0U`, new tab | two music videos and full social media rollout |
| 4 | MEMORIES OF A MARRIAGE | > | window `wk-marriage` | narrative romantic drama about the history of a fraught marriage |

Images: `wk-tracy-16x9.jpg`, `wk-makesense.jpg`, `wk-dummy.jpg`, `wk-marriage.jpg`. All external links carry `target="_blank" rel="noopener noreferrer"`.

### 6. Project detail (makesense.html / marriage.html)
Identical layout, different content. `max-width:820px; margin:0 auto; display:flex; flex-direction:column; gap:clamp(16px,2.6vw,22px)`.
- Still: `align-self:flex-start; width:auto; max-width:min(620px,100%); max-height:min(34vh,260px); aspect-ratio:16/9; padding:3px; background:#EBEBEB` + inset bevel.
- Below it, a column with `gap:16px`: Verdana-700 title → Silkscreen-14 description → action row → password row.
- Action row: `display:flex; flex-wrap:wrap; gap:10px`. Both controls are `padding:14px 18px`, Silkscreen 14, `letter-spacing:0.5px`, `#1A1870`, chrome face + raised bevel, hover `#E4E4E0`, pressed `:active`, `display:flex; align-items:center; gap:9px`.
  - `WATCH ON VIMEO` + `↗` (`font-size:18px; line-height:0`) — new tab.
  - `COPY PASSWORD` — copies the password to clipboard and swaps its own label to `COPIED!` for **1800ms**, then reverts. Use `navigator.clipboard.writeText` with a hidden-`textarea` + `execCommand('copy')` fallback; the label must flip on failure too, so the button never appears dead.
- Password row: `display:flex; flex-wrap:wrap; align-items:baseline; gap:6px 14px` — label `PASSWORD` (Silkscreen 13, `letter-spacing:1px`) and the value in Courier 17.

| Page | Title | Still | Vimeo | Password |
|---|---|---|---|---|
| `wk-sense` | MAKE SENSE | `wk-makesense.jpg` | `https://vimeo.com/1079519579?share=copy` | `bringalow` |
| `wk-marriage` | MEMORIES OF A MARRIAGE | `wk-marriage.jpg` | `https://vimeo.com/1203330080` | `marriage2026` |

Descriptions are the same strings as their work.html rows.

### 7. team.html
`max-width:700px; margin:0 auto; display:flex; flex-direction:column; gap:10px`. Five identical rows, each a button (`background:#D6D6D2; padding:12px; border:0; width:100%; text-align:left; cursor:pointer; display:flex; align-items:center; gap:clamp(12px,2vw,18px)` + raised bevel, hover `#E4E4E0`, pressed `:active`) opening that person's bio window:
- Portrait: `flex:0 0 auto; 88×88px; padding:3px; background:#EBEBEB` + inset bevel, `object-fit:cover`.
- Text: `flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:8px` — display name (Verdana 700) then bracketed role (Silkscreen 11, `#4A4A55`).
- Chevron: `>` Silkscreen 15 `#1A1870`, `flex:0 0 auto; padding-right:8px`.

| Order | List name | Role | Thumb | Note |
|---|---|---|---|---|
| 1 | Beebe | [Founder] | `tm-beebe.jpg` | |
| 2 | Burns | [Founder] | `tm-burns.jpg` | thumb needs `object-position:50% 12%` |
| 3 | Jake Joseph | [Creative Director] | `tm-jake.jpg` | |
| 4 | Kali Slavich | [Head of Audio] | `tm-kali.jpg` | |
| 5 | Luke Stone | [Post-Production Coordinator] | `tm-luke.jpg` | |

Note the founders are listed by surname only here but get full names on their bio pages.

### 8. Bio pages (×5)
`max-width:780px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:flex-start; gap:clamp(18px,3vw,28px)` — portrait and text sit side by side and wrap to stacked on narrow panes.
- Portrait: `flex:0 0 auto; width:clamp(170px,30vw,250px); aspect-ratio:1/1; padding:3px; background:#EBEBEB` + inset bevel, `object-fit:cover`. Files `bio-*.jpg` (higher-res than the `tm-*` thumbs — use both sets).
- Text column: `flex:1 1 320px; min-width:0; display:flex; flex-direction:column; gap:18px`, containing:
  1. Name block, `gap:9px`: name in Silkscreen `clamp(17px,2.6vw,23px)`, then bracketed role (Silkscreen 11, `letter-spacing:1px`, `#4A4A55`).
  2. Prose panel: `background:#FFFFFF; padding:clamp(14px,2.2vw,20px)`, Courier 15 / `line-height:1.85` / `#1A1870` + inset bevel. Paragraphs `margin:0 0 1.2em`, last `margin:0`, all `text-wrap:pretty`. **`<b>` emphasis inside the prose is intentional and load-bearing — preserve every bolded phrase exactly.**
  3. Contact rows: `display:flex; flex-direction:column; gap:12px`; each row `display:flex; flex-wrap:wrap; align-items:baseline; gap:5px 14px` with a `flex:0 0 110px` Silkscreen-11 `letter-spacing:1px` label (`INSTAGRAM` / `EMAIL` / `SITE`) and a `flex:1 1 180px` Courier-15 value containing an `<a>`. External values end with ` ↗`; `mailto:` values don't.

| Person | Role | Instagram | Email | Site |
|---|---|---|---|---|
| Jackson Beebe | [Founder] | `@whosbeebe` → instagram.com/whosbeebe | beebe@capital-p.com | jacksonbeebe.com |
| Jackson Burns | [Founder] | `@burns.mov` → instagram.com/burns.mov/ | burns@capital-p.com | jacksonburns.co |
| Jake Joseph | [Creative Director] | `@abucketofjake` → instagram.com/abucketofjake/ | jake@capital-p.com | jakejosephcreative.com (http) |
| Kali Slavich | [Head of Audio] | `@kali.mp3` → instagram.com/kali.mp3/ | kali@capital-p.com | — none |
| Luke Stone | [Post-Production Coordinator] | `@lukeondemand` → instagram.com/lukeondemand/ | luke@capital-p.com | — none |

Bio copy (verbatim, bold as marked) — Beebe is 3 paragraphs, the rest are 1:

> **Jackson Beebe** ¶1 "Jackson Beebe is a **writer/director, producer,** and **editor** based out of **Los Angeles** and **New York City**." ¶2 "After meeting Jackson Burns at Chapman University’s film program, they founded Capital P Productions together, which has made **ads, music visuals, and short films** that have gone on to play in **Oscar-qualifying** festivals like **Palm Springs ShortFest** and **HollyShorts**." ¶3 "He is **seriously unserious.**"

> **Jackson Burns** "Jackson Burns is a **cinematographer** born and raised in **Los Angeles** and studied from **Chapman University**. With a fervent passion for movies, and a love for the form, Jackson’s dream is to blend **old techniques with modern filmmaking technology** to create visually stunning images for fresh audiences. Separate from Capital P, he is the co-owner of Peer To Peer Gear, a local rental house that gives our agency access to top-of-the-line equipment."

> **Jake Joseph** "Jake Joseph is a **graphic designer**, with an emphasis on **branding & campaign direction**. A cohesive, interesting, and unique visual identity is non-negotiable and he looks to achieve all three and then some. Working in many styles and mediums, both digital and analog, his works demands attention and is a perfect fit for anyone looking for visuals that are anything but average."

> **Kali Slavich** "Based in **Los Angeles**, Kali Slavich is a passionate **sound editor, mixer,** and **designer**. She’s helped bring **films to life** alongside **Grammy nominated** mixers and musicians, and worked hand in hand with editors experienced on critically acclaimed and **Oscar-winning films**. As Capital P's Head of Audio, she creates auditory experiences which never allow the audience to look away."

> **Luke Stone** "Luke Stone is a filmmaker who specializes in **editing**. Stone holds a deep appreciation for all things **analog, grainy, and vintage**. He believes that any project, no matter the budget, can resonate with audiences as long as there is sincerity, passion, and care put behind it."

### 9. contact.html
`max-width:640px; margin:0 auto; display:flex; flex-direction:column; gap:20px`.
Heading `contact us` (Silkscreen `clamp(18px,3vw,26px)`, lowercase) → full-width dashed rule → card grid `display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:clamp(12px,2vw,18px)`.
Three cards, each an `<a>`: `display:flex; flex-direction:column; align-items:center; gap:14px; background:#D6D6D2; padding:22px 12px; text-decoration:none; cursor:pointer` + raised bevel, hover `#E4E4E0`, pressed `:active`. Each holds a `64×64` blue icon tile, a Silkscreen-14 label, and a Courier-13 `#5C5C68` value (`text-align:center; overflow-wrap:anywhere`).

| Icon | Label | Value | href |
|---|---|---|---|
| Envelope (same as home CONTACT glyph) | `EMAIL` | beebe@capital-p.com | `mailto:beebe@capital-p.com` |
| Ring: `38×38px` with `box-shadow:inset 0 0 0 4px #EFEFB9` containing a `14px` circle with `box-shadow:0 0 0 4px #EFEFB9` | `INSTAGRAM ↗` | @capitalpproductions | instagram.com/capitalpproductions/ |
| `38×38px` cream square, `in` in Silkscreen 16, `padding-bottom:2px` | `LINKEDIN ↗` | capital p productions | linkedin.com/company/105939545/ |

---

## Interactions & Behavior

### Cascade math (get this exactly right — it's the signature of the design)
Given stack length `n`, top index `top = n - 1`, and `step` (default **40px**):
```
spanX = top * step
spanY = top * round(step * 0.78)

// desktop — the whole stack is centered as a group, so the cluster
// stays visually balanced no matter how deep you are
dx = i * step - spanX / 2
dy = i * round(step * 0.78) - spanY / 2
width  = min(900px, 94vw - spanX)
height = min(660px, 92vh - spanY)

// phone (≤640px) — the FRONT window is centered and older windows
// peek out behind it up and to the left; no size shrinking
dx = (i - top) * step
dy = (i - top) * round(step * 0.78)
width  = min(900px, 94vw)
height = min(660px, 92vh)
```
Vertical offset is always 0.78× the horizontal. Every window in the stack is the same size; deeper stacks shrink *all* windows together on desktop so the cascade always fits the viewport.

### Navigation
- Opening a page **pushes** onto the stack. Pushing the page already on top is a no-op (guards double-clicks).
- `X` on window *i* truncates the stack to `slice(0, i)` — it closes that window **and everything above it**.
- `HOME` on any window resets the stack to `["home"]`.
- `Escape` pops one level (only when the stack is deeper than 1, only in the `ready` phase).
- Only the topmost window is interactive; all others get `pointer-events:none` plus the 34%-opacity dark scrim. There is no click-to-raise, no dragging, no resizing, no minimize.
- The root index window is permanent — no close/home controls on it.

### Video background
`autoplay muted loop playsinline preload="auto"` with `poster="assets/bg-poster.png"`. Because browsers still block autoplay inconsistently, force it imperatively on mount: set `muted`/`defaultMuted`/`loop`/`playsInline`/`autoplay` on the element, call `play()` and swallow the rejection, then retry once on `canplay` and once on the first document `pointerdown`. The poster image is also the desktop's CSS background so there's never a black flash.

### Responsive
Single breakpoint: **`(max-width: 640px)`**, tracked with `matchMedia` + a `change` listener (not a CSS media query — the JS needs the value for the cascade math and the typing feature).
- Phone: cascade offsets go up-left from a centered front window; no viewport-shrink term; about.txt typing entirely disabled.
- Everything else is fluid via `clamp()` and `auto-fit` grids; the bio layout wraps at `flex:1 1 320px`.
Note the whole site is `overflow:hidden` at the document level — scrolling only ever happens inside a window's content pane.

### Motion inventory
Deliberately minimal: `cpPop` 120ms on window mount, `120ms linear` on the loader bar width, `1800ms` on the COPIED! label, instant on everything else. No hover transitions anywhere — bevel and background changes snap, as period-correct UI does. `cpBlink` is declared for a blinking caret but the native block caret (`caret-shape:block`) carries it.

## State Management
All client state, no server, no router:
| State | Type | Purpose |
|---|---|---|
| `phase` | `null \| "desktop" \| "loading" \| "ready"` | Boot machine. `null` resolves to `"desktop"` when the `bootScreen` flag is on, else straight to `"ready"`. |
| `stack` | `string[]` | The window stack; page keys from the registry. Defaults to `["home"]` in the ready phase. |
| `loaded` | number | Images preloaded so far (0–15). |
| `current` | string | Filename shown in the loader. |
| `copied` | `null \| "sense" \| "marriage"` | Which COPY PASSWORD button is showing `COPIED!`. |
| `phone` | boolean | `matchMedia("(max-width: 640px)")`. |

Four configurable flags (exposed as tweaks in the prototype; make them props/constants or drop them): `showVideo` (default true), `showScanlines` (true), `bootScreen` (true — set false to skip the desktop/loader), `cascade` (40, range 0–80 step 4).

If you want deep-linkable URLs (the prototype has none), the stack serializes cleanly — e.g. `/#work/wk-sense` — since each entry is just a registry key.

## Assets
All in `reference/assets/`, all client-supplied. Ship as-is; no generated or placeholder imagery.
- `bg.mp4` + `bg-poster.png` — desktop background video and its first-frame poster.
- `cpp-logo.png` — wordmark on index.html. `favicon.png` — favicon.
- `tm-*.jpg` ×5 — 88px team list thumbs. `bio-*.jpg` ×5 — square bio portraits.
- `wk-tracy-16x9.jpg`, `wk-makesense.jpg`, `wk-dummy.jpg`, `wk-marriage.jpg` — 16:9 work stills.
- `wk-tracy.jpg` exists in the source project but is **unused** (superseded by the 16x9 crop); not included here.
- Fonts: Silkscreen from Google Fonts; Verdana and Courier New are system stacks. No icon library — every glyph is CSS boxes.
- Third-party embeds: Vimeo player (reel + two project pages), plus outbound YouTube/Instagram/LinkedIn links.

## Files
```
design_handoff_capital_p_site/
├── README.md                      ← this document (self-sufficient)
└── reference/
    ├── Capital P.dc.html          ← the full prototype: all 13 views, all logic
    ├── support.js                 ← proprietary runtime; needed only to RUN the prototype locally. Do not port.
    └── assets/                    ← all production imagery + video
```
To view the prototype, serve `reference/` over any static HTTP server and open `Capital P.dc.html` (opening via `file://` will block the module fetches).

Design values in `Capital P.dc.html` are all literal inline styles — the hex codes and pixel numbers you read there are final and match this README. The logic class at the bottom of the file (`class Component extends DCLogic`) holds the boot machine, stack navigation, cascade math, clipboard behavior, video kick, and the about.txt typing feature.
