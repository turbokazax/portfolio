import { chromium } from "playwright";

const results = [];
function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"} — ${name}${detail ? " :: " + detail : ""}`);
}

const browser = await chromium.launch();
const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

// ---- DESKTOP TESTS ----
const dpage = await desktop.newPage();
await dpage.goto("http://localhost:4321", { waitUntil: "networkidle" });

check("desktop: page loads", (await dpage.title())?.length > 0, await dpage.title());
check("desktop: name visible", await dpage.locator(".sidebar-name").isVisible());
check("desktop: nav links present", (await dpage.locator(".topbar-link").count()) >= 4);
check("desktop: theme toggle works", await dpage.locator(".theme-toggle").isVisible());

// nav navigation
await dpage.locator(".topbar-link[data-nav='projects']").click();
check("desktop: nav click shows projects", await dpage.locator("#projects").evaluate(el => getComputedStyle(el).display) === "block");
await dpage.locator(".topbar-link[data-nav='publications']").click();
check("desktop: nav click shows publications", await dpage.locator("#publications").evaluate(el => getComputedStyle(el).display) === "block");
await dpage.locator(".topbar-link[data-nav='cv']").click();
check("desktop: nav click shows cv", await dpage.locator("#cv").evaluate(el => getComputedStyle(el).display) === "block");

// theme toggle
const dThemeBefore = await dpage.getAttribute("html", "data-theme");
await dpage.locator(".theme-toggle").click();
const dThemeAfter = await dpage.getAttribute("html", "data-theme");
check("desktop: theme toggles", dThemeBefore !== dThemeAfter, `${dThemeBefore} -> ${dThemeAfter}`);

// social links
const orcidLink = await dpage.locator('.social-row a[aria-label="ORCID"]').getAttribute("href");
check("desktop: ORCID has href", orcidLink?.includes("orcid.org"), orcidLink);
const teleLink = await dpage.locator('.social-row a[aria-label="Telegram"]').getAttribute("href");
check("desktop: Telegram has href", teleLink?.includes("t.me"), teleLink);
const blogLink = await dpage.locator('.social-row a[aria-label="Blog"]').count();
check("desktop: blog icon removed", blogLink === 0);

// CV section
check("desktop: CV heading updated", (await dpage.locator("#cv .content-heading").first().innerText()) === "CV & Portfolio");
check("desktop: CV download chip visible", await dpage.locator(".download-chip").first().isVisible());
check("desktop: STEM portfolio chip visible", await dpage.locator(".download-chip--ghost").isVisible());

// education
check("desktop: CUHK degree present", (await dpage.locator(".entry-title").allInnerTexts()).some(t => t.includes("CUHK") || t.includes("Chinese University")));
check("desktop: A-Level chips removed", await dpage.locator(".score-group-label").filter({ hasText: "A-Levels" }).count() === 0);
check("desktop: Teaching removed", await dpage.locator("text=Teaching Assistant").count() === 0);

// ---- MOBILE TESTS ----
const mpage = await mobile.newPage();
await mpage.goto("http://localhost:4321", { waitUntil: "networkidle" });

check("mobile: page loads", (await mpage.title())?.length > 0);
check("mobile: no horizontal overflow", await mpage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2));
check("mobile: navbar sticky at top", await mpage.locator(".topbar").evaluate(el => getComputedStyle(el).position) === "sticky");
check("mobile: identity centered", await mpage.locator(".sidebar-bio").isVisible());
check("mobile: bio text centered", await mpage.locator(".sidebar-bio").evaluate(el => getComputedStyle(el).textAlign) === "center");
check("mobile: footer has bottom space", await mpage.locator(".sidebar-footer").evaluate(el => {
  const r = el.getBoundingClientRect();
  return (window.innerHeight - r.bottom) > 40;
}));
check("mobile: theme toggle visible", await mpage.locator(".theme-toggle").isVisible());

// mobile nav scroll
const navScrollWidth = await mpage.locator(".topbar-left").evaluate(el => el.scrollWidth);
const navClientWidth = await mpage.locator(".topbar-left").evaluate(el => el.clientWidth);
check("mobile: navbar horizontally scrollable", navScrollWidth > navClientWidth, `scroll=${navScrollWidth} client=${navClientWidth}`);

// mobile theme toggle
const mThemeBefore = await mpage.getAttribute("html", "data-theme");
await mpage.locator(".theme-toggle").click();
const mThemeAfter = await mpage.getAttribute("html", "data-theme");
check("mobile: theme toggles", mThemeBefore !== mThemeAfter);

// screenshots for visual record
await dpage.screenshot({ path: ".screenshots/desktop-main.png", fullPage: false });
await mpage.screenshot({ path: ".screenshots/mobile-main.png", fullPage: false });
await mpage.locator(".topbar-link[data-nav='cv']").click();
await mpage.screenshot({ path: ".screenshots/mobile-cv.png", fullPage: false });

// ---- DESIGN/AUDIT CHECKS ----
const contrastBg = await dpage.locator("body").evaluate(el => getComputedStyle(el).backgroundColor);
const contrastText = await dpage.locator("body").evaluate(el => getComputedStyle(el).color);
check("design: body has bg+text color", !!contrastBg && !!contrastText, `${contrastBg} / ${contrastText}`);

const fontDisplay = await dpage.locator(".content-heading").first().evaluate(el => getComputedStyle(el).fontFamily);
check("design: display font used", fontDisplay.includes("Fraunces") || fontDisplay.includes("Georgia"), fontDisplay);
const fontMono = await dpage.locator(".mono").first().evaluate(el => getComputedStyle(el).fontFamily);
check("design: mono font used", fontMono.includes("JetBrains") || fontMono.includes("monospace"), fontMono);

// link check
const deadLinks = [];
const links = await dpage.locator('a[href]').evaluateAll(els => els.map(e => ({ text: e.textContent.trim(), href: e.getAttribute("href") })));
for (const l of links) {
  if (l.href === "#" || l.href === "") deadLinks.push(l.text || "(no text)");
}
check("audit: no dead # links", deadLinks.length === 0, deadLinks.join(", ") || "clean");

// summary
const passed = results.filter(r => r.pass).length;
const failed = results.filter(r => !r.pass).length;
console.log(`\n==== ${passed} passed, ${failed} failed out of ${results.length} ====`);

await browser.close();
process.exit(failed > 0 ? 1 : 0);
