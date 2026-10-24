import { entryUrl, hasOwnPage, isoDate, sorted, terms } from "../lib/content";
import { SITE } from "../site";

// /harkat/ is a private page reached by direct link, so it stays out of the sitemap.
export async function GET() {
  const entries = [...(await sorted("posts")), ...(await sorted("projects"))];
  const urls: [string, string?][] = [["/"], ["/posts/"], ["/projects/"], ["/vault/"], ["/time/"], ["/tags/"], ["/categories/"]];
  for (const e of entries.filter(hasOwnPage)) urls.push([entryUrl(e), isoDate(e.data.date)]);
  for (const t of await terms("tags")) urls.push([`/tags/${t.slug}/`]);
  for (const c of await terms("categories")) urls.push([`/categories/${c.slug}/`]);
  const body = urls
    .map(([path, lastmod]) => `<url><loc>${new URL(path, SITE.url).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
