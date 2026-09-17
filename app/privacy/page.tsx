import { PageIntro } from '@/components/site-ui';
import { siteConfig as c } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Privacy Policy | Novren',
  'How the Novren marketing website handles email, scheduling, technical hosting information, and campaign parameters. Contact hello@novren.co with privacy requests.',
  '/privacy',
);
export const dynamic = 'force-static';
export default function Privacy() {
  return (
    <>
      <PageIntro eyebrow="Privacy" title="Privacy Policy">
        <p>Effective and last updated: {c.updatedLabel}</p>
        <p>
          This policy describes the informational website at novren.co and
          inquiries made by email or through its scheduling link.
        </p>
      </PageIntro>
      <div className="container page-content">
        <div className="prose">
          <h2>Information we receive.</h2>
          <p>
            If you email Novren, we receive your email address and the
            information you choose to send, such as your name, business name,
            website URL, and message. If you book a call through Cal.com, we
            receive the scheduling details you provide, such as your name, email
            address, selected time, and answers to booking questions.
          </p>
          <p>
            We use these details to respond to your inquiry, assess fit, arrange
            calls, and communicate about the service. Please do not send
            passwords, payment details, or sensitive customer information
            through the website, email, or booking notes.
          </p>
          <h2>Hosting and technical information.</h2>
          <p>
            This marketing website is hosted on GitHub Pages. GitHub states that
            it logs and stores visitors’ IP addresses for security purposes.
            GitHub may process other technical request information under its own
            privacy practices. See{' '}
            <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">
              GitHub’s Pages documentation
            </a>{' '}
            and{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub’s Privacy Statement
            </a>
            .
          </p>
          <h2>Scheduling and campaign links.</h2>
          <p>
            Cal.com is an external destination. It is not embedded, and the
            marketing site does not load Cal.com scripts. When you follow a
            booking link, Cal.com handles information under its{' '}
            <a href="https://cal.com/privacy">Privacy Policy</a>.
          </p>
          <p>
            When campaign parameters are present in the current page URL, a
            small script may pass only these five parameters to the booking
            link: utm_source, utm_medium, utm_campaign, utm_term, and
            utm_content. Accepted values are limited to short campaign labels.
            They are also carried in links between this site’s pages, so they
            can reach the booking link after navigation.
          </p>
          <p>
            This uses the URL only, without cookies or local storage. Cal.com
            can store these parameters with a booking. Campaign labels must not
            contain personal or sensitive information. Other query parameters
            are not forwarded. If JavaScript is disabled, the ordinary booking
            link still works, without this handoff.
          </p>
          <h2>Tracking and browser signals.</h2>
          <p>
            The marketing site does not intentionally use advertising trackers,
            analytics cookies, session replay, heatmaps, or chat widgets. It
            does not change its behavior in response to a browser’s Do Not Track
            signal. Third-party destinations have their own practices.
          </p>
          <h2>Service providers and disclosures.</h2>
          <p>
            Information may be processed by providers used for website hosting,
            email, scheduling, and business administration. We share information
            as needed to handle your inquiry, arrange a call, comply with legal
            obligations, or protect against misuse. Website-care fulfillment and
            access are addressed separately before enrollment.
          </p>
          <p>
            Novren does not sell inquiry information or share it for
            cross-context behavioral advertising.
          </p>
          <h2>Retention.</h2>
          <p>
            Inquiry and scheduling records are retained as needed to respond,
            maintain relevant business records, and meet legal obligations or
            resolve disputes. Information that is no longer needed should be
            deleted. Provider copies and backups may follow their own retention
            schedules; this website does not set those schedules.
          </p>
          <h2>Your requests.</h2>
          <p>
            For access, correction, or deletion requests, email{' '}
            <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>. Identify
            the information or interaction involved without sending sensitive
            identity documents. We may need to verify that a request relates to
            you. Applicable legal obligations may limit deletion.
          </p>
          <h2>Policy changes and contact.</h2>
          <p>
            Changes to these practices will be reflected on this page with an
            updated date. Contact{' '}
            <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a> with
            privacy questions.
          </p>
        </div>
      </div>
    </>
  );
}
