---
name: Research Atelier
description: A quiet, content-first personal portfolio for an undergrad researcher — academic credibility with production-grade craft.
colors:
  paper: "#fafaf7"
  paper-elevated: "#ffffff"
  ink: "#1a1a1a"
  ink-muted: "#5c5c5c"
  ink-faint: "#8a8a8a"
  hairline: "#e2e2dd"
  accent: "#3b37c9"
  accent-soft-light: "rgba(59, 55, 201, 0.08)"
  graphite: "#151515"
  graphite-elevated: "#1e1e1e"
  paper-dark: "#ededed"
  ink-dark-muted: "#a3a3a3"
  ink-dark-faint: "#6b6b6b"
  hairline-dark: "#2a2a2a"
  accent-dark: "#7b78e8"
  accent-soft-dark: "rgba(123, 120, 232, 0.12)"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.953rem, 5vw, 3.052rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    lineHeight: 1.55
rounded:
  sm: "6px"
  full: "9999px"
spacing:
  page: "1.5rem"
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  "2xl": "3rem"
  "3xl": "4rem"
  "4xl": "5rem"
  "5xl": "6rem"
components:
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
    border: "1px solid {colors.hairline}"
  social-icon:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
  theme-toggle:
    backgroundColor: "{colors.paper-elevated}"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    border: "1px solid {colors.hairline}"
    size: "40×40px"
---

# Design System: Research Atelier

## Overview

**Creative North Star: "The Lab Notebook"**

A personal research portfolio that reads like a well-set research paper crossed with a design studio's quiet confidence. The interface is a calm, precise frame — it never competes with the work. Where the category default is a Jekyll academic template with generic fonts, this system commits to a deliberate typographic voice, a restrained two-scheme palette, and editorial spacing that breathes.

The visitor's success is comprehension: a professor, a lab scientist, or an engineering hiring manager lands on the page and within seconds understands *what this person researches and that they do it well*. Every design decision serves that legibility.

**Confirmed visual rejections:** decorative gradients, glass/blur effects, gradient text, hard offset shadows, emoji-as-icon, system display faces, and the hero-metric template. The anti-goals are corporate/startup energy, playful/flashy motion, generic plainness, and dense text-walls.

**Key Characteristics:**
- Two-scheme (light paper / dark graphite) with a single restrained accent
- Editorial serif display + clean sans body + monospace metadata
- Single-column, generous measure (~68ch), hairline-divided sections
- Content-forward minimalism — the work leads, the chrome recedes
- One authored motion moment (theme toggle), not scattered hover effects

## Colors

A restrained palette: warm neutrals plus one accent. Two complete schemes — light (paper) and dark (graphite) — switched via `data-theme` on `<html>`.

### Primary
- **Electric Indigo** (`#3b37c9` light / `#7b78e8` dark): The single accent. Used on links, hover states, focus rings, and the soft accent-soft tint for icon hover backgrounds. Its rarity is the point — it draws the eye precisely because it appears sparingly.

### Neutral
- **Warm Paper** (`#fafaf7` light / `#151515` dark): Page background. Warm white in light mode, deep graphite in dark — never pure black or pure white, which would feel clinical.
- **Paper Elevated** (`#ffffff` light / `#1e1e1e` dark): Surfaces that sit above the page (theme toggle button).
- **Ink** (`#1a1a1a` light / `#ededed` dark): Body and display text. Near-black on paper, paper-on-graphite.
- **Ink Muted** (`#5c5c5c` / `#a3a3a3`): Secondary text — ledes, descriptions.
- **Ink Faint** (`#8a8a8a` / `#6b6b6b`): Metadata — dates, venues, copyright. Recedes deliberately.
- **Hairline** (`#e2e2dd` / `#2a2a2a`): Section dividers, avatar ring, chip borders. The lightest perceptible line.
- **Accent Soft** (`rgba(59,55,201,0.08)` / `rgba(123,120,232,0.12)`): Hover background for social icons. A whisper of the accent.

### Named Rules
**The One Voice Rule.** The accent appears on ≤10% of any screen — links, focus, one hover tint. Its restraint is what gives it authority.

## Typography

**Display Font:** Fraunces (with Georgia serif fallback)
**Body Font:** Inter (with system-ui sans fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace fallback)

**Character:** An editorial serif with optical sizing and soft authority (Fraunces) for the researcher's name, paired with a neutral workhorse sans (Inter) for everything the visitor reads. Monospace is reserved strictly for metadata — dates, venues, section labels — never as a "technical" costume.

### Hierarchy
- **Display** (400, clamp(1.953rem, 5vw, 3.052rem), 1.15, -0.04em): The hero name only. One use per page. Commands without shouting.
- **Title** (500, 1rem, -, -0.01em): Entry titles within publication/project/experience lists. Same size as body but heavier — creates subtle scan hierarchy.
- **Body** (400, 1rem, 1.65): All readable prose. Max line length 65–75ch for comfortable reading.
- **Lede** (400, 1.125rem, 1.55): The opening research-narrative paragraph. One step up from body to set the voice.
- **Label** (500, 0.75rem, -, +0.08em, uppercase): Section headings, metadata, chip text. Mono + tracked + uppercase = scannable structure.

