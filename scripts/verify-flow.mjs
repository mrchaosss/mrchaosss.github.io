import assert from 'node:assert/strict';
import {
  normalizeWebsiteUrl,
  qualifyWebsite,
  buildOnboardingMessage,
} from './flow-logic.js';
const base = {
  website: 'example.com',
  wordpress: 'yes',
  oneSite: 'yes',
  complexity: 'standard',
};
assert.equal(qualifyWebsite(base).status, 'eligible');
assert.equal(normalizeWebsiteUrl('example.com'), 'https://example.com');
assert.equal(
  normalizeWebsiteUrl('https://example.com/'),
  'https://example.com',
);
for (const wordpress of ['no', 'unsure'])
  assert.equal(qualifyWebsite({ ...base, wordpress }).status, 'review');
assert.equal(qualifyWebsite({ ...base, oneSite: 'no' }).status, 'review');
for (const complexity of ['review', 'unsure'])
  assert.equal(qualifyWebsite({ ...base, complexity }).status, 'review');
for (const field of ['wordpress', 'oneSite', 'complexity'])
  assert.equal(qualifyWebsite({ ...base, [field]: '' }).status, 'error');
for (const website of [
  '',
  'javascript:alert(1)',
  'https://user:secret@example.com',
  'https://example.com?token=secret',
  'http://localhost',
  'http://127.0.0.1',
  'http://10.1.1.1',
  'http://192.168.1.1',
  'https://example.com/#secret',
])
  assert.equal(qualifyWebsite({ ...base, website }).status, 'error', website);
const message = buildOnboardingMessage({
  business: 'Example Business',
  contactName: 'Test',
  email: 'test@example.com',
  website: 'https://example.com',
  licenses: 'Customer maintains active licenses',
});
assert.ok(message.includes('Website: https://example.com'));
assert.ok(message.includes('secure site connection steps'));
assert.ok(!message.includes('undefined'));
console.log(
  'Eligibility branches, missing answers, unsafe URLs, and onboarding message checks passed.',
);
