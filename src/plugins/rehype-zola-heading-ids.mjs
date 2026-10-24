// Heading ids the way Zola made them (Rust `slug` crate), so links to #sections from the old site keep working.
// Runs before rehype-katex, so headings with math are slugged from their TeX source like Zola did.

// The few non-ASCII characters used in headings, transliterated as deunicode does.
const DEUNICODE = { '🙌': 'raised_hands', '⛵': 'boat','α': 'a', 'β': 'b', 'π': 'p', '’': "'", '‘': "'", '“': '"', '”': '"', '–': '-', '—': '-', '…': '...' };

export function zolaSlug(text) {
  let out = '';
  let prevDash = true;
  const push = ch => {
    if (/[a-z0-9]/.test(ch)) { out += ch; prevDash = false; }
    else if (/[A-Z]/.test(ch)) { out += ch.toLowerCase(); prevDash = false; }
    else if (!prevDash) { out += '-'; prevDash = true; }
  };
  for (const ch of text) {
    if (ch.charCodeAt(0) < 128) push(ch);
    else for (const c of (DEUNICODE[ch] ?? ch.normalize('NFKD').replace(/[^\x00-\x7f]/g, '') ?? '-') || '-') push(c);
  }
  return out.endsWith('-') ? out.slice(0, -1) : out;
}

const textOf = node => node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

export default function rehypeZolaHeadingIds() {
  return tree => {
    const seen = new Map();
    const visit = node => {
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName) && !node.properties?.id) {
        const base = zolaSlug(textOf(node));
        const n = seen.get(base) ?? 0;
        seen.set(base, n + 1);
        node.properties = { ...node.properties, id: n ? `${base}-${n}` : base };
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
