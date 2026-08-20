# Portfolio Improvement Plan — jubaportfolio.vercel.app (FINAL, post-council)

## 1. Executive Summary

The site's bones are good: static Astro, a considered two-column design system, working RSS/sitemap/JSON-LD plumbing, and one genuinely strong asset (a published IEEE paper plus real robotics lab work). It currently undermines its own credibility in three compounding ways:

1. **Placeholder and leaked content is live.** A lorem-ipsum draft post is built, in the XML sitemap, and in RSS (`src/pages/blog/[slug].astro:6` and `src/pages/blog/rss.xml.js:5` omit the `!data.draft` filter three other pages have). The homepage ships a literal "Activity — Organization / Year – Year" scaffold entry and an Albums section of empty gray tiles claiming "12 photos / 8 photos / 15 photos" that don't exist — directly violating PRODUCT.md's "no fabricated data" commitment. The "Notes From My First Conference" post is the same class of problem: entity-free, unverifiable, and it says his work is "just simulation," contradicting the robotics work the site leads with.
2. **Facts contradict each other across artifacts.** The site says ICCIP, the paper says ICICIP (verify against IEEE record 10898141 before editing — the repo proves a *contradiction*, not which string is right); `resume.md` misspells the supervisor *within the same file* ("Yashtini" at :16, "Yashinti" at :34); the CV omits CUHK while the site leads with it; /about dates work Aug 2024 vs Jun 2024 everywhere else. Root cause: facts are hand-copied into multiple unsynchronized artifacts — including two the draft plan itself forgot (DESIGN.md hardcodes the color tokens twice; TODO.md still claims RSS and /blog/ are unbuilt when both shipped in 5c0f91f).
3. **Navigation is inert off-homepage, and shares are broken everywhere.** Topbar links are `href="#id"` (`Topbar.astro:17`), so on /about, /blog, /sitemap and every post the nav does nothing — and shows **no** active state (Layout's `showSection("main")` strips the server-rendered `.active` class on load; BlogPost ships no nav script at all — the nav does not "falsely highlight," it un-highlights). `og:image` 404s on every page (verified live), so every social share — the primary arrival path per PRODUCT.md — renders a broken card. `--ink-faint` fails WCAG AA in both themes (3.30:1 light, 3.43:1 dark, measured).

There is also a **latent production break**: `.gitignore:30` excludes `public/Arnur_Jumabekov_Resume-1.pdf`, so the CV serves 200 today only because production was deployed from a local directory. Any git-triggered deploy 404s the primary CTA. Meanwhile `resume-output/src/resume-output.pdf` — byte-identical (222930 B) — *is* tracked, so the "private" file is public anyway: the worst of both worlds. Fixed in Phase 1, not buried in hygiene.

The plan: ship the code-only credibility fixes in one sitting (Phase 1a), ship the user-asset-blocked items as they arrive (Phase 1b — request the assets on day zero), then the structural fix (Phase 2), then differentiating content (Phase 3).

---

## 2. Prioritized Workstreams

### WS-A: Stop the bleeding — content credibility
Draft leak (×3 findings), placeholder Activities, fake Albums, the unverifiable conference post, ICCIP/ICICIP, Yashinti typo, CUHK-missing CV, resume filename **and git tracking**.

### WS-B: Working navigation everywhere
The 5-minute fix (nav hrefs → `/#id`) ships in Phase 1a. The structural decision — keep one scrolling page vs. split into routes — is an explicit Phase 2 decision with the tradeoff stated, because the route split contradicts PRODUCT.md Principle 3 ("One page, many audiences") and the DIRECTION CONTRACT comments in both layouts.

### WS-C: SEO/sharing/perf/a11y plumbing
og:image 404 (×4), font @import chain, theme-init FOUC (root cause of the 404-dark-mode symptom), 94KB avatar, RSS autodiscovery + ordering, contrast failure, blog skip link, toggle aria-pressed. One shared `<BaseHead>` component carries the head fixes to all three HTML shells instead of pasting them three times.

### WS-D: Single source of truth for facts — right-sized
One plain data module read by the pages, plus a one-time site-vs-PDF diff, plus reconciling DESIGN.md/TODO.md. **Not** four zod collections — see "Council resolution" for why that was cut.

### WS-E: Differentiating content
Availability/"currently seeking" block (promoted to 1b), author-version paper PDF + BibTeX (promoted to 1b), WeCAViT evidence page, robot video loops replacing Albums, conference-post anchoring.

### WS-F: Repo hygiene + honest CI
The Tests workflow is a **broken gate today**, not tidying: `test.yml` runs `npm test` with no dev server on :4321 and no Playwright browser install, and `test-site.mjs` asserts things that are false (e.g. "A-Level chips removed" while `index.astro:68-83` renders them). It cannot pass. Decision: **delete both in Phase 1a** (Build Check remains as the honest gate). Remaining hygiene (scratch scripts, `IMG_7716.JPG`, pdf deps, `better-belt` rename, README) lands in Phase 2.

**Dropped (ruthlessly):** name-pronunciation audio chip; per-page generated OG images (one static PNG covers ~95% of the value); self-hosted fonts with metric tuning; "Lab Notes" second content stream; four typed zod content collections + malformed-date build test + `.bib` emitter (see council resolution — a schema over ~8 entries prevents nothing a proofread doesn't, and cannot fix site-vs-PDF drift); Lighthouse CI gate (revisit after Phase 2 if wanted).

---

## 3. Phased Roadmap

### Phase 1a — Quick wins, code only (~2 hours, ship today)

**1a.0 Make the nav work from every page** *(inert nav ×3 — highest-severity functional bug, 5-minute fix)*
- What: `Topbar.astro:17` → `href={`/#${link.id}`}`. On the homepage the existing click handler still `preventDefault`s, so behavior there is unchanged; from /about, /blog, /sitemap and every blog post the links start working immediately (browser handles cross-page anchors). Also: move the `navLinks` array to a single module (`src/nav.ts`) imported by `Layout.astro` and `BlogPost.astro` — BlogPost currently hardcodes its own duplicate copy at lines 74-80, which every later nav change would otherwise miss.
- Accept: clicking each nav item from a blog post lands on the matching homepage section; `grep -rn "label:" src/layouts/ src/components/` shows no inline nav arrays; exactly one definition of the links exists.

**1a.1 Filter drafts everywhere + RSS order** *(draft post fully published — high, ×3)*
- What: add `({ data }) => !data.draft` to `getCollection("blog")` in `src/pages/blog/[slug].astro:6` and `src/pages/blog/rss.xml.js:5`; sort RSS items newest-first. Add a redirect for the leaked URL (`/blog/why-vision-needs-embodiment/` → `/blog/`) to `vercel.json` — it is in the live XML sitemap today.
- Accept: `npx astro build` → no `dist/blog/why-vision-needs-embodiment/`; URL absent from `dist/sitemap-0.xml` and `dist/blog/rss.xml`; feed newest-first; redirect present in `vercel.json`.

**1a.2 Delete the Activities section and the Albums section** *(template placeholder, fake photo counts — high ×2)*
- What: remove the **entire** Activities block from `index.astro` (heading + list, lines ~88-105 — not just the `<li>`, which would leave a bare heading over an empty list) and the entire Albums section (~317-357). Remove `albums` from the shared nav list (one edit now, thanks to 1a.0). PRODUCT.md lists activities as a committed section: both sections return in Phase 3 when real content exists — deletion is the placeholder policy, not the product policy.
- Accept: `grep -rn 'album-tile\|album-count\|Year – Year' src/` empty (the draft's `photos\"` grep was vacuously true — the markup is `>15 photos</span>`); built homepage HTML contains neither section; nav shows 4 items on homepage **and on blog posts**.

**1a.3 Fix the facts (code-side)** *(ICCIP vs ICICIP, Yashinti, Aug-vs-Jun 2024)*
- What: **verify the venue name against IEEE record 10898141 first**, then make `index.astro:120` and `resume.md:17` agree (the repo proves only that they disagree); fix `resume.md:34` "Yashinti" → "Yashtini" (line 16 already has it right); `about.astro:32` "Aug 2024" → "Jun 2024".
- Accept: `grep -rn "Yashinti" .` empty; venue string identical in `index.astro` and `resume.md` and matching the IEEE record.

**1a.4 Fix the CV asset's git state** *(latent 404 on the primary CTA — moved from Phase 2 hygiene per council)*
- What: delete the `Arnur_Jumabekov_Resume-1.pdf` line from `.gitignore`; rename to `public/arnur-jumabekov-cv.pdf`; `git add` it; update the link at `index.astro:175`; `git rm -r resume-output/` (it ships the byte-identical "private" PDF — 222930 B, same file — so privacy is already forfeit; commit the CV openly). When the user's corrected PDF arrives (1b.2), it replaces this file at the same path.
- Accept: `git ls-files public/ | grep cv.pdf` non-empty; fresh clone + `npm ci` + `npm run build` produces a `dist/` where the CV link resolves; `resume-output/` gone.

**1a.5 One shared `<BaseHead>`: fonts, theme-init, RSS discovery, og:image URL** *(font @import chain — medium; FOUC + 404 dark mode — root cause; autodiscovery — low; hardcoded og URL ×3)*
- What: extract `src/components/BaseHead.astro` (charset, viewport, description, OG/Twitter block with og:image derived from `Astro.site` instead of three hardcoded strings, favicons, canonical, Google Fonts `preconnect` ×2 + `<link rel="stylesheet">` replacing `global.css:7`'s `@import`, RSS `<link rel="alternate">`, and the theme-init `is:inline` snippet **moved from Topbar's body into the head** — this fixes the light-flash on every page *and* dark mode on /404, which has no Topbar, in one edit with zero copies left behind). Use it in `Layout.astro`, `BlogPost.astro`, and `404.astro` (also drop 404's hardcoded `data-theme="light"`). Three files needing the same block is exactly the threshold where a component beats pasting.
- Accept: `grep "@import" src/styles/global.css` empty; font links + RSS link present in built HTML of homepage, a blog post, and 404; loading any page with `localStorage.theme=dark` shows no light flash; /404 follows the stored/system theme; `grep -rn "og-image.png" src/` hits only BaseHead.

**1a.6 Contrast + small a11y** *(--ink-faint AA failure — high; skip link, aria-pressed — low)*
- What: light theme **darken** `--ink-faint` `#8a8a8a` → `#6e6e6e` (4.88:1 on `#fafaf7`; note `#767676` measures 4.34:1 and *fails* — the draft's floor was wrong); dark theme **lighten** `#6b6b6b` → `#9a9a9a` (≥4.5:1 on `#151515`). Update DESIGN.md's tokens in **both** places it hardcodes them (YAML frontmatter `ink-faint`/`ink-dark-faint`, and the "Ink Faint" prose bullet at ~:113) — otherwise this plan reproduces its own root cause #2. Add skip link + `id="main-content"` to `BlogPost.astro`; sync `aria-pressed` on the theme toggle.
- Accept: measured ratios ≥4.5:1 both themes (state the numbers, don't just "verify with a checker"); `grep -c "8a8a8a" DESIGN.md src/styles/global.css` → 0; skip link in built post HTML; toggle exposes `aria-pressed`.

**1a.7 Shrink profile.jpg** *(94KB image for a 120px avatar — medium)*
- What: `sips` a 256×256 version (~10KB), referenced from `Layout.astro`.
- Accept: served avatar ≤ 15KB; visually identical at 120px.

**1a.8 Delete the broken test gate** *(reclassified from hygiene per council: test.yml cannot pass today)*
- What: `git rm .github/workflows/test.yml test-site.mjs`; drop the `test` script and `playwright` devDependency from `package.json`. It runs against a server that's never started, with browsers never installed, asserting claims that are false in the source. Build Check (`build-check.yml`) remains the honest gate. This also pre-empts the 2.x/CI ordering problem — nothing left to break.
- Accept: `.github/workflows/` contains only `build-check.yml`; `npm run build` green; no `npm test` script.

**1a.9 Draft the conference post pending real details** *(same fabricated-content class as Albums — council: internally inconsistent to delete one and keep the other)*
- What: set `draft: true` on `src/content/blog/notes-from-my-first-conference.mdx` today. It comes back in Phase 3.4 when the user supplies the conference name, poster title, and one artifact. Add its URL to the `vercel.json` redirect list (→ `/blog/`).
- Accept: post absent from built output, sitemap, and RSS; redirect in place.

### Phase 1b — Quick wins blocked on user assets (ship as each asset arrives; request all on day zero)

**1b.1 og-image.png** — one static 1200×630 `public/og-image.png` (name, tagline, warm-paper background). Accept: `curl -I https://jubaportfolio.vercel.app/og-image.png` → 200; card renders in an OG preview checker. *(Blocked on: a 20-minute design export.)*

**1b.2 Corrected CV PDF** — Yashtini spelled correctly, CUHK added to Education, venue matching 1a.3's verified string; replaces `public/arnur-jumabekov-cv.pdf`. Accept: downloaded PDF agrees with the site on every shared fact. *(Blocked on: user re-export.)*

**1b.3 "Currently seeking" block** *(promoted from Phase 3 per council: ~15 lines, and the only change that converts a visitor into an email)* — under the homepage lede: one sentence on what Arnur seeks, 2-3 audience lines ending in `mailto:` chips with prefilled subjects, reusing chip styles. Accept: a first-time visitor can state what he's seeking within one viewport; chips open prefilled email. *(Blocked on: one sentence from the user.)*

**1b.4 Author-version paper PDF + BibTeX** *(promoted from Phase 3 per council: the IEEE link is paywalled, so evaluators can't read the strongest asset; this is an upload plus two `<a>` tags, not a case-study build)* — self-archived accepted-manuscript PDF (IEEE permits) in `public/`, linked from the publication entry alongside DOI; BibTeX in a `<details>` block. Accept: publication entry links a non-paywalled PDF and copyable BibTeX. *(Blocked on: user locating the accepted manuscript.)*

### Phase 2 — Structural (1-2 days)

**2.1 Navigation architecture — an explicit decision, then execution**

The council flagged that the draft committed to a route split without presenting the alternative, and that the split contradicts PRODUCT.md Principle 3 ("One page, many audiences"), the yeraly.dsml.kz single-page reference, and the DIRECTION CONTRACT comments in both layouts. So: two options, tradeoff stated, **Option A recommended**.

- **Option A (recommended, ~30-line deletion): one scrolling page.** Delete the tab script (`Layout.astro:129-168`) and the `.page-section` hiding CSS (`global.css:524-531`); all sections render stacked; nav links are already `/#id` after 1a.0 and now scroll natively; add a few-line `hashchange` listener (or nothing) for active-state highlight on the homepage, keep server-set `active` for /blog. Replace the three wrong `61px` constants (`global.css:338/347/350` — actual topbar ≈81px) with one `--topbar-h` variable. Update the DIRECTION CONTRACT comments ("ONE section at a time" → scrolling sections) — either option requires this edit. Keeps PRODUCT.md intact. Keep `/about` as-is (live, indexed, harmless; its date already fixed in 1a.3) — no redirects needed.
- **Option B (route split): /publications, /projects, /cv pages.** Buys per-section URLs for applications, true `aria-current`, and per-page SEO — legitimate wants, but for 1 publication and 2 projects it produces thin pages, costs 1-2 days, and requires: amending PRODUCT.md Principle 3 and the DIRECTION CONTRACT comments; updating the hand-maintained `src/pages/sitemap.astro` (drop `/about/` at :33, add the new pages); a `/about` → `/` redirect in `vercel.json` (it is live and indexed); and the same `--topbar-h` fix.
- Accept (either option): content fully visible with JS disabled; every nav item works from every page including blog posts; `grep -n '61px' src/styles/global.css` empty (catches the `top: 61px` the draft's calc-only grep missed); no internal link in built output resolves to 404; **responsive check: 320px, 768px, and landscape mobile show no horizontal overflow and a reachable nav**. Option A additionally: `grep -rn "showSection" src/` empty. Option B additionally: sitemap page and XML sitemap list the new URLs; redirect live.

**2.2 Facts as one plain data module** *(rescoped per all three judges)*
- What: `src/data/cv.ts` — plain typed objects (publication, education, experience, projects, honors) imported by `index.astro` (and the section pages if Option B). Plus a **one-time manual diff** of site vs. PDF, which is the actual fix for the drift class of bug — the PDF is hand-made and no schema reaches it. Reconcile or delete `TODO.md` (it claims RSS and /blog/ are unbuilt; both shipped in 5c0f91f). Cut from the draft: the four zod collections, the malformed-date build test (it tests zod, not the site), the `.bib` emitter (one publication; 1b.4 hand-writes the BibTeX).
- Accept: `grep -n "ICICIP\|Yashtini" src/pages/` returns zero hits (the draft's "hits only data files" was impossible as written — data files aren't under src/pages/); site and PDF agree on every shared fact (recorded diff); TODO.md deleted or accurate.

**2.3 Remaining repo hygiene**
- What: `git rm` scratch files (`check.mjs`, `convert.mjs`, `convert_resume.py`, `extract.mjs`, `extract.cjs`, `shots.mjs`, `IMG_7716.JPG`); drop `pdf-parse`/`pdf2md`/`pdfjs-dist` from dependencies; rename package from `better-belt`; add a short README (stack, architecture, how to run).
- Accept: fresh clone + `npm ci` + `npm run build` succeeds and `dist/` matches production content (satisfiable now because 1a.4 committed the CV); `npm ls pdfjs-dist` errors (not installed); Build Check green.

### Phase 3 — Ambitious (user-dependent content; code is trivial — start collecting assets during Phase 1)

**3.1 WeCAViT evidence page** — one MDX page: real ablation table as plain HTML, 2-3 sample X-rays incl. one labeled failure case with a sentence on why, architecture figure, repo link. Colab badge only if runnable code exists. Accept: ≥1 real table, ≥1 labeled failure case; WeCAViT/QuantaSoil entries each carry a repo href or the ">17 ablations" claim links here.

**3.2 Real robot media (Albums/Activities return)** — 10-15s clips (pipe robot, tensegrity actuator) as short muted `<video autoplay muted loop playsinline>` with posters; embedded in project entries. Activities section returns with real activities. Reintroduce a nav-level Albums section only at ≥3 real assets. Accept: every media element is a real artifact (sign-off: the user confirms each clip is his own footage); no empty tiles or invented counts; page-weight increase ≤ ~1.5MB with lazy loading.

**3.3 Un-draft and anchor the conference post** — user adds conference name, poster title, poster PDF to `notes-from-my-first-conference.mdx`; flip `draft: false`; add hrefs to ISEF/KazSEF listings and ARMS Lab/ISSAI pages where official URLs exist. Link only what's verifiable. Accept: the post names its event and links one artifact; each award/affiliation with an official page is linked (sign-off: user confirms each URL is the official one).

---

## 4. Sequencing Notes

- Phase 1a is code-only and closes every high-severity finding including the nav (via 1a.0's cheap fix); nothing in it waits on anyone. Deploy same day.
- Request all four 1b assets (og-image, corrected PDF, seeking-sentence, author manuscript) on day zero so 1b trickles out during Phase 1a/2.
- 2.1's decision gates 2.2's render targets only under Option B; under Option A, 2.2 can start immediately after Phase 1a.
- The test-gate deletion (1a.8) removes the 2.1↔CI coupling the draft had backwards.
- Skipped and stays skipped until after Phase 2: Lighthouse CI, per-page OG generation, self-hosted fonts, pronunciation chip, /notes stream.

---

## 5. Council Score and mustFix Resolution

**Council scores: feasibility 7, impact 7, coherence 7 — average 7.0.**

How each mustFix was resolved (F=feasibility, I=impact, C=coherence):

| mustFix | Resolution |
|---|---|
| F1/I4/C4 — BlogPost.astro:74-80 duplicate nav array | **Fixed** — 1a.0 extracts `src/nav.ts`, both layouts import it; acceptance checks blog-post nav too. |
| F2 — 404.astro loses fonts when @import is removed | **Fixed** — 1a.5's `BaseHead.astro` used by all three HTML shells (Layout, BlogPost, 404). |
| F3/C-toggle — theme-init copy vs shared head; FOUC | **Fixed** — snippet moves from Topbar's body into BaseHead's `<head>`; fixes FOUC everywhere and 404 dark mode with zero copies. |
| F4/I8/C7 — CV tracking fix belongs in Phase 1; resume-output leak | **Fixed** — new 1a.4: un-ignore, rename, `git add`, delete `resume-output/`; 2.3's fresh-clone acceptance now satisfiable and retained. |
| F5/C8 — sitemap.astro + /about disposition + redirect | **Fixed** — folded into 2.1: Option A keeps /about (no redirect needed, sitemap.astro stays correct); Option B explicitly requires the sitemap.astro edit and a vercel.json redirect. |
| F6/I9 — cut/shrink 2.2 (zod collections over-engineered) | **Fixed** — 2.2 rescoped to one plain `src/data/cv.ts` + one-time site-vs-PDF diff; zod collections, malformed-date test, and .bib emitter cut. |
| F7/I12/C1 — present the cheap nav alternative; reconcile with PRODUCT.md | **Fixed** — 2.1 rewritten as an explicit A/B decision with the tradeoff stated; Option A (anchor scrolling, PRODUCT.md-compatible) recommended; Option B enumerates the PRODUCT.md/DIRECTION-CONTRACT amendments it requires. The 5-minute href fix moved to 1a.0 regardless. |
| F8/I10/C9 — test.yml is a broken gate; sequence with 2.1 | **Fixed** — reclassified; 1a.8 deletes `test.yml` + `test-site.mjs` in Phase 1a (decision stated: delete, not fix), dissolving the ordering problem. |
| F9 — ICCIP edit must verify against IEEE 10898141; resume.md self-contradiction | **Fixed** — 1a.3 says verify-then-align, and fixes resume.md:34 vs :16. |
| F10/I2 — split Phase 1 into code vs user-blocked | **Fixed** — Phases 1a (code, ~2h, today) and 1b (asset-blocked, day-zero requests). |
| I1 — nav href fix into Phase 1 | **Fixed** — 1a.0. |
| I3 — conference post decision in Phase 1 | **Fixed** — 1a.9 sets `draft: true` now; 3.3 un-drafts with real details. |
| I5 — redirects for removed URLs | **Fixed** — 1a.1/1a.9 add vercel.json redirects for both removed blog URLs; /about handled per 2.1 option. |
| I6 — promote seeking block | **Fixed** — 1b.3. |
| I7 — promote author PDF + BibTeX | **Fixed** — 1b.4. |
| I11 — responsive acceptance for 2.1 | **Fixed** — 320px/768px/landscape criterion added. |
| C2 — Activities: whole section, not just the `<li>` | **Fixed** — 1a.2 deletes heading + list, notes PRODUCT.md's commitment and the Phase-3 return path. |
| C3 — vacuous `photos\"` grep | **Fixed** — replaced with `album-tile\|album-count\|Year – Year` + built-HTML check. |
| C5 — wrong contrast floor (#767676 fails); "darken" wrong for dark theme | **Fixed** — 1a.6 states #6e6e6e (4.88:1) as target, notes #767676 fails at 4.34:1, and uses direction-specific wording (darken light / lighten dark) with measured ratios in acceptance. |
| C6 — DESIGN.md tokens ×2 + TODO.md staleness | **Fixed** — DESIGN.md sync inside 1a.6's acceptance; TODO.md reconcile-or-delete inside 2.2. |
| C10 — impossible/leaky acceptance greps | **Fixed** — 2.2 grep now "zero hits in src/pages/"; 2.1 grep now bare `61px` (catches `top: 61px`). |
| C11/I-weakness — "falsely highlights" mis-description | **Fixed** — exec summary now states the actual mechanism: `showSection("main")` strips the server-rendered active class; nothing highlights off-homepage. |
| C — Phase 3 subjective criteria need a verifier | **Fixed** — 3.2/3.3 name the sign-off (user attests footage/URLs). |

**Explicitly rejected:** none — every mustFix was incorporated. Two judge *suggestions beyond* mustFix scope were partially adopted: the og:image-hardcoded-URL observation (folded into 1a.5's BaseHead) and the inline-onclick CSP concern (not addressed — no CSP is configured or planned for this static site; revisit only if one is added).
