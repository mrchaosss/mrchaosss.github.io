import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { alternates: { canonical: '/' } };
export const dynamic = 'force-static';

const capabilities = [
  {
    number: '01',
    title: 'Review request campaigns',
    copy: 'Timely email and text requests help real customers share honest feedback after a completed service.',
  },
  {
    number: '02',
    title: 'Daily review monitoring',
    copy: 'Google, Facebook, Yelp, and more than 70 directories are watched from one place.',
  },
  {
    number: '03',
    title: 'Thoughtful responses',
    copy: 'Up to 200 review responses each month are prepared, personalized, and published for you.',
  },
  {
    number: '04',
    title: 'Accurate listings',
    copy: 'Core business details stay consistent across the directories customers use to find and verify you.',
  },
  {
    number: '05',
    title: 'Weekly Google activity',
    copy: 'Fresh posts and photos keep your Google Business Profile current instead of forgotten.',
  },
  {
    number: '06',
    title: 'Policy issue monitoring',
    copy: 'Reviews that appear to violate platform rules are flagged for review—not falsely promised away.',
  },
];

const process = [
  ['Baseline', 'We review your public profiles, response habits, listing consistency, and current review-request process.'],
  ['Connect', 'You authorize the profiles and provide the business details needed to manage them accurately.'],
  ['Manage', 'Requests, monitoring, responses, listings, and weekly Google activity run as one ongoing program.'],
  ['Report', 'You receive a clear monthly summary of work completed, review activity, and items needing attention.'],
];

