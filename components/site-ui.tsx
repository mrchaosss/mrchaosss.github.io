import type { ReactNode } from 'react';
import { BookCallLink } from './book-call-link';
import { siteConfig as c, money } from '@/lib/site-config';
import { services } from '@/lib/content';
export function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    updates: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M6.1 7a7 7 0 0 1 11.5-1L20 9M4 15l2.4 3A7 7 0 0 0 18 17" />
      </>
    ),
    backups: (
      <path d="M5 7c0-4 14-4 14 0s-14 4-14 0Zm0 0v10c0 4 14 4 14 0V7M5 12c0 4 14 4 14 0" />
    ),
    security: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </>
    ),
    monitoring: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8m-4-4v4M6 11h3l2-4 3 7 2-3h2" />
      </>
    ),
    edits: (
      <>
        <path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14v6Z" />
      </>
    ),
    support: (
      <>
        <path d="M21 11a8 8 0 0 1-8 8H7l-4 2V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4Z" />
        <path d="M7 8h10M7 12h7" />
      </>
    ),
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] ?? paths.support}
    </svg>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div>
          <p className="eyebrow">Start with your website</p>
          <h2>Ready to hand over the routine care?</h2>
          <p>$399/month per website. No setup fee. No required sales call.</p>
        </div>
        <div className="final-actions">
          <a className="button button-light" href="/get-started">
            Get Started →
          </a>
          <BookCallLink className="button button-outline-light" />
          <p className="small">Questions first? The call is optional.</p>
        </div>
      </div>
    </section>
  );
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s) => (
        <article key={s.id} className="service-card">
          <div className="icon-box">
            <Icon name={s.icon} />
          </div>
          <p className="card-label">{s.label}</p>
          <h3>{s.title}</h3>
          <p>{s.copy}</p>
        </article>
      ))}
    </div>
  );
}
export function PriceCard() {
  return (
    <div className="price-card">
      <div className="price-card-top">
        <p className="card-label">ONE FOCUSED PLAN</p>
        <p className="plan-name">{c.planName}</p>
        <p className="price">
          {money(c.monthlyPrice)}
          <span> / month</span>
        </p>
        <p className="onboarding">
          <strong>No setup fee.</strong> Normal onboarding included.
        </p>
        <p>
          For one eligible existing WordPress website. Prices in {c.currency}.
        </p>
      </div>
      <ul className="check-list">
        <li>Managed updates with visual checks where supported</li>
        <li>Daily offsite backups · {c.backupHistoryDays}-day history</li>
        <li>Daily security scanning and flagged-issue coordination</li>
        <li>Uptime and SSL monitoring</li>
        <li>Up to {c.humanEditsPerMonth} small human edits per month</li>
        <li>Maintenance support and a monthly report</li>
      </ul>
      <a className="button button-primary" href="/get-started">
        Get Started →
      </a>
      <p className="small">
        Month-to-month. Cancel before a future renewal to stop the next charge.
        Larger projects are separate. <a href="/terms">Service terms</a>.
      </p>
      <BookCallLink className="text-link">
        Have questions? Book a Call
      </BookCallLink>
    </div>
  );
}
