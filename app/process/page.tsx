import type { Metadata } from 'next';
import { BookCallLink } from '@/components/book-call-link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Process',
  description: 'See how Novren sets up and manages review requests, responses, listings, Google profile activity, and reporting.',
  alternates: { canonical: '/process' },
};
export const dynamic = 'force-static';

const onboarding = [
  ['Week 1', 'Confirm the foundation', 'We verify your Google Business Profile locations, confirm core business details, provision the permanent review link, create the QR code, and hold a focused kickoff.'],
  ['Week 2', 'Put the system in place', 'Listing synchronization begins, the first Google post and photo cadence starts, and the initial QR-bearing customer touchpoints are prepared.'],
  ['Week 3', 'Brief the people who ask', 'The employees closest to completed jobs get a short, practical review-request playbook. Response drafts begin moving through the agreed approval flow.'],
  ['Week 4', 'Review the baseline', 'We review the first activity snapshot, response coverage, listing accuracy, profile actions, and the starting local rank grid, then set the next 60-day priorities.'],
];

export default function ProcessPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="subpage-hero process-hero">
        <p className="eyebrow">How it works</p>
        <h1>Clear at the start. Consistent after that.</h1>
        <p>The first month establishes the system. After setup, Novren runs the recurring work and brings your team in only when context or approval is needed.</p>
        <BookCallLink className="button button-primary" />
      </section>

      <section className="onboarding-section" aria-labelledby="onboarding-title">
        <div className="onboarding-intro">
          <p className="eyebrow">The first 30 days</p>
          <h2 id="onboarding-title">A practical four-week setup.</h2>
          <p>Timing can shift with profile access and approvals, but the sequence stays straightforward.</p>
        </div>
        <ol>
          {onboarding.map(([week, title, copy]) => (
            <li key={week}>
              <p>{week}</p>
              <h3>{title}</h3>
              <span>{copy}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="responsibility-section" aria-labelledby="responsibility-title">
        <div>
          <p className="eyebrow">A clean handoff</p>
          <h2 id="responsibility-title">Who handles what.</h2>
        </div>
        <div className="responsibility-grid">
          <article>
            <p className="card-kicker">Novren handles</p>
            <ul>
              <li>Review link, QR code, and templates</li>
              <li>Monitoring and response preparation</li>
              <li>Directory checks and synchronization</li>
              <li>Weekly Google posts and photos</li>
              <li>Policy issue reporting</li>
              <li>Monthly reporting</li>
            </ul>
          </article>
          <article>
            <p className="card-kicker">Your team provides</p>
            <ul>
              <li>Accurate location and service details</li>
              <li>Access to the relevant business profiles</li>
              <li>Brand materials and usable photos</li>
              <li>A real-customer review-request moment</li>
              <li>Context for sensitive feedback</li>
              <li>One dependable point of contact</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="monthly-rhythm" aria-labelledby="rhythm-title">
        <div><p className="eyebrow">After setup</p><h2 id="rhythm-title">The monthly rhythm.</h2></div>
        <div className="rhythm-grid">
          <article><span>Daily</span><h3>Watch and respond</h3><p>Monitor new reviews, prepare responses, and identify possible policy issues.</p></article>
          <article><span>Weekly</span><h3>Keep Google current</h3><p>Publish useful Google Business Profile posts and approved photos.</p></article>
          <article><span>Ongoing</span><h3>Maintain accuracy</h3><p>Keep core business information synchronized across the directory network.</p></article>
          <article><span>Monthly</span><h3>Review the evidence</h3><p>Share a concise report and identify the next actions that matter.</p></article>
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Ready to talk it through?</p>
        <h2>Bring your current process—or the lack of one.</h2>
        <p>We’ll map what is happening now, where the work breaks down, and whether the managed program is the right fit.</p>
        <BookCallLink className="button button-light" />
      </section>
      <SiteFooter />
    </main>
  );
}
