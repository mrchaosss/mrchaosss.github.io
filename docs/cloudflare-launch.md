# Cloudflare production build — 28 September 2026

## Architecture

React/Vinext continues to generate static HTML. Cloudflare Workers Static Assets serves it. Only `/api/*` enters the Worker. The public site does not ship a React runtime. The small progressive enhancement script manages navigation, fit checks, FAQ filtering and onboarding.

The website retains the existing hosted Stripe Payment Link at $399/month. Before redirect, the Worker validates fit and creates a random signup reference plus a separate, hashed, HttpOnly browser session. Stripe's signed webhook is the payment authority. A return-page query string never grants access. No Stripe API key or card details are needed by the site.

Paid onboarding is stored in the private D1 database and delivered through a durable email outbox. Resume tokens expire in 20 minutes and are consumed once. The website does not implement a second client portal. GoWP client creation, Business site provisioning, connector setup, invitation and baseline verification remain Novren's work.

## Status and launch gates

- `CHECKOUT_ENABLED=false` is intentional until live webhook, mail delivery and account configuration are verified.
- Cloudflare account: 11c6b840b7bafad1ff06008100489128.
- D1: novren-customer-journey / 290c3e6c-1334-4250-b035-bc36d8704697.
- Root domain currently continues to serve the previous site until a deliberate Cloudflare cutover.
- Remote rollback branch: `backup/pre-cloudflare-2026-09-28`, original commit d625304bd83a277338152c4f869002ea59e1f1ec.
- Working branch: `rebuild/cloudflare-design-b`.
- Cloudflare GitHub integration was explicitly approved for only mrchaosss/mrchaosss.github.io.
- AI Editor was still hidden from clients at account inspection. Enable and verify before advertising usable client AI access in a live signup path.
- Cloudflare outbound email to arbitrary recipients requires the Workers Paid plan. The owner has asked whether the existing GoWP setup can cover this; upgrade is not approved yet.
- Do not change existing Google Workspace MX records or hello@novren.co → GoWP/Postmark routing.
- GoWP Helpdesk Settings confirms agency-branded inbound routing and outbound operator replies, with DKIM and SPF/Return-Path verified. This screen does not expose an application email API for the website's onboarding/recovery messages; do not assume GoWP's Postmark infrastructure can be reused as a general mail relay.
- Cloudflare's automatic build-token option requests broad account access (including unrelated KV/R2/AI resources). Do not accept it without action-time confirmation. Prefer a token limited to the actual website deployment and D1 resources if supported.

## Deployment

Build: `pnpm build`. Deploy: `pnpm exec wrangler deploy --config infra/wrangler.jsonc`.

The Wrangler file is in `infra/` because the site is intentionally exported statically with Vinext; a root Wrangler file causes Vinext to expect its runtime adapter. `server/index.ts` is a separate Worker API that serves the exported assets.

Secret binding: `STRIPE_WEBHOOK_SECRET`. Never commit the value. Use the live endpoint's signature secret only in the production Worker. The local `.dev.vars.example` contains a fictional local-only test secret and test mode.

Database schema was applied through the Cloudflare console to the new empty production database. Future migrations must preserve existing rows. Do not reapply the initial CREATE TABLE script to production. Verify migration tracking before switching to CLI migration management.

## Local checks

1. Copy `.dev.vars.example` to `infra/.dev.vars`.
2. Apply migrations locally: `pnpm exec wrangler d1 migrations apply novren-customer-journey --local --config infra/wrangler.jsonc`.
3. `pnpm cf:dev --port 8787 --ip 127.0.0.1` (visit localhost, which matches the test origin).
4. `pnpm test:journey` sends only local synthetic Stripe events, without a real card payment or real email.
5. `pnpm typecheck` and `pnpm build`.

Verified locally: 20 static pages build; TypeScript and focused lint pass; Worker integration checks pass for fit/origin/payment-signature validation, wrong-environment and wrong-price handling, replayed events, cross-client isolation, protected intake, and single-use emailed recovery. Stripe redirect reached the real hosted checkout without submitting payment. Complex-site answers stayed before checkout. Mobile homepage at 390px has no horizontal overflow and mobile navigation opens correctly. Local synthetic email is written to Wrangler's ignored temporary directory, not delivered externally.

## Operations

Monitor failed email jobs in D1 (`outbox` records with `sent_at IS NULL AND attempts >= 8`) and Cloudflare logs. Retry only after fixing delivery. Email delivery is at least once; a crash after provider acceptance can result in a duplicate email, never an extra charge.

For each paid signup: match website and billing details, review intake, create the GoWP client, arrange an authorized WordPress administrator to connect WP Maintenance Connect, provision the Business site plan, verify the five-human/50-AI allowances and client permissions, verify backups/scans/monitoring/update policy, then send the GoWP invitation and activation confirmation.

Never mark care active solely because Stripe was paid. Customer cancellation requests to hello@novren.co need timely manual Stripe cancellation and GoWP end-date coordination. Review current Stripe state before acting on billing notifications.

## Policy review

The policies describe the implemented data flow. Attorney review is still appropriate for contracting identity, jurisdiction-specific consumer/refund rules, limitations and data obligations. No legal entity, office address, certifications, testimonials or performance guarantees were invented.
