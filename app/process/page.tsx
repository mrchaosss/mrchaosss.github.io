import { PageIntro, FinalCTA } from '@/components/site-ui';
import { BookCallLink } from '@/components/book-call-link';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'How WordPress Care Works | Novren',
  'Check eligibility, subscribe for $399/month with no setup fee, connect your site, and receive ongoing care. No sales call required.',
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
          Start online at your own pace. Normal onboarding is included, and a
          sales call is optional.
        </p>
      </PageIntro>
      <div className="container page-content">
        <ol className="workflow-list">
          <li>
            <div>
              <h2>Confirm your site is a fit.</h2>
              <p>
                The <a href="/get-started">short eligibility check</a> asks for
                your website URL, WordPress status, and any unusual complexity.
                Ordinary existing WordPress business sites can continue to
                checkout. Ecommerce, memberships, multisite, custom systems, and
                severe existing problems need a review first.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Start your monthly subscription.</h2>
              <p>
                Review the <a href="/terms">service terms</a> and pay securely
                through Stripe. The first charge is $399, then $399 each month
                for one website. There is no setup fee or minimum term. Cancel
                before a future renewal to prevent that charge.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Complete onboarding and connect.</h2>
              <p>
                After checkout, visit the{' '}
                <a href="/onboarding">onboarding page</a> to prepare your site
                details for Novren. We verify your subscription and arrange the
                WordPress connector or another appropriate secure access method.
                Do not send passwords through forms, checkout, booking notes, or
                ordinary email.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Establish the care baseline.</h2>
              <p>
                Novren checks the starting condition, connection, first backup,
                scans, update policy, and critical pages. We confirm when care
                is active. Existing damage, migrations, or unusual technical
                work may need separate scope; we explain that before project
                work begins.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h2>Receive ongoing care and reporting.</h2>
              <p>
                Managed updates, daily backups and security scanning, uptime and
                SSL monitoring, and maintenance support keep routine care
                organized. Novren reviews your monthly care report before
                sending it. Technical alerts go to Novren for review and
                coordination.
              </p>
              <p>
                Email <a href="mailto:hello@novren.co">hello@novren.co</a> with
                maintenance questions or up to five small human edit requests
                each month. Include the page URL, final content, and clear
                instructions. We ask for context or approvals as needed.
              </p>
            </div>
          </li>
        </ol>
        <div className="notice">
          <p>
            Have questions or a more complex site? A 15-minute conversation is
            available before you decide.
          </p>
          <BookCallLink className="text-link" />
        </div>
      </div>
      <FinalCTA />
    </>
  );
}