### Named Rules
**The Three-Face Rule.** Only three type families appear: one serif (display), one sans (everything readable), one mono (metadata). A fourth face is never introduced.
**The Mono-Means-Data Rule.** Monospace is for dates, venues, tags, and section labels — never for prose, never as decoration.

## Layout

Single-column, centered, max-width 68ch (`--measure`). The page is a vertical reading experience divided by 1px hairline rules between sections.

- **Page padding:** 1.5rem horizontal (desktop), scaling to 1.25rem on mobile (`≤768px`)
- **Vertical rhythm:** Sections padded 3rem top/bottom; hero padded 4rem bottom; entries within a section spaced 2rem apart
- **Section heading** sits 2rem above its content, set in mono label style
- **Footer** is a hairline-separated zone with copyright and a repeated social-icon row
- **Theme toggle** is top-right of the sticky navbar, 40×40px circle, persistent across scroll

**Responsive breakpoint:** 768px. Below this the layout switches from two-column to a single flex-column via `.app { display: flex; flex-direction: column }`, `.shell` and `.sidebar` use `display: contents` so their children become direct flex siblings of the navbar, then `order` arranges them: navbar (1, sticky) → identity masthead (2) → bio (3) → content (4) → footer (5). The navbar is horizontally scrollable (`overflow-x: auto`) so all section links stay reachable on narrow screens. Avatar shrinks to 100px. Identity block and bio are centered.

## Elevation & Depth

**No shadows.** Depth is conveyed through tonal layering and the hairline. The theme toggle is the only elevated surface, distinguished by its hairline border and elevated background color — not a shadow. This flatness is intentional: the paper metaphor holds, and shadows would add noise the brief rejects.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only depth cue is the hairline. Elevation is tonal, never cast.

## Shapes

- **Radius sm (6px):** Social icon hit areas, subtle rounding on interactive elements
- **Radius full (9999px):** Avatar ring (circular), chip pills (fully rounded), theme toggle (circular)
- **Hairline (1px):** Section dividers, avatar ring border, chip borders, footer top edge, theme-toggle border
- **Avatar:** 120×120px circle (96px mobile), framed by a 1px hairline ring — clean, no gradient, no shadow

The form language is straight edges and fine lines. The only curves are full circles (avatar, toggle) and pill capsules (chips).

## Components

### Theme Toggle
- **Shape:** 40×40px circle (radius full), top-right of the sticky navbar
- **Style:** Elevated background, hairline border, accent-colored sun/moon SVG icons (18px, 2.25 stroke weight)
- **States:** Hover scales to 1.08×; focus-visible ring in accent; theme persists via localStorage

### Social Icons
- **Shape:** 32×32px hit area, 6px radius
- **Style:** Fill-based SVGs inheriting currentColor; muted ink default
- **Set:** LinkedIn, GitHub, Telegram, ORCID
- **States:** Hover raises color to full ink + soft accent-tinted background; focus-visible ring

### Chips
- **Shape:** Pill (radius full), 0.25rem vertical / 0.75rem horizontal padding
- **Style:** Hairline border, muted ink text, mono label type
- **States:** Hover shifts border and text to accent; used for PDF/Code/arXiv links

### Entry List
- **Structure:** Unordered list, 2rem gap between entries, no bullets
- **Each entry:** Title (sans 500) + metadata row (mono, faint) + description (muted) + optional chip links
- **Use:** Publications, projects, experience, education — four sections, one component

### Download Chips
- **Structure:** `.cv-downloads` flex container (wrap, 0.75rem gap) holding two `.download-chip` buttons
- **Primary chip:** Accent-tinted background (`accent-soft`), inline SVG icon (14px) + label, accent border + swapped background on hover
- **Ghost chip (secondary):** Transparent background, hairline border, muted text; accent-tinted background + accent border on hover
- **Use:** CV download + STEM Portfolio download in the CV section

### Score Groups (Education)
- **Structure:** `.score-group-list` (flex column, 1rem gap) of `.score-group` items
- **Each group:** `.score-group-label` (mono label style — uppercase, tracked, faint) + `.score-chips` flex wrap of `.chip` pills
- **Use:** Education test scores grouped by category (e.g. "Standardized Tests", "AP Exams")

### Email Chip
- **Structure:** Centered `.sidebar-email` link in the identity block, mono font, mailto: href
- **Style:** Elevated background, hairline border, rounded pill; accent text + accent-soft background on hover
- **Use:** Contact email displayed beneath the location line

### Hairline
- **Style:** 1px solid, hairline color, full-width, no margin
- **Use:** Sole visual separator between every major section

## Do's and Don'ts

### Do:
- **Do** use the accent only on interactive elements and focus states — let it be rare
- **Do** keep body text at the 65–75ch measure for comfortable reading
- **Do** divide sections with the hairline — never with extra whitespace alone
- **Do** set metadata (dates, venues, tags) in the mono label style for scannability
- **Do** test both themes — every color has a light and dark counterpart; neither is an afterthought

### Don't:
- **Don't** introduce a fourth typeface — three families is the system
- **Don't** use monospace for prose or decoration — only for data/measurement
- **Don't** add shadows — depth is tonal and hairline-based
- **Don't** use decorative gradients, glass/blur, or gradient text
- **Don't** let the accent exceed ~10% coverage on any screen
- **Don't** add section kickers/eyebrows above headings — the heading carries its own weight
