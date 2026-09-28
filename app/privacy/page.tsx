import { PageIntro } from '@/components/design/ui';
import { siteConfig as c } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Privacy Policy | Novren',
  'How Novren handles website visits, Stripe checkout, optional calls, onboarding, WordPress care, support, and reports.',
  '/privacy',
);
export const dynamic = 'force-static';
export default function Privacy() {
  return (
    <>
      <PageIntro eyebrow="Privacy" title="Privacy Policy">
        <p>Effective and last updated: {c.updatedLabel}</p>
        <p>
          This policy covers novren.co, inquiries, subscriptions, onboarding,
          and the information processed to provide WordPress care.
        </p>
      </PageIntro>
      <div className="container page-content">
        <div className="prose">
          <h2>Information and purposes.</h2>
          <p>
            Novren receives information you provide, such as name, business
            name, email, website URL, booking details, site context, support
            requests, and report recipients. We use it to assess fit, administer
            subscriptions, arrange onboarding and access, deliver care, respond
            to requests, and maintain relevant business records.
          </p>
          <p>
            The eligibility and onboarding forms submit information to Novren’s
            website service on Cloudflare. Eligible signup details are saved so
            a confirmed Stripe payment can be matched to the website. Onboarding
            details are stored for setup and sent into Novren’s support
            workflow. A secure, essential cookie lets this browser resume the
            signup for up to seven days. Short-lived email links can restore
            access; their verification tokens expire after 20 minutes and can be
            used once. Do not include passwords, secret access links, keys,
            payment details, or sensitive customer information in those forms or
            ordinary email.
          </p>
          <h2>Payments through Stripe.</h2>
          <p>
            Stripe hosts checkout and processes your payment information.
            Checkout collects your name, business name, email, website URL,
            eligibility confirmation, acceptance of service terms, and billing
            information. Novren can access the customer, subscription, payment
            status, and order information needed to administer the service.
            Novren’s website does not receive full card details. Stripe handles
            information under its{' '}
            <a href="https://stripe.com/privacy">Privacy Policy</a>.
          </p>
          <h2>Optional calls through Cal.com.</h2>
          <p>
            When you choose to book a call, Cal.com processes your name, email,
            website URL, selected time, and any optional notes. Calendar and
            conferencing providers support the booked meeting. Cal.com is linked
            rather than embedded in this website; see its{' '}
            <a href="https://cal.com/privacy">Privacy Policy</a>.
          </p>
          <h2>WordPress care, backups, and reporting.</h2>
          <p>
            Novren uses GoWP’s care, support, and reporting infrastructure to
            fulfill the service. A connected site may supply technical site
            information, software versions, scan and uptime results, screenshots
            of monitored pages, and backup copies of WordPress files and the
            database. A site database or backup can contain personal information
            from your own website. Provide only access you are authorized to
            grant, and disclose sensitive or regulated workflows before
            enrollment so suitability can be reviewed.
          </p>
          <p>
            GoWP and associated infrastructure providers process information
            needed for updates, backups, scans, monitoring, helpdesk requests,
            reports and the AI Editor. Prompts, relevant website content,
            previews and approved changes may be processed for AI edit requests.
            Do not include secrets or sensitive customer records in AI prompts.
            Novren remains your service contact. Access is arranged through the
            connector or another appropriate secure method, rather than a public
            password form. Customers receive care communications and reports;
            raw technical system notifications are routed to Novren.
          </p>
          <h2>Email and service communications.</h2>
          <p>
            Messages to hello@novren.co enter Novren’s support workflow. Google
            Workspace and GoWP’s email/helpdesk infrastructure, including
            Postmark delivery and routing, process these communications. We use
            them for onboarding, support, approvals, billing requests, and
            reports. Automated signup and onboarding messages use Cloudflare
            Email Service. Do not email passwords or sensitive customer records.
          </p>
          <h2>Website hosting and campaign links.</h2>
          <p>
            Cloudflare hosts the website and its signup/onboarding service. Its
            storage, security, logging and email systems process information
            needed for these functions, including technical request information
            such as IP addresses. See{' '}
            <a href="https://www.cloudflare.com/privacypolicy/">
              Cloudflare’s Privacy Policy
            </a>
            . GitHub stores the website’s source and supports deployment;
            customer form submissions are not published to the repository.
          </p>
          <p>
            Campaign links may indicate how you reached the website. Do not put
            personal or sensitive information in campaign labels. This website
            does not forward onboarding form contents or private resume links to
            the booking service.
          </p>
          <h2>Sharing and tracking.</h2>
          <p>
            We share information with service providers as needed to deliver and
            administer the service, meet legal obligations, resolve disputes,
            and protect against misuse. Providers may process information in the
            locations where they operate. Novren does not sell customer or
            inquiry information or share it for cross-context behavioral
            advertising.
          </p>
          <p>
            The public site does not intentionally run advertising trackers,
            analytics cookies, session replay, heatmaps, or chat widgets. It
            does not change behavior in response to Do Not Track. External
            checkout and scheduling services have their own practices.
          </p>
          <h2>Retention and security.</h2>
          <p>
            We retain records as needed for care, billing, communication, legal
            obligations, or disputes, and remove information when it is no
            longer needed. Connected-site backup history is normally up to 90
            days while care is active; that is not a promise to preserve backups
            after cancellation. Provider copies may have their own retention
            schedules. Ask before cancellation if you need a handoff of
            available information.
          </p>
          <p>
            Unpaid signup records are normally removed after seven days. Expired
            website sessions and access tokens are removed during scheduled
            cleanup. Successfully sent email bodies are cleared from the
            website’s sending queue; provider delivery records can remain under
            provider retention policies. Paid service and onboarding records are
            retained for the service and business purposes above.
          </p>
          <p>
            We use the access controls and security features of our service
            providers and coordinate privileged access through an appropriate
            method. No internet system can promise absolute security.
          </p>
          <h2>Your requests and policy changes.</h2>
          <p>
            Email <a href="mailto:hello@novren.co">hello@novren.co</a> for
            access, correction, deletion, or privacy questions. Identify the
            relevant interaction without sending sensitive identity documents.
            We may need to verify the request and retain records where legally
            required. Updated practices will be reflected here with a revised
            date.
          </p>
        </div>
      </div>
    </>
  );
}
