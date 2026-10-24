# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal site and blog for Animesh Chouhan, served at <https://animeshchouhan.com> from GitHub Pages. It is a static [Astro](https://astro.build) 7 site with a deliberately minimal design and as few dependencies as possible. Keep it that way: no CSS framework, no UI framework, and no new dependency unless it is clearly necessary.

It was migrated from Zola (DeepThought theme, Bulma) in October 2026. `audit/` (gitignored) holds the pre-migration baseline (`audit/report/`, `audit/screenshots/`) and the migration report with before/after screenshots (`audit/migration/index.html`). The capture scripts are in `audit/tools/`; rerun `capture.mjs` against a served `dist/` to compare future changes with the baseline.

## Commands

```sh
npm install
npm run dev       # dev server on http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/
```

There are no tests or linters. A successful `npm run build` is the check. Astro caches rendered Markdown and does not notice edits to the plugins in `src/plugins/`; after changing one, run `rm -rf .astro node_modules/.astro` before building (CI always builds from scratch). `predev`/`prebuild` run `scripts/vendor-katex.mjs`, which copies the KaTeX CSS and fonts that `rehype-katex` uses into `public/vendor/katex/` (gitignored).

Deploys happen in CI only: `.github/workflows/deploy.yml` runs `npm ci && npm run build` on every push to `master` and publishes `dist/`. Nothing built is committed.

## Layout

- `src/content/posts/*.md`, `src/content/projects/*.md`: entries with YAML front matter (`title`, `date`, `featured`, `categories`, `tags`, optional `description`, `status`, `math`). The filename is the URL slug (`/posts/<slug>/`). Schema: `src/content.config.ts`.
- `src/content/home.md`: the About text on the home page.
- `src/site.ts`: site title, default description, nav links, social links, GA4 ID.
- `src/lib/content.ts`: sorting, excerpts (used as meta descriptions and list summaries when there is no `description`), reading time, and taxonomy slugs (`C++` becomes `/categories/c/`).
- `src/layouts/Base.astro`: the page shell and all `<head>` metadata. `EntryPage.astro` renders posts and projects.
- `src/styles/global.css`: the only stylesheet. Every color is one `light-dark()` pair (light: Copperhead's page white `#FDFCFC`; dark: the original site's black palette), so theming is just `color-scheme`. It follows the OS until the header switch sets `data-theme` on `<html>`; the choice is saved in `localStorage.theme` and applied by an inline script in `<head>` before first paint. The navbar copies the old site's (52px bar, highlighted current item, old container widths), except that below 768px the links get their own always-visible row of Chrome-style tabs (current page's tab joins the page) instead of a burger menu. The theme switch is the only JavaScript on ordinary pages. The home page passes `centered` to `Base` to center its content vertically.
- `src/pages/time.astro`, `vault.astro`, `harkat.astro`: standalone pages. Vault and Harkat use `components/RiddleLock.astro`: the riddle answer is the AES-GCM key (PBKDF2), so their hidden content can only be changed by re-encrypting it with the answer.

## Content conventions

- Math uses `$…$` and `$$…$$` and is rendered at build time by `remark-math` + `rehype-katex` (configured through `@astrojs/markdown-remark`'s `unified()` processor in `astro.config.mjs`). Set `math: true` in the front matter so the page loads the KaTeX stylesheet.
- Markdown may contain raw HTML (centered `<img>` tags, iframes, tweet embeds). `src/plugins/rehype-content-fixes.mjs` lazy-loads images and iframes, titles embeds, wraps tables for horizontal scrolling, and adds `target="_blank" rel="noopener nofollow noreferrer"` to external links.
- Smart punctuation is off (`smartypants: false`): quotes and dashes render exactly as typed, as on the old site.
- Heading ids come from `src/plugins/rehype-zola-heading-ids.mjs`, a port of Zola's slug rules, so old `#section` links still resolve. It must stay before `rehype-katex` in the plugin list so math headings are slugged from their TeX. New non-ASCII characters in headings may need an entry in its `DEUNICODE` map.
- Static files live in `public/` at the same URLs as before (`/images/...`, `/files/resume-animesh-public.pdf`, `/icons/...`).

## URLs that must keep working

Old Zola URLs are preserved. `/posts/page/N/`, `/projects/page/N/`, `/tags/<t>/page/1/` and `/categories/<c>/page/1/` are meta-refresh redirect pages (`components/Redirect.astro`), and `/tags/calcuator/` redirects to the corrected `/tags/calculator/` (`astro.config.mjs`). `sitemap.xml` and `rss.xml` are hand-written endpoints in `src/pages/`; `/harkat/` is intentionally left out of the sitemap.
