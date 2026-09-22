# Novren WordPress Care

Production: https://novren.co
Repository: https://github.com/mrchaosss/mrchaosss.github.io

## Current offer and journey

$399 USD/month per eligible existing WordPress website. No setup fee. Normal onboarding included. Month-to-month; cancel before a future renewal. Five small human edits per month; larger projects are separate.

Home → /get-started → eligibility → Stripe → /onboarding → secure site connection → ongoing care. Book a Call is optional for ordinary sites; complex sites need review.

## Development

Node 24 and pnpm 11.19.0 match the existing GitHub Pages workflow.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
node node_modules/typescript/bin/tsc --noEmit
pnpm build
node scripts/verify-static.mjs
node scripts/verify-flow.mjs
pnpm preview
```

Preview: http://127.0.0.1:4173. The workflow builds and publishes dist/client on main.

## Architecture

React, TypeScript, Vinext, and Vite remain the authoring stack. Static export removes hydration and retains native navigation/disclosures plus one hashed enhancement script. The only supported native forms are eligibility and onboarding. Onboarding prepares an email for the customer to send; it does not submit or persist information. No passwords, server actions, React event handlers, client components, or new form platform are introduced.

Shared configuration: lib/site-config.ts. Copy: app/, components/, lib/content.ts. Forms: scripts/flow-logic.js and scripts/site-behavior.js. Update the finalizer and tests before adding interactive functionality.

## Operations

See docs/site-claims.md, docs/novren-policies.md, docs/legal-open-items.md, docs/site-research.md, and docs/qa-report.md.

Backup branch backup/pre-399-self-service-2026-09-22 preserves the prior production state. Use a reviewed revert for rollback and preserve history. Keep CNAME, public/CNAME, Pages workflow, DNS, and HTTPS intact. Historical offer notes and screenshots remain in Git history rather than the current tree.
