import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist/client');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const server = http.createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
  } catch {
    res.writeHead(400).end();
    return;
  }
  let target = path.resolve(root, '.' + pathname);
  if (target !== root && !target.startsWith(root + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  let status = 200;
  try {
    if ((await stat(target)).isDirectory())
      target = path.join(target, 'index.html');
  } catch {
    if (!path.extname(target)) target += '.html';
  }
  let body;
  try {
    body = await readFile(target);
  } catch {
    status = 404;
    target = path.join(root, '404.html');
    body = await readFile(target);
  }
  res.writeHead(status, {
    'Content-Type': types[path.extname(target)] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  res.end(body);
});
server.listen(4173, '127.0.0.1', () =>
  console.log('Novren production preview: http://127.0.0.1:4173'),
);
