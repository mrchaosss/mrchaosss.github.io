# Cloudflare production launch — 28 September 2026

## Architecture and live state

React/Vinext generates 20 static HTML pages including the 404 page. Cloudflare Workers Static Assets serves them. Only `/api/*` enters the Worker. The public site does not ship a React runtime; one small enhancement script manages navigation, fit checks, FAQ filtering and onboarding.

The existing hosted Stripe Payment Link is $399/month with no setup fee. Before redirect, the Worker validates fit and creates a random signup reference plus a separate, hashed, HttpOnly browser session. Stripe's signed webhook is the payment authority. A return-page query string never grants access. No Stripe API key or card details are needed by the website.

Paid onboarding is stored in private D1 and delivered through a durable email outbox. Resume tokens expire in 20 minutes and are consumed once. The website does not implement a second client portal. GoWP client creation, Business site provisioning, connector setup, invitation and baseline verification remain Novren's per-client work.

## Production configuration

- Website: https://novren.co
- Worker: `novren-website`; direct endpoint https://novren-website.gabe-11c.workers.dev
- Cloudflare account: `11c6b840b7bafad1ff06008100489128`.
- D1: `novren-customer-journey` / `290c3e6c-1334-4250-b035-bc36d8704697`.
- `CHECKOUT_ENABLED=true`. Live checkout and actual transactional email delivery verified.
- Worker version deployed: `6f5f6644-df3c-44a0-b67f-3819784f6a0d`.
- Dashboard-managed route: `novren.co/*`. It targets only the main website, not GoWP's portal or email subdomains.
- Zone redirect `Novren canonical HTTPS` preserves path/query while canonicalizing www and HTTP root requests to `https://novren.co`. It does not match app or email subdomains.
- Workers Paid is active: owner purchased the $5/month plan plus published usage charges. Do not purchase again.
- Repository: `mrchaosss/mrchaosss.github.io`; working branch `rebuild/cloudflare-design-b`; release pushed to main.
- Rollback branch: `backup/pre-cloudflare-2026-09-28`, original commit `d625304bd83a277338152c4f869002ea59e1f1ec`.
- The original four GitHub A records remain proxied in DNS. Removing the website route restores the earlier GitHub origin. Preserve those records while this rollback method is in use.
- GitHub authorization is limited to this repository. Cloudflare's Git-build selector did not accept the limited user token, so **Git builds are not connected**. Deployment is direct with Wrangler; pushing Git alone does not deploy. The old Pages workflow is manual-only.
- The `Novren website deployment` credential was approved, rotated with owner approval, and narrowed from Workers Admin to Workers Scripts / Edit in this account. Its temporary local secret is excluded from Git and removed after release. No broad automatic build credential, DNS token or Stripe API secret was created.

## Stripe

- Product: `prod_VEhIAtl9uNWhWu`, Novren WordPress Care.
- Active price: `price_1UIbYZGmxVYsIEOr4acmcAgq`, 39900 USD cents/month.
- Active payment link: `plink_1UIbZEGmxVYsIEOruIytro0O`.
- Public checkout: https://buy.stripe.com/14A14ncmL9QK7KQ2G17Vm02
- Success redirect: https://novren.co/onboarding?checkout=complete
- Customer email, individual name, business name, website URL and eligibility confirmation are required. Terms acceptance is required. Phone is not required. No credentials are collected.
- The website URL custom field is `websiteurl`; business and individual names use Stripe's native name collection.
- Obsolete WordPress $299 + $199 and reputation-management checkout links remain inactive. Financial history is retained. Tax, payouts and accounting settings are unchanged.
- Live webhook: `we_1UKjbtGmxVYsIEOrng4YKJAw`.
- Endpoint: https://novren-website.gabe-11c.workers.dev/api/stripe/webhook
- API version: `2026-08-26.dahlia`.
- Events: checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed, customer.subscription.updated, customer.subscription.deleted.
- Signature secret is installed only as Cloudflare `STRIPE_WEBHOOK_SECRET`. Do not print, commit or copy it into browser code.

## Email and GoWP

