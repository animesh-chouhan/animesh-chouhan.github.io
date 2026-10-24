// Copy the KaTeX stylesheet and fonts that rehype-katex renders with into public/vendor/katex,
// so only pages with math load them (as a plain <link>) instead of every page bundling them.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const katexPkg = require.resolve('katex/package.json', { paths: [path.dirname(require.resolve('rehype-katex'))] });
const dist = path.join(path.dirname(katexPkg), 'dist');
const out = path.resolve('public/vendor/katex');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'fonts'), { recursive: true });
fs.copyFileSync(path.join(dist, 'katex.min.css'), path.join(out, 'katex.min.css'));
for (const f of fs.readdirSync(path.join(dist, 'fonts'))) {
  if (f.endsWith('.woff2')) fs.copyFileSync(path.join(dist, 'fonts', f), path.join(out, 'fonts', f));
}
console.log(`vendored KaTeX ${require(katexPkg).version} into public/vendor/katex`);