const faqs = [
  {
    question: 'Do you guarantee five-star reviews?',
    answer: 'No. We help real customers leave honest feedback. We never buy reviews, write reviews for customers, or condition a request on positive sentiment.',
  },
  {
    question: 'Can you remove a bad review?',
    answer: 'A review can be flagged when it appears to violate a platform policy. Legitimate criticism cannot be promised away, so the right response is usually a prompt, professional reply and a real effort to resolve the issue.',
  },
  {
    question: 'Does this replace local SEO?',
    answer: 'No. Reputation management supports a healthy local presence, but it is not a promise of rankings and it does not replace a complete local-search strategy when one is needed.',
  },
  {
    question: 'What do you need from us?',
    answer: 'Access to the relevant business profiles, accurate location and service information, brand materials, and a dependable way to send review requests after real customer interactions.',
  },
  {
    question: 'Is this software I have to learn?',
    answer: 'No. This is a managed service. We handle the recurring work and send a plain monthly report; you stay involved where approval or business context is needed.',
  },
  {
    question: 'Who is the service for?',
    answer: 'It is built for established, review-dependent local businesses with genuine customer activity and at least one active Google Business Profile.',
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Managed online reputation for local businesses</p>
          <h1 id="hero-title">Make the reputation you earned easier to see.</h1>
          <p className="hero-lede">
            Novren helps established local businesses request honest customer reviews,
            respond with care, keep listings accurate, and stay active on Google—without
            adding another task to the week.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:hello@novren.co?subject=Free%20reputation%20snapshot">
              Get a free reputation snapshot
            </a>
            <a className="text-link" href="#service">
              See what’s managed <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <aside className="snapshot" aria-label="Example reputation snapshot">
          <div className="snapshot-heading">
            <p>Reputation snapshot</p>
            <span>01 / 04</span>
          </div>
          <h2>What does a customer see before they call?</h2>
          <dl>
            <div><dt>Review requests</dt><dd>Inconsistent</dd></div>
            <div><dt>New review replies</dt><dd>Waiting</dd></div>
            <div><dt>Directory information</dt><dd>Varies</dd></div>
            <div><dt>Google profile activity</dt><dd>Sporadic</dd></div>
          </dl>
          <p className="snapshot-note">One managed system replaces the guesswork.</p>
        </aside>
      </section>

      <section className="offer-strip" aria-label="Service summary">
        <p><span>One focused plan</span> No confusing package ladder</p>
        <p><span>$699 / month</span> Per business location</p>
        <p><span>Fully managed</span> Built for busy local operators</p>
      </section>

      <section className="gap-section" aria-labelledby="gap-title">
        <div>
          <p className="section-index">01 — The gap</p>
          <h2 id="gap-title">Good work does not automatically create a strong online reputation.</h2>
        </div>
        <div className="gap-copy">
          <p>
            A completed job is a missed review unless someone asks. A new review is a missed
            conversation unless someone responds. An outdated listing creates doubt before
            a prospect ever reaches your website.
          </p>
          <p>
            Novren turns those loose ends into a repeatable monthly process. You keep running
            the business; the reputation work keeps moving.
          </p>
        </div>
      </section>

      <section className="service-section" id="service" aria-labelledby="service-title">
        <div className="section-heading-row">
          <p className="section-index">02 — What’s managed</p>
          <h2 id="service-title">The recurring work behind a credible local presence.</h2>
        </div>
        <div className="capability-list">
          {capabilities.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ethics-statement" aria-labelledby="ethics-title">
        <p className="section-index">The line we do not cross</p>
        <h2 id="ethics-title">Earn reviews. Don’t manufacture them.</h2>
        <p>
          Every request is for an honest review from a real customer. No purchased ratings,
          no positive-only screening, and no promise to erase legitimate criticism.
        </p>
      </section>

      <section className="process-section" id="process" aria-labelledby="process-title">
        <div className="process-intro">
          <p className="section-index">03 — How it works</p>
          <h2 id="process-title">A clean handoff. Then steady management.</h2>
          <p>Most of the lift is at the start. Once profiles and business details are connected, the program is designed to run with limited ongoing input.</p>
        </div>
        <ol className="process-list">
          {process.map(([title, copy], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="fit-section" aria-labelledby="fit-title">
        <div className="fit-heading">
          <p className="section-index">04 — Who it fits</p>
          <h2 id="fit-title">If reviews shape the call, reputation management belongs in the operating plan.</h2>
        </div>
        <p className="industry-line">
          Home services <span>/</span> Dental & health <span>/</span> Auto services <span>/</span>
          Wellness <span>/</span> Property services <span>/</span> Professional services <span>/</span>
          Multi-location operators
        </p>
      </section>

      <section className="pricing-section" aria-labelledby="pricing-title">
        <div className="pricing-copy">
          <p className="section-index">05 — The plan</p>
          <h2 id="pricing-title">Managed Reputation</h2>
          <p>A complete monthly system for one business location.</p>
        </div>
        <div className="price-block">
          <p className="price"><sup>$</sup>699 <span>/ month</span></p>
          <ul>
            <li>Review request campaigns</li>
            <li>Daily review monitoring</li>
            <li>Up to 200 personalized responses monthly</li>
            <li>Listings across 70+ directories</li>
            <li>Weekly Google posts and photos</li>
            <li>Monthly performance report</li>
          </ul>
          <a className="button button-primary" href="mailto:hello@novren.co?subject=Managed%20Reputation">
            Ask about your location
          </a>
          <p className="price-note">Per location. Multi-location businesses can request a tailored scope.</p>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="faq-heading">
          <p className="section-index">06 — Straight answers</p>
          <h2 id="faq-title">Before you ask.</h2>
        </div>
        <dl className="faq-list">
          {faqs.map((item) => (
            <div key={item.question}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="final-cta" id="contact">
        <p className="eyebrow">Start with the facts</p>
        <h2>See what customers see when they compare you.</h2>
        <p>
          Send your business name and city. We’ll look at review activity, responses,
          listing consistency, and Google profile upkeep—then return a short, no-obligation snapshot.
        </p>
        <a className="button button-light" href="mailto:hello@novren.co?subject=Free%20reputation%20snapshot">
          Request your snapshot
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
