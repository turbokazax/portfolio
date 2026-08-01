import { chromium } from "playwright";

const BASE = "http://localhost:4321";
const shots = [
  ["desktop-main-light", 1280, 900, "main", "light"],
  ["desktop-main-dark", 1280, 900, "main", "dark"],
  ["desktop-cv-light", 1280, 900, "cv", "light"],
  ["desktop-cv-dark", 1280, 900, "cv", "dark"],
  ["mobile-main-light", 390, 844, "main", "light"],
  ["mobile-main-dark", 390, 844, "main", "dark"],
  ["mobile-cv-light", 390, 844, "cv", "light"],
  ["mobile-cv-dark", 390, 844, "cv", "dark"],
];

const browser = await chromium.launch();
const out = [];

for (const shot of shots) {
  const name = shot[0];
  const w = shot[1];
  const h = shot[2];
  const section = shot[3];
  const theme = shot[4];
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    isMobile: w < 500,
    hasTouch: w < 500,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate((t) => {
    document.documentElement.setAttribute("data-theme", t);
  }, theme);
  if (section !== "main") {
    await page.locator(`.topbar-link[data-nav="${section}"]`).first().click();
    await page.waitForTimeout(250);
  }
  const fullPage = w >= 500;
  await page.screenshot({ path: `.screenshots/${name}.png`, fullPage });
  out.push(name);
  await ctx.close();
}

console.log("captured:", out.join(", "));
await browser.close();
