import React from 'react';
import { Link, Button, Icon, Eyebrow, PageIntro, Notice, CTA } from './ui.jsx';
import { features, faqs } from './content.js';
import { EditingSection } from './editing-details.jsx';

export function ReportCard({ full = false }) {
  return (
    <div className={`report-card ${full ? 'report-full' : ''}`}>
      <div className="report-top">
        <span className="report-mark">N.</span>
        <span>MONTHLY CARE SUMMARY</span>
        <span className="example-tag">Example</span>
      </div>
      <h3>
        A clearer picture of
        <br />
        your website’s care.
      </h3>
      <p className="report-caption">
        An illustration of the information you can expect.
      </p>
      <div className="report-rows">
        <div>
          <span className="report-icon">
            <Icon name="refresh" />
          </span>
          <div>
            <strong>WordPress updates</strong>
            <small>Changes applied & items awaiting review</small>
          </div>
        </div>
        <div>
          <span className="report-icon">
            <Icon name="backup" />
          </span>
          <div>
            <strong>Backups & security</strong>
            <small>Backup activity & scan findings</small>
          </div>
        </div>
        <div>
          <span className="report-icon">
            <Icon name="pulse" />
          </span>
          <div>
            <strong>Monitoring</strong>
            <small>Uptime & SSL observations</small>
          </div>
        </div>
      </div>
      <div className="report-bottom">
        <span className="dot" />
        Reviewed by Novren before release
      </div>
      {full && (
        <>
          <div className="summary-rule" />
          <h4>Items that need your decision</h4>
          <p>
            A useful report should make outstanding approvals and next steps
            clear. The delivered report depends on the connected site’s activity
            and the reporting platform.
          </p>
          <Notice>
            This is an illustrative summary, not a customer result or an exact
            replica of the portal report.
          </Notice>
        </>
      )}
    </div>
  );
}

function CareOverview() {
  return (
    <div className="care-overview">
      <div className="care-overview-heading">
        <span className="report-mark">N.</span>
        <span>YOUR MONTHLY CARE PLAN</span>
      </div>
      {[
        [
          'refresh',
          'The routine care',
          'Updates, daily backups & security scans',
        ],
        ['pulse', 'A watch on your website', 'Uptime & SSL monitoring'],
        [
          'edit',
          'Room for everyday changes',
          '50 AI edits + 5 small human edits a month',
        ],
        [
          'report',
          'Help & a clear view',
          'Support, monthly reports & your client portal',
        ],
      ].map(([icon, title, text]) => (
        <div className="care-overview-row" key={title}>
          <span className="report-icon">
            <Icon name={icon} />
          </span>
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        </div>
      ))}
      <div className="care-overview-foot">
        One eligible WordPress website · one monthly plan
      </div>
    </div>
  );
}

