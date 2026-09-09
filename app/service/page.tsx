import type { Metadata } from 'next';
import { BookCallLink } from '@/components/book-call-link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Managed Reputation Service',
  description: 'Review requests, monitoring, personalized responses, listings, Google Business Profile activity, and monthly reporting—managed as one service.',
  alternates: { canonical: '/service' },
};
export const dynamic = 'force-static';

const deliverables = [
  {
    title: 'Review acquisition toolkit',
    copy: 'We create one permanent review link, a print-ready QR code, and practical email and SMS templates. Your team gets a simple playbook for choosing the right customer touchpoints and asking after genuine interactions.',
    detail: 'Link · QR code · email and SMS templates · touchpoint plan',
  },
  {
    title: 'Daily monitoring and responses',
    copy: 'New reviews are monitored across major platforms and the wider directory network. Up to 200 responses per month are drafted, reviewed, personalized, and prepared for publication.',
    detail: 'Google · Facebook · Yelp · 70+ directories',
  },
  {
    title: 'Listings management',
    copy: 'Core business details—name, address, phone, hours, services, and other important fields—are checked and synchronized across more than 70 directories.',
    detail: 'Accuracy checks · corrections · ongoing synchronization',
  },
  {
    title: 'Google profile activity',
    copy: 'Your Google Business Profile receives fresh posts and photos each week, helping customers see a business that is active and keeping the profile useful and current.',
    detail: 'Weekly posts · weekly photos · activity log',
  },
  {
    title: 'Policy issue monitoring',
    copy: 'Reviews that appear to involve spam, harassment, conflicts of interest, or other platform-policy issues are flagged and moved through the available reporting process.',
    detail: 'Issue review · platform reporting · status tracking',
  },
  {
    title: 'Monthly performance reporting',
    copy: 'You receive a clear view of review velocity, response coverage, profile actions, listing accuracy, work completed, and local visibility for an agreed priority keyword.',
    detail: 'Monthly report · local rank grid · next actions',
  },
];

export default function ServicePage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="subpage-hero service-hero">
        <p className="eyebrow">Managed Reputation</p>
        <h1>One service. Six recurring deliverables.</h1>
        <p>
          Novren handles the operational work behind a credible local reputation—from the first
          review request to the monthly report—without asking your team to learn another platform.
        </p>
        <BookCallLink className="button button-primary" />
      </section>

      <section className="deliverables-section" aria-labelledby="deliverables-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">What is included</p>
          <h2 id="deliverables-title">The work behind the offer.</h2>
        </div>
        <div className="deliverable-list">
          {deliverables.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{item.title}</h2><p>{item.copy}</p></div>
              <p className="detail-line">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="report-detail" aria-labelledby="report-detail-title">
        <div>
          <p className="eyebrow">Your monthly report</p>
          <h2 id="report-detail-title">Useful measures, not a wall of charts.</h2>
          <p>The report is meant to answer three questions: what happened, what Novren completed, and what deserves attention next.</p>
        </div>
        <dl>
          <div><dt>Review velocity</dt><dd>New reviews by month and platform, compared with the starting baseline.</dd></div>
          <div><dt>Response coverage</dt><dd>Reviews answered, response timing, and average rating.</dd></div>
          <div><dt>Profile activity</dt><dd>Google profile views, calls, direction requests, and website clicks when available.</dd></div>
          <div><dt>Local visibility</dt><dd>A 25-point local rank grid for one agreed priority keyword.</dd></div>
          <div><dt>Listing accuracy</dt><dd>Consistency across the directory network and mismatches corrected.</dd></div>
          <div><dt>Work log</dt><dd>Posts, photos, responses, and policy issues handled during the month.</dd></div>
        </dl>
      </section>

      <section className="scope-section">
        <div>
          <p className="eyebrow">Clear boundaries</p>
          <h2>What the service does not promise.</h2>
        </div>
        <div>
          <p>Novren does not guarantee ratings, search positions, review volume, leads, or revenue.</p>
          <p>We do not buy or invent reviews, condition requests on positive sentiment, or claim we can remove legitimate customer criticism.</p>
        </div>
      </section>

      <section className="price-banner">
        <div><p className="eyebrow">One business location</p><h2>$699 <span>per month</span></h2></div>
        <p>The complete Managed Reputation service. Multi-location scopes are discussed separately.</p>
        <BookCallLink className="button button-light">Book a call about your location</BookCallLink>
      </section>
      <SiteFooter />
    </main>
  );
}
