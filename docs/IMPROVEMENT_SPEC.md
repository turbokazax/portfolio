# Implementation Spec — Phase 1a, 1b, and Phase 2

Companion to `docs/IMPROVEMENT_PLAN.md`. Covers quick wins (1a/1b) and structural (Phase 2). Astro-idiomatic, minimal diffs. Line numbers reference the current tree (commit 5c0f91f).

Global verification after each item: `npx astro build` must stay green.

---

## Phase 1a — code only

### 1a.0 Working nav + single navLinks source

**Files:** `src/nav.ts` (new), `src/components/Topbar.astro`, `src/layouts/Layout.astro`, `src/layouts/BlogPost.astro`

1. Create `src/nav.ts`:
   ```ts
   export const navLinks = [
     { label: "Publications", id: "publications" },
     { label: "Projects", id: "projects" },
     { label: "CV", id: "cv" },
     { label: "Blog", id: "blog" },
   ];
   ```
   (Albums already omitted — see 1a.2; do both items in one commit.)
2. `Topbar.astro:17`: `href={`#${link.id}`}` → `href={`/#${link.id}`}`. Homepage behavior unchanged (Layout's click handler `preventDefault`s); every other page gets working cross-page anchors natively.
3. `Layout.astro`: delete the inline `navLinks` const (lines 18-24); `import { navLinks } from "../nav";` and keep `<Topbar active={active} links={navLinks} />`.
4. `BlogPost.astro:74-80`: replace the inline array with `<Topbar links={navLinks} active="blog" />` (import from `../nav`). Passing `active="blog"` gives blog posts a correct server-rendered highlight — BlogPost has no script that strips it.

**Verify:** `grep -rn "Albums" src/` empty; from a built blog post, each nav link navigates to `/#<id>`; only `src/nav.ts` defines the list.

### 1a.1 Draft filter + RSS sort + redirect

**Files:** `src/pages/blog/[slug].astro`, `src/pages/blog/rss.xml.js`, `vercel.json`

1. `[slug].astro:6`: `await getCollection("blog")` → `await getCollection("blog", ({ data }) => !data.draft)`.
2. `rss.xml.js:5`: same filter, then sort:
   ```js
   const blog = (await getCollection("blog", ({ data }) => !data.draft))
     .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
   ```
3. `vercel.json` — add (also covers 1a.9):
   ```json
   "redirects": [
     { "source": "/blog/why-vision-needs-embodiment", "destination": "/blog/", "permanent": false },
     { "source": "/blog/notes-from-my-first-conference", "destination": "/blog/", "permanent": false }
   ]
   ```
   (`permanent: false` — 3.3 brings the conference post back.)

**Verify:** `npx astro build && ls dist/blog/` shows no draft dirs; `grep -c "why-vision" dist/sitemap-0.xml dist/blog/rss.xml` → 0 for both; first `<item>` in rss.xml is the newest post.

### 1a.2 Delete Activities + Albums sections

**Files:** `src/pages/index.astro`

- Delete lines 88-105 (the `<hr class="hairline" />` before `<h2>Activities</h2>` through the closing `</ol>`).
- Delete lines 317-357 (the whole `<!-- ALBUMS --> <section id="albums">…</section>`).
- Nav entry already removed by 1a.0's `src/nav.ts`.
- Leave `.album-*` CSS in `global.css` alone (harmless dead rules; Phase 3.2 may reuse; delete in 2.3 if not).

**Verify:** `grep -rn 'album-tile\|album-count\|Year – Year' src/` empty; `grep -c "Activities\|Albums" dist/index.html` → 0 after build.

### 1a.3 Fact fixes

**Files:** `src/pages/index.astro`, `resume.md`, `src/pages/about.astro`

1. Open https://ieeexplore.ieee.org/document/10898141 and record the exact venue name. Expected: "International Conference on Intelligent Control and Information Processing (ICICIP)" per `resume.md:17` — but confirm before editing.
2. `index.astro:120`: `13th IEEE ICCIP, March 2025` → `13th IEEE ICICIP, March 2025` (or whatever the record says).
3. `resume.md:34`: `Yashinti` → `Yashtini`.
4. `about.astro:32`: `Aug 2024 – Present` → `Jun 2024 – Present`.

