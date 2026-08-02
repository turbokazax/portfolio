# Analytics Task

Add privacy-friendly analytics to track page views. Two options below — pick one, don't install both.

## Option A: Vercel Analytics (recommended for Vercel deploys)

Fast, privacy-first, no cookie banner needed for basic usage.

### Install

```bash
npm install @vercel/analytics
```

### Add to Layout

In `src/layouts/Layout.astro`, import and add `<Analytics />` inside the `<head>`:

```astro
import { Analytics } from "@vercel/analytics/astro";

<head>
  ...
  <Analytics />
</head>
```

That's the minimal config. It auto-instruments page views on Vercel deploys. For partytown (offloading to a web worker), use `@vercel/analytics/react` with the `mode` prop — but the Astro integration handles the default case without extra config.

## Option B: Plausible (self-hosted-friendly, lightweight)

Add this script to the `<head>` in `src/layouts/Layout.astro`:

```html
<script
  defer
  data-domain="jubaportfolio.vercel.app"
  src="https://plausible.io/js/script.js"
></script>
```

Replace `data-domain` with your actual domain and the `src` with your Plausible instance URL if self-hosting.

## Pick one

- On Vercel already → Option A, zero config.
- Want a cookie-light, GDPR-friendly option with a dashboard → Option B.

## Verify

After deploy, check the analytics dashboard (Vercel Analytics or Plausible) for incoming page views. You can also inspect the page source for the injected script tag.
