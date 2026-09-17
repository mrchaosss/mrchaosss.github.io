import { PageIntro } from '@/components/site-ui';
import { BookCallLink } from '@/components/book-call-link';
import { siteConfig as c, offerLine } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Book a WordPress Website-Care Fit Call | Novren',
  `Book a ${c.fitCallMinutes}-minute website-care fit call with Novren or email ${c.contactEmail}. Discuss your WordPress site, care needs, scope, and next steps.`,
  '/contact',
);
export const dynamic = 'force-static';
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Let’s talk about your site"
        title="First, let’s check the fit."
      >
        <p>
          A {c.fitCallMinutes}-minute conversation about your WordPress website,
          the care you need, and whether the plan fits your setup and expectations.
        </p>
      </PageIntro>
      <div className="container page-content contact-grid">
        <div>
          <p className="eyebrow">A useful first conversation</p>
          <h2>
            Bring your website URL.
            <br />
            And your questions.
          </h2>
          <ul className="check-list">
            <li>What your business does and how you use your website.</li>
            <li>Your current WordPress setup and any known issues.</li>
            <li>The maintenance or small changes you want handled.</li>
            <li>Questions about scope, price, and onboarding.</li>
          </ul>
          <p className="notice">
            WordPress sites only. Fit is confirmed before onboarding. The call
            does not enroll you, take payment, or authorize access to your site.
          </p>
        </div>
        <div className="contact-box">
          <p className="card-label">{c.planName}</p>
          <h2>Book your {c.fitCallMinutes}-minute fit call.</h2>
          <p>{offerLine} for one qualifying WordPress website.</p>
          <BookCallLink />
          <p className="small">
            The booking link opens Cal.com, where you can see availability and
            enter your scheduling details.
          </p>
          <div className="email-contact">
            <h3>Prefer to start by email?</h3>
            <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>
            <p className="small">
              Send your website URL and a brief description of what you need.
              Please do not send passwords or sensitive information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
