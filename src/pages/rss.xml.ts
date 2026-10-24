import { byDateDesc, entryUrl, excerpt, sorted } from "../lib/content";
import { SITE } from "../site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const entries = [...(await sorted("posts")), ...(await sorted("projects"))].sort(byDateDesc);
  const items = entries.map((e) => {
    const url = new URL(entryUrl(e), SITE.url).href;
    return `<item><title>${esc(e.data.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${e.data.date.toUTCString()}</pubDate><description>${esc(e.data.description ?? excerpt(e.body))}</description></item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${esc(SITE.title)}</title><link>${SITE.url}/</link><description>${esc(SITE.description)}</description><language>en</language>${items.join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
