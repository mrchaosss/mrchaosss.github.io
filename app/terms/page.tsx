import { PageIntro } from '@/components/site-ui';
import { siteConfig as c } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'WordPress Care Service Terms | Novren',
  'Terms for Novren WordPress Care: $399/month, no setup fee, one website, included care, edit limits, cancellation, and responsibilities.',
  '/terms',
);
export const dynamic = 'force-static';
export default function Terms() {
  return (
    <>
      <PageIntro eyebrow="Service terms" title="Novren WordPress Care Terms">
        <p>Effective and last updated: {c.updatedLabel}</p>
        <p>
          These terms govern use of novren.co and the standard Novren WordPress
          Care subscription. Contact{' '}
          <a href="mailto:hello@novren.co">hello@novren.co</a> with questions
          before purchase.
        </p>
      </PageIntro>
      <div className="container page-content">
        <div className="prose">
          <h2>1. The service and your agreement.</h2>
          <p>
            By accepting these terms at checkout and subscribing, you authorize
            Novren to provide managed care for one eligible existing WordPress
            website. You confirm that you have authority to engage us for that
            website. A sales call or separate signed document is not required
            for the standard plan. Any separately agreed project scope must be
            approved in writing.
          </p>
          <h2>2. Price, renewal, and payment authorization.</h2>
          <p>
            The standard subscription is $399 USD per month per website. There
            is no setup fee; normal onboarding is included. The first $399
            payment is due at checkout. You authorize Stripe to charge your
            selected payment method for the monthly subscription until
            cancellation takes effect. Any applicable tax must be disclosed at
            checkout. Keep your billing details and email current.
          </p>
          <p>
            Your subscription is month-to-month with no minimum commitment. Each
            renewal starts a new paid monthly period. Onboarding begins after
            successful payment and receipt of the information and access needed.
            Care becomes active when Novren confirms the connection and
            baseline; payment alone does not establish a working site
            connection.
          </p>
          <h2>3. Cancellation and refunds.</h2>
          <p>
            To stop a future renewal, email hello@novren.co from your billing
            email before that renewal. Identify the website and say you wish to
            cancel. Cancellation takes effect at the end of the paid period, and
            normal care continues through that period unless another arrangement
            is confirmed or service must be suspended for a reason below. Novren
            will confirm receipt; a request received before renewal applies to
            that renewal even if our confirmation comes later.
          </p>
          <p>
            Started billing periods are not prorated or routinely refunded.
            Contact us promptly about a billing error. If Novren determines
            during initial onboarding that your website cannot be accepted for
            the standard plan before care is activated, we will cancel and
            refund the initial subscription payment. Separately approved project
            work has its own written pricing and terms. These provisions do not
            limit rights or refunds required by applicable law.
          </p>
          <h2>4. Included recurring care.</h2>
          <p>
            After activation, the plan includes managed WordPress core, plugin,
            and theme updates; daily offsite files/database backups with up to
            90 days of available history; daily security scanning; uptime checks
            at five-minute intervals; SSL certificate monitoring; maintenance
            support; a monthly care report reviewed by Novren; and up to five
            small human edits each monthly billing period. The{' '}
            <a href="/service">service page</a> explains the scope and
            qualifications.
          </p>
          <p>
            Security and routine minor plugin/theme updates follow nightly
            checks, while major changes receive more cautious handling.
            WordPress core uses a safety delay for major releases. Restore
            points, key-page visual checks, and rollback workflows are used
            where supported. Flagged security issues are reviewed and
            remediation is coordinated; automatic cleanup or removal of every
            infection is not guaranteed.
          </p>
          <h2>5. Small edits and additional work.</h2>
          <p>
            A small edit is a single, bounded website/content task typically
            taking about 30 minutes or less using final material you supply.
            Examples include business hours, team information, a replacement
            banner/image, or publishing supplied content. We determine scope
            before work begins and may ask you to simplify a request or approve
            separate pricing. Unused edits do not roll over or combine into
            development hours. Routine maintenance questions are separate from
            the five-edit allowance.
          </p>
          <p>
            The subscription does not include new websites, full redesigns,
            major page builds, custom plugins or applications, major
            integrations, major ecommerce or membership work, complex
            custom-code troubleshooting, large SEO projects, copywriting/content
            production, branding, or migrations unless explicitly agreed.
            Hosting, domains, email hosting, and premium plugin/theme licenses
            are not included unless separately agreed. Additional work is
            evaluated and quoted before it is accepted.
          </p>
          <h2>6. Eligibility and customer responsibilities.</h2>
          <p>
            The standard plan is for a reasonably functional existing WordPress
            business website. Ecommerce, memberships, multisite, substantial
            custom applications, unusual infrastructure,
            regulated/sensitive-data workflows, and severe existing problems
            require review before purchase. Answer the eligibility questions
            accurately and disclose material issues. A lightweight online check
            is not a full technical assessment.
          </p>
          <p>
            You remain responsible for hosting, domain and email services, valid
            software licenses, lawful site content and operations, access
            authority, and timely responses. Tell us about critical functions
            and changes made by other parties. Supply final copy and properly
            licensed assets. Work can be delayed or limited by missing access,
            expired licenses, incompatible software/hosting, or outstanding
            approvals. Do not submit passwords or sensitive customer data
            through public forms, checkout, booking notes, or ordinary email.
          </p>
          <h2>7. Access, partners, and communications.</h2>
          <p>
            You authorize the access and processing reasonably needed for agreed
            care, including installing/pairing the care connector, updates,
            backups, scans, monitoring, and approved edits. Novren uses service
            partners and professional systems for fulfillment and remains your
            primary contact. Privileged access is coordinated through an
            appropriate secure method. Our <a href="/privacy">privacy policy</a>{' '}
            explains the associated data flows.
          </p>
          <p>
            Send maintenance questions and requests to hello@novren.co. We may
            need context or approval before proceeding. This plan has no
            guaranteed response or completion time and does not include 24/7
            human emergency support. Automated monitoring operates continuously;
            human review is a separate step.
          </p>
          <h2>8. Backup, update, and monitoring limits.</h2>
          <p>
            Backup history begins when the connected service starts. Available
            backup history may be shorter than 90 days for a newly connected
            site. A restore depends on a usable backup and the site/hosting
            environment; changes and transactions after a backup may be lost.
            Restores can overwrite later content. We coordinate the appropriate
            restore scope and approvals. Backup access may end after
            cancellation; request any necessary handoff before the paid period
            ends.
          </p>
          <p>
            Visual comparisons cover selected pages and cannot test every form,
            transaction, integration, or function. Monitoring identifies issues
            but does not prevent downtime or renew certificates by itself.
            Updates and security scans cannot guarantee complete security,
            uninterrupted availability, recovery of every change, or business,
            SEO, or performance results.
          </p>
          <h2>9. Suspension, termination, and changes.</h2>
          <p>
            Novren may pause work when payment fails, access is unavailable,
            instructions create a security risk, or the website is outside the
            agreed scope. We will explain the issue and reasonable next steps
            where practical. We may terminate for unlawful use, abuse,
            unauthorized access, material misrepresentation, or an unresolved
            material breach. If Novren ends an otherwise compliant paid
            subscription for its own convenience, we will address the unused
            paid service with you rather than charge further renewals.
          </p>
          <p>
            Material changes to the subscription price or terms will be
            communicated before applying to a future renewal, so you can choose
            whether to continue. We will not apply a higher price
            retrospectively to an already paid period.
          </p>
          <h2>10. Website use and rights.</h2>
          <p>
            Use Novren’s website and contact channels lawfully. Do not interfere
            with systems, introduce malicious code, impersonate others, or
            misuse the Novren name or branding. You retain your rights in your
            site and supplied content; you grant the permissions needed to carry
            out agreed care. Third-party tools retain their own terms and
            intellectual-property rights.
          </p>
          <p>
            Services and website availability are subject to the practical
            limits above. Nothing in these terms excludes obligations, remedies,
            or rights that cannot lawfully be excluded. Questions about service,
            billing, privacy, or these terms can be sent to{' '}
            <a href="mailto:hello@novren.co">hello@novren.co</a>.
          </p>
        </div>
      </div>
    </>
  );
}
