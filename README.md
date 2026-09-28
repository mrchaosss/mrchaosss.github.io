# Novren WordPress Care

Production: https://novren.co
Repository: https://github.com/mrchaosss/mrchaosss.github.io

## Current offer and journey

$399 USD/month per eligible existing WordPress website. No setup fee. Normal onboarding included. Month-to-month; cancel before a future renewal. 50 AI edits and five small human edits per month; larger projects are separate.

Home → /get-started → eligibility → Stripe → payment-verified /onboarding → Novren coordinates connection and activation → GoWP-powered client portal. Calls are optional for ordinary sites; complex sites need review before payment.

## Development

Use Node 24 and pnpm. Cloudflare deployment and local API testing instructions are in [cloudflare-launch.md](docs/cloudflare-launch.md).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
node node_modules/typescript/bin/tsc --noEmit
pnpm build
pnpm preview
```

Static preview: http://127.0.0.1:4173. Use the local Worker for API forms and synthetic payment tests. Deployment is currently direct with Wrangler. **A push to GitHub alone does not deploy.** The legacy GitHub Pages workflow is manual-only; Cloudflare Git builds are not connected. Production deployment uses `pnpm cf:deploy` with an authorized Cloudflare credential supplied outside Git.

## Architecture

React, TypeScript, Vinext, and Vite remain the authoring stack. Static export generates 20 HTML pages including the 404 page, removes hydration, and retains native navigation/disclosures plus one hashed enhancement script. Cloudflare Workers Static Assets serves the site. A separate Worker handles `/api/*`, signed Stripe webhooks, private D1 onboarding records and transactional email. No public form requests passwords.

Offer: `lib/site-config.ts`. Copy: `app/`, `components/design/`. Browser behavior: `scripts/production-behavior.js`. API: `server/index.ts`. Validation: `server/validation.ts`. Bindings: `infra/wrangler.jsonc`. Database schema: `migrations/` (already applied in production; do not recreate tables). Never commit credentials or run local synthetic payments against production.

## Operations

See [launch and operations](docs/cloudflare-launch.md), [current QA](docs/qa/cloudflare-2026-09-28.md), [claims](docs/site-claims.md), [policies](docs/novren-policies.md), and [review items](docs/legal-open-items.md).

Cloudflare Worker `novren-website` serves the dashboard-managed `novren.co/*` route. A zone rule redirects only `www.novren.co` to the same HTTPS path and query. GoWP's `app.novren.co` portal is separate. Existing GitHub origin DNS is retained for rollback.

`backup/pre-cloudflare-2026-09-28` preserves commit `d625304bd83a277338152c4f869002ea59e1f1ec`; the earlier September 22 backup remains. Preserve history and use a reviewed rollback. Removing the website route restores the previous origin without changing portal or email DNS.
