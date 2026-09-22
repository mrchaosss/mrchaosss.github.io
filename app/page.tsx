import { BookCallLink } from '@/components/book-call-link';
import { FinalCTA, Icon, PriceCard, ServiceGrid } from '@/components/site-ui';
import { siteConfig as c, offerLine } from '@/lib/site-config';
import { faqs } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'WordPress Care for Small Businesses | Novren',
  'Managed WordPress care: updates, daily backups, monitoring, maintenance support and five small edits. ' +
    offerLine +
    '. No sales call required.',
  '/',
);
export const dynamic = 'force-static';
export default function Home() {
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': c.siteUrl + '/#organization',
        name: c.name,
        url: c.siteUrl,
        email: c.contactEmail,
        logo: c.siteUrl + '/logo.svg',
      },
      {
        '@type': 'Service',
        '@id': c.siteUrl + '/#service',
        name: c.planName,
        serviceType: 'WordPress website maintenance',
        provider: { '@id': c.siteUrl + '/#organization' },
        url: c.siteUrl + '/service',
        description:
          'Managed WordPress care for one eligible existing website.',
        offers: {
          '@type': 'Offer',
          price: c.monthlyPrice,
          priceCurrency: c.currency,
          url: c.siteUrl + '/get-started',
          description: offerLine + '. Month-to-month subscription.',
        },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, '\\u003c'),
        }}
      />
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              For small businesses with a WordPress website
            </p>
            <h1>
              Your WordPress care,
              <br />
              <span>handled.</span>
            </h1>
            <p className="hero-lede">
              Updates, backups, security checks, and the small changes your site
              needs. One monthly plan. Novren is your point of contact.
            </p>
            <p className="hero-price">
              <strong>$399/month</strong> per website{' '}
              <span className="price-divider">·</span>{' '}
              <strong>No setup fee</strong>
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/get-started">
                Get Started <span aria-hidden="true">→</span>
              </a>
              <BookCallLink />
            </div>
            <p className="hero-qualifier">
              Month-to-month. No sales call required. Start with a short
              eligibility check.
            </p>
          </div>
          <aside
            className="care-panel"
            aria-label="WordPress care plan summary"
          >
            <div className="care-panel-heading">
              <span className="small-wordmark">
                NOVREN<span>.</span>
              </span>
              <span className="care-label">WORDPRESS CARE</span>
            </div>
            <h2>
              The recurring work,
              <br />
              covered.
            </h2>
            <ul>
              <li>
                <Icon name="updates" />
                <div>
                  <strong>Managed updates</strong>
                  <span>Security, routine fixes, and visual checks</span>
                </div>
              </li>
              <li>
                <Icon name="backups" />
                <div>
                  <strong>Daily offsite backups</strong>
                  <span>90 days of backup history</span>
                </div>
              </li>
              <li>
                <Icon name="security" />
                <div>
                  <strong>Security &amp; monitoring</strong>
                  <span>Daily scans · uptime · SSL</span>
                </div>
              </li>
              <li>
                <Icon name="edits" />
                <div>
                  <strong>Five small human edits a month</strong>
                  <span>Your supplied content, updated</span>
                </div>
              </li>
              <li>
                <Icon name="support" />
                <div>
                  <strong>Maintenance support &amp; a monthly report</strong>
                  <span>One place to ask for help</span>
                </div>
              </li>
            </ul>
            <div className="care-panel-foot">
              For one eligible existing WordPress website.
            </div>
          </aside>
        </div>
      </section>
      <div className="service-strip">
        <div className="container">
          <span>Built for the website you already have.</span>
          <span>No setup fee</span>
          <span>Clear scope</span>
          <span>Monthly care report</span>
        </div>
      </div>
      <section
        className="section pale-section"
        id="included"
        aria-labelledby="included-title"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What we handle</p>
            <h2 id="included-title">
              The upkeep. The small changes.
              <br />
              The person to ask.
            </h2>
            <p>
              Routine care starts once your site is connected and its baseline
              is confirmed.
            </p>
          </div>
          <ServiceGrid />
          <a className="text-link section-link" href="/service">
            Read the full scope and edit examples{' '}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <section
        className="section container"
        id="fit"
        aria-labelledby="fit-title"
      >
        <div className="section-heading">
          <p className="eyebrow">A focused service</p>
          <h2 id="fit-title">A good fit for everyday business websites.</h2>
          <p>
            Keep a working site maintained. Unusual complexity gets a closer
            review before you pay.
          </p>
        </div>
        <div className="fit-grid">
          <article className="fit-card">
            <span className="section-index">A GOOD FIT</span>
            <h3>An existing site. Everyday upkeep.</h3>
            <ul className="check-list">
              {c.goodFit.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a className="text-link" href="/get-started">
              Check your site’s fit →
            </a>
          </article>
          <article className="fit-card fit-caution">
            <span className="section-index">REVIEW FIRST</span>
            <h3>More complex sites need a closer look.</h3>
            <ul className="plain-list">
              {c.manualApproval.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="small">
              Other website platforms are outside this WordPress plan.
            </p>
            <BookCallLink className="text-link" />
          </article>
        </div>
      </section>
      <section
        className="section process-section"
        aria-labelledby="process-title"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2 id="process-title">A straightforward start.</h2>
            <p>You can complete the standard signup without a meeting.</p>
          </div>
          <ol className="process-grid">
            <li>
              <span className="step-number">01</span>
              <h3>Check the fit and subscribe.</h3>
              <p>
                Answer a few questions about your site, review the terms, and
                start your $399 monthly subscription through Stripe.
              </p>
            </li>
            <li>
              <span className="step-number">02</span>
              <h3>Connect your WordPress site.</h3>
              <p>
                Provide the site details. We coordinate secure access, connect
                the care system, and confirm your starting baseline.
              </p>
            </li>
            <li>
              <span className="step-number">03</span>
              <h3>Settle into ongoing care.</h3>
              <p>
                Maintenance and monitoring run. Email small requests and care
                questions; your monthly report records the activity.
              </p>
            </li>
          </ol>
          <a className="text-link section-link" href="/process">
            See the full onboarding process →
          </a>
        </div>
      </section>
      <section
        className="section container pricing-grid"
        id="pricing"
        aria-labelledby="pricing-title"
      >
        <div className="pricing-copy">
          <p className="eyebrow">Straightforward pricing</p>
          <h2 id="pricing-title">
            One website.
            <br />
            One care plan.
          </h2>
          <p>$399 per month. $0 setup. Normal onboarding is included.</p>
          <div className="pricing-detail">
            <h3>Month-to-month, with clear boundaries.</h3>
            <p>
              Cancel before a future renewal to prevent the next charge. Five
              small human edits are included each month. Larger projects are
              evaluated and priced separately.
            </p>
          </div>
          <p className="small">
            Hosting, domains, email, and premium software licenses remain your
            responsibility. <a href="/terms">Read the service terms.</a>
          </p>
        </div>
        <PriceCard />
      </section>
      <section className="section container" aria-labelledby="scope-title">
        <div className="section-heading">
          <p className="eyebrow">Know the scope</p>
          <h2 id="scope-title">Care for your site. Room for small changes.</h2>
        </div>
        <div className="scope-grid">
          <div className="scope-in">
            <h3>In the monthly plan</h3>
            <ul className="check-list">
              <li>Recurring WordPress care and monitoring</li>
              <li>Maintenance support and monthly reporting</li>
              <li>Up to five small human content edits per month</li>
              <li>Normal onboarding and secure connection coordination</li>
            </ul>
          </div>
          <div className="scope-out">
            <h3>Separate project work</h3>
            <ul className="plain-list">
              <li>New websites, redesigns, and major page builds</li>
              <li>Custom development and complex integrations</li>
              <li>Major commerce, membership, or repair projects</li>
              <li>SEO campaigns, copywriting, branding, and migrations</li>
            </ul>
          </div>
        </div>
        <a className="text-link section-link" href="/service#small-edits">
          See examples and exclusions →
        </a>
      </section>
      <section
        className="section transparency-section"
        aria-labelledby="trust-title"
      >
        <div className="container transparency-grid">
          <div>
            <p className="eyebrow">Clear from the start</p>
            <h2 id="trust-title">
              Know what you’re
              <br />
              signing up for.
            </h2>
          </div>
          <div>
            <div className="trust-points">
              <div>
                <h3>One accountable contact</h3>
                <p>Novren coordinates your care, questions, and requests.</p>
              </div>
              <div>
                <h3>Transparent service</h3>
                <p>
                  Published pricing, clear limits, secure Stripe checkout, and a
                  monthly record of care.
                </p>
              </div>
            </div>
            <a className="text-link" href="/about">
              More about Novren →
            </a>
          </div>
        </div>
      </section>
      <section
        className="section container faq-layout"
        id="faq"
        aria-labelledby="faq-title"
      >
        <div>
          <p className="eyebrow">Straight answers</p>
          <h2 id="faq-title">Before you get started.</h2>
          <p>
            Have another question?
            <br />
            <a href={'mailto:' + c.contactEmail}>{c.contactEmail}</a>
          </p>
          <BookCallLink className="text-link" />
        </div>
        <div className="faqs">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
