import Stripe from 'stripe';
import {
  InputError,
  email,
  onboardingDetails,
  qualify,
  text,
  website,
} from './validation';

const COOKIE = '__Host-novren_onboarding';
const SESSION_SECONDS = 60 * 60 * 24 * 7;
const now = () => Math.floor(Date.now() / 1000);
const random = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(32)), (x) =>
    x.toString(16).padStart(2, '0'),
  ).join('');
export async function digest(value: string) {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)),
    ),
    (x) => x.toString(16).padStart(2, '0'),
  ).join('');
}
function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      ...headers,
    },
  });
}
function sessionCookie(token: string) {
  return `${COOKIE}=${token}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${SESSION_SECONDS}`;
}
type Signup = {
  id: string;
  website: string;
  payment: string;
  stripe_session: string | null;
  stripe_subscription: string | null;
  email: string | null;
  name: string | null;
  business: string | null;
  intake_json: string | null;
  created_at: number;
  paid_at: number | null;
  subscription_status: string | null;
};
async function body(request: Request, max = 16_384) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) {
        await reader.cancel();
        throw new InputError(
          'That submission is too large. Please shorten it.',
        );
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const all = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    all.set(c, offset);
    offset += c.length;
  }
  return new TextDecoder().decode(all);
}
async function input(request: Request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json'))
    throw new InputError('Please use the form on novren.co.');
  let data;
  try {
    data = JSON.parse(await body(request));
  } catch (e) {
    if (e instanceof InputError) throw e;
    throw new InputError('Please check the submitted information.');
  }
  if (!data || typeof data !== 'object' || Array.isArray(data))
    throw new InputError('Please check the submitted information.');
  return data as Record<string, unknown>;
}
async function current(request: Request, env: Env) {
  const token = (request.headers.get('Cookie') || '')
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith(COOKIE + '='))
    ?.slice(COOKIE.length + 1);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  return env.DB.prepare(
    'SELECT s.* FROM signups s JOIN sessions a ON a.signup_id=s.id WHERE a.hash=? AND a.expires_at>?',
  )
    .bind(await digest(token), now())
    .first<Signup>();
}
async function limited(env: Env, key: string, limit: number, seconds = 3600) {
  const time = now(),
    bucket = Math.floor(time / seconds),
    hash = await digest(key + ':' + bucket);
  const row = await env.DB.prepare(
    'INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count',
  )
    .bind(hash, (bucket + 1) * seconds)
    .first<{ count: number }>();
  return (row?.count || 0) > limit;
}
function queued(
  env: Env,
  id: string,
  to: string,
  subject: string,
  message: string,
) {
  return env.DB.prepare(
    'INSERT OR IGNORE INTO outbox(id,recipient,subject,body,created_at,next_attempt) VALUES(?,?,?,?,?,?)',
  ).bind(id, to, subject, message, now(), now());
}
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );
async function flushMail(env: Env) {
  const time = now();
  const due = await env.DB.prepare(
    'SELECT id,recipient,subject,body,attempts FROM outbox WHERE sent_at IS NULL AND next_attempt<=? AND lease_until<? AND attempts<8 ORDER BY created_at LIMIT 10',
  )
    .bind(time, time)
    .all<{
      id: string;
      recipient: string;
      subject: string;
      body: string;
      attempts: number;
    }>();
  for (const item of due.results) {
    const lease = await env.DB.prepare(
      'UPDATE outbox SET lease_until=?,attempts=attempts+1 WHERE id=? AND sent_at IS NULL AND lease_until<?',
    )
      .bind(time + 120, item.id, time)
      .run();
    if (!lease.meta.changes) continue;
    try {
      await env.EMAIL.send({
        from: { email: env.MAIL_FROM, name: 'Novren' },
        to: item.recipient,
        replyTo: env.SUPPORT_EMAIL,
        subject: item.subject,
        text: item.body,
        html: `<div style="font-family:Arial,sans-serif;max-width:640px;line-height:1.65;color:#192d43"><h1 style="font-size:24px">Novren</h1><p>${escapeHtml(item.body).replaceAll('\n', '<br>')}</p></div>`,
      });
      await env.DB.prepare(
        "UPDATE outbox SET sent_at=?,body='',lease_until=0 WHERE id=?",
      )
        .bind(now(), item.id)
        .run();
    } catch {
      await env.DB.prepare(
        'UPDATE outbox SET next_attempt=?,lease_until=0 WHERE id=?',
      )
        .bind(now() + Math.min(3600, 60 * 2 ** item.attempts), item.id)
        .run();
      console.error(
        JSON.stringify({
          event: 'transactional_mail_failed',
          job: item.id,
          attempt: item.attempts + 1,
        }),
      );
    }
  }
}
async function checkout(request: Request, env: Env) {
  const data = await input(request);
  if (data.fax)
    return json({ error: 'Please contact hello@novren.co to continue.' }, 400);
  const fit = qualify(data);
  if (fit.kind !== 'eligible') return json(fit);
  if (String(env.CHECKOUT_ENABLED) !== 'true')
    return json(
      {
        error:
          'Online signup is being prepared. Please email hello@novren.co and we’ll help you get started.',
      },
      503,
    );
  const existing = await current(request, env);
  if (existing?.payment === 'paid')
    return json({ url: env.SITE_ORIGIN + '/onboarding' });
  const id =
    existing?.payment === 'pending' && existing.website === fit.website
      ? existing.id
      : crypto.randomUUID();
  const token = random();
  await env.DB.batch([
    env.DB.prepare(
      'INSERT OR IGNORE INTO signups(id,website,created_at,eligibility_json) VALUES(?,?,?,?)',
    ).bind(
      id,
      fit.website,
      now(),
      JSON.stringify({
        platform: data.platform,
        oneSite: data.oneSite,
        complexity: data.complexity,
      }),
    ),
    env.DB.prepare(
      'INSERT INTO sessions(hash,signup_id,expires_at) VALUES(?,?,?)',
    ).bind(await digest(token), id, now() + SESSION_SECONDS),
  ]);
  const url = new URL(env.STRIPE_PAYMENT_LINK_URL);
  url.searchParams.set('client_reference_id', id);
  return json({ url: url.href }, 200, { 'Set-Cookie': sessionCookie(token) });
}
async function saveOnboarding(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) {
  const account = await current(request, env);
  if (!account || account.payment !== 'paid')
    return json(
      {
        error:
          'Please verify your paid signup first. Resume onboarding with your checkout email.',
      },
      401,
    );
  if (account.intake_json) return json({ saved: true });
  const details = onboardingDetails(await input(request));
  if (!account.email) throw new Error('missing_customer_email');
  const statements = [
    env.DB.prepare(
      'UPDATE signups SET intake_json=?,intake_at=? WHERE id=? AND intake_json IS NULL',
    ).bind(JSON.stringify(details), now(), account.id),
    queued(
      env,
      'intake-owner:' + account.id,
      env.SUPPORT_EMAIL,
      'New Novren onboarding details',
      `Website: ${account.website}\nBusiness: ${account.business || 'Not provided'}\nContact: ${account.name || ''} <${account.email}>\nSignup reference: ${account.id}\n\n${Object.entries(
        details,
      )
        .map(([k, v]) => k + ': ' + v)
        .join(
          '\n',
        )}\n\nNext: prepare the GoWP client workspace, coordinate the care connector, confirm Business plan and client AI permissions, then verify backup/scans/monitoring/update policy. Do not mark care active before the baseline passes.`,
    ),
    queued(
      env,
      'intake-customer:' + account.id,
      account.email,
      'We received your website details',
      `Your onboarding details for ${account.website} are saved.\n\nNovren will review them and coordinate the website connection with you. Care is not active until we confirm the connection and baseline checks. Your client portal invitation and service instructions will follow.\n\nNo passwords are needed by email. Reply to hello@novren.co if anything changes.\n\nYour plan: $399/month for one website, no setup fee.`,
    ),
  ];
  await env.DB.batch(statements);
  ctx.waitUntil(flushMail(env));
  return json({ saved: true });
}
async function resume(request: Request, env: Env, ctx: ExecutionContext) {
  const address = email((await input(request)).email);
  if (await limited(env, 'resume-email:' + address, 3))
    return json({ ok: true });
  const rows = await env.DB.prepare(
    "SELECT id,website FROM signups WHERE email=? AND payment='paid' ORDER BY paid_at DESC LIMIT 10",
  )
    .bind(address)
    .all<{ id: string; website: string }>();
  if (rows.results.length) {
    const batch: D1PreparedStatement[] = [];
    const links: string[] = [];
    for (const row of rows.results) {
      const token = random();
      batch.push(
        env.DB.prepare(
          'INSERT INTO resume_tokens(hash,signup_id,expires_at) VALUES(?,?,?)',
        ).bind(await digest(token), row.id, now() + 1200),
      );
      links.push(
        `${row.website}\n${env.SITE_ORIGIN}/onboarding#resume=${token}`,
      );
    }
    batch.push(
      queued(
        env,
        'resume:' + crypto.randomUUID(),
        address,
        'Your Novren onboarding link',
        `Use the link for your website to resume onboarding. Each link expires in 20 minutes and works once.\n\n${links.join('\n\n')}\n\nIf you did not request this email, ignore it. Never forward this access link.\nQuestions: hello@novren.co`,
      ),
    );
    await env.DB.batch(batch);
    ctx.waitUntil(flushMail(env));
  }
  return json({ ok: true });
}
async function verifyResume(request: Request, env: Env) {
  const token = text((await input(request)).token, 64, true);
  if (!/^[a-f0-9]{64}$/.test(token))
    return json(
      { error: 'This link is invalid. Request a new onboarding link.' },
      400,
    );
  const row = await env.DB.prepare(
    'DELETE FROM resume_tokens WHERE hash=? AND expires_at>? RETURNING signup_id',
  )
    .bind(await digest(token), now())
    .first<{ signup_id: string }>();
  if (!row)
    return json(
      {
        error:
          'This link has expired or was already used. Request a new one below.',
      },
      400,
    );
  const session = random();
  await env.DB.prepare(
    'INSERT INTO sessions(hash,signup_id,expires_at) VALUES(?,?,?)',
  )
    .bind(await digest(session), row.signup_id, now() + SESSION_SECONDS)
    .run();
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(session) });
}

