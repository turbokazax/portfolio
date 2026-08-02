# Performance — Avatar Optimization

## Current state

- `public/profile.jpg` — 94,455 bytes (92 KB), 959 x 1280 px, JPEG.
- Rendered in the UI at 120 x 120 px (desktop) / 100 x 100 px (mobile) via CSS
  `.avatar { width: 100%; height: 100% }` inside a `.avatar-ring` of 120x120.
- The browser decodes a 959x1280 JPEG (~1.2 MP) only to paint a 120x120 (~0.014 MP)
  circle. ~98% of the decoded pixels are wasted.

## Recommended fix

1. Resize the source to **256 x 256** (2x the 120px render for retina, with margin).
2. Convert to **WebP** (lossy q75–q80 is plenty for a photo avatar). Expected size:
   ~8–15 KB vs. the current 92 KB — roughly **6–10x smaller**.
3. Replace `public/profile.jpg` with `public/profile.webp` (or keep the name and
   swap the file) and update the `<img src="/profile.jpg">` in
   `src/layouts/Layout.astro` to point at the new asset.

### Astro `<Image />` approach (preferred long-term)

Once the asset pipeline is in place, swap the hand-rolled `<img>` in
`src/layouts/Layout.astro` for Astro's built-in `<Image />`:

```astro
import { Image } from "astro:assets";
import profile from "../public/profile.jpg"; // or import the resized asset

<Image
  src={profile}
  alt="Profile photo"
  width={240}
  height={240}
  format="webp"
  class="avatar"
/>
```

`<Image />` handles format conversion, width/density variants, and `srcset`
automatically. For a single 120px-rounded avatar the manual resize is enough,
but `<Image />` is the right call if the site adds more images later.

## Status

- Asset not resized in this pass — no image tooling available in the task scope.
- Documented here so the resize can be done in the next asset pass.