**Verify:** `grep -rn "Yashinti\|ICCIP\b" src/ resume.md` empty.

### 1a.4 CV asset git state

**Files:** `.gitignore`, `public/`, `src/pages/index.astro`, `resume-output/`

```bash
cd /Users/turbokazax/dev/cctest2/test1
sed -i '' '/Arnur_Jumabekov_Resume-1.pdf/d' .gitignore   # also delete the now-stale "personal resume" comment line
git mv --force ... # file is untracked, so plain mv:
mv public/Arnur_Jumabekov_Resume-1.pdf public/arnur-jumabekov-cv.pdf
git add public/arnur-jumabekov-cv.pdf .gitignore
git rm -r resume-output/
```
- `index.astro:175`: `href="/Arnur_Jumabekov_Resume-1.pdf"` → `href="/arnur-jumabekov-cv.pdf"`.
- When 1b.2's corrected PDF arrives, overwrite `public/arnur-jumabekov-cv.pdf` — same path, no code change.

**Verify:** `git ls-files public/ | grep cv.pdf` non-empty; `grep -rn "Resume-1" src/` empty; `npm run build && ls dist/arnur-jumabekov-cv.pdf`.

### 1a.5 BaseHead component (fonts, theme-init, RSS discovery, og:image)

**Files:** `src/components/BaseHead.astro` (new), `src/layouts/Layout.astro`, `src/layouts/BlogPost.astro`, `src/pages/404.astro`, `src/components/Topbar.astro`, `src/styles/global.css`

1. Create `src/components/BaseHead.astro`:
   ```astro
   ---
   interface Props { title: string; description: string; ogType?: string; }
   const { title, description, ogType = "website" } = Astro.props;
   const ogImage = new URL("/og-image.png", Astro.site ?? Astro.url.origin).href;
   ---
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:description" content={description} />
   <meta property="og:type" content={ogType} />
   <meta property="og:url" content={Astro.url.href} />
   <link rel="canonical" href={Astro.url.href} />
   <meta property="og:image" content={ogImage} />
   <meta property="og:image:width" content="1200" />
   <meta property="og:image:height" content="630" />
   <meta property="og:site_name" content="Arnur Jumabekov — Researcher" />
   <meta name="twitter:card" content="summary_large_image" />
   <meta name="twitter:title" content={title} />
   <meta name="twitter:description" content={description} />
   <meta name="twitter:image" content={ogImage} />
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   <link rel="icon" href="/favicon.ico" />
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
   <link rel="alternate" type="application/rss+xml" title="Arnur Jumabekov — Blog" href="/blog/rss.xml" />
   <title>{title}</title>
   <script is:inline>
     (function () {
       const stored = localStorage.getItem("theme");
       const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
       document.documentElement.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));
     })();
   </script>
   ```
   Check `astro.config.mjs` has `site: "https://jubaportfolio.vercel.app"` (sitemap integration implies it does; if not, add it).
