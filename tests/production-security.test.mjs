import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID, createHmac } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { qualify, website, onboardingDetails } from '../server/validation.ts';

const base = 'http://localhost:8787';
const good = {
  website: 'example.com',
  platform: 'yes',
  oneSite: 'yes',
  complexity: ['none'],
};
test('qualification only allows one ordinary existing WordPress site', () => {
  assert.equal(qualify(good).kind, 'eligible');
  for (const platform of ['no', 'unsure'])
    assert.notEqual(qualify({ ...good, platform }).kind, 'eligible');
  for (const value of [
    'store',
    'members',
    'multisite',
    'custom',
    'sensitive',
    'repair',
    'unsure',
  ])
    assert.equal(qualify({ ...good, complexity: [value] }).kind, 'review');
  assert.throws(() => qualify({ ...good, complexity: ['none', 'store'] }));
  assert.throws(() => qualify({ ...good, complexity: ['unrecognized'] }));
});
test('public URL validation rejects secrets, private addresses and non-http URLs', () => {
  for (const value of [
    'http://127.0.0.1',
    'http://172.20.1.2',
    'http://10.0.0.1',
    'https://a:b@example.com',
    'https://example.com/?key=secret',
    'https://example.com/#token',
    'file:///tmp/a',
    'javascript:alert(1)',
    'http://[::1]',
  ])
    assert.throws(() => website(value), value);
  assert.equal(website('www.example.com/'), 'https://www.example.com');
});
test('onboarding accepts only bounded operational fields', () => {
  const v = onboardingDetails({
    critical: 'Contact page',
    access: 'self',
    password: 'DO NOT STORE',
    unexpected: 'drop',
  });
  assert.equal(v.critical, 'Contact page');
  assert.equal('password' in v, false);
  assert.equal('unexpected' in v, false);
  assert.throws(() =>
    onboardingDetails({ critical: 'x'.repeat(2001), access: 'self' }),
  );
});
async function post(path, data, cookie = '', origin = base) {
  return fetch(base + path, {
    method: 'POST',
    headers: {
      Origin: origin,
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(data),
  });
}
function event(ref, overrides = {}) {
  return {
    id: 'evt_local_' + randomUUID(),
    object: 'event',
    type: 'checkout.session.completed',
    livemode: false,
    created: Math.floor(Date.now() / 1000),
    data: {
      object: {
        id: 'cs_test_' + randomUUID(),
        object: 'checkout.session',
        payment_link: 'plink_1UIbZEGmxVYsIEOruIytro0O',
        mode: 'subscription',
        payment_status: 'paid',
        status: 'complete',
        currency: 'usd',
        amount_subtotal: 39900,
        amount_total: 39900,
        client_reference_id: ref,
        customer: 'cus_test_local',
        subscription: 'sub_test_' + randomUUID(),
        customer_details: {
          email: 'alex@example.com',
          name: 'Alex Test',
          individual_name: 'Alex Test',
          business_name: 'Example Test',
        },
        custom_fields: [
          { key: 'websiteurl', type: 'text', text: { value: 'example.com' } },
        ],
        ...overrides,
      },
    },
  };
}
async function signed(e, valid = true) {
  const payload = JSON.stringify(e),
    t = Math.floor(Date.now() / 1000);
  const signature = createHmac(
    'sha256',
    valid ? 'whsec_local_test_only' : 'incorrect',
  )
    .update(t + '.' + payload)
    .digest('hex');
  return fetch(base + '/api/stripe/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': `t=${t},v1=${signature}`,
    },
    body: payload,
  });
}
test('real local Worker enforces payment, origin, signatures and client separation', async () => {
  assert.equal(
    (await post('/api/checkout', good, '', 'https://attacker.example')).status,
    403,
  );
  assert.equal(
    (
      await post('/api/onboarding', {
        critical: 'Contact form',
        access: 'self',
      })
    ).status,
    401,
  );
  const testSite = 'qa-' + randomUUID() + '.example.com';
  const fit = await post('/api/checkout', { ...good, website: testSite });
  assert.equal(fit.status, 200);
  const cookie = fit.headers.get('set-cookie').split(';')[0];
  assert.match(fit.headers.get('set-cookie'), /HttpOnly/);
  assert.match(fit.headers.get('set-cookie'), /Secure/);
  const next = await fit.json();
  const ref = new URL(next.url).searchParams.get('client_reference_id');
  assert.ok(ref);
  const read = async (c) =>
    (
      await fetch(base + '/api/status', { headers: c ? { Cookie: c } : {} })
    ).json();
  assert.equal((await read(cookie)).payment, 'pending');
  const payment = event(ref);
  const address = 'qa-' + randomUUID() + '@example.com';
  payment.data.object.customer_details.email = address;
  payment.data.object.custom_fields[0].text.value = testSite;
  assert.equal((await signed(payment, false)).status, 400);
  assert.equal((await read(cookie)).payment, 'pending');
  const wrongMode = {
    ...payment,
    id: 'evt_local_' + randomUUID(),
    livemode: true,
  };
  assert.equal((await signed(wrongMode)).status, 400);
  const wrongPrice = event(ref, { amount_total: 29900 });
  assert.equal((await signed(wrongPrice)).status, 200);
  assert.equal((await read(cookie)).payment, 'review');
  assert.equal((await signed(payment)).status, 200);
  assert.equal((await signed(payment)).status, 200);
  assert.equal((await read(cookie)).payment, 'paid');
  const lateFailure = event(ref, { payment_status: 'unpaid' });
  lateFailure.type = 'checkout.session.async_payment_failed';
  assert.equal((await signed(lateFailure)).status, 200);
  assert.equal((await read(cookie)).payment, 'paid');
  assert.equal((await read()).authenticated, false);
  assert.equal(
    (await read('__Host-novren_onboarding=' + 'a'.repeat(64))).authenticated,
    false,
  );
  const body = {
    critical: 'Homepage, phone links and contact form',
    access: 'self',
    hosting: 'Test host',
    issues: 'LOCAL TEST ONLY',
  };
  const saved = await post('/api/onboarding', body, cookie);
  assert.equal(saved.status, 200);
  assert.equal((await read(cookie)).intake, true);
  assert.equal((await post('/api/onboarding', body, cookie)).status, 200);
  assert.equal(
    (await post('/api/resume/verify', { token: 'a'.repeat(64) })).status,
    400,
  );
  const blockedDuplicate = await post('/api/checkout', good, cookie);
  assert.equal((await blockedDuplicate.json()).url, base + '/onboarding');
  assert.equal((await post('/api/resume', { email: address })).status, 200);
  // Wrangler simulates delivery to disk; this never sends a real email.
  const root = new URL('../infra/.wrangler/tmp/email/', import.meta.url);
  let resumeToken;
  for (let attempt = 0; attempt < 20 && !resumeToken; attempt++) {
    for (const folder of await readdir(root)) {
      const directory = new URL(folder + '/email-text/', root);
      let files = [];
      try { files = await readdir(directory); } catch { continue; }
      for (const file of files) {
        const content = await readFile(new URL(file, directory), 'utf8');
        if (content.includes(testSite)) resumeToken = content.match(/#resume=([a-f0-9]{64})/)?.[1] || resumeToken;
      }
    }
    if (!resumeToken) await delay(100);
  }
  assert.ok(resumeToken, 'The simulated delivery must contain a resume link');
  const restored = await post('/api/resume/verify', { token: resumeToken });
  assert.equal(restored.status, 200);
  const restoredCookie = restored.headers.get('set-cookie').split(';')[0];
  assert.equal((await read(restoredCookie)).intake, true);
  assert.equal((await post('/api/resume/verify', { token: resumeToken })).status, 400);
});
