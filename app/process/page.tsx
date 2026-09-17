import { PageIntro, FinalCTA } from '@/components/site-ui';
import { siteConfig as c } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Website Care Onboarding & Monthly Process | Novren',
  'See how Novren checks fit, arranges access, reviews your WordPress site, and handles ongoing maintenance, small edits, and reports.',
  '/process',
);
export const dynamic = 'force-static';
export default function Process() {
  return (
    <>
      <PageIntro
        eyebrow="How it works"
        title="A clear start. An ongoing care routine."
      >
        <p>
          We check your website and your needs before enrollment. Access and
          care setup come after a separately signed service agreement.
        </p>
      </PageIntro>
      <div className="container page-content">
        <ol className="workflow-list">
          <li>
            <div>
              <h2>Check the fit.</h2>
              <p>
                Book a {c.fitCallMinutes}-minute website-care fit call. Bring your website URL, an outline
                of your current setup, and the maintenance or content changes
                you need help with. We discuss platform, site condition,
                eligibility, and exclusions.
              </p>
              <p>
                Booking is a conversation, not enrollment. More complex or
                high-risk sites need manual approval.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Agree on the service, then connect.</h2>
              <p>
                Confirm the scope, fees, billing, cancellation terms, access
                authorization, and responsibilities in a signed service
                agreement before payment or website credentials are accepted.
              </p>
              <p>
                After that, we arrange a secure connection and the access needed
                for care. Do not submit passwords on this website or in ordinary
                email.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Review the starting point.</h2>
              <p>
                Onboarding includes access coordination, care setup, and a
                baseline review. We check the existing site, required licenses,
                and any issues affecting the setup, then confirm the maintenance
                schedule.
              </p>
              <p>
                Pre-existing damage or substantial repairs may fall outside the
                monthly plan. We explain those boundaries before proceeding.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Run the recurring care.</h2>
              <p>
                Your plan includes automatic updates with visual checks, daily
                off-site backups, daily security scans and malware cleanup,
                uptime and SSL monitoring, and real-person website-care support.
                A monthly report records care activity.
              </p>
              <p>
                Monitoring and scans are not guarantees against downtime or
                security incidents.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Send small-edit requests.</h2>
              <p>
                Email <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>{' '}
                with the page URL, requested change, and final text or images.
                The allowance is up to {c.humanEditsPerMonth} human edits per
                month, each typically about {c.smallEditMinutes} minutes or
                less.
              </p>
              <p>
                Novren checks the scope and coordinates the request. Never
                include passwords, payment details, or sensitive customer
                information.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Add context and approvals when needed.</h2>
              <p>
                We may need your input on wording, licensed software, business
                details, or a change with a wider effect. Work may need to wait
                for that input. The scope and dependencies determine the next
                steps; no fixed response or completion time is promised.
              </p>
            </div>
          </li>
        </ol>
      </div>
      <FinalCTA />
    </>
  );
}
