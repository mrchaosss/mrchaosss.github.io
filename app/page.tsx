import { BookCallLink } from '@/components/book-call-link';
import { FinalCTA, Icon, PriceCard, ServiceGrid } from '@/components/site-ui';
import { siteConfig as c, offerLine } from '@/lib/site-config';
import { faqs } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'WordPress Maintenance for Small Businesses | Novren',
  `Managed WordPress care for local service businesses. Updates, daily backups, monitoring, support, and small edits. ${offerLine}.`,
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
          'Managed WordPress maintenance and small website support for one qualifying website.',
        offers: {
          '@type': 'Offer',
          price: c.monthlyPrice,
          priceCurrency: c.currency,
          url: c.siteUrl + '/#pricing',
          description: offerLine + ' for one qualifying WordPress website.',
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
              Managed WordPress care for local service businesses
            </p>
            <h1>
              Your WordPress site,
              <br className="desktop-break" /> updated, backed up
              <br className="desktop-break" /> <span>&amp; supported.</span>
            </h1>
            <p className="hero-lede">
              Routine maintenance and small website changes, with one place to
              go when your site needs attention.
            </p>
            <div className="hero-actions">
              <BookCallLink />
              <a className="text-link" href="#included">
                See what’s included <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-qualifier">
              {c.fitCallMinutes}-minute fit call. One qualifying WordPress site.
              We confirm fit before onboarding.
            </p>
          </div>
          <aside className="care-panel" aria-label="Website care plan summary">
            <div className="care-panel-heading">
              <span className="small-wordmark">
                NOVREN<span>.</span>
              </span>
              <span className="care-label">WEBSITE CARE</span>
            </div>
            <h2>
              A clear plan.
              <br />
              The recurring work, covered.
            </h2>
            <ul>
              <li>
                <Icon name="updates" />
                <div>
                  <strong>Updates &amp; visual checks</strong>
                  <span>Restore point before updates</span>
                </div>
              </li>
              <li>
                <Icon name="backups" />
                <div>
                  <strong>Daily off-site backups</strong>
                  <span>{c.backupHistoryDays} days of backup history</span>
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
                  <strong>Small edits &amp; real support</strong>
                  <span>
                    Up to {c.humanEditsPerMonth} human edits each month
                  </span>
                </div>
              </li>
            </ul>
            <div className="care-panel-foot">
              Maintenance. Small changes. One point of contact.
            </div>
          </aside>
        </div>
      </section>
      <div className="service-strip">
        <div className="container">
          <span>Built for the website you already have.</span>
          <span>WordPress only</span>
          <span>Clear scope</span>
          <span>Monthly care report</span>
        </div>
      </div>
      <section
        className="section container"
        id="fit"
        aria-labelledby="fit-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Start with the fit</p>
          <h2 id="fit-title">Is this right for your website?</h2>
          <p>
            Ongoing care works best when your site is already doing its job and
            needs someone to handle the upkeep.
          </p>
        </div>
        <div className="fit-grid">
          <article className="fit-card">
            <span className="section-index">01 / A GOOD FIT</span>
            <h3>An existing site. Everyday upkeep.</h3>
            <ul className="check-list">
              {c.goodFit.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
          <article className="fit-card fit-caution">
            <span className="section-index">02 / LET’S CHECK FIRST</span>
            <h3>More complex sites need approval.</h3>
            <ul className="plain-list">
              {c.manualApproval.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="small">
              Sites on other platforms are outside this WordPress-only plan.
            </p>
          </article>
        </div>
      </section>
      <section
        className="section pale-section"
        id="included"
        aria-labelledby="included-title"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What’s included</p>
            <h2 id="included-title">
              The maintenance. The small changes.
              <br />
              The person to ask.
            </h2>
            <p>Your care plan brings these recurring services together.</p>
          </div>
          <ServiceGrid />
          <a className="text-link section-link" href="/service">
            Read the full scope and edit examples{' '}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <section className="section container" aria-labelledby="scope-title">
        <div className="section-heading">
          <p className="eyebrow">Clear boundaries</p>
          <h2 id="scope-title">Know what your plan covers.</h2>
          <p>
            Small maintenance and content requests belong here. Larger projects
            need a different scope.
          </p>
        </div>
        <div className="scope-grid">
          <div className="scope-in">
            <h3>Included in your care plan</h3>
            <ul className="check-list">
              <li>Recurring WordPress maintenance</li>
              <li>Backups, security scans, and monitoring</li>
              <li>
                Up to {c.humanEditsPerMonth} qualifying human edits each month
              </li>
              <li>
                Edits typically about {c.smallEditMinutes} minutes or less
              </li>
              <li>Website-care support and monthly reporting</li>
            </ul>
          </div>
          <div className="scope-out">
            <h3>Outside the monthly plan</h3>
            <ul className="plain-list">
              {c.exclusions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="scope-note">
          Separate work is only considered when Novren has an approved way to
          fulfill it. Availability is not guaranteed.
        </p>
      </section>
      <section
        className="section process-section"
        id="how-it-works"
        aria-labelledby="process-title"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2 id="process-title">
              A fit check first.
              <br />A clear path from there.
            </h2>
          </div>
          <ol className="process-grid">
            <li>
              <span className="step-number">01</span>
              <h3>Talk through your website.</h3>
              <p>
                Bring your URL and the work you need help with. We confirm the
                platform, condition, and scope.
              </p>
            </li>
            <li>
              <span className="step-number">02</span>
              <h3>Agree, then connect.</h3>
              <p>
                Confirm your service agreement before payment or access. Then
                arrange a secure connection and baseline review.
              </p>
            </li>
            <li>
              <span className="step-number">03</span>
              <h3>Settle into ongoing care.</h3>
              <p>
                Maintenance and monitoring run, you send small-edit requests,
                and a monthly report records the care activity.
              </p>
            </li>
          </ol>
          <a className="text-link section-link" href="/process">
            See the onboarding and monthly workflow{' '}
            <span aria-hidden="true">→</span>
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
          <p>Know the recurring cost and the onboarding fee before you book.</p>
          <div className="pricing-detail">
            <h3>What onboarding covers</h3>
            <p>
              Access coordination, care setup, and a baseline review of your
              existing site. Pre-existing issues may need attention outside the
              plan.
            </p>
          </div>
          <p className="small">
            Hosting and third-party licenses remain your responsibility. The fit
            call comes before enrollment.
          </p>
        </div>
        <PriceCard />
      </section>
      <section
        className="section transparency-section"
        aria-labelledby="trust-title"
      >
        <div className="container transparency-grid">
          <div>
            <p className="eyebrow">Trust through clarity</p>
            <h2 id="trust-title">
              You should know
              <br />
              what you’re signing up for.
            </h2>
          </div>
          <div>
            <div className="trust-points">
              <div>
                <h3>Clear responsibility</h3>
                <p>
                  Novren remains your point of contact for care questions and
                  requests.
                </p>
              </div>
              <div>
                <h3>Honest limits</h3>
                <p>
                  No guaranteed uptime, security, rankings, or business results.
                </p>
              </div>
            </div>
            <a className="text-link" href="/about">
              More about Novren <span aria-hidden="true">→</span>
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
          <h2 id="faq-title">Before you book.</h2>
          <p>
            Still unsure about your website?
            <br />
            <a href={`mailto:${c.contactEmail}`}>Email {c.contactEmail}</a>
          </p>
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
