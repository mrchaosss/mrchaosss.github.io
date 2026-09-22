import { readFile, writeFile, readdir, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { siteConfig as c } from '../lib/site-config.ts';
const root = path.resolve('dist/client');
const walk = async (dir) =>
  (
    await Promise.all(
      (
        await readdir(dir, { withFileTypes: true })
      ).map(async (entry) =>
        entry.isDirectory()
          ? walk(path.join(dir, entry.name))
          : path.join(dir, entry.name),
      ),
    )
  ).flat();
// This brochure intentionally has no client React components or server actions.
// Fail closed if a future feature needs hydration rather than silently breaking it.
for (const dir of ['app', 'components'])
  for (const file of await walk(dir)) {
    if (!/\.[jt]sx?$/.test(file)) continue;
    const source = await readFile(file, 'utf8');
    if (/['"]use (client|server)['"]|\bon[A-Z]\w*=/.test(source))
      throw new Error('Static enhancement contract violated: ' + file);
  }
const settings = {
  bookingHref: c.bookingHref,
  checkoutHref: c.checkoutHref,
  contactEmail: c.contactEmail,
  utmParameters: c.utmParameters,
};
const flowLogic = (await readFile('scripts/flow-logic.js', 'utf8')).replace(
  /^export /gm,
  '',
);
const script = (await readFile('scripts/site-behavior.js', 'utf8'))
  .replace('/* __NOVREN_FLOW_LOGIC__ */', flowLogic)
  .replace('__NOVREN_SETTINGS__', JSON.stringify(settings));
const hash = createHash('sha256').update(script).digest('hex').slice(0, 12);
const scriptPath = '/_static/care-' + hash + '.js';
await mkdir(path.join(root, '_static'), { recursive: true });
await writeFile(path.join(root, scriptPath), script);
const htmlFiles = (await walk(root)).filter((f) => f.endsWith('.html'));
if (htmlFiles.length !== 11)
  throw new Error('Expected 10 pages plus the 404; found ' + htmlFiles.length);
const cssFiles = new Set();
for (const file of htmlFiles) {
  let html = await readFile(file, 'utf8');
  html = html.replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi, (all, attrs) =>
    /type=["']application\/ld\+json["']/.test(attrs) ? all : '',
  );
  html = html.replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, '');
  if (path.basename(file) === '404.html') {
    html = html
      .replace(/<title>[\s\S]*?<\/title>/g, '')
      .replace(
        /<meta\b[^>]*(?:name=["'](?:robots|description|twitter:[^"']*)["']|property=["']og:[^"']*["'])[^>]*>/gi,
        '',
      )
      .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
    html = html.replace(
      '</head>',
      '<title>Page not found | Novren</title><meta name="description" content="This page could not be found. Return to Novren Website Care."/><meta name="robots" content="noindex, follow"/><link rel="canonical" href="' +
        c.siteUrl +
        '/404.html"/><meta property="og:title" content="Page not found | Novren"/><meta property="og:description" content="Return to Novren Website Care."/><meta property="og:type" content="website"/><meta property="og:url" content="' +
        c.siteUrl +
        '/404.html"/><meta property="og:image" content="' +
        c.siteUrl +
        '/social-card.png"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="Page not found | Novren"/><meta name="twitter:description" content="Return to Novren Website Care."/><meta name="twitter:image" content="' +
        c.siteUrl +
        '/social-card.png"/></head>',
    );
  }
  if (!/<meta name="referrer"/.test(html))
    html = html.replace(
      '</head>',
      '<meta name="referrer" content="no-referrer"/></head>',
    );
  for (const m of html.matchAll(/href="([^"]+\.css)"/g))
    cssFiles.add(path.join(root, m[1]));
  html = html.replace(
    '</body>',
    '<script src="' + scriptPath + '" defer></script></body>',
  );
  if (
    html.includes('vinext.navigationRuntime') ||
    html.includes('modulepreload')
  )
    throw new Error('Hydration leaked');
  await writeFile(file, html);
}
// Remove generated hydration artifacts and unused build assets, including old CSS.
for (const file of await walk(root)) {
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const removable =
    rel.endsWith('.rsc') ||
    rel === 'vinext-client-entry-manifest.json' ||
    (rel.startsWith('_next/') && !cssFiles.has(file));
  if (removable) {
    if (!path.resolve(file).startsWith(root + path.sep))
      throw new Error('Unsafe output path');
    await unlink(file);
  }
}
const routes = [
  '/',
  '/service',
  '/process',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
  '/get-started',
];
await writeFile(
  path.join(root, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    routes
      .map(
        (route) =>
          '<url><loc>' +
          c.siteUrl +
          route +
          '</loc><lastmod>' +
          c.updatedDate +
          '</lastmod></url>',
      )
      .join('') +
    '</urlset>\n',
);
await writeFile(
  path.join(root, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + c.siteUrl + '/sitemap.xml\n',
);
await writeFile(path.join(root, '.nojekyll'), '');
if ((await readFile(path.join(root, 'CNAME'), 'utf8')).trim() !== 'novren.co')
  throw new Error('Missing production domain');
console.log(
  'Finalized ' +
    htmlFiles.length +
    ' static pages; one ' +
    Buffer.byteLength(script) +
    '-byte progressive-enhancement script; no React hydration.',
);
