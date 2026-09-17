# Site research and implementation decisions

Research checked 2026-09-17. Official GoWP pages were read live in a browser because direct text retrieval returned 403; search extracts were used only to locate the current pages. Price pages have no stable publication date recorded, so the access date matters. No claims of conversion uplift or proven performance are made.

## Repository and production inspection

Local repository found at `C:/Users/jenlg/Documents/Codex/2026-09-04/contining-from-novren-website-convo-lets/website`. Remote verified as `https://github.com/mrchaosss/mrchaosss.github.io.git`. Initial local main: `cf7ce60`, clean. Freshly fetched production main: `68a980b9beb65cb4a7a92f784e9a329bfdfc1320`. Histories diverged (six local-only and five remote-only commits); local main was preserved, and the feature branch was created directly from current production main.

Existing TypeScript/React/Vinext/Vite/pnpm stack retained. The Actions workflow deploys `dist/client` on pushes to main. Both CNAME files still contain novren.co. Authenticated read-only Pages settings inspection confirmed GitHub Actions as Source, novren.co as custom domain, and Enforce HTTPS checked. The UI displayed a DNS check in progress; no DNS or settings were changed.

The production site was inspected. Its old offer, oversized hero, missing phone placeholder, and unrelated metadata were replaced throughout the new source and build. The replacement was merged through PR #1 and deployed successfully by the existing workflow on 2026-09-17 (run 35277220677). Subsequent owner-directed refinements are recorded below.

## Current GoWP Business evidence

| Official source | Finding used | Boundary |
|---|---|---|
| https://gowp.com/pricing/ | Business includes the Pro maintenance capabilities, five human edits monthly, and a human edit typically about 30 minutes or less; real-person support; weekly or monthly reports | Novren selects monthly reporting. Vendor prices and AI allowances are not Novren public claims. |
| https://gowp.com/features/updates/ | WordPress, theme, and plugin updates; pre-update restore point; visual comparison of key pages; configurable schedule | Visual checks are not complete functional tests. Licenses and server prerequisites can stop updates. No fixed update cadence invented. |
| https://gowp.com/features/backups/ | Daily file/database backups stored off-site with 90 days of history | History builds after connection; no pre-service history or lossless recovery promise. |
| https://gowp.com/features/security/ | Daily scans and cleanup; supported issues handled automatically; other findings need review | No promise to prevent every compromise or eliminate every issue instantly. |
| https://gowp.com/agencies/ | Agency branding, service support and reporting, optional branded domain/email experience | Supports partner fulfillment; does not prove Novren has already configured or paid for an account. No portal shown. |

The current vendor pricing page distinguishes five human edits from its separate AI-edit allowance. Older GoWP pages conflict with current limits. The current Business page governs this implementation. Recheck these exact pages immediately before any public release; vendor changes can invalidate a numerical claim. Vendor account activation and contractual fulfillment still need owner confirmation before enrollment.

## Booking and data flow

