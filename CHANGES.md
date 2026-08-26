# What changed & how to apply it

This zip is your full project with the requested changes already applied.
To use it:

1. Unzip it over (or instead of) your current project folder.
2. `npm install` (this pulls in the one new dependency: `react-icons`).
3. `npm run dev` and check `localhost:3000`.

If you'd rather hand-apply the diffs into your own working copy instead of
replacing the folder, here's exactly what changed and why.

---

## 1. Fonts — Raleway Thin + Lexend Regular
**Files:** `app/layout.jsx`, `app/globals.css`

- Swapped the Google font from `Inter` to `Raleway` (weights 100–800) and
  added `Lexend` (400).
- `--font-sans` (body/UI text) → Lexend Regular
- `--font-display` (headings) → Raleway
- New utility `.font-hero-thin` (Raleway, weight 100) is applied to the big
  hero name/headline and the Dune spotlight title specifically, since
  "thin" only reads well at large sizes.

## 2. Real tech-stack logos
**New file:** `Assets/techIcons.jsx`
**Files touched:** `components/home/Marquee.jsx`, `components/works/Projects.jsx`,
`components/about/About.jsx`, `components/works/Journey.jsx`
**Dependency added:** `react-icons`

- One shared map (`getTechIcon(label)`) turns every tech label used across
  the site into its real brand logo + brand color (Next.js, React, Node,
  MongoDB, Tailwind, Figma, GSAP, Firebase, MySQL, Postman, Git/GitHub,
  JWT, etc.), with sensible generic fallbacks for labels that aren't a
  single brand (MERN Stack, REST APIs, Stitch Design, etc.) — nothing
  breaks if a label isn't explicitly mapped.
- Wired into the scrolling Marquee row, the tech chips on each project
  card, the About "skills" bento, and Journey's per-role skill chips.

## 3. Smoother text-reveal animation
**File:** `components/common/TextReveal.jsx`

- Lower spring stiffness / higher damping+mass so the scroll-scrubbed word
  reveal reads as one continuous motion instead of a scrubby/jittery one.
- Added a blur→sharp transition alongside the existing y/opacity, and
  slightly overlapping per-word ranges so the wave feels continuous.

## 4. Hero section restructure
**File:** `components/home/Hero.jsx`

- Left: your name + role, unchanged in structure, now in Raleway Thin.
- Right: the old "Currently" stat panel was replaced with a **live
  code-editor card** (`about.me.js`) — traffic-light dots, a syntax-
  highlighted `const shubhojitDeb = { ... }` object with your role,
  location, stack, project count, experience, and an `availableForWork`
  boolean with a blinking caret. The old rotating-role behavior is kept,
  now animated in as the `focus` property's value.

## 5. Dune full-screen spotlight — text moved to the right
**File:** `components/common/ZoomSpotlight.jsx`

- Since the image is full-bleed and the text/CTA overlay it, the copy is
  now right-aligned instead of centered, with a left-to-right gradient so
  it stays legible over the photo.

## 6. Navbar hides during the Projects horizontal-scroll section
**File:** `components/layout/Navbar.jsx`

- An `IntersectionObserver` watches `#projects`; the navbar slides up out
  of view while that section is in view (so it doesn't fight the
  full-bleed horizontal gallery) and slides back down once you scroll
  past it. Doesn't interfere with the mobile menu.

## 7. Projects horizontal gallery fixes
**File:** `components/works/Projects.jsx`

- **Centered card scales up:** each `ProjectCard` now animates `scale` to
  `1.08` when it's the active/centered card (spring-based), `1` otherwise.
  (Implementation note: the scale animation lives on an outer wrapper,
  while your existing imperative mouse-tilt effect still owns the inner
  card's `transform` directly — keeping the two independent avoids them
  fighting over the same CSS property.)
- **Left panel now actually hides cards beneath it:** previously the info
  panel had no background, so cards scrolling "underneath" it were still
  visible right through it. It now has an opaque, blurred background,
  `overflow-hidden`, a soft inner edge-fade, and is narrower
  (300/360px → 240/280px) so more of the gallery is visible.
- **Gallery starts a little further right:** added left padding before the
  first card so the gallery doesn't start flush against the panel edge.

## 8. Journey section — livelier animation
**File:** `components/works/Journey.jsx`
**New file:** `components/common/CursorImageTrail.jsx`

- Milestone cards now enter with a spring (instead of a flat duration
  easing) for a bouncier, more natural feel.
- Added a glowing "runner" dot that travels down the timeline's progress
  line in sync with scroll, so the timeline reads as continuously alive
  rather than a series of static reveals.
- Added a **Cursor Image Trail** strip (desktop only) right above the
  timeline — move your cursor across it and a trail of your project
  screenshots follows it, fading/scaling/rotating as it goes. This is a
  local, dependency-free adaptation of the "Cursor Image Trail" component
  you pasted (no shadcn registry install needed — it's just a plain
  component in `components/common/`).

---

## Files added
- `Assets/techIcons.jsx`
- `components/common/CursorImageTrail.jsx`
- `CHANGES.md` (this file)

## Files modified
- `app/layout.jsx`
- `app/globals.css`
- `package.json` (added `react-icons`)
- `components/home/Hero.jsx`
- `components/home/Marquee.jsx`
- `components/works/Projects.jsx`
- `components/works/Journey.jsx`
- `components/about/About.jsx`
- `components/common/TextReveal.jsx`
- `components/common/ZoomSpotlight.jsx`
- `components/layout/Navbar.jsx`

## Notes / things worth knowing
- `react-icons` is pinned quite broadly (`^5.4.0`). A few brand icons
  (VS Code, MS Excel, MS PowerPoint, a standalone "CSS3" mark) have been
  removed from newer Simple Icons releases, so those four use clean
  generic Lucide icons instead — everything else (Next.js, React, Node,
  MongoDB, Tailwind, Figma, GSAP, Firebase, MySQL, Postman, Git/GitHub,
  JWT) uses the real brand mark.
- The Cursor Image Trail is desktop-only (`hidden md:flex`) since it's a
  cursor-following effect with no real touch equivalent.