function ServiceTrust() {
  return (
    <section className="section service-trust">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Know what to expect</Eyebrow>
            <h2>
              Clear care.
              <br />
              Clear accountability.
            </h2>
          </div>
          <p>
            Concrete work, visible reporting and a straightforward way to get
            help.
          </p>
        </div>
        <div className="trust-grid">
          {[
            [
              'report',
              'Work you can see',
              'Monthly care reports are reviewed before you receive them.',
              'What the reports cover',
              '/sample-report',
            ],
            [
              'mail',
              'One place to ask',
              'Contact Novren for setup, requests and questions about your care.',
              'hello@novren.co',
              '/support',
            ],
            [
              'check',
              'Terms you can read',
              'A defined scope, transparent price and cancellation before renewal.',
              'Read the service terms',
              '/terms',
            ],
          ].map(([icon, title, text, label, to]) => (
            <article key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
              <Link to={to} className="text-link">
                {label}
                <Icon name="arrow" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const design = 'editorial';
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Eyebrow>
              <span className="eyebrow-line" />
              Managed WordPress care
            </Eyebrow>
            <h1>
              {design === 'editorial' ? (
                <>
                  Your website, cared for.
                  <br />
                  <em>One less thing to manage.</em>
                </>
              ) : (
                <>
                  WordPress care.
                  <br />
                  <em>One less thing to manage.</em>
                </>
              )}
            </h1>
            <p className="hero-description">
              Updates, backups, security checks and everyday changes for the
              WordPress website your business depends on.
            </p>
            <div className="hero-price">
              <strong>
                $399<span>/month per website</span>
              </strong>
              <span>No setup fee · Month to month</span>
            </div>
            <div className="button-row">
              <Button to="/get-started" arrow>
                Get Started
              </Button>
              <Button to="/book-a-call" secondary>
                Book a Call
              </Button>
            </div>
            <p className="hero-note">
              Check your site’s fit before paying. No sales call required.
            </p>
          </div>
          <div className="hero-art">
            <CareOverview />
          </div>
        </div>
      </section>
      <div className="audit-strip">
        <div className="wrap">
          <div>
            <Icon name="report" />
            <span>Received a website audit from Novren?</span>
          </div>
          <Link to="/after-your-audit" className="text-link">
            Your next step <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
      <section className="section" id="included">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>All part of the plan</Eyebrow>
              <h2>
                The upkeep.
                <br />
                The changes. The support.
              </h2>
            </div>
            <p>
              Everything below is included. Open the care details when you want
              to go deeper.
            </p>
          </div>
          <div className="benefit-grid">
            {[
              [
                'refresh',
                'Managed WordPress updates',
                'Core, plugins and themes, with cautious update handling.',
              ],
              [
                'backup',
                'Daily offsite backups',
                'Files and database, with up to 90 days of history.',
              ],
              [
                'shield',
                'Daily security scans',
                'Flagged issues reviewed and next steps coordinated.',
              ],
              [
                'pulse',
                'Uptime & SSL monitoring',
                'Uptime checked every five minutes; SSL checked daily.',
              ],
              [
                'edit',
                'Small website changes',
                '50 AI edits and 5 small human edits a month.',
              ],
              [
                'report',
                'Support, reports & portal',
                'Maintenance help, reviewed monthly reports and client access.',
              ],
            ].map(([icon, title, text]) => (
              <article key={title}>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="benefit-details">
            <Link to="/care" className="text-link">
              Care details, edit examples & limits{' '}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <Pricing />
      <section className="section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>Getting started</Eyebrow>
              <h2>
                A simple start.
                <br />A clear next step.
              </h2>
            </div>
            <Link to="/how-it-works" className="text-link">
              How onboarding works <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="process-row">
            {[
              [
                'Check the fit.',
                'Confirm your site is WordPress and flag anything unusual before payment.',
              ],
              [
                'Subscribe & connect.',
                'Start your plan and provide the site details. Novren coordinates setup.',
              ],
              [
                'Receive your welcome.',
                'We confirm care is active and send your client portal invitation.',
              ],
            ].map(([title, text], i) => (
              <article key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ServiceTrust />
      <section className="section faq-section" id="faq">
        <div className="wrap faq-grid">
          <div>
            <Eyebrow>Before you decide</Eyebrow>
            <h2>A few useful answers.</h2>
            <Link to="/faq" className="text-link">
              All questions <Icon name="arrow" />
            </Link>
          </div>
          <FAQList items={[faqs[0], faqs[1], faqs[8], faqs[13]]} />
        </div>
      </section>
      <CTA />
    </>
  );
}

export function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="wrap pricing-grid">
        <div className="pricing-copy">
          <Eyebrow>One website. One plan.</Eyebrow>
          <h2>
            The whole plan.
            <br />
            One monthly price.
          </h2>
          <p>
            For an existing WordPress business website. Normal onboarding is
            included.
          </p>
          <div className="pricing-facts">
            <div>
              <Icon name="check" />
              <span>
                <strong>No setup fee</strong>
                <small>$0 for normal onboarding.</small>
              </span>
            </div>
            <div>
              <Icon name="check" />
              <span>
                <strong>No minimum term</strong>
                <small>Cancel before a future renewal.</small>
              </span>
            </div>
            <div>
              <Icon name="check" />
              <span>
                <strong>Keep your hosting</strong>
                <small>No move is normally needed.</small>
              </span>
            </div>
          </div>
          <p className="small">
            Stores, memberships, unusual hosting or serious existing issues need
            a fit review. Hosting, licenses and larger projects are separate.
          </p>
        </div>
        <article className="plan-card">
          <div className="plan-top">
            <span>WORDPRESS CARE</span>
            <Icon name="shield" />
          </div>
          <div className="plan-price">
            $399<span>/month</span>
          </div>
          <p className="plan-subtitle">USD · one eligible existing website</p>
          <ul className="check-list">
            {[
              'Managed updates, backups & security scans',
              'Uptime & SSL monitoring',
              '50 AI edits a month',
              '5 small human edits a month',
              'Maintenance support & monthly reports',
              'Client portal access',
            ].map((x) => (
              <li key={x}>
                <Icon name="check" size={18} />
                {x}
              </li>
            ))}
          </ul>
          <Button to="/get-started" arrow className="full-width">
            Get Started
          </Button>
          <p className="plan-foot">$399 at checkout, then monthly. $0 setup.</p>
          <Link to="/terms" className="plan-terms">
            Service terms & cancellation
          </Link>
        </article>
      </div>
    </section>
  );
}

export function FAQList({ items = faqs }) {
  return (
    <div className="faq-list">
      {items.map((x) => (
        <details key={x.q}>
          <summary>
            {x.q}
            <span className="faq-plus">
              <Icon name="plus" size={18} />
            </span>
          </summary>
          <p>{x.a}</p>
        </details>
      ))}
    </div>
  );
}
export function FAQPage() {
  return (
    <>
      <PageIntro
        eyebrow="Questions, answered"
        title="Get comfortable before you commit."
      >
        <p>The service, the scope and the practical details.</p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap narrow">
          <label className="search-label" htmlFor="faq-search">
            Find an answer
          </label>
          <input
            id="faq-search"
            className="search-input"
            type="search"
            placeholder="Try hosting, access or cancel"
          />
          <div id="faq-results">
            <FAQList />
          </div>
          <p id="faq-empty" hidden>
            No matching answer. Try another word or{' '}
            <Link to="/support">ask Novren</Link>.
          </p>
        </div>
      </section>
      <CTA title="Ready when you are." />
    </>
  );
}

export function Care() {
  return (
    <>
      <PageIntro
        eyebrow="What’s included"
        title="A complete view of your care plan."
      >
        <p>
          Updates, backups, scanning, monitoring, edits and support. $399/month
          for one eligible WordPress website.
        </p>
        <div className="button-row">
          <Button to="/get-started" arrow>
            Get Started
          </Button>
          <Link to="/#pricing" className="text-link">
            See pricing
          </Link>
        </div>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap care-detail-grid">
          {features.map((x) => (
            <article key={x.title}>
              <Icon name={x.icon} size={26} />
              <h2>{x.title}</h2>
              <p>{x.summary}</p>
              <details>
                <summary>How it works & limits</summary>
                <p>{x.detail}</p>
              </details>
            </article>
          ))}
        </div>
      </section>
      <EditingSection />
      <section className="section" id="scope">
        <div className="wrap">
          <Eyebrow>Keeping the scope clear</Eyebrow>
          <h2>
            Everyday care is included.
            <br />
            Bigger projects get their own scope.
          </h2>
          <div className="scope-table">
            <div className="scope-table-head">
              <span>Included recurring care</span>
              <span>Separate project or cost</span>
            </div>
            {[
              [
                'Managed updates, backups, scans & monitoring',
                'New websites, redesigns and major page builds',
              ],
              [
                '50 AI edits + 5 small human edits monthly',
                'Custom development, major integrations or ecommerce work',
              ],
              [
                'Maintenance support, reporting & portal access',
                'Copywriting, branding and major SEO projects',
              ],
              [
                'Normal onboarding & connector setup',
                'Migrations, substantial repair or unusual infrastructure',
              ],
              [
                'Care for your existing WordPress site',
                'Hosting, domains, email hosting and premium licenses',
              ],
            ].map(([a, b]) => (
              <div key={a}>
                <span>
                  <Icon name="check" size={17} />
                  {a}
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <Notice>
            Audit findings may need project work. We confirm scope and any extra
            price before accepting it.
          </Notice>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function AfterAudit() {
  return (
    <>
      <section className="audit-hero">
        <div className="wrap">
          <Eyebrow>After your website audit</Eyebrow>
          <h1>
            You’ve seen the findings.
            <br />
            <em>Here’s the next step.</em>
          </h1>
          <p>
            A website audit gives you a snapshot. Novren’s care plan handles the
            recurring upkeep and small changes your WordPress site needs
            afterward.
          </p>
          <div className="button-row">
            <Button to="/get-started" arrow>
              Check my site’s fit
            </Button>
            <Button to="/support?topic=audit" secondary>
              Ask about a finding
            </Button>
          </div>
          <p className="small">
            $399/month per website · No setup fee · No required call
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>Put the findings in context</Eyebrow>
              <h2>
                What care can cover.
                <br />
                What needs a closer look.
              </h2>
            </div>
            <p>
              Your audit’s observations need to be matched to the right next
              step. We won’t treat every finding as a reason to sell you this
              plan.
            </p>
          </div>
          <div className="audit-mapping">
            {[
              [
                'Routine upkeep',
                'Updates, backups, security scans, uptime and SSL monitoring.',
                'Part of recurring care',
                'check',
              ],
              [
                'Small content changes',
                'Business hours, team details, replacement images or final content you supply.',
                'Within the five-edit allowance',
                'edit',
              ],
              [
                'Larger technical or design work',
                'A redesign, serious repair, custom functionality, migration or a performance project.',
                'Review & separate scope',
                'info',
              ],
            ].map(([a, b, c, d], i) => (
              <article key={a}>
                <span className="mapping-number">0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
                <div className="mapping-tag">
                  <Icon name={d} size={17} />
                  {c}
                </div>
              </article>
            ))}
          </div>
          <Notice>
            A public-facing audit cannot establish everything about a site’s
            backups, security or internal setup. We verify the connected site
            during onboarding. There is no promised SEO, speed or revenue
            outcome.
          </Notice>
        </div>
      </section>
      <section className="section tinted">
        <div className="wrap split-copy">
          <div>
            <Eyebrow>No repeat sales pitch needed</Eyebrow>
            <h2>
              The details you need
              <br />
              to make a decision.
            </h2>
          </div>
          <div className="decision-links">
            {[
              [
                'Exactly what is included',
                'The care tasks, 50 AI edits and five human edits.',
                '/care',
              ],
              [
                'The price and commitment',
                '$399/month, no setup, month to month.',
                '/#pricing',
              ],
              [
                'How access and onboarding work',
                'What you provide, what Novren handles.',
                '/how-it-works',
              ],
              [
                'How Novren handles your care',
                'Scope, accountability and your support contact.',
                '/about',
              ],
            ].map(([a, b, c]) => (
              <Link key={a} to={c}>
                <div>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </div>
                <Icon name="arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap narrow">
          <FAQList items={[faqs[1], faqs[4], faqs[12], faqs[14]]} />
        </div>
      </section>
      <CTA title="Turn the right findings into a care plan." />
    </>
  );
}

export function Process() {
  return (
    <>
      <PageIntro
        eyebrow="How it works"
        title="From first payment to active care."
      >
        <p>
          You supply the site context and help arrange access. Novren manages
          the setup and tells you when care is active.
        </p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap process-detail">
          {[
            [
              'Confirm your site is a fit',
              'You',
              'A short check covers WordPress, the number of sites and any unusual complexity. Standard sites continue to checkout. Review comes first for complex sites.',
            ],
            [
              'Start the subscription',
              'You',
              '$399 at checkout, then monthly. No setup fee or minimum term. No separate vendor subscription is needed.',
            ],
            [
              'Share the useful details',
              'You',
              'Tell us about hosting, existing problems, key pages and who can arrange WordPress access. Information already provided carries forward.',
            ],
            [
              'Connect & establish the baseline',
              'Novren + your administrator',
              'Novren creates your client workspace and coordinates installation of the WordPress care connector. We check the first backup, scanning, monitoring and update settings before confirming activation.',
            ],
            [
              'Receive your portal invitation',
              'Novren',
              'Your branded client workspace is prepared for you. Follow the invitation to establish your sign-in; you do not have to assemble the care tools yourself.',
            ],
            [
              'Ongoing care, requests & reporting',
              'Novren',
              'Receive activation confirmation and support instructions. Use the AI Editor in your portal for small changes, or email hello@novren.co for your human edit requests and maintenance questions. Monthly care reports are reviewed before release.',
            ],
          ].map(([a, b, c], i) => (
            <article key={a}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <span className="owner-tag">{b}</span>
                <h2>{a}</h2>
                <p>{c}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="wrap narrow">
          <Notice>
            Billing starts at checkout. Care starts after connection and
            baseline confirmation. Missing access, compatibility problems or
            existing damage can delay setup. Ask us before subscribing if you
            have an urgent deadline.
          </Notice>
          <div className="text-panel">
            <h3>Keep passwords out of forms and email.</h3>
            <p>
              The care connector is installed inside WordPress by someone
              authorized to do so. We coordinate any additional privileged
              access through an appropriate secure method, only when needed.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function About() {
  return (
    <>
      <PageIntro
        eyebrow="About Novren"
        title="Straightforward care for a working website."
      >
        <p>
          Novren helps small businesses look after an existing WordPress
          website, with routine care, useful changes and one place to ask for
          help.
        </p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap narrow prose">
          <h2>A focused service.</h2>
          <p>
            We coordinate setup, maintenance, requests and reporting using
            professional care systems and service partners. Novren remains your
            primary contact.
          </p>
          <h3>Know what you’re paying for.</h3>
          <p>
            One $399 monthly plan. No setup fee or minimum term. Included work
            and project boundaries are explained before checkout.
          </p>
          <h3>Keep control of your website.</h3>
          <p>
            Your site stays yours, and hosting normally stays where it is.
            Monthly reports show care activity. Contact hello@novren.co when you
            need help.
          </p>
          <div className="button-row">
            <Button to="/care" arrow>
              See the care plan
            </Button>
            <Button to="/support" secondary>
              Contact Novren
            </Button>
          </div>
        </div>
      </section>
      <ServiceTrust />
    </>
  );
}

export function SampleReport() {
  return (
    <>
      <PageIntro
        eyebrow="A look at the deliverable"
        title="See the kind of information a care report provides."
      >
        <p>A monthly record of care activity and items needing attention.</p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap report-example-layout">
          <ReportCard full />
          <div className="prose">
            <Eyebrow>Illustration only</Eyebrow>
            <h2>
              Useful visibility.
              <br />
              No invented results.
            </h2>
            <p>
              This example explains the report’s role. It contains no customer
              data, measured results or claim that work has already been
              performed.
            </p>
            <ul>
              <li>Updates and outstanding maintenance items.</li>
              <li>Backup activity and available history.</li>
              <li>Security and monitoring findings.</li>
              <li>Items to discuss with Novren.</li>
            </ul>
            <p>
              Exact sections and detail depend on the reporting platform and
              your connected site. Novren reviews reports before release.
            </p>
            <Link to="/care" className="text-link">
              Back to the care plan <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
