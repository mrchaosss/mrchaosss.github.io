import { rm, realpath, readFile } from 'node:fs/promises';
import path from 'node:path';
const root = await realpath(process.cwd());
if ((await readFile(path.join(root, 'CNAME'), 'utf8')).trim() !== 'novren.co')
  throw new Error('Unexpected project');
const target = path.resolve(root, 'dist');
if (path.dirname(target) !== root || path.basename(target) !== 'dist')
  throw new Error('Unsafe build path');
await rm(target, { recursive: true, force: true });
