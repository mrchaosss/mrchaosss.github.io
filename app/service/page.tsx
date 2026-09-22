import { PageIntro, FinalCTA, Icon } from '@/components/site-ui';
import { BookCallLink } from '@/components/book-call-link';
import { siteConfig as c } from '@/lib/site-config';
import { services } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'WordPress Care: Included Services & Small Edits | Novren',
  'Managed updates, daily backups, security scans, monitoring, support, monthly reporting and five small human edits. $399/month, no setup fee.',
  '/service',
);
export const dynamic = 'force-static';
export default function Service() {
  return (
    <>
      <PageIntro
        eyebrow="The complete scope"
        title="Know exactly what’s included."
      >
        <p>
          Routine care and small content changes for one eligible existing
          WordPress website. $399/month, with normal onboarding included and no
          setup fee.
        </p>
      </PageIntro>
      <div className="container page-content">
        <div className="service-details">
          {services.map((s) => (
            <section className="service-detail" key={s.id} id={s.id}>
              <div>
                <Icon name={s.icon} />
                <p className="card-label">{s.label}</p>
                <h2>{s.title}</h2>
              </div>
              <div>
                <p>{s.copy}</p>
                <p>{s.detail}</p>
              </div>
            </section>
          ))}
        </div>
        <section className="subsection" id="small-edits">
          <h2>Five small edits, clearly defined.</h2>
          <p>
            Each monthly billing period includes up to five individual human
            edits, typically about 30 minutes or less each, using content you
            supply. We check whether a request fits before work begins.
          </p>
          <div className="edit-examples">
            <article>
              <h3>Update business details</h3>
              <p>
                Change hours, contact information, or a team member on an
                existing page.
              </p>
            </article>
            <article>
              <h3>Replace an image</h3>
              <p>
                Swap a banner or photo for a suitable, licensed image you
                provide.
              </p>
            </article>
            <article>
              <h3>Publish supplied content</h3>
              <p>
                Add a finished article or similarly bounded content change
                within the existing site structure.
              </p>
            </article>
          </div>
          <p className="notice">
            Unused edits do not roll over or combine into project hours. Extra
            requests can be evaluated for a separate quote, or handled using a
            later month’s allowance. Timing depends on the request, content,
            access, and approvals.
          </p>
        </section>
        <section className="subsection" id="exclusions">
          <h2>Larger work has a separate scope.</h2>
          <ul className="plain-list">
            {c.exclusions.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p>
            Novren explains scope and any separate pricing before additional
            work begins. A request outside the plan is not automatically
            accepted or charged.
          </p>
        </section>
        <section className="subsection">
          <h2>What you provide.</h2>
          <ul className="check-list">
            <li>
              Authorization and the access needed to connect and maintain the
              site.
            </li>
            <li>
              Active hosting, domain, email, and required premium software
              licenses.
            </li>
            <li>
              Final copy, licensed images, clear requests, and timely approvals.
            </li>
            <li>
              A primary contact and information about critical site functions or
              known problems.
            </li>
          </ul>
          <p className="notice">
            The onboarding page collects site details only. Privileged access is
            arranged through the connector or another appropriate secure method.
            Never send passwords through public forms, checkout, booking notes,
            or ordinary email.
          </p>
        </section>
        <section className="subsection">
          <h2>Check your site before subscribing.</h2>
          <p>
            Standard care is designed for ordinary existing WordPress business
            websites. These need review first:
          </p>
          <ul className="plain-list">
            {c.manualApproval.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <a className="button button-primary" href="/get-started">
              Get Started →
            </a>
            <BookCallLink />
          </div>
          <p className="small section-link">
            No call is required for a normal qualifying site.{' '}
            <a href="/terms">Read the service terms.</a>
          </p>
        </section>
      </div>
      <FinalCTA />
    </>
  );
}
