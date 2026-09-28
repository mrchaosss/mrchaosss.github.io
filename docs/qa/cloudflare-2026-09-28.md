# Cloudflare launch verification — September 28, 2026

## Local build and payment workflow

- Build generates 20 static HTML pages including a real 404 page, with no React hydration runtime.
- TypeScript and focused lint passed; Wrangler dry-run deployment passed.
- Four substantive test groups passed: qualification boundaries; public URL/credential rejection; bounded onboarding fields; complete local Worker payment/session/onboarding integration.
- Synthetic signed Stripe events were tested locally for invalid signatures, wrong mode/price, valid paid signup, duplicate delivery, late failure, cross-customer isolation, private intake, duplicate submission and single-use resume links.
- Local email delivery is simulated to disk. Local tests never purchase a subscription or send mail to a customer.

## Actual deployed website

- Worker version: `6f5f6644-df3c-44a0-b67f-3819784f6a0d`.
- Owner approved the final `novren.co/*` switch and www redirect. The route is active; existing origin records were preserved for rollback.
- All 19 content pages returned 200 and exactly matched the built HTML. The twentieth page is the 404 document; a missing URL returned 404.
- All 25 unique same-origin linked pages/assets returned 200. This includes sitemap, robots, styles, script and images.
- No obsolete $299/$199/$498/$699, reputation-management or HOTH wording was found in the deployed content-page HTML.
- Content Security Policy is present on all checked content pages.
- Old `/onboarding/status`, `/payment-status`, `/portal-invitation`, `/checkout` and `/ai-editor-demo` URLs redirect to their current equivalents.
- The www redirect preserves path/query. HTTP links on both website hosts upgrade to `https://novren.co`; other subdomains are not matched.
- Desktop homepage inspected; no broken images or application console errors seen.
- Actual live homepage at 390px: document width 375px, no horizontal overflow or broken images. Mobile navigation opened correctly. Live FAQ filtering and disclosure expansion worked at the same width.
- The ordinary WordPress fit path reached the actual Stripe checkout. A WooCommerce answer stayed on review-before-payment; a non-WordPress answer explained the exclusion and offered contact options.
- Checkout visibly showed $399/month, $399 due, no setup fee, recurring authorization and Novren Terms/Privacy links. Individual/business names and website URL are required; phone is not required.
- Appending `?checkout=complete` without payment displayed the waiting state; it did not reveal or unlock intake.
- Live API checks: health 200 with checkout enabled; unauthenticated status 200 without customer data; unpaid onboarding 401; wrong-origin checkout 403; unsigned webhook 400.

## Accounts and delivery

- Stripe product description now includes 50 AI and five small human edits alongside the care features.
- Live webhook exists with the five necessary checkout/subscription event types and its signing secret is installed in Cloudflare.
- Stripe configuration confirms the branded success destination. Old WordPress/reputation checkout links remain inactive.
- One authorized real mail-only test sent on its first attempt through Cloudflare and arrived in the existing GoWP helpdesk via hello@novren.co.
- GoWP AI Editor client visibility saved and persisted; Marketing remained hidden. No other locked workspace policy was changed.
- `app.novren.co` displayed the Novren-branded login page after the website switch.
- Existing GoWP DKIM/portal TXT records missing from the earlier DNS import were restored exactly from Squarespace. Public DNS verified both. Postmark's return-path CNAME is now DNS-only and resolves correctly. Root Google MX and recipient routing remain separate.
- Cal.com still exposes the optional 15-minute WordPress Care Questions event with $399/no-setup description and required website URL. Booking form inspected; no booking submitted.

## Evidence and limits

Screenshots and machine-readable results are retained in the task's `outputs` folder: `novren-live-desktop.png`, `novren-live-mobile.png`, `novren-live-checkout.png`, `novren-live-verification.json`, `novren-helpdesk-delivery-confirmed.png`, `gowp-client-ai-enabled.png`, and DNS/routing captures.

No real charge or customer subscription was created. Consequently, a real paid Stripe event was **not** exercised end to end in production. The paid path was tested with signed local events; production checkout, signature rejection, secret installation, live API routing and actual email transport were checked separately. No live customer GoWP site was provisioned, so each customer's connector/Business-plan activation remains a real onboarding step.

No fresh Lighthouse score, guaranteed deliverability rate or performance/security guarantee is claimed. Current deployment is direct via Wrangler; GitHub push-to-deploy is not configured. Detailed maintenance and rollback instructions are in `docs/cloudflare-launch.md`.