[Cal.com UTM documentation](https://cal.com/help/bookings/utm-tracking) was opened and checked live. It explicitly supports automatic capture of the five standard UTM fields in booking links. The implementation forwards only those allowlisted fields, applies conservative slug/length validation, strips unrelated query data during internal handoff, and stores nothing in cookies or browser storage. It preserves campaign labels through on-site links. No Cal.com embed or analytics package is used.

The exact [booking event](https://cal.com/gabe-glenn-9zwzc2/strategy-call) opens and offers available dates/times. Its title and description initially concerned the previous service. After explicit owner approval, the existing event was updated to “Website-care fit call” and the approved WordPress-care description. The public result was verified; URL and availability were preserved. The owner later requested a shorter call; 20 minutes was selected and publicly verified. No booking was submitted. The earlier automatic-approval block was resolved by that explicit authorization.

[Cal.com Privacy Policy](https://cal.com/privacy) was checked for the third-party disclosure. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) states that visitor IP addresses are logged for security. The [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) supplies the linked host disclosure. No unknown email provider is named.

## Category and terminology research

Competitors provide category patterns only, never substantiation of Novren capabilities.

| Site checked | Pattern observed | Applied to Novren |
|---|---|---|
| [WP Buffs plans](https://wpbuffs.com/plans/) | Tiered monthly cards, one-site explanation, detailed included/excluded edit examples; the visible Maintain/Protect examples were $89/$179 monthly | Use one plainly priced plan and concrete edit examples. Do not borrow their “unlimited,” response, availability, or guarantee claims. |
| [SiteCare pricing](https://sitecare.com/pricing/) | “WordPress Support Plans,” “Plans & Pricing,” audience framing for business marketing sites, plan comparison | Pair “Website Care” branding with descriptive maintenance/support language. Their audience and hosting scope differ. |
| [FixRunner](https://www.fixrunner.com/) | “WordPress maintenance,” “care plans,” ongoing management, separate one-time fixes, support and onboarding objections | Explain routine care versus major repair and how to ask for help. Their testimonials, customer count, and performance promises are not used. |

“WordPress maintenance,” “WordPress support,” and “website care” are observable category terms. This is terminology research, not keyword-volume research. No paid keyword data, ranking forecast, or demand estimate was available or invented. The homepage title uses “WordPress Maintenance for Small Businesses | Novren.”

## Design rationale (hypotheses, not conversion facts)

- [NN/g homepage guidance](https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/) (2001) and [tagline guidance](https://www.nngroup.com/articles/tagline-blues-whats-the-site-about/) support stating purpose and audience early. These are foundational guidelines, not a fresh Novren experiment.
- [NN/g B2B pricing](https://www.nngroup.com/articles/show-prices-for-common-scenarios/) (2006) supports accessible price information for shortlisting. The monthly and onboarding prices are visible in a dedicated pricing section, reachable from the header. The owner’s later request moves them below the first viewport; this preference supersedes the initial price-in-hero direction.
- [NN/g trustworthiness](https://www.nngroup.com/articles/trustworthy-design/) (2016) and [Stanford credibility guidance](https://credibility.stanford.edu/guidelines/) support clear contact, professional presentation, and verifiable information. They do not justify fabricated proof.
- [NN/g web writing](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/) supports concise, scannable, objective copy. No study effect size is attributed to Novren.
- The supplied homepage order is retained: hero, fit, inclusions, exclusions, process, pricing, transparency, FAQ, closing action, legal footer. Native disclosures contain secondary FAQ answers only. Price and scope stay visible outside disclosures.
- Navy/royal-blue/sky palette and wordmark retained; system fonts, lightweight inline SVGs, no stock-photo hero, fake metrics, carousel, or dashboard. The service checklist describes the plan rather than showing invented customer activity.
- Qualified-call wording is a hypothesis for screening visitors, not proof of a higher conversion rate. Future evaluation should consider qualified calls and fit, not clicks alone.

## Accessibility, search, and performance references

All opened/rechecked on 2026-09-17:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — current Recommendation page dated December 12, 2024; use semantic structure, contrast, keyboard focus, reflow, and operable controls.
- [WAI forms guidance](https://www.w3.org/WAI/tutorials/forms/) — no public form implemented; applies if one is proposed later.
- [DOJ web guidance](https://www.ada.gov/resources/web-guidance/) and [WAI accessibility statements](https://www.w3.org/WAI/planning/statements/) — accessibility target and honest assessment/limitations, not certification.
- [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) — field targets LCP ≤2.5s, INP <200ms, CLS <0.1. Local Lighthouse scores are lab evidence, not field claims.
- [Google SEO guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — crawlable HTML, descriptive titles, useful copy, coherent links.
- [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and [HTTPS guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) — preserve existing routing/domain setup.

Baseline generated client chunks totaled 387,555 uncompressed bytes across six JavaScript chunk files. The replacement ships one small progressive-enhancement file and no React hydration or RSC payload. This is an output-byte comparison, not a measured real-world conversion or speed improvement. The stack remains unchanged; only unused browser runtime and dependencies were removed. Exact final bytes and Lighthouse metrics are in qa-report.md.

## Advertising and legal research

- [FTC substantiation guidance](https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business): objective express and implied claims need a reasonable basis before publication; material scope limits belong close to the offer.
- [FTC testimonials rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers): do not create false consumer proof or transfer another vendor’s testimonials.
- [FTC CAN-SPAM guidance](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business): commercial B2B email is covered; use a valid postal address and working opt-out mechanism. Do not publish a home address merely to fill a field.

The owner adopted the prepared public policies, USD currency, and onboarding scope on 2026-09-17. Attorney review is recommended. No governing jurisdiction, legal entity, address, cancellation/refund term, service SLA, or liability cap has been invented.


## Immediate prepublication recheck

On 2026-09-17 around 21:24 UTC, the official pricing, backups, and updates pages were revisited. Business still includes five human edits per month, approximately 30 minutes or less; daily backups with 90 days of history; the Pro maintenance/support/report features; and inherited uptime/SSL monitoring. Off-site files/database storage and a restore point before every update run remain stated. No vendor scope change was found.

## Owner-directed refinement after preview

The owner requested lower price placement and removal of public copy announcing absent case studies. The implementation removes that wording from Home and About, keeps truthful scope/process/contact details, and introduces no replacement proof claims. The homepage and Service introduction no longer show prices; the price is published farther down each page. The 20-minute fit call is a product decision intended to allow discussion of the website, care needs, scope, and next steps; it is not a promise of an audit or a proven conversion tactic. Duration is centralized in site-config.ts and matched in Cal.com. See P11 in novren-policies.md.

The current GoWP pricing page was rechecked again around 21:52 UTC immediately before publishing the owner-directed refinements. Five human edits, approximately 30 minutes or less, daily backups with 90-day history, daily security scanning/cleanup, uptime/SSL monitoring, real-person support, and monthly report availability remained stated. The refined site was subsequently deployed and checked; see qa-report.md for actual production evidence.
