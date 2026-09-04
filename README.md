# Novren

Marketing website for Novren, a managed online reputation service for established local businesses.

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

The static site is generated in `dist/client` and deployed by GitHub Actions.

## Before public launch

- Set up `hello@novren.co` or replace the email address in the site header, calls to action, footer, and legal pages.
- Confirm the final service agreement and cancellation terms before accepting clients.
- In GitHub repository settings, set Pages to **GitHub Actions** and add `novren.co` as the custom domain.
- Point the domain’s DNS records to GitHub Pages, then enable HTTPS after DNS verification completes.

No analytics, customer logos, testimonials, or performance claims are included in this initial version.
