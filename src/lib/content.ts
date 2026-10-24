import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'posts'> | CollectionEntry<'projects'>;
export type Kind = 'posts' | 'projects';

export const byDateDesc = (a: Entry, b: Entry) => b.data.date.valueOf() - a.data.date.valueOf();

export async function sorted(kind: Kind): Promise<Entry[]> {
  return (await getCollection(kind)).sort(byDateDesc);
}

export const entryUrl = (e: Entry) => e.data.link ?? `/${e.collection}/${e.id}/`;
export const hasOwnPage = (e: Entry) => !e.data.link;

// Same slug rules Zola used for taxonomy URLs: "C++" -> "c", "YouTube" -> "youtube".
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
export const termUrl = (taxonomy: 'tags' | 'categories', name: string) => `/${taxonomy}/${slugify(name)}/`;

// Word count over the raw Markdown, as Zola did; reading time rounds up at 200 words a minute.
const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
export function wordCount(body = '') {
  let n = 0;
  for (const s of segmenter.segment(body)) if (s.isWordLike) n++;
  return n;
}
export const readingTime = (words: number) => Math.max(1, Math.ceil(words / 200));

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–' };
const decodeEntities = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e: string) =>
    e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENTITIES[e] ?? m);

// First real paragraph of prose (not an embed, heading, list or code), used for meta descriptions and list summaries.
export function excerpt(body = '', max = 180) {
  const text = body
    .replace(/^```[\s\S]*?^```/gm, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .find(p => p.length > 60 && !/^(<|#|\||-|\d+\.|>|!\[)/.test(p)) ?? '';
  const plain = decodeEntities(text.replace(/<[^>]+>/g, ''))
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, plain.lastIndexOf(' ', max)).replace(/[,;:.]$/, '') + '…';
}

export async function terms(taxonomy: 'tags' | 'categories') {
  const all = [...(await sorted('posts')), ...(await sorted('projects'))].sort(byDateDesc);
  const map = new Map<string, { name: string; slug: string; entries: Entry[] }>();
  for (const e of all) for (const name of e.data[taxonomy]) {
    const slug = slugify(name);
    if (!map.has(slug)) map.set(slug, { name, slug, entries: [] });
    map.get(slug)!.entries.push(e);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'UTC' });
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
