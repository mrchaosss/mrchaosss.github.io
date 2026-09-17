# Quality-assurance report

Assessment date: September 17, 2026. Branch: `feat/novren-website-care`, based on production `68a980b9beb65cb4a7a92f784e9a329bfdfc1320`. This is the replacement build assessment, not a claim that production has been deployed.

## Result and release status

The replacement passes clean dependency installation, lint, TypeScript, production build, static route/link checks, campaign-parameter tests, responsive checks, and the requested Lighthouse thresholds. **Production is not deployed.** The owner approved the launch policies, USD currency, and onboarding scope; the Cal.com event was corrected and verified. The release is ready to merge through the existing workflow. Remaining pre-client requirements are in [legal open items](legal-open-items.md).

## Commands actually run

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile --force` | PASS; clean forced reinstall, 315 packages, existing lockfile used after intentional dependency removal |
| `pnpm lint` | PASS (`oxlint`) |
| `pnpm exec tsc --noEmit` | PASS, no diagnostics |
| `pnpm build` | PASS; Vinext exported nine routes; static finalization completed |
| `node scripts/verify-static.mjs` | PASS; nine pages, links/assets/anchors, metadata, sitemap, robots, JSON-LD, icon, social dimensions, scope-copy/secret patterns, campaign cases |
| `git diff --check` | PASS after removing trailing blank lines |
| Browser console | No errors or warnings observed during local route and interaction checks |

Node 24.19.0, pnpm 11.19.0, TypeScript 5.9.3, React 19.2.6, Vinext 1.0.0-beta.5, Vite 8.0.13. The clean install required network access and the machine's existing pnpm store. No runtime dependency migration or hosting migration was performed.

## Lighthouse: actual final runs

Lighthouse 13.4.1; headless Chrome 153.0.0.0 on Windows. URL: `http://127.0.0.1:4173/`, built HTML served by the local production-preview server. Mobile uses Lighthouse default simulated mobile throttling; desktop uses its official desktop preset. One final run for each mode, no averaged or rounded-up scores. Both audits and isolated Chrome cleanup exited successfully (0).

| Category / metric | Mobile, 20:56:33.795 UTC | Desktop, 20:58:59.042 UTC |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint, milliseconds | 1201.8337 | 281.946 |
| Cumulative Layout Shift | 0 | 0 |
| Total Blocking Time, milliseconds | 0 | 0 |
| First Contentful Paint, milliseconds | 901.8336999999999 | 241.94600000000003 |
| Speed Index, milliseconds | 901.8336999999999 | 241.94600000000003 |

Raw metric precision above is copied from the reports. INP was not measured: it requires interaction/field data; TBT is not a substitute for a published INP claim. No field Core Web Vitals or conversion data is available.

Both runs reported no run warnings or runtime error. Non-scoring diagnostics still identify the local server's lack of compression, the small stylesheet's render-blocking request, and the normal HTML → stylesheet/script dependency chain. Mobile estimates 10ms render-blocking savings. No material threshold failure remained. GitHub Pages delivery/compression must be checked after deployment rather than inferred from localhost.

Artifacts: [mobile raw report](qa/lighthouse-mobile.report.json), [desktop raw report](qa/lighthouse-desktop.report.json), [static verification](qa/static-verification.json).

Earlier CLI runs produced valid reports but returned a Windows temporary-profile cleanup error. They were replaced by the successful final runs using dedicated, isolated profiles; their results are not used in the table.

## Page, link, metadata, and asset checks

All of `/`, `/service`, `/process`, `/about`, `/contact`, `/privacy`, `/terms`, `/accessibility`, and `/404.html` were opened in the browser and checked in exported HTML.

- All internal page links, anchors, referenced CSS/script assets, and icons resolve in the export. Unknown paths receive the branded HTTP 404 response from the preview server.
- One H1 per page, English document language, header/main/footer landmarks, skip link, and unique descriptive page titles.
- Meta descriptions, canonical URLs, Open Graph, Twitter large-card metadata, and social-image URL are present. Homepage canonical serialization is `https://novren.co`; the sitemap root has the equivalent trailing slash.
- Organization and Service JSON-LD parse successfully and match the configured offer. No ratings, reviews, address, founding date, or unsupported service area.
- Sitemap contains the eight indexable routes; 404 is excluded and has `noindex, follow`. Robots points to the production sitemap.
- Working SVG/PNG favicon and Apple touch icon; original branded social image is exactly 1200×630.
- The exact Cal.com destination opens and exposes available slots. No appointment was made. Its description initially referenced the former service; the owner-approved Website-care fit call title and description have now been saved and publicly verified. URL, 30-minute duration, and availability were preserved.
- All email links target `mailto:hello@novren.co`. No email was sent; successful mailbox receipt/routing is an operational owner check.
- No contact form, embedded scheduler, card collection, credential collection, analytics, advertising, replay, chat, or client-login link.

## Responsive and manual accessibility assessment

