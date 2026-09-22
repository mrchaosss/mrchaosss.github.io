# Rebuild QA — September 22, 2026

## Local verification

- Production build, lint, TypeScript, static route/link/metadata checks, and flow tests passed.
- Eleven HTML pages including 404; existing URLs retained; Get Started and onboarding added.
- Unique titles, one H1 each, canonical/Open Graph/social metadata, assets, internal links/anchors checked.
- Sitemap includes Get Started; excludes noindex onboarding.
- Standard eligibility reaches checkout; complex eligibility reaches review. Changed answers hide the prior result.
- Flow tests reject invalid/private/credential-bearing/secret-query website URLs and missing answers.
- Onboarding prepares a correctly addressed email with copy fallback. No automatic submission or password field.
- Desktop and narrow mobile homepage/signup visually checked. Mobile menu opens and Escape closes.
- Existing deployment infrastructure retained.

## External verification

- Hosted Stripe shows $399/month, no setup line, and $399 today/then monthly disclosure.
- Email, name, business, website URL, eligibility and Novren terms acceptance present; Terms/Privacy links visible.
- Guest checkout does not require phone; Stripe Link may offer optional phone-based saved checkout.
- Success redirect verified in Stripe configuration.
- Cal public event matches optional 15-minute offer; required Website URL confirmed. No booking submitted.
- External support email reached Novren helpdesk with expected reference.
- Portal domain verified/live.

## Limits

No real charge, subscription, or real client site activation was created. No booking made. Success redirect verified by configuration and direct destination testing. No fresh Lighthouse score is claimed from historical reports.

Final deployment and live verification are recorded in the release report.
