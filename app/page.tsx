import type { Metadata } from 'next';
import Link from 'next/link';
import { BookCallLink } from '@/components/book-call-link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { alternates: { canonical: '/' } };
export const dynamic = 'force-static';

const capabilities = [
  {
    title: 'Review request toolkit',
    copy: 'A permanent review link, print-ready QR code, and practical email and text templates make the ask easier to repeat.',
  },
  {
    title: 'Daily review monitoring',
    copy: 'New reviews across Google, Facebook, Yelp, and more than 70 directories are watched from one place.',
  },
  {
    title: 'Personalized responses',
    copy: 'Up to 200 review responses per month are prepared, reviewed, and personalized before they are published.',
  },
  {
    title: 'Accurate listings',
    copy: 'Names, addresses, hours, services, and other core details stay synchronized across more than 70 directories.',
  },
  {
    title: 'Weekly Google activity',
    copy: 'Fresh posts and photos keep your Google Business Profile useful, current, and visibly active.',
  },
  {
    title: 'Policy issue monitoring',
    copy: 'Suspected spam, harassment, and other policy violations are identified and moved through the reporting process.',
  },
];

const industries = [
  'Home services',
  'Dental and health',
  'Automotive',
  'Wellness',
  'Property services',
  'Professional services',
  'Multi-location operators',
];

const reporting = [
  'Review velocity',
  'Rating and response coverage',
  'Google profile activity',
  'Local rank grid',
  'Listing accuracy',
  'Posting and flagging log',
];

const faqs = [
  {
    question: 'Do you guarantee a certain rating or ranking?',
    answer: 'No. Ratings, rankings, and customer behavior cannot be guaranteed. Novren builds and manages the work that supports a healthier, more current local presence.',
  },
  {
    question: 'Are responses fully automated?',
    answer: 'Drafting tools may assist, but responses are reviewed and personalized before publication. Sensitive or unusual feedback can be held for your input.',
  },
  {
    question: 'Can you remove a negative review?',
    answer: 'Only the platform can remove a review. We can report content that appears to violate platform rules, but legitimate criticism is handled with a prompt, professional response.',
  },
  {
    question: 'What will you need from us?',
    answer: 'Accurate business information, access to the relevant profiles, brand materials, and one dependable point of contact for approvals and context.',
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Online reputation management for local businesses</p>
          <h1 id="hero-title">A steady reputation system, handled for you.</h1>
          <p className="hero-lede">
            Novren manages review requests, monitoring, personalized responses, directory accuracy,
            weekly Google activity, and monthly reporting—so your online presence keeps pace with the
            work your business already does well.
          </p>
          <div className="hero-actions">
            <BookCallLink className="button button-primary" />
            <Link className="text-link" href="/service">Explore the service <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <aside className="managed-card" aria-label="What Novren manages each month">
          <p className="card-kicker">Managed each month</p>
          <h2>The recurring work that is easy to postpone.</h2>
          <ul>
            <li><span>Daily</span> Review monitoring</li>
            <li><span>Weekly</span> Google posts and photos</li>
            <li><span>Ongoing</span> Responses and listing accuracy</li>
            <li><span>Monthly</span> Clear performance reporting</li>
          </ul>
          <p className="managed-note">One accountable program. No extra dashboard for your team to run.</p>
        </aside>
      </section>

      <section className="offer-bar" aria-label="Offer summary">
        <p><span>Managed Reputation</span> One focused service</p>
        <p><span>$699 per location</span> Billed monthly</p>
        <p><span>Fully managed</span> Built for busy operators</p>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <div className="audience-copy">
          <p className="eyebrow">Who it’s for</p>
          <h2 id="audience-title">Local businesses where reputation shapes the next call.</h2>
          <p>
            The strongest fit is an established business with regular customer activity, an active
            Google Business Profile, and no dependable system for asking, responding, updating, and reporting.
          </p>
          <Link className="text-link" href="/about">See whether Novren fits your business <span aria-hidden="true">↗</span></Link>
        </div>
        <ul className="industry-list" aria-label="Industries served">
          {industries.map((industry) => <li key={industry}>{industry}</li>)}
        </ul>
      </section>

      <section className="service-section" aria-labelledby="service-title">
        <div className="section-heading">
          <p className="eyebrow">The service</p>
          <h2 id="service-title">Six parts, run as one monthly program.</h2>
          <p>Each part supports the same goal: a credible, current presence wherever customers look before they contact you.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/service">See full service details <span aria-hidden="true">→</span></Link>
      </section>

      <section className="trust-section" aria-labelledby="trust-title">
        <p className="eyebrow">Honest by design</p>
        <div>
          <h2 id="trust-title">Real feedback, requested the right way.</h2>
          <p>
            Review requests go to real customers without incentives or pressure. We do not buy reviews,
            write reviews for customers, selectively ask only for positive feedback, or promise to erase
            legitimate criticism.
          </p>
        </div>
      </section>

      <section className="process-preview" aria-labelledby="process-title">
        <div className="process-heading">
          <p className="eyebrow">How it works</p>
          <h2 id="process-title">A clear setup. Then a quiet monthly rhythm.</h2>
          <p>You stay involved where business context matters. Novren owns the recurring work.</p>
          <Link className="button button-secondary" href="/process">View the full process</Link>
        </div>
        <ol className="step-list">
          <li><span>01</span><div><h3>Set the baseline</h3><p>Confirm profiles, current review activity, listings, and business details.</p></div></li>
          <li><span>02</span><div><h3>Build the system</h3><p>Create the review link, QR assets, templates, and team touchpoints.</p></div></li>
          <li><span>03</span><div><h3>Run the program</h3><p>Monitor, respond, publish, synchronize, and flag issues throughout the month.</p></div></li>
          <li><span>04</span><div><h3>Report what changed</h3><p>Review the activity, coverage, accuracy, and local visibility that matter.</p></div></li>
        </ol>
      </section>

      <section className="reporting-section" aria-labelledby="reporting-title">
        <div>
          <p className="eyebrow">Monthly reporting</p>
          <h2 id="reporting-title">You should be able to see the work.</h2>
          <p>A plain monthly report shows what moved, what was completed, and what needs attention next.</p>
        </div>
        <ul>
          {reporting.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="pricing-section" aria-labelledby="pricing-title">
        <div className="pricing-intro">
          <p className="eyebrow">The offer</p>
          <h2 id="pricing-title">Managed Reputation</h2>
          <p>One complete monthly program for one business location.</p>
        </div>
        <div className="price-card">
          <p className="price"><sup>$</sup>699 <span>/ month</span></p>
          <ul>
            <li>Review link, QR code, and request templates</li>
            <li>Daily monitoring and personalized responses</li>
            <li>Listings managed across 70+ directories</li>
            <li>Weekly Google posts and photos</li>
            <li>Policy-violation monitoring and reporting</li>
            <li>Monthly performance report</li>
          </ul>
          <BookCallLink className="button button-primary">Book a call about your location</BookCallLink>
          <p className="price-note">Pricing is per location. Multi-location businesses can request a tailored scope.</p>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div>
          <p className="eyebrow">Straight answers</p>
          <h2 id="faq-title">Before we talk.</h2>
        </div>
        <dl>
          {faqs.map((item) => (
            <div key={item.question}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="final-cta">
        <p className="eyebrow">A short first conversation</p>
        <h2>Let’s see whether the service fits your business.</h2>
        <p>We’ll talk through your locations, current review process, and the reputation work that keeps getting pushed aside.</p>
        <BookCallLink className="button button-light" />
      </section>

      <SiteFooter />
    </main>
  );
}
