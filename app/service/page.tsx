import { PageIntro, FinalCTA, Icon } from '@/components/site-ui';
import { BookCallLink } from '@/components/book-call-link';
import { siteConfig as c, offerLine } from '@/lib/site-config';
import { services } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'WordPress Website Care: Scope & Small Edits | Novren',
  'See the updates, backups, scans, monitoring, support, edit limits, and exclusions in Novren Website Care. One qualifying WordPress website.',
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
          {c.planName} covers routine maintenance and small content changes for
          one qualifying WordPress website.
        </p>
        <p className="hero-price">
          <strong>{offerLine}.</strong>
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
          <h2>Small edits, with a clear limit.</h2>
          <p>
            Up to {c.humanEditsPerMonth} human edits per month. A qualifying
            edit is typically about {c.smallEditMinutes} minutes or less, using
            content you supply. These examples still need to fit your site and
            the task limit.
          </p>
          <div className="edit-examples">
            <article>
              <h3>Update your hours</h3>
              <p>
                Change the opening hours on an existing page using the schedule
                you provide.
              </p>
            </article>
            <article>
              <h3>Replace a banner</h3>
              <p>
                Swap an existing promotional banner for a suitable image you
                supply.
              </p>
            </article>
            <article>
              <h3>Add a team member</h3>
              <p>
                Add supplied text and a photo to an existing About page layout.
              </p>
            </article>
          </div>
          <p className="notice">
            Describe each request clearly. Novren checks the scope before work
            begins and asks for missing content or approvals. There is no
            published turnaround promise or promise that unused edits roll over.
          </p>
        </section>
        <section className="subsection">
          <h2>What you provide.</h2>
          <ul className="check-list">
            <li>
              Authorization and the access needed to connect and care for the
              site.
            </li>
            <li>
              Active hosting, domain, business email, and valid premium-plugin
              or theme licenses.
            </li>
            <li>
              Final text, appropriately licensed images, and clear instructions
              for edits.
            </li>
            <li>
              One contact for decisions, site context, and timely approvals.
            </li>
          </ul>
          <p className="notice">
            Do not send WordPress passwords through this website or ordinary
            email. Access is arranged through a secure method after the service
            agreement is signed.
          </p>
        </section>
        <section className="subsection">
          <h2>What the plan does not include.</h2>
          <ul className="plain-list">
            {c.exclusions.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p>
            If a request is larger, Novren explains why it falls outside the
            plan before proceeding. Separate work is only considered when there
            is an approved way to fulfill it. Availability is not guaranteed.
          </p>
        </section>
        <section className="subsection">
          <h2>We confirm eligibility before enrollment.</h2>
          <ul className="check-list">
            {c.goodFit.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p>These sites require manual approval:</p>
          <ul className="plain-list">
            {c.manualApproval.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p>
            Websites built on other platforms are outside this plan. A site that
            needs substantial repairs may need those issues addressed before
            care can begin.
          </p>
          <div className="section-link">
            <BookCallLink />
          </div>
        </section>
      </div>
      <FinalCTA />
    </>
  );
}
