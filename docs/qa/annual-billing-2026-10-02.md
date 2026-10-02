# Annual billing implementation and verification

Completed October 2, 2026 under the owner's authorization to add a quiet annual option.

## Commercial configuration

- Default: $399 USD/month, no setup fee.
- Optional annual: $3,999 USD paid upfront for 12 months, renewing annually.
- Savings: $4,788 minus $3,999 = $789 (16.48%); equivalent to $333.25/month when paid annually.
- Identical care and monthly allowances: 50 AI edits and five small human edits per month. Annual payment does not combine allowances into a yearly pool.
- Customers may cancel future renewal or request early departure. Voluntary early departure does not receive a prorated refund of unused time. Initial onboarding non-acceptance refund, billing corrections and legally required rights remain protected.
- The annual option sits below the main monthly CTA. The normal signup page defaults to monthly; the annual link preselects annual billing.

## Stripe live records

Account: `acct_1UEDGzGmxVYsIEOr` (live mode).

| Record | Value |
| --- | --- |
| Shared product | `prod_VEhIAtl9uNWhWu` — Novren WordPress Care |
| Monthly/default price | `price_1UIbYZGmxVYsIEOr4acmcAgq` — 39900 USD cents/month |
| Monthly payment link | `plink_1UIbZEGmxVYsIEOruIytro0O` |
| Monthly URL | https://buy.stripe.com/14A14ncmL9QK7KQ2G17Vm02 |
| Annual price | `price_1UMDFWGmxVYsIEOrFj9tYR3S` — 399900 USD cents/year |
| Annual payment link | `plink_1UMDGlGmxVYsIEOrelyUpe8Z` |
| Annual URL | https://buy.stripe.com/4gM14naeD4wq7KQ0xT7Vm03 |
| Success destination | https://novren.co/onboarding?checkout=complete |

Annual checkout has one quantity-one annual price, no setup item, required name/business/website information, terms acceptance, annual auto-renewal and refund-policy disclosure. Phone, promotions and automatic tax were not enabled. The product description now describes service independently of billing frequency; the default monthly price is unchanged. Existing obsolete links remain inactive.

## Application and data

- The eligibility endpoint validates `month` or `year` and chooses the corresponding known hosted payment link.
- Signed webhooks verify payment mode, USD currency, subscription mode, exact payment-link identity, and the full expected amount before unlocking onboarding.
- The paid billing interval is retained with the signup and drives onboarding status, welcome email and intake acknowledgement.
- Migration `0002_annual_billing.sql` was applied to local, sandbox and production databases. Existing signups default to `month`; the additional column remains compatible with the previous Worker for rollback.
- No public form collects passwords or other privileged credentials.
- No existing subscription was migrated to a new price or billing interval.

## Verification performed

1. Production static build completed: 20 pages, no React hydration, one 7113-byte progressive-enhancement script.
2. TypeScript check passed; Git whitespace check passed.
3. Five existing/local integration tests passed, including annual routing, amount verification, signed webhook and mode separation, replay protection, billing persistence, invalid interval rejection, eligibility, URL validation and onboarding bounds.
4. Live website eligibility flow reached annual Stripe checkout showing $3,999/year and annual terms. Returning to ordinary signup defaulted to monthly and reached $399/month checkout. Neither live checkout was purchased.
5. Live Terms, Billing and expanded annual FAQ showed the current prices, identical monthly allowances and cancellation/refund policy.
6. Phone-sized (390 × 844) signup check showed the selected annual option and disclosure without horizontal overflow. Temporary viewport override was reset.
7. Desktop review caught and corrected low-contrast annual text on the navy pricing card. Final live screenshot confirms readable secondary annual pricing. No console errors were captured on the final pricing view.

Screenshots retained outside the repository:

- `outputs/novren-annual-pricing-2026-10-02.png`
- `outputs/novren-annual-mobile-2026-10-02.png`

## Real isolated Stripe sandbox run

Account: `acct_1UEDH7GrCZ41nDTE` (Novren sandbox, `livemode: false`). No real payment or website activation.

| Record | Value |
| --- | --- |
| Test annual price | `price_1UMDKpGrCZ41nDTEWfOWpadP` |
| Test annual payment link | `plink_1UMDQFGrCZ41nDTEnZTVy29X` |
| Test annual URL | https://buy.stripe.com/test_bJe14nafE6IYgat0WK33W01 |
| Signup | `62e862c1-5111-4efc-9007-968dafbe43ab` |
| Checkout | `cs_test_a1fRHtUMxEkxyhCthsFfHvZOvoO5vGdIOpQhC4PW5Zc55r7NHmXYXlB3SY` |
| Test subscription | `sub_1UMDUmGrCZ41nDTE0TBkNcgy` |

The browser security review required the human to click the final sandbox Subscribe button. The owner did so; the payment was then verified through the signed webhook. Onboarding displayed the annual price/cycle, accepted clearly marked TEST ONLY details for example.com, and saved successfully.

Sandbox D1 showed `payment_status=paid`, `billing_interval=year`, `intake_saved=1`. All four outbox jobs (paid customer, paid owner, intake owner, intake customer) were sent successfully on their first attempt. Gmail showed the annual welcome and intake acknowledgement, plus the owner payment notice forwarded through the GoWP helpdesk. No GoWP site was provisioned.

The sandbox Stripe checkout has an existing terms/eligibility-field parity difference from live checkout; the site's eligibility check is the same. The live annual checkout separately verified its required terms and eligibility fields. A year of actual renewals was not simulated; no cancellation or refund was executed against a real customer.

## Deployment and rollback

| Target | Final Worker version |
| --- | --- |
| Production `novren-website` | `eb2ff31a-e44c-4706-bf9b-af209607a3be` |
| Sandbox `novren-website-test` | `fbe5861d-ec4d-4a35-8577-e887cace24c7` |

Source backup: `backup/pre-annual-2026-10-02` at commit `37ca498`. Previous production version: `6f5f6644-df3c-44a0-b67f-3819784f6a0d`. Production D1 pre-migration bookmark: `00000255-00000000-000050f8-fd7d2ac7e9db9172594b7a709c75a42c`. Code rollback does not roll back database state; do not restore the database routinely or discard subsequent customer records.

The final deployments changed static pricing readability only after the successful annual integration run. Runtime behavior and bindings were unchanged in that last pass. Worker secrets, existing route, cron, support routing, GoWP policy settings, Cal.com, DNS, tax configuration and payouts were preserved.

## References and remaining review

- [Cloudflare Wrangler deployment reference](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy): deployed with the installed project version and the existing production/test configs; existing secrets are preserved.
- The commercial policy implements the owner's decisions. Attorney review topics remain in `docs/legal-open-items.md`, including applicable annual auto-renewal reminders and statutory rights. No claim of universal legal enforceability is made.

No implementation blocker remained at completion.
