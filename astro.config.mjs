import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeContentFixes from './src/plugins/rehype-content-fixes.mjs';
import rehypeZolaHeadingIds from './src/plugins/rehype-zola-heading-ids.mjs';

export default defineConfig({
  site: 'https://animeshchouhan.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  markdown: {
    processor: unified({
      // Keep quotes and dashes exactly as written, like the old Zola site.
      smartypants: false,
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeZolaHeadingIds, [rehypeKatex, { strict: 'ignore' }], rehypeContentFixes],
    }),
    // Code blocks follow the light/dark color scheme (switched in global.css).
    shikiConfig: { themes: { light: 'github-light-default', dark: 'github-dark-default' }, defaultColor: false },
  },
  redirects: {
    // The "calcuator" tag was a typo; keep its old URL working.
    '/tags/calcuator/': '/tags/calculator/',
    '/tags/calcuator/page/1/': '/tags/calculator/',
  },
});
