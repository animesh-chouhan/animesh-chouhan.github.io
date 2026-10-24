// Small fixes applied to every Markdown page so the content files can stay as written.
const SITE_HOST = 'animeshchouhan.com';

function walk(node, parent, fn) {
  fn(node, parent);
  if (node.children) for (const child of [...node.children]) walk(child, node, fn);
}

const embedTitle = src => {
  if (/youtube\.com|youtu\.be/.test(src)) return 'YouTube video';
  if (/spotify\.com/.test(src)) return 'Spotify player';
  return 'Embedded content';
};

// Most images and embeds in the content are raw HTML, which reaches rehype as plain strings.
const fixRawHtml = html => html
  .replace(/<img\b(?![^>]*\sloading=)/gi, '<img loading="lazy" decoding="async"')
  .replace(/<iframe\b([^>]*)>/gi, (tag, attrs) => {
    let a = attrs;
    if (!/\sloading=/i.test(a)) a = ' loading="lazy"' + a;
    if (!/\stitle=/i.test(a)) a = ` title="${embedTitle((a.match(/\ssrc="([^"]*)"/i) ?? [])[1] ?? '')}"` + a;
    return `<iframe${a}>`;
  });

export default function rehypeContentFixes() {
  return tree => {
    walk(tree, null, (node, parent) => {
      if (node.type === 'raw') { node.value = fixRawHtml(node.value); return; }
      if (node.type !== 'element') return;
      const p = (node.properties ??= {});

      if (node.tagName === 'img') {
        p.loading ??= 'lazy';
        p.decoding ??= 'async';
      }

      // Wide equations scroll sideways on phones; make them reachable by keyboard like code blocks.
      if (node.tagName === 'span' && (p.className ?? []).includes('katex-display')) p.tabIndex = 0;

      if (node.tagName === 'iframe') {
        p.loading ??= 'lazy';
        if (!p.title) p.title = embedTitle(String(p.src ?? ''));
      }

      // Wide tables scroll inside their own box instead of widening the page on phones.
      if (node.tagName === 'table' && parent && !(parent.properties?.className ?? []).includes('table-wrap')) {
        const i = parent.children.indexOf(node);
        parent.children[i] = { type: 'element', tagName: 'div', properties: { className: ['table-wrap'], tabIndex: 0 }, children: [node] };
      }

      // Same treatment Zola gave external links, minus links back to this site.
      if (node.tagName === 'a' && typeof p.href === 'string' && /^https?:\/\//.test(p.href)) {
        let host = '';
        try { host = new URL(p.href).host; } catch {}
        if (host !== SITE_HOST && host !== 'www.' + SITE_HOST) {
          p.target = '_blank';
          p.rel = ['noopener', 'nofollow', 'noreferrer'];
        }
      }
    });
  };
}
