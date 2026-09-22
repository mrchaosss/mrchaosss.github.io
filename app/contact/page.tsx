import { PageIntro } from '@/components/site-ui';
import { BookCallLink } from '@/components/book-call-link';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Contact & WordPress Care Support | Novren',
  'Email hello@novren.co for care questions, support, or an optional 15-minute call. Sign up directly for $399/month with no setup fee.',
  '/contact',
);
export const dynamic = 'force-static';
export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact Novren" title="One place to ask for help.">
        <p>
          Questions before signup, a care request, or a site that needs a closer
          look—email Novren.
        </p>
      </PageIntro>
      <div className="container page-content contact-grid">
        <div>
          <p className="eyebrow">Contact &amp; maintenance support</p>
          <h2>
            <a href="mailto:hello@novren.co">hello@novren.co</a>
          </h2>
          <p>
            Include your website URL, a brief description of the issue or
            requested change, and any final content for a small edit. Existing
            customers should use their account email.
          </p>
          <p className="notice">
            Do not send passwords, payment details, or sensitive customer data.
            Novren will arrange a secure access step when required.
          </p>
          <p className="small">
            Maintenance support is included. Response and completion timing
            depend on the issue and any access or approvals needed; the plan
            does not promise 24/7 human emergency coverage.
          </p>
        </div>
        <div className="contact-box">
          <p className="card-label">Talk first, if you prefer</p>
          <h2>Have questions? Book a call.</h2>
          <p>
            An optional 15-minute conversation about your site, scope, or
            onboarding. Standard care is $399/month per website, with no setup
            fee.
          </p>
          <BookCallLink />
          <div className="email-contact">
            <h3>Ready to get started?</h3>
            <p>No meeting required for a normal qualifying site.</p>
            <a className="button button-primary" href="/get-started">
              Get Started →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
