import { PageIntro, FinalCTA } from '@/components/site-ui';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'About Novren | Focused WordPress Website Care',
  'Novren provides managed WordPress maintenance and small website support for local service businesses, with clear scope and one point of contact.',
  '/about',
);
export const dynamic = 'force-static';
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About Novren"
        title="Focused on the website you already have."
      >
        <p>
          Novren provides managed WordPress maintenance and small website
          support for local service businesses.
        </p>
      </PageIntro>
      <div className="container page-content">
        <div className="prose">
          <h2>A focused service, with clear boundaries.</h2>
          <p>
            The plan brings routine maintenance, monitoring, backups, small
            content changes, and website-care support together. It is designed
            for an existing, reasonably functional WordPress website.
          </p>
          <p>
            Novren remains your point of contact. Specialist fulfillment may
            involve service partners; the plan does not imply every person
            working on your website is a Novren employee.
          </p>
          <h2>What you can evaluate today.</h2>
          <p>
            Novren does not yet have customer case studies to share. You can
            evaluate the <a href="/service">complete scope and exclusions</a>,
            the <a href="/#pricing">published price</a>, and the{' '}
            <a href="/process">onboarding process</a> before deciding whether to
            continue.
          </p>
          <p>
            The fit call is a place to ask about your site, the small-edit
            limit, and how requests are handled. If the plan is not a fit, that
            should be clear before onboarding.
          </p>
          <h2>What we do not promise.</h2>
          <p>
            Novren does not guarantee uninterrupted availability, security, or
            a particular business result. We describe the actual care activities
            and their limits.
          </p>
          <p>
            The public website explains the offer. A separately signed service
            agreement sets the terms for your specific engagement.
          </p>
        </div>
      </div>
      <FinalCTA />
    </>
  );
}
