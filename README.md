# Novren Website Care

Marketing website for managed WordPress maintenance and small website support for local service businesses. Production repository: https://github.com/mrchaosss/mrchaosss.github.io. Production domain: https://novren.co.

## Work on this replacement

Feature branch: `feat/novren-website-care`, based on production commit `68a980b9beb65cb4a7a92f784e9a329bfdfc1320`. The pre-existing local `main` history was preserved. No DNS, Pages settings, CNAME files, or production workflow were changed.

## Develop and verify

Node 24 and pnpm 11.19.0 match the existing deployment setup.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
node scripts/verify-static.mjs
pnpm preview
```

The production preview runs at http://127.0.0.1:4173. It serves extensionless routes as GitHub Pages does and returns the branded 404 for missing paths.

## Architecture

TypeScript, React, Vinext, and Vite remain the authoring/build stack. Vinext exports the pages to HTML. A guarded finalization step removes unnecessary hydration, RSC payloads, and unused generated assets. Plain HTML links and native disclosures work without JavaScript. One small hashed script carries an allowlisted set of campaign labels between pages and to Cal.com, and adds Escape handling to the mobile menu.

Do not add client components, React event handlers, server actions, or forms without revisiting the finalizer. The build deliberately fails if those features appear. This is a static marketing site, not a customer portal.

The old unused chart, carousel, component-library, and alternate-host preview dependencies were removed. The existing `.github/workflows/deploy.yml` still builds with `pnpm build` and publishes `dist/client` on a push to main.

## Offer configuration

Edit `lib/site-config.ts` for prices, onboarding fee, booking link, fit-call duration, email, portal visibility, small-edit limits, backup history, eligibility, and exclusions. Current offer: $299/month plus $199 onboarding, one qualifying WordPress site, up to five human edits, typically about 30 minutes or less.

Changes to numerical service capabilities require a fresh official vendor check and an updated claim ledger. Coverage remains one website; increasing `siteLimit` requires a full copy and agreement review. The internal possible future $399 new-client price after three clients is not advertised and is not an automatic pricing rule.

Keep the portal hidden until its destination is live and independently verified. Do not collect credentials, payment details, or form submissions through this site.

## Evidence and release gate

- [Research and design decisions](docs/site-research.md)
- [Public claim ledger](docs/site-claims.md)
- [Written policy basis](docs/novren-policies.md)
- [Legal and operational open items](docs/legal-open-items.md)
- [Actual QA results](docs/qa-report.md)

The replacement and owner-requested refinements are deployed at https://novren.co through merged PRs #1 and #2. The owner approved the public policies, USD prices, and onboarding details; the Cal.com event now matches the site and lasts 15 minutes. See the QA report for actual live checks. The signed client agreement and fulfillment setup are mandatory before accepting money or website credentials. Public Website Terms do not replace that agreement.

Do not modify DNS, the root `CNAME`, `public/CNAME`, the existing Pages workflow, or HTTPS settings as part of this release.
