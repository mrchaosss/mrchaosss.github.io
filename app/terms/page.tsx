import { PageIntro } from '@/components/site-ui';
import { siteConfig as c } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Website Terms of Use | Novren',
  'Terms for using the Novren informational website. A separately signed service agreement governs website-care services, billing, cancellation, and responsibilities.',
  '/terms',
);
export const dynamic = 'force-static';
export default function Terms() {
  return (
    <>
      <PageIntro eyebrow="Website terms" title="Terms of Use">
        <p>Effective and last updated: {c.updatedLabel}</p>
        <p>
          These terms apply to use of the informational website at novren.co.
        </p>
      </PageIntro>
      <div className="container page-content">
        <div className="prose">
          <h2>Informational website.</h2>
          <p>
            The website describes Novren Website Care and provides contact and
            scheduling links. Viewing the website, emailing us, or booking a
            call does not enroll you in a service or authorize access to your
            website.
          </p>
          <h2>A separate agreement governs services.</h2>
          <p>
            A separately signed client service agreement controls actual service
            scope, fees, billing, cancellation, responsibilities, credentials,
            warranties, and liability. That agreement must be in place before
            Novren accepts payment or website credentials. These Website Terms
            do not replace it.
          </p>
          <h2>Content and intellectual property.</h2>
          <p>
            You may view the website and share links to it. Do not use the
            Novren name, branding, or website material to misrepresent a
            relationship with Novren. Do not reuse original content in violation
            of applicable intellectual-property law.
            Third-party names and marks belong to their respective owners.
          </p>
          <h2>Acceptable use.</h2>
          <p>
            Use the website lawfully. Do not attempt unauthorized access,
            interfere with its operation, introduce malicious code, impersonate
            another person, or abuse the contact and scheduling channels. Do not
            submit passwords, payment details, or sensitive customer data.
          </p>
          <h2>Third-party destinations.</h2>
          <p>
            Links may lead to third-party services, including Cal.com. Their own
            terms and privacy practices apply when you use them. Novren does not
            control their content, availability, or operation.
          </p>
          <h2>Website information and availability.</h2>
          <p>
            Website information may change. We aim to keep it accurate, but do
            not promise that the informational website will always be available
            or error-free. To the extent permitted by applicable law, the
            website is provided as available without warranties about its
            uninterrupted operation. Nothing here excludes rights that cannot
            lawfully be excluded.
          </p>
          <p>
            Descriptions of updates, backups, scanning, and monitoring are not
            guarantees of security, uptime, rankings, leads, revenue, or
            conversion improvements.
          </p>
          <h2>Updates and contact.</h2>
          <p>
            Revisions will appear here with an updated date. Questions about
            these terms can be sent to{' '}
            <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
