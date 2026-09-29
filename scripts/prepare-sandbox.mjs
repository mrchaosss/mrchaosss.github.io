import { cp, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('dist/client');
const target = path.resolve('dist/test-client');
const origin = 'https://novren-website-test.gabe-11c.workers.dev';
await cp(source, target, { recursive: true });
const walk = async (dir) => (await Promise.all((await readdir(dir, { withFileTypes: true })).map((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
let count = 0;
for (const file of await walk(target)) {
  if (!file.endsWith('.html')) continue;
  let html = await readFile(file, 'utf8');
  html = html.replaceAll('https://novren.co', origin)
    .replace(/<meta\b[^>]*name="robots"[^>]*>/g, '')
    .replace('</head>', '<meta name="robots" content="noindex,nofollow,noarchive"/><link rel="stylesheet" href="/_static/sandbox.css"/></head>')
    .replace(/<body([^>]*)>/, '<body$1><aside class="sandbox-banner"><strong>TEST WEBSITE — no real payments or service activation.</strong> Use example.com and gabe@novren.co. Stripe test card: 4242 4242 4242 4242, any future expiry and any 3-digit CVC.</aside>');
  await writeFile(file, html);
  count++;
}
await writeFile(path.join(target, '_static/sandbox.css'), '.sandbox-banner{background:#fff2ba;color:#272011;padding:16px 24px;text-align:center;font:15px/1.6 system-ui,sans-serif;border-bottom:2px solid #927015}.sandbox-banner strong{display:block}');
let headers = await readFile(path.join(target, '_headers'), 'utf8');
headers = headers.replace('/*\n', '/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n');
await writeFile(path.join(target, '_headers'), headers);
await writeFile(path.join(target, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`Prepared ${count} clearly labelled sandbox pages; production assets unchanged.`);