2. `Layout.astro`: replace head lines 38-60 (meta/OG/Twitter/icons/title) with `<BaseHead title={title} description={description} />`. Keep `<Analytics />` and the theme-color meta if desired (move theme-color into BaseHead). Remove `data-theme="light"` from `<html>`? Keep it — it's the pre-script default; the head script now runs before paint.
3. `BlogPost.astro`: same replacement for lines 49-70, with `ogType="article"`; keep the JSON-LD script (change `ogImage` const to `new URL("/og-image.png", Astro.site).href` or drop the const and inline). 
4. `404.astro`: replace its head meta/icon/title lines with `<BaseHead title="404 — Arnur Jumabekov" description="Page not found — Arnur Jumabekov" />`; remove `data-theme="light"` from `<html>` (no Topbar exists to correct it — BaseHead's script now handles it).
5. `Topbar.astro`: delete the `is:inline` theme-init block (lines 37-46) — now lives in BaseHead.
6. `global.css:7`: delete the `@import url("https://fonts.googleapis.com/…")` line.

**Verify:** `grep "@import" src/styles/global.css` empty; `grep -rn "og-image.png" src/ | grep -v BaseHead` empty (except BlogPost JSON-LD if kept inline); built HTML of `/`, a post, and `/404` each contain the fonts stylesheet link, the RSS alternate link, and the theme-init script inside `<head>`; with `localStorage.theme=dark`, no light flash on load; /404 renders dark.

### 1a.6 Contrast + a11y

**Files:** `src/styles/global.css`, `DESIGN.md`, `src/layouts/BlogPost.astro`, `src/components/Topbar.astro`

1. `global.css:16`: `--ink-faint: #8a8a8a;` → `#6e6e6e` (4.88:1 on #fafaf7). Do NOT use #767676 (4.34:1 — fails AA).
2. `global.css:69` (dark block): `--ink-faint: #6b6b6b;` → `#9a9a9a` (≥4.5:1 on #151515 — lightening, this theme's failure is too-dark).
3. `DESIGN.md`: frontmatter `ink-faint: "#8a8a8a"` → `"#6e6e6e"`, `ink-dark-faint: "#6b6b6b"` → `"#9a9a9a"`; prose bullet at ~:113 updated to match.
4. `BlogPost.astro`: after `<body class="blog-post-view">` add `<a href="#main-content" class="skip-link">Skip to content</a>`; add `id="main-content"` to `<main class="blog-post">`. (`.skip-link` styles already exist in global.css.)
5. `Topbar.astro` toggle: add `aria-pressed="false"` to the button; in the toggle script set `document.querySelector(".theme-toggle")?.setAttribute("aria-pressed", String(next === "dark"))` — and initialize it on load from the current theme (one extra line in the same module script).

**Verify:** contrast checker (e.g. WebAIM) reports ≥4.5:1 for both pairs — record the two ratios; `grep -c "8a8a8a\|6b6b6b" src/styles/global.css DESIGN.md` → 0; built post HTML contains `skip-link` and `id="main-content"`; toggling flips `aria-pressed`.

### 1a.7 Avatar

**Files:** `public/profile.jpg` (replaced or new file), `src/layouts/Layout.astro`

```bash
sips -Z 256 public/profile.jpg --out public/profile-256.jpg
# check size; if >15KB: sips -s formatOptions 70 ...
```
Point `Layout.astro:77` `src="/profile-256.jpg"`. Keep the original if it's used anywhere else (it isn't — grep to confirm), otherwise delete it.

**Verify:** `stat -f%z public/profile-256.jpg` ≤ 15000; visual check at 120px.

### 1a.8 Delete broken test gate

**Files:** `.github/workflows/test.yml`, `test-site.mjs`, `package.json`

```bash
git rm .github/workflows/test.yml test-site.mjs
```
`package.json`: remove `"test": "node test-site.mjs"` script and the `playwright` devDependency; run `npm install` to refresh the lockfile.

**Verify:** `ls .github/workflows` → `build-check.yml` only; `npm run build` green.

### 1a.9 Draft the conference post

**Files:** `src/content/blog/notes-from-my-first-conference.mdx`

Frontmatter: add/set `draft: true`. (Redirect already added in 1a.1 step 3.)

**Verify:** post absent from `dist/blog/`, `dist/sitemap-0.xml`, `dist/blog/rss.xml`. Note: `/blog/` index may now render an empty list if the lorem post is the only other one — acceptable; the empty state is honest, and 3.3 refills it.

---

## Phase 1b — as assets arrive (no ordering between items)

### 1b.1 og-image.png
Drop the 1200×630 PNG at `public/og-image.png`. Zero code changes (BaseHead already references it). Verify: `curl -sI https://jubaportfolio.vercel.app/og-image.png | head -1` → 200; paste a page URL into an OG preview tool (e.g. opengraph.xyz) and confirm the card.

### 1b.2 Corrected CV PDF
Overwrite `public/arnur-jumabekov-cv.pdf`. Verify: `pdftotext` or manual read — "Yashtini" spelled correctly, CUHK in Education, venue string matches `index.astro`.

### 1b.3 "Currently seeking" block
**File:** `src/pages/index.astro` — insert after the lede paragraphs (~line 38), inside `#main`:
```astro
<div class="seeking">
  <p class="body-text"><strong>Currently seeking:</strong> {userSentence}</p>
  <div class="score-chips">
    <a class="chip mono" href="mailto:arnurjumabekov@gmail.com?subject=Research%20internship">Research internships</a>
    <a class="chip mono" href="mailto:arnurjumabekov@gmail.com?subject=RA%20position">RA positions</a>
    <a class="chip mono" href="mailto:arnurjumabekov@gmail.com?subject=Collaboration">Collaboration</a>
  </div>
</div>
```
Reuses existing `.chip`/`.score-chips` styles; add `.seeking { margin-top: var(--space-5) }` locally if spacing needs it. Verify: chips open prefilled mail; block visible in first viewport at 1280×900 and 390×844.

### 1b.4 BibTeX (no self-hosted paper PDF) — DONE
**Decision:** the site does not host a copy of the paper. Linking the IEEE Xplore
record is the only distribution route, so there is no question of redistributing the
published version. Do not add `public/wecavit-author-version.pdf` or a `PDF` chip.

**Shipped:** the publication entry links the IEEE Xplore record, and a
`<details class="bibtex">` block carries the citation (`publication.bibtex` in
`src/data/cv.ts`). Fields are limited to those verifiable from the record —
no page numbers are invented. Verify: BibTeX pastes cleanly into a `.bib` file.

---

## Phase 2 — structural

### 2.1 Navigation architecture (Option A — recommended; Option B only if per-section URLs are explicitly wanted)

**Option A files:** `src/layouts/Layout.astro`, `src/styles/global.css`

1. `Layout.astro`: delete the tab-navigation script — everything from `// Tab navigation` through the `hashchange` listener (lines 129-168). **Keep** the back-to-top block (lines 170-184).
2. Replace with a minimal active-state sync (optional but cheap, keeps the topbar honest on the homepage):
   ```js
   function syncActive() {
     const id = location.hash.slice(1) || "main";
     document.querySelectorAll(".topbar-link").forEach((l) =>
       l.classList.toggle("active", l.dataset.nav === id));
   }
   window.addEventListener("hashchange", syncActive);
   syncActive();
   ```
   Note: no `preventDefault` anymore, so the `/#id` hrefs from 1a.0 scroll natively with default browser behavior.
3. `global.css`: delete lines 524-531 (`.page-section { display:none }`, `:first-of-type`, `.is-visible`) and any related `.is-visible` animation rules; add `scroll-margin-top: var(--topbar-h)` on `.page-section` so anchored headings clear the sticky bar.
4. `global.css` `--topbar-h`: add `--topbar-h: 81px;` to `:root` (measure in devtools — topbar padding 2×var(--space-5) + 40px toggle + 1px border ≈ 81px desktop; re-measure at mobile breakpoint and override inside the media query if it differs). Replace the three `61px` usages (:338 `calc(100vh - 61px)` → `calc(100vh - var(--topbar-h))`, :347 `top: 61px` → `top: var(--topbar-h)`, :350 same calc).
5. Update the DIRECTION CONTRACT comments in `Layout.astro:26-34` and `BlogPost.astro:40-45`: "Right = ONE section at a time selected from navbar" → "Right = all sections stacked, navbar anchors scroll to them".
6. Leave `about.astro`, `sitemap.astro`, PRODUCT.md untouched — Option A is compatible with all three.

**Option B (only on explicit decision):** everything above about deleting the script/CSS, plus: new `src/pages/{publications,projects,cv}.astro` rendering the corresponding sections via `Layout`; nav.ts ids become paths; `aria-current="page"` computed from `Astro.url.pathname` in Topbar; delete `about.astro` and the homepage `#blog` section; update `src/pages/sitemap.astro` (remove `/about/` at :33, add the three pages); add `{ "source": "/about", "destination": "/", "permanent": true }` to vercel.json redirects; amend PRODUCT.md Principle 3 and both DIRECTION CONTRACT comments.

**Verify (either):** disable JS → all homepage content visible; nav from a blog post reaches every section; `grep -n "61px" src/styles/global.css` empty; `grep -rn "showSection" src/` empty; build, then link-check `dist/` (e.g. `npx linkinator dist --recurse --silent` or a manual click-through) → no 404s; at 320px, 768px, and 844×390 landscape: no horizontal scrollbar, nav reachable and tappable.

### 2.2 Facts data module

**Files:** `src/data/cv.ts` (new), `src/pages/index.astro`, `TODO.md`

1. `src/data/cv.ts` — plain exported objects, no zod, no collections:
   ```ts
   export const publication = {
     title: "WeCAViT: A Weighted CNN model for Pneumonia Detection in Chest X-rays",
     authors: "Arnur Jumabekov, Maryam Yashtini",
     venue: "13th IEEE ICICIP",      // as verified in 1a.3
     date: "March 2025",
     doi: "https://ieeexplore.ieee.org/document/10898141",
   };
   export const education = [ /* CUHK, Haileybury objects */ ];
   export const experience = [ /* ARMS Lab, ISSAI, Pioneer objects */ ];
   export const projects = [ /* WeCAViT, QuantaSoil */ ];
   export const honors = [ /* ISEF, KazSEF, BPhO */ ];
   ```
   TypeScript's structural checking is the whole schema; a typo'd field name fails `astro build`.
2. `index.astro`: replace the hardcoded entry markup fields with `.map()` renders over these arrays (keep the exact existing markup/classes; only the strings move).
3. One-time diff: open `public/arnur-jumabekov-cv.pdf` next to `cv.ts` and tick off every shared fact (names, venues, dates, institutions). Record the result in the PR description.
4. `TODO.md`: delete it, or correct the stale items (RSS shipped, /blog/ shipped, lorem post now drafted) — pick delete unless the user wants a task list.

**Verify:** `grep -rn "ICICIP\|Yashtini" src/pages/` → zero hits (strings now live only in `src/data/cv.ts`); build green; rendered homepage byte-comparable to before (modulo nothing — content identical).

### 2.3 Remaining hygiene

**Files:** repo root, `package.json`, `README.md` (new)

```bash
git rm check.mjs convert.mjs convert_resume.py extract.mjs extract.cjs shots.mjs IMG_7716.JPG
```
- `package.json`: remove `pdf-parse`, `pdf2md`, `pdfjs-dist`; rename `"name": "better-belt"` → `"jubaportfolio"`; `npm install` to refresh lockfile.
- `.gitignore`: drop the now-pointless `check.mjs` scratch entry.
- `README.md`: ~20 lines — what the site is, stack (Astro 7, MDX, Vercel), `npm run dev/build`, where content lives (`src/content/blog`, `src/data/cv.ts`), deploy note.
- If Phase 3.2 hasn't claimed them, delete the dead `.album-*` CSS rules from `global.css`.

**Verify:** fresh `git clone` to a temp dir + `npm ci` + `npm run build` succeeds; `dist/arnur-jumabekov-cv.pdf` exists; `npm ls pdfjs-dist` reports empty/not-installed; Build Check workflow green on the PR.

---

## Commit plan (suggested)

1. `fix: working nav from every page; single navLinks source` (1a.0 + 1a.2 nav)
2. `fix: filter drafts from post routes and RSS; sort feed; redirects` (1a.1, 1a.9)
3. `fix: remove placeholder Activities and fabricated Albums` (1a.2)
4. `fix: fact corrections — venue, supervisor spelling, dates` (1a.3)
5. `fix: track CV asset in git; remove leaked resume-output copy` (1a.4)
6. `refactor: shared BaseHead — fonts, theme-init in head, RSS discovery, og:image from site` (1a.5)
7. `fix: AA contrast for ink-faint (+DESIGN.md sync); skip link; aria-pressed` (1a.6)
8. `perf: 256px avatar` (1a.7)
9. `chore: delete broken test gate` (1a.8)

Then 1b commits as assets land, then one PR each for 2.1, 2.2, 2.3.
