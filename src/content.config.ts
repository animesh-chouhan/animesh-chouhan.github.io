import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entry = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  featured: z.string().optional(),
  // Entries that already have their own page elsewhere on the site (e.g. /time/) link there instead of getting one.
  link: z.string().optional(),
  status: z.string().optional(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  // Posts with LaTeX get the KaTeX stylesheet; nothing else loads it.
  math: z.boolean().default(false),
});

export const collections = {
  posts: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/posts' }), schema: entry }),
  projects: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/projects' }), schema: entry }),
};
