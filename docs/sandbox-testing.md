# Novren signup test environment

Created and exercised September 29, 2026. This is a separate persistent Worker and database using the existing Novren Stripe sandbox. No live checkout settings, production data, DNS, email routing, or GoWP care settings were changed.

## Owner walkthrough

1. Open a new private/incognito window. Existing normal-browser cookies may already show the completed test.
2. Visit https://novren-website-test.gabe-11c.workers.dev/get-started. Confirm the yellow TEST WEBSITE banner.
3. Enter `example.com`, select an existing WordPress website, one website, and none of the complexity options. This is fictional qualification data solely for this sandbox; example.com is not a WordPress test installation.
4. Continue to Stripe. Confirm **Novren sandbox**, **TEST**, and **$399/month**. Use `gabe@novren.co`, a test name/business, and `https://example.com` again.
5. Use card `4242 4242 4242 4242`, any future expiry (for example 12/30), any three-digit CVC, and a sample ZIP such as 60601. Do not use a real card. Leave optional Link wallet registration off.
6. Subscribe. No funds move. Stripe returns to the test onboarding page, which confirms payment when the signed event arrives.
7. Enter dummy operational details marked TEST ONLY, choose who can arrange connection, and save. Never enter credentials.
8. Verify the saved-details confirmation, welcome email, customer intake confirmation, and two internal GoWP helpdesk notifications. All app-generated test messages carry `[TEST ONLY — NO SERVICE ACTIVATION]`.

Use the Get Started page, not the bare payment link, to exercise the complete qualification and browser-session flow. A new private window starts another test. Only `gabe@novren.co` and `hello@novren.co` may receive test app emails.

Stripe documents these simulated payments at https://docs.stripe.com/testing. A 100% coupon is not equivalent: production verification requires a paid, complete USD subscription checkout with both subtotal and total exactly 39900 cents.

## Resources

| Resource | Identifier |
| --- | --- |
| Worker | `novren-website-test` |
| Origin | `https://novren-website-test.gabe-11c.workers.dev` |
| D1 database | `novren-customer-journey-test`, `7949ee57-2dae-4a4a-9628-174f3d1523c7` |
| Stripe sandbox | `acct_1UEDH7GrCZ41nDTE` |
| Test product | `prod_VLnGThyiFAg0dN`, Novren WordPress Care — TEST |
| Test price | `price_1UL5fuGrCZ41nDTEsWwU7buB`, USD399/month |
| Test payment link | `plink_1UL5iQGrCZ41nDTEeTjhpuxp` |
| Hosted test checkout | `https://buy.stripe.com/test_6oU00j3Rg7N21fz5d033W00` |
| Webhook | `we_1UL5nEGrCZ41nDTEGvQLBVw9` |
| Webhook address | `https://novren-website-test.gabe-11c.workers.dev/api/stripe/webhook` |

Webhook uses API version `2026-08-26.dahlia`, matching production, for checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed, customer.subscription.updated, and customer.subscription.deleted. Its signing secret is stored only in the test Worker. No Stripe secret API key is needed by either Worker.

`server/sandbox.ts` imports the exact production handler. Only email safety and noindex behavior are wrapped. It refuses live-mode Stripe or a non-test payment URL and restricts outgoing emails to the two Novren addresses. It prefixes all messages and refuses additional recipients. The production entry point never imports this module.

The test site is publicly reachable, explicitly labelled, and excluded from indexing through robots.txt, meta tags and headers. This is not access-controlled staging; use dummy information only. Paid onboarding records still require the same secure session or single-use email recovery as production. There is no GoWP provisioning API in this application.

## Verified September 29

- Browser qualification → hosted sandbox Checkout → simulated successful card payment → signed webhook → authenticated onboarding → saved details.
- Sandbox first invoice paid for USD399, recurring price USD399/month, no setup fee or discount.
- Payment session `cs_test_a1Yt4hXB5Nacw7bX5UrHzpnRY22sUen8vSbwsswan00KA5rD6AcN8LLY1R`.
- Subscription `sub_1UL5q8GrCZ41nDTEPXjr4Vt1`, test card ending4242.
- Event `evt_1UL5q9GrCZ41nDTEbvpTC1fL`: Stripe reports Delivered, HTTP200, received:true.
- D1 records one paid signup with saved intake for https://example.com.
- Four initial transactional emails sent on their first attempt. Both customer messages were visible in Gabe's Gmail; both owner notifications were visible in GoWP Helpdesk and forwarded to Gabe.
- Recovery email delivered; its link returned to the correct saved onboarding state. Reusing the same link showed “expired or was already used.”
- Non-WordPress qualification returns unsupported; complex ecommerce returns review instead of a checkout URL.
- Unauthenticated onboarding POST returns401; wrong-origin submission returns403; unsigned Stripe event returns400.
- Test and live health endpoints both returned200 after deployment.
- TypeScript passed; sandbox Wrangler packaging dry run and deployment succeeded with test DB bindings.

## Actual remaining limits

- No real WordPress website is connected. Connector installation, customer portal invitation, first backup, first scan, uptime/SSL monitoring, human edit and AI editor operation still need an owned, reachable WordPress site and the appropriate GoWP plan. Do not connect example.com or activate paid GoWP fulfillment for this test.
- GoWP onboarding is a Novren operations step after intake. Stripe payment does not automatically create a GoWP client or activate care.
- **Internal notification reply behavior:** the GoWP intake ticket identifies the notification sender `onboarding@notify.novren.co`, and its composer defaults to that sender. The actual customer name/email are in the message body. Contact that customer explicitly through a new customer conversation; do not use the notification ticket's default recipient for customer outreach. This test did not change production email behavior.
- Sandbox Dashboard-created checkout collects name, business and Website URL. Unlike production, it does not have the additional eligibility reconfirmation field or Novren Terms acceptance checkbox configured. Production terms/privacy/consent configuration was not altered. The first website qualification step remains identical. Sandbox appearance and optional payment methods differ from production; this test establishes the card and signed-event path, not parity of every Stripe setting.
- No actual card settlement, bank payout, future renewal, decline/3DS, refund, cancellation, or paid GoWP activation was performed in this run. Sandbox transactions do not establish real settlement or real service delivery.

## Deployment and safety

Build production assets with the existing build command, then run `node scripts/prepare-sandbox.mjs`. It copies those assets to `dist/test-client`, adds the test banner and noindex controls, and does not modify `dist/client`.

Use project-local Wrangler with **`--config infra/wrangler.test.jsonc`** for test deployments. Production continues using `infra/wrangler.jsonc`. Never substitute the production database ID or live Stripe link. Never deploy sandbox assets with the production config.

Generate types after binding changes and type-check. Deploy a dry run first. Use the existing narrow Workers Scripts credential for direct deployment; Git pushes do not deploy. The credential was equivalently rotated for this deployment, with the same account and Workers Scripts permissions, and transient credential files are removed after use.

The initial test database schema was applied through Cloudflare D1's console using `migrations/0001_customer_journey.sql`. Future migrations must target the test database explicitly and keep migration bookkeeping consistent with how the initial schema was installed.

Proof retained in the task workspace `outputs/novren-test-onboarding-complete-2026-09-29.png` and `outputs/novren-test-helpdesk-2026-09-29.png`.
