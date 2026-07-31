# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro — chosen for zero-JS-by-default output (fastest load), content-first architecture ideal for a research portfolio, and clean minimal aesthetic that avoids visual clutter. MDX for papers/blog. Deploy target: Vercel.

## Users

- **PhD / grad school admissions committees** — professors evaluating research depth, publications, intellectual curiosity, and fit.
- **Industry research labs** — research scientists & hiring managers (DeepMind, FAIR, MSR, etc.) looking for technical rigor and impact.
- **Tech employers / ML engineering** — hiring managers wanting to see applied ML, code, and shipped projects.

Primary user is a **technically literate evaluator** scanning quickly for evidence of research ability. They value clarity, signal density, and zero friction — the design must get out of the way of the work.

## Product Purpose

A personal academic portfolio that makes an undergrad researcher's work legible, credible, and memorable to three very different audiences (academia, labs, industry) from a single surface. Success: a visitor can answer "can this person do research?" within seconds and find a reason to contact them.

## Positioning

Most researcher portfolios are either dense CV-rehashes or overdesigned marketing pages. This one sits between: **academic credibility with engineering polish** — publications and research narrative presented with the clarity and performance of a top-tier personal site.

## Operating Context

- Visitor arrives via Twitter/social link, conference page, referral, or search.
- Scans on desktop (primary) and mobile (non-trivial).
- Typical session is short (< 2 min) — must communicate fast.
- Content evolves: new papers, projects, and experiences accumulate over an undergrad career.

## Capabilities and Constraints

- Sections: identity/hero, research area, publications, projects, experience/activities, education, contact/social.
- Must support a dark theme toggle (reference design pattern the user explicitly favors).
- Must stay visually minimal and content-forward — no heavy animations, no decorative bloat.
- Multilingual/cultural consideration: user is based in Kazakhstan (参考 page had a name-pronunciation audio feature — candidate to adopt if user wants).
- **Undecided:** whether to include a blog/news feed; whether to include a name-pronunciation audio feature.

## Brand Commitments

- Name, voice, and factual claims must match the user's real CV and work — no fabricated publications, benchmarks, or affiliations.
- Design reference committed: **yeraly.dsml.kz** — academic-professional, minimalist, single-column, dark-theme toggle, circular avatar hero, icon-driven social nav, clean section separation (activities / education / projects / publications).

## Evidence on Hand

- Publications/papers (ArXiv links, conference/workshop papers).
- Projects with writeups (research + engineering).
- CV, short bio paragraph, profile headshot.
- **Absences to flag, not fabricate:** exact publication titles, project URLs, affiliation dates, bio copy — these must be supplied by the user before publishing.

## Product Principles

1. **Work first.** The research content is the product; the interface is a clear window onto it.
2. **Fast by default.** Every byte must earn its place — performance is a credibility signal to technical visitors.
3. **One page, many audiences.** Academics, lab scientists, and engineers all find their proof points without scrolling fatigue.
4. **Quiet confidence.** Restrained visual language that signals seriousness — no startup-marketing energy.
5. **Grows with you.** Content model supports adding papers and projects cleanly over an undergrad career.

## Accessibility & Inclusion

- Must meet WCAG 2.1 AA contrast (especially across light/dark themes).
- Keyboard-navigable, semantic structure, alt text on images.
- Name pronunciation feature (if adopted) supports multicultural/international audience.