Browser checks covered all nine routes at 320, 375, 768, 1024, and 1440 CSS pixels: **45 route/width combinations**, each with no horizontal page overflow and one H1. See [browser measurements](qa/browser-qa.json).

At 1366×768, the full homepage hero ends at approximately 748px; the primary hero CTA ends at approximately 613px and the price at approximately 543px. Audience, service, price, CTA, and WordPress qualification are visible without scrolling.

Manual keyboard checks on the actual browser:

- Tab reaches the skip link first, with a visible solid focus outline. Enter moves focus to the main content.
- Header and content links follow a usable order with visible focus.
- Mobile navigation opens with Enter; links can be reached with Tab; Escape closes the menu and returns focus to its summary. Choosing a link closes the menu.
- Native FAQ disclosure opens/closes with Enter and retains visible focus; answer content becomes available without a pointer.
- No keyboard trap observed in the marketing site. External scheduling is not a comprehensive accessibility audit.
- The site uses a 44px design target for primary controls, descriptive links, decorative SVGs hidden from assistive technology, text plus symbols for checklist meaning, and reduced-motion/forced-color CSS.
- Automated contrast checks passed; no normal-text contrast failure was reported.

Zoom/reflow method is explicitly limited: browser automation's zoom shortcuts did not change the browser zoom value, so they are **not recorded as a successful native-browser zoom test**. A local test harness displayed the unchanged site inside a half-width iframe scaled to 200%, giving the expected enlarged presentation and narrow layout viewport. Manual inspection found readable content and no horizontal overflow (675px content/layout width in a 1366px outer viewport). The separate 320px tests cover narrow reflow. This is not comprehensive native browser zoom, text-only zoom, screen-reader, Safari, or Firefox coverage; a final native-browser zoom/assistive-technology spot check remains recommended.

Screenshots: [1366px laptop](qa/home-laptop-1366.png), [375px mobile](qa/home-375.png). Full screenshot set and human-readable Lighthouse reports are included in the task's delivered outputs.

## Privacy, campaign links, and script reduction

The final HTML loads one 1,797-byte uncompressed hashed enhancement script, compared with 387,555 uncompressed bytes in six baseline JavaScript chunks. This is an artifact comparison, not a field-speed promise. The export contains no React hydration/RSC runtime. Native links and disclosures work without JavaScript; only campaign propagation and Escape convenience depend on it.

Lighthouse observed four requests: the same-origin document, stylesheet, enhancement script, and favicon. No third-party marketing-page requests were observed. Source inspection finds no cookie/localStorage/sessionStorage writes or network calls in the enhancement. Host-side processing and external destination practices are disclosed separately; no absolute “no cookies anywhere” claim is made.

Tested valid five-parameter handoff, preservation through an actual homepage → Service navigation, booking destination, and exclusion of unrelated query keys. Tests reject duplicated keys, email-like values, markup, and values longer than 80 characters. Email and unrelated external links remain untouched. Links remain ordinary usable URLs when parameters are absent.

## Repository / deployment safety

The exact remote was confirmed before edits. Work began from the fetched production branch; the divergent local `main` was preserved. No unrelated uncommitted changes were present at baseline. No history was rewritten and no DNS or GitHub Pages settings changed.

These protected files match their baseline SHA-256 hashes:

| File | SHA-256 |
|---|---|
| `.github/workflows/deploy.yml` | `5A403E26DA790425320FBF3068243A3D04E6C24D4E0EF55225E4867C5C682556` |
| Root `CNAME` | `011E95E7571DD968A24F50F9A40AC7913AF940537CBBDDDC37706C9729F846B9` |
| `public/CNAME` | `91E3B6E24124FC49C51192AC53C101D323814907073A6F57625A67D2F8E1621B` |

GitHub settings were inspected read-only: deployment source GitHub Actions, custom domain novren.co, Enforce HTTPS checked. The UI displayed a DNS check in progress; no change was made.

Current production was checked before release: HTTPS apex returned 200; HTTPS www and both HTTP variants resolved to HTTPS apex. Existing Service, Process, About, Contact, Privacy, and Terms returned 200. Accessibility currently returned 404 because this replacement has not been deployed; the new export supplies it. The old explicit `/404.html` returned 200, while unknown paths use 404 semantics.

Old offer promises are absent from the new public source, metadata, configuration, README, legal pages, structured data, sitemap, and exported pages. Historical removal records in the research/claim ledger and the test's prohibited-pattern list intentionally name what was removed; these are not served as marketing pages. Known secret-pattern scans found no credentials in tracked files or the export. Such a scan cannot prove the absence of every possible secret; no credentials were added.

## Checks after a future merge/deployment

Not run for the replacement because production has not been deployed. The public policy/event gates are resolved. Merge through the unchanged GitHub Pages workflow, wait for its successful deployment, then verify HTTPS apex/www/HTTP redirects, all eight public routes, an unknown URL returning the branded 404, booking/email actions, canonical and social metadata, sitemap/robots/assets, and the hidden portal. Recheck current GoWP numerical promises immediately before publishing. Keep the signed agreement and secure credential process gate in place before accepting payment or access.
