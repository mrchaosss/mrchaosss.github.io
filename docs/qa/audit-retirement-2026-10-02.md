# Retired website audit path

October 2, 2026: the owner stopped offering pre-sale website audits and requested removal of the audit portions of the public website.

## Changes

- Removed the homepage audit banner and its next-step link.
- Removed “After your audit” from desktop navigation, mobile navigation and the footer.
- Removed the audit FAQ and retired audit landing-page content/component.
- The homepage FAQ now includes the existing “What happens after I pay?” answer.
- Reworded the care-page scope notice to discuss larger changes without referencing audits.
- Removed the retired URL from the generated sitemap.
- Added permanent 301 redirects for /after-your-audit, /after-your-audit/ and /after-your-audit.html to /care. A neutral, noindex static fallback also directs visitors to /care.

## Verification

- Production build and TypeScript check passed; Git whitespace check passed.
- All 20 generated HTML pages were checked for retired audit marketing and links; none remained. The separate accessibility-policy reference to an accessibility audit remains accurate and unrelated to the retired offer.
- Live /, /care, /faq, /get-started, /terms and /sitemap.xml returned 200 and passed the retired-copy check.
- All three legacy URL forms returned 301 with Location: /care.
- Desktop browser inspection confirmed the updated navigation, homepage and footer.
- The mobile menu worked at 390 × 844, contained no audit entry, and had no horizontal overflow. The viewport was reset afterward.
- Screenshot: workspace outputs/novren-without-audit-2026-10-02.png.

## Deployment

- Production novren-website version: a5b9f56f-6b7a-4227-a74a-36f5b121c113.
- Sandbox novren-website-test version: d31b1f39-5fc8-4912-a95f-e016f5be1c21.
- Previous source commit: 1e2a133; previous production version: eb2ff31a-e44c-4706-bf9b-af209607a3be.
- No payment, onboarding, database, mail, GoWP, Cal.com or DNS configuration changed. Existing monthly/annual pricing was preserved.

The existing deployment credential was refreshed with the same account, Workers Scripts:Edit permission and duration; no access was expanded. Its temporary ignored local copy was removed after deployment.

[Cloudflare static asset redirect documentation](https://developers.cloudflare.com/workers/static-assets/redirects/) was checked before using the existing _redirects mechanism.
