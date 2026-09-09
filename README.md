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

- Update `lib/site-config.ts` when the final booking URL, email address, and phone number are ready. Every call-to-action and contact surface reads from that one file.
- Confirm the final service agreement and cancellation terms before accepting clients.
- In GitHub repository settings, set Pages to **GitHub Actions** and add `novren.co` as the custom domain.
- Point the domain’s DNS records to GitHub Pages, then enable HTTPS after DNS verification completes.

No analytics, customer logos, testimonials, or unverified performance claims are included.
