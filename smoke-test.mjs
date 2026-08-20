/*
  Post-build smoke test. Runs against dist/ — no dev server, no browser.
  Guards the regressions that actually shipped to production once:
  drafts leaking into the build, a 404ing og:image, an untracked CV asset,
  and nav links that only worked on the homepage.

  Usage: npm run build && npm test
*/
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

const DIST = "dist";
const failures = [];

function check(name, condition, detail = "") {
  if (condition) {
    console.log(`  ok   ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
    console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) htmlFiles.push(p);
  }
})(DIST);

const read = (p) => readFileSync(p, "utf8");
const home = read(join(DIST, "index.html"));

console.log("\nassets");
check("CV PDF is published", existsSync(join(DIST, "arnur-jumabekov-cv.pdf")));
check("CV download link points at it", home.includes('href="/arnur-jumabekov-cv.pdf"'));
check("og-image.png is published", existsSync(join(DIST, "og-image.png")));

console.log("\ndrafts stay unpublished");
const sitemap = existsSync(join(DIST, "sitemap-0.xml")) ? read(join(DIST, "sitemap-0.xml")) : "";
const rss = existsSync(join(DIST, "blog/rss.xml")) ? read(join(DIST, "blog/rss.xml")) : "";
for (const slug of ["why-vision-needs-embodiment", "notes-from-my-first-conference"]) {
  check(`${slug}: no page built`, !existsSync(join(DIST, "blog", slug)));
  check(`${slug}: absent from XML sitemap`, !sitemap.includes(slug));
  check(`${slug}: absent from RSS`, !rss.includes(slug));
}

console.log("\nhead is complete on every page");
for (const file of htmlFiles) {
  const html = read(file);
  const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));
  check(`${file}: fonts stylesheet`, head.includes("fonts.googleapis.com/css2"));
  check(`${file}: theme init before paint`, head.includes('localStorage.getItem("theme")'));
  check(`${file}: absolute og:image`, head.includes('content="https://jubaportfolio.vercel.app/og-image.png"'));
  check(`${file}: RSS autodiscovery`, head.includes('type="application/rss+xml"'));
}

console.log("\nnav works away from the homepage");
for (const file of htmlFiles) {
  const html = read(file);
  const fragmentOnly = [...html.matchAll(/class="topbar-link[^"]*"[^>]*/g)].length > 0
    && /href="#[a-z]+"\s+class="topbar-link/.test(html);
  check(`${file}: no homepage-only fragment hrefs`, !fragmentOnly);
}
check("homepage renders every nav target", ["main", "publications", "projects", "cv", "blog"].every((id) => home.includes(`id="${id}"`)));

console.log("\nno placeholder or contradicted content");
const allHtml = htmlFiles.map(read).join("\n");
for (const bad of ["album-tile", "album-count", "Year – Year", "ICCIP", "Yashinti", "Resume-1.pdf"]) {
  check(`"${bad}" is gone`, !allHtml.includes(bad));
}

console.log("\nfont-loading skeleton is JS-only, never baked into markup");
check(
  '"fonts-loading" never appears as a class in static HTML',
  !/class="[^"]*\bfonts-loading\b[^"]*"/.test(allHtml)
);

const cssFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".css")) cssFiles.push(p);
  }
})(DIST);
const allCss = cssFiles.map(read).join("\n");
check("skeleton @keyframes shipped in built CSS", /@keyframes\s+skeleton-pulse/.test(allCss));
check(
  "reduced-motion override for the skeleton shipped in built CSS",
  // Bounded to a single @media block — a loose cross-block match would pass even
  // if these three tokens lived in unrelated rules.
  /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{(?:[^@]|@(?!media))*?fonts-loading(?:[^@]|@(?!media))*?animation:\s*none\s*!important/.test(allCss)
);
check(
  "skeleton is wired to the real font faces, not document.fonts.ready",
  htmlFiles.every((f) => {
    const h = read(f);
    return h.includes('document.fonts.load("400 1em Inter")') && !/fonts\.ready\.then/.test(h);
  }),
  "at head time the FontFaceSet is empty, so fonts.ready resolves instantly and the skeleton never paints"
);

console.log("\ninternal links resolve");
const resolves = (url) => {
  const clean = url.split("#")[0].split("?")[0];
  if (!clean) return true;
  const p = join(DIST, clean.replace(/^\//, ""));
  return existsSync(p) || existsSync(join(p, "index.html")) || existsSync(`${p.replace(/\/$/, "")}.html`);
};
const broken = [];
for (const file of htmlFiles) {
  for (const [, url] of read(file).matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    if (!resolves(url)) broken.push(`${file} -> ${url}`);
  }
}
check(`all internal links resolve (${htmlFiles.length} pages)`, broken.length === 0, broken.join(", "));

console.log(
  failures.length === 0
    ? `\nPASS — ${htmlFiles.length} pages checked\n`
    : `\nFAIL — ${failures.length} problem(s):\n${failures.map((f) => `  - ${f}`).join("\n")}\n`
);
process.exit(failures.length === 0 ? 0 : 1);
