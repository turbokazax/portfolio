# RSS Task

Add an RSS feed for the blog collection so readers and aggregators can subscribe.

## Install

```bash
npm install @astrojs/rss
```

## Create the feed endpoint

Create `src/pages/blog/rss.xml.js`:

```js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");

  return rss({
    title: "Arnur Jumabekov — Blog",
    description: "Notes on research, conferences, and building things.",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
```

## Notes

- `context.site` is provided automatically by Astro and resolves to the site URL (set `site` in `astro.config.mjs` if not deploying to a known URL).
- The `link` field uses the standard blog route pattern `/blog/<slug>/` — adjust if your blog route differs.
- Each frontmatter post needs `title`, `description`, and `date` fields (all present on existing posts).
- The feed is available at `/blog/rss.xml` after build.

## Verify

After `npm run build`, fetch `https://jubaportfolio.vercel.app/blog/rss.xml` and validate with any RSS validator.
