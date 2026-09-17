import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { siteConfig as c } from '../lib/site-config.ts';
const root = path.resolve('dist/client');
const routes = [
  '/',
  '/service',
  '/process',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
  '/404.html',
];
const fileFor = (route) =>
  path.join(
    root,
    route === '/'
      ? 'index.html'
      : route.replace(/^\//, '') + (path.extname(route) ? '' : '.html'),
  );
const pages = new Map(
  await Promise.all(
    routes.map(async (route) => [
      route,
      await readFile(fileFor(route), 'utf8'),
    ]),
  ),
);
const decode = (s) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&#x27;', "'")
    .replaceAll('&quot;', '"');
const checks = [];
for (const [route, html] of pages) {
  assert.equal((html.match(/<h1\b/g) || []).length, 1, route + ' H1');
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<a[^>]*class="skip-link"[^>]*href="#main-content"/);
  assert.match(html, /<main[^>]*id="main-content"/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.ok(
    html.includes('rel="canonical" href="' + c.siteUrl + (route === '/' ? '' : route) + '"'),
    route + ' canonical',
  );
  assert.ok(
    html.includes('property="og:url" content="' + c.siteUrl + (route === '/' ? '' : route) + '"'),
    route + ' OG URL',
  );
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.ok(html.includes(c.siteUrl + '/social-card.png'));
  assert.match(html, /rel="icon"[^>]*href="\/favicon.svg"/);
  assert.ok(!html.includes(c.portal.href), 'Portal hidden');
  assert.ok(
    !/vinext.navigationRuntime|modulepreload|<iframe\b|<form\b/.test(html),
  );
  const executable = [...html.matchAll(/<script\b([^>]*)>/g)].filter(
    (m) => !m[1].includes('application/ld+json'),
  );
  assert.equal(executable.length, 1);
  assert.match(executable[0][1], /src="\/_static\/care-[a-f0-9]{12}\.js"/);
  if (route === '/404.html')
    assert.match(html, /name="robots" content="noindex, follow"/);
  else assert.ok(!html.includes('content="noindex'));
  for (const m of html.matchAll(
    /<(?:a|link|script|img)\b[^>]*(?:href|src)="([^"]+)"/g,
  )) {
    const href = decode(m[1]);
    if (href.startsWith('mailto:')) {
      assert.equal(href, 'mailto:' + c.contactEmail);
      continue;
    }
    if (/^https?:/.test(href)) continue;
    const url = new URL(href, 'https://novren.co' + route);
    const target = pages.get(url.pathname);
    if (target === undefined) {
      const physical = path.join(root, url.pathname);
      assert.ok((await stat(physical)).isFile(), 'Asset: ' + href);
    } else if (url.hash) {
      assert.ok(
        target.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'),
        'Anchor ' + route + ' -> ' + href,
      );
    }
  }
  checks.push({
    route,
    h1: 1,
    links: true,
    metadata: true,
    scripts: executable.length,
  });
}
assert.equal(
  new Set([...pages.values()].map((h) => h.match(/<title>(.*?)<\/title>/)[1]))
    .size,
  9,
);
const graph = JSON.parse(
  pages
    .get('/')
    .match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
)['@graph'];
assert.equal(graph[0].name, c.name);
assert.equal(graph[0].email, c.contactEmail);
assert.equal(graph[1].offers.price, c.monthlyPrice);
assert.ok(graph[1].offers.description.includes(String(c.onboardingFee)));
assert.ok(
  !JSON.stringify(graph).match(
    /aggregateRating|review|address|foundingDate|areaServed/,
  ),
);
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
for (const route of routes.slice(0, -1))
  assert.ok(sitemap.includes('<loc>' + c.siteUrl + route + '</loc>'));
assert.ok(!sitemap.includes('404'));
assert.ok(
  (await readFile(path.join(root, 'robots.txt'), 'utf8')).includes(
    c.siteUrl + '/sitemap.xml',
  ),
);
assert.equal(
  (await readFile(path.join(root, 'CNAME'), 'utf8')).trim(),
  'novren.co',
);
const png = await readFile(path.join(root, 'social-card.png'));
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
const scriptFile = (await readdir(path.join(root, '_static')))[0];
const script = await readFile(path.join(root, '_static', scriptFile), 'utf8');
function campaignTest(query) {
  const links = [
    { raw: '/service', booking: false },
    { raw: '#included', booking: false },
    { raw: c.bookingHref, booking: true },
    { raw: 'mailto:' + c.contactEmail, booking: false },
    { raw: 'https://example.com/', booking: false },
  ].map((x) => ({
    ...x,
    getAttribute() {
      return this.raw;
    },
    hasAttribute() {
      return this.booking;
    },
    set href(v) {
      this.result = v;
    },
  }));
  const context = {
    URL,
    URLSearchParams,
    window: {
      location: {
        search: query,
        href: 'https://novren.co/' + query,
        origin: 'https://novren.co',
      },
    },
    document: { querySelectorAll: () => links, getElementById: () => null },
  };
  vm.runInNewContext(script, context);
  return links;
}
const valid = campaignTest(
  '?utm_source=email&utm_medium=cold-email&utm_campaign=care_launch&utm_term=wordpress&utm_content=a&email=private&redirect=https://bad.test',
);
for (const link of valid.slice(0, 3)) {
  assert.ok(link.result.includes('utm_source=email'));
  assert.ok(!link.result.includes('private'));
  assert.ok(!link.result.includes('redirect='));
}
assert.equal(valid[3].result, undefined);
assert.equal(valid[4].result, undefined);
for (const query of [
  '?utm_source=a&utm_source=b',
  '?utm_campaign=name%40example.com',
  '?utm_source=%3Cscript%3E',
  '?utm_source=' + 'a'.repeat(81),
])
  assert.equal(campaignTest(query)[2].result, undefined);
assert.ok(!/localStorage|sessionStorage|document.cookie|fetch\(/.test(script));
const walk = async (dir) =>
  (
    await Promise.all(
      (
        await readdir(dir, { withFileTypes: true })
      ).map(async (f) =>
        f.isDirectory() ? walk(path.join(dir, f.name)) : path.join(dir, f.name),
      ),
    )
  ).flat();
const old =
  /managed reputation|online reputation|\$699|review requests|review monitoring|200 review responses|Google Business Profile|70\+ directories|listings synchronization|review velocity|local rank grids?|policy-violation reporting|per.location pricing|phone number coming soon|HOTH/i;
const secrets =
  /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|sk_live_[A-Za-z0-9]{16,}|AKIA[A-Z0-9]{16}|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----)/;
for (const dir of ['app', 'components', 'lib', 'public', 'dist/client'])
  for (const file of await walk(dir)) {
    if (/\.(png|woff2?)$/.test(file)) continue;
    const text = await readFile(file, 'utf8');
    assert.ok(!old.test(text), 'Obsolete copy in ' + file);
    assert.ok(!secrets.test(text), 'Potential secret in ' + file);
  }
const result = {
  date: new Date().toISOString(),
  checks,
  utmCases:
    'valid five parameters; internal navigation; booking; email and external exclusion; duplicate, email-like, markup, oversized rejection',
  sourceAndOutputScan: 'pass',
  socialImage: [1200, 630],
  javascriptBytes: Buffer.byteLength(script),
};
console.log(JSON.stringify(result, null, 2));