Cloudflare Email Sending is active for `notify.novren.co`. Sender: `onboarding@notify.novren.co`; Reply-To: `hello@novren.co`. The new subdomain has its own Cloudflare bounce MX/SPF, DKIM and rejecting DMARC policy. Root Google Workspace MX and hello's existing routing were preserved. GoWP's Postmark account was not repurposed as an application email API.

One authorized mail-only verification job (`launch-mail-check-20260928`) sent on its first attempt at 2026-09-28T19:00:42Z. The GoWP helpdesk received the matching message from Novren. No paid customer, real purchase or GoWP site was created for this test.

The earlier DNS import had omitted two existing records and incorrectly proxied the Postmark return path. Fixed using the previous Squarespace configuration as evidence:

- `pm-bounces.novren.co` CNAME `pm.mtasv.net`: changed to DNS-only; public resolution verified.
- `20260922200721pm._domainkey.novren.co` TXT: restored the exact existing public DKIM value; public resolution verified.
- `_cf-custom-hostname.app.novren.co` TXT: restored the existing portal ownership record; public resolution verified.

Nameservers remain Cloudflare. No recipient routing, Gmail alias, root MX or GoWP sender identity was recreated. `app.novren.co` displays the branded Novren login page. AI Editor client visibility is now enabled and persisted. Marketing remains hidden; other locked care policies were unchanged. Every real site still needs the Business plan ($99/site/month per current GoWP pricing) and baseline verification to deliver the advertised 50 AI / five human edits.

## Deployment

Build: `pnpm build`. Deploy: `pnpm exec wrangler deploy --config infra/wrangler.jsonc` with an authorized Cloudflare credential supplied outside the repository. Never print the credential or pass it as a command-line literal.

The Wrangler file is in `infra/` because the site is intentionally exported statically with Vinext; a root Wrangler file causes Vinext to expect its runtime adapter. `server/index.ts` is a separate Worker API serving exported assets. The root route and canonical redirect are managed in the dashboard; inspect the deployment plan before changing routes in configuration. Keep the stable workers.dev webhook endpoint enabled.

Database schema was applied through the Cloudflare console to the new empty production database. Future migrations must preserve rows. Do not reapply initial CREATE TABLE statements to production. Verify migration tracking before switching to CLI migration management.

## Local checks

1. Copy the fictional local test settings from `.dev.vars.example` into `infra/.dev.vars`.
2. Apply migrations locally: `pnpm exec wrangler d1 migrations apply novren-customer-journey --local --config infra/wrangler.jsonc`.
3. `pnpm cf:dev --port 8787 --ip 127.0.0.1` (visit localhost, matching the test origin).
4. `pnpm test:journey` sends only local synthetic Stripe events, with no card charge or real email.
5. `pnpm typecheck` and `pnpm build`.

Never point synthetic payment tests at production. Verification detail and remaining limits: [release QA](qa/cloudflare-2026-09-28.md).

## Operations

Check D1 for failed mail: `outbox` rows with `sent_at IS NULL AND attempts >= 8`; inspect Cloudflare logs and correct delivery before retrying. Outbox retries run every ten minutes. Delivery is at least once: a crash after provider acceptance can produce a duplicate email, never an extra charge. Sent message bodies are purged. Unpaid abandoned signups and expired access tokens are cleaned up automatically.

For each paid signup:

1. Match the Stripe subscription, website and contact details; review eligibility and submitted intake.
2. Create/associate the GoWP client and site, and provision the Business plan.
3. Coordinate the care connector with an authorized WordPress administrator; request other privileged access only when a concrete exception needs it.
4. Verify a usable backup, scans, monitoring, Balanced update policy, critical functions, licenses, client AI permissions and edit allowances.
5. Send the GoWP invitation and activation confirmation. Payment alone never means care is active.
6. Review monthly reports, handle alerts and small requests, and coordinate larger work separately.

Cancellation requests to hello@novren.co need timely manual Stripe cancellation and GoWP end-date coordination. A request received before renewal must prevent that renewal under the published terms, even if confirmation follows later. Review current Stripe state before acting on notifications. No automated cancellation of GoWP sites is implemented.

## Policy review

Policies describe the implemented data flow. Attorney review remains appropriate for business identity/contact disclosures, local subscription/refund rules, limitations and customer-data obligations. No entity suffix, office address, certifications, testimonials or performance guarantees were invented. Accounting/tax configuration was intentionally left unchanged.