async function webhook(request: Request, env: Env, ctx: ExecutionContext) {
  if (!env.STRIPE_WEBHOOK_SECRET)
    return json({ error: 'Webhook unavailable' }, 503);
  let event: Stripe.Event;
  try {
    event = await Stripe.webhooks.constructEventAsync(
      await body(request, 262_144),
      request.headers.get('stripe-signature') || '',
      env.STRIPE_WEBHOOK_SECRET,
      300,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch {
    return json({ error: 'Invalid signature' }, 400);
  }
  if (event.livemode !== (String(env.STRIPE_LIVEMODE) === 'true'))
    return json({ error: 'Wrong environment' }, 400);
  if (
    await env.DB.prepare('SELECT id FROM stripe_events WHERE id=?')
      .bind(event.id)
      .first()
  )
    return json({ received: true });
  const statements: D1PreparedStatement[] = [];
  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const s = event.data.object;
    if (
      s.payment_link === env.STRIPE_PAYMENT_LINK_ID &&
      s.mode === 'subscription' &&
      s.payment_status === 'paid' &&
      s.status === 'complete' &&
      s.currency === 'usd' &&
      s.amount_subtotal === 39900 &&
      s.amount_total === 39900 &&
      s.customer_details?.email
    ) {
      const address = email(s.customer_details.email),
        name = text(
          s.customer_details.individual_name || s.customer_details.name || '',
          160,
        ),
        business = text(s.customer_details.business_name || '', 160);
      let site = 'Needs review';
      try {
        site = website(
          s.custom_fields.find((f) => f.key === 'websiteurl')?.text?.value,
        );
      } catch {
        /* Preserve the paid signup for manual review instead of losing it. */
      }
      const ref = s.client_reference_id;
      const existing = ref
        ? await env.DB.prepare('SELECT * FROM signups WHERE id=?')
            .bind(ref)
            .first<Signup>()
        : null;
      const duplicate =
        existing?.stripe_session && existing.stripe_session !== s.id;
      const id = existing && !duplicate ? existing.id : 'stripe_' + s.id;
      const review =
        !existing ||
        site === 'Needs review' ||
        Boolean(existing && existing.website !== site) ||
        Boolean(duplicate);
      statements.push(
        env.DB.prepare(
          'INSERT OR IGNORE INTO signups(id,website,created_at,eligibility_json) VALUES(?,?,?,?)',
        ).bind(
          id,
          site,
          now(),
          JSON.stringify({ source: 'direct-payment-link', review: true }),
        ),
        env.DB.prepare(
          "UPDATE signups SET payment='paid',stripe_session=?,stripe_customer=?,stripe_subscription=?,email=?,name=?,business=?,paid_at=COALESCE(paid_at,?),website=? WHERE id=? AND (stripe_session IS NULL OR stripe_session=?)",
        ).bind(
          s.id,
          typeof s.customer === 'string' ? s.customer : s.customer?.id || null,
          typeof s.subscription === 'string'
            ? s.subscription
            : s.subscription?.id || null,
          address,
          name,
          business,
          now(),
          site,
          id,
          s.id,
        ),
      );
      statements.push(
        queued(
          env,
          'paid-customer:' + s.id,
          address,
          'Welcome to Novren — your next step',
          `Thank you for subscribing to Novren WordPress Care.\n\nYour payment: $399. The subscription renews monthly at $399, with no setup fee.\nWebsite: ${site}\n\nContinue onboarding here:\n${env.SITE_ORIGIN}/onboarding\n\nIf the page asks you to resume, enter this checkout email and we’ll send a secure link. Novren will coordinate the connection; care begins after baseline confirmation. Do not send passwords.\n\nQuestions or cancellation before renewal: hello@novren.co\nService terms: ${env.SITE_ORIGIN}/terms`,
        ),
        queued(
          env,
          'paid-owner:' + s.id,
          env.SUPPORT_EMAIL,
          review
            ? 'Paid signup needs fit/billing review'
            : 'New paid Novren signup',
          `Website: ${site}\nBusiness: ${business}\nContact: ${name} <${address}>\nSignup reference: ${id}\nStripe checkout: ${s.id}\n${duplicate ? 'Potential duplicate purchase. Review both subscriptions and contact the customer before further work.' : review ? 'Website differs from the fit check or needs verification. Confirm eligibility before activation.' : 'Await onboarding details, then arrange the care connection.'}\n\nPayment has been verified by a signed Stripe event. No GoWP account or paid site plan has been created automatically.`,
        ),
      );
    } else if (s.payment_link === env.STRIPE_PAYMENT_LINK_ID && s.payment_status === 'paid') {
      // A genuine payment outside this offer needs a person, never silent fulfillment.
      if (s.client_reference_id) statements.push(env.DB.prepare(
        "UPDATE signups SET payment='review' WHERE id=? AND payment!='paid'",
      ).bind(s.client_reference_id));
      statements.push(queued(env, 'payment-review:' + s.id, env.SUPPORT_EMAIL,
        'Novren payment needs manual review',
        `Stripe checkout ${s.id} was paid, but did not match the expected $399 USD subscription or required customer details. Review it in Stripe and contact the customer. Do not ask them to pay again or activate care until resolved.`,
      ));
    }
  } else if (event.type === 'checkout.session.async_payment_failed') {
    const s = event.data.object;
    if (s.payment_link === env.STRIPE_PAYMENT_LINK_ID) {
      if (s.client_reference_id) statements.push(env.DB.prepare(
        "UPDATE signups SET payment='failed' WHERE id=? AND payment='pending'",
      ).bind(s.client_reference_id));
      statements.push(queued(env, 'payment-failed:' + s.id, env.SUPPORT_EMAIL,
        'Novren signup payment failed',
        `Stripe checkout ${s.id} has an unsuccessful delayed payment. Review the current checkout and subscription in Stripe before advising on another attempt. Care has not been activated by this website.`,
      ));
    }
  } else if (
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const s = event.data.object;
    const record = await env.DB.prepare(
      'SELECT id,email,website FROM signups WHERE stripe_subscription=?',
    )
      .bind(s.id)
      .first<{ id: string; email: string; website: string }>();
    if (record) {
      statements.push(
        env.DB.prepare(
          'UPDATE signups SET subscription_status=?,subscription_event_at=? WHERE id=? AND subscription_event_at<=?',
        ).bind(s.status, event.created, record.id, event.created),
      );
      if (
        s.status === 'canceled' ||
        s.status === 'unpaid' ||
        s.status === 'past_due' ||
        s.cancel_at_period_end
      )
        statements.push(
          queued(
            env,
            'subscription:' + event.id,
            env.SUPPORT_EMAIL,
            'Novren subscription needs attention',
            `Website: ${record.website}\nCustomer: ${record.email}\nStripe subscription: ${s.id}\nStatus: ${s.status}\nCancel at period end: ${s.cancel_at_period_end}\n\nReview the current Stripe subscription before changing care. Coordinate the care end date, customer confirmation and GoWP plan manually. Do not treat an out-of-order notification as current billing state.`,
          ),
        );
    }
  }
  statements.push(
    env.DB.prepare(
      'INSERT OR IGNORE INTO stripe_events(id,type,received_at) VALUES(?,?,?)',
    ).bind(event.id, event.type, now()),
  );
  await env.DB.batch(statements);
  ctx.waitUntil(flushMail(env));
  return json({ received: true });
}
async function cleanup(env: Env) {
  const t = now();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM sessions WHERE expires_at<?').bind(t),
    env.DB.prepare('DELETE FROM resume_tokens WHERE expires_at<?').bind(t),
    env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(t),
    env.DB.prepare(
      "DELETE FROM signups WHERE payment IN ('pending','failed') AND created_at<?",
    ).bind(t - 7 * 86400),
    env.DB.prepare('DELETE FROM stripe_events WHERE received_at<?').bind(
      t - 90 * 86400,
    ),
    env.DB.prepare(
      'DELETE FROM outbox WHERE sent_at IS NOT NULL AND sent_at<?',
    ).bind(t - 30 * 86400),
    env.DB.prepare(
      "UPDATE outbox SET body='',sent_at=? WHERE id LIKE 'resume:%' AND sent_at IS NULL AND created_at<?",
    ).bind(t, t - 1200),
  ]);
}
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    try {
      if (url.pathname === '/api/health' && request.method === 'GET') {
        await env.DB.prepare('SELECT 1').first();
        return json({
          ok: true,
          checkoutEnabled: String(env.CHECKOUT_ENABLED) === 'true',
        });
      }
      if (url.pathname === '/api/stripe/webhook' && request.method === 'POST')
        return await webhook(request, env, ctx);
      if (
        request.method === 'POST' &&
        (request.headers.get('Origin') !== env.SITE_ORIGIN ||
          url.origin !== env.SITE_ORIGIN)
      )
        return json(
          { error: 'Please submit the form from Novren’s website.' },
          403,
        );
      if (request.method === 'GET' && url.pathname === '/api/status') {
        const s = await current(request, env);
        return json(
          s
            ? {
                authenticated: true,
                payment: s.payment,
                website: s.website,
                intake: Boolean(s.intake_json),
              }
            : { authenticated: false },
        );
      }
      if (request.method !== 'POST') return json({ error: 'Not found' }, 404);
      const ip = request.headers.get('CF-Connecting-IP') || 'local';
      if (
        await limited(
          env,
          url.pathname + ':' + ip,
          url.pathname === '/api/resume' ? 5 : 30,
        )
      )
        return json(
          {
            error:
              'Too many attempts. Please wait before trying again, or email hello@novren.co.',
          },
          429,
          { 'Retry-After': '3600' },
        );
      switch (url.pathname) {
        case '/api/checkout':
          return await checkout(request, env);
        case '/api/onboarding':
          return await saveOnboarding(request, env, ctx);
        case '/api/resume':
          return await resume(request, env, ctx);
        case '/api/resume/verify':
          return await verifyResume(request, env);
        default:
          return json({ error: 'Not found' }, 404);
      }
    } catch (error) {
      if (error instanceof InputError)
        return json({ error: error.message }, 400);
      console.error(
        JSON.stringify({ event: 'request_failed', path: url.pathname }),
      );
      return json(
        {
          error:
            'We couldn’t save that step. Please try again or contact hello@novren.co. Your payment will not be taken again by this form.',
        },
        503,
      );
    }
  },
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ) {
    ctx.waitUntil(
      (async () => {
        await cleanup(env);
        await flushMail(env);
      })(),
    );
  },
} satisfies ExportedHandler<Env>;
