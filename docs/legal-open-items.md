# Operational checklist and legal review

## Routine first-client work

1. Match successful Stripe subscription and website to onboarding email.
2. Check eligibility, licenses, hosting compatibility, existing issues, and critical functions.
3. Coordinate connector/pairing or another existing secure access method.
4. Add/associate the real client and site in the care workspace.
5. Verify first usable backup, scans, monitoring, update policy, contacts, and reports.
6. Confirm activation and send the portal invitation; explain 50 AI edits, five small human edits, review/approval and scope limits.
7. Review reports, handle flagged findings, track edits, and process timely cancellations. Arrange backup handoff before service ends when requested.

The workspace had zero connected sites at release. No sample paid site or subscription was provisioned. Site activation remains ordinary onboarding work for each real customer.

## Attorney/accounting review

Published terms/privacy follow the owner’s execution authorization. Counsel should review business identity/contact disclosures, applicable subscription/cancellation rules, refund/termination language, liability provisions, customer-data processing in backups, subprocessors, retention/deletion, and jurisdiction-specific notices. No legal entity, postal address, liability cap, arbitration clause, or jurisdiction was invented.

Tax configuration, accounting, registrations, and payouts were unchanged as instructed. Obtain appropriate advice for actual obligations; no tax treatment was invented.

## Infrastructure verified

September 28: real transactional email from onboarding@notify.novren.co reached hello@novren.co in the GoWP helpdesk on its first attempt. app.novren.co displays the Novren login page. The Cloudflare move preserved root Google MX and recipient routing. Existing Postmark return-path proxying was corrected to DNS-only, and omitted GoWP DKIM/portal TXT records were restored exactly from the previous Squarespace DNS configuration. New sending authentication is confined to notify.novren.co. Workspace client AI visibility was enabled; other locked policies were preserved. See cloudflare-launch.md.

Outreach campaign creation was outside this implementation. Apply required sender identification, unsubscribe handling, and business contact information to actual campaigns. Search snippets may retain old content until recrawl.
