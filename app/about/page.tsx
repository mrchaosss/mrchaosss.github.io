import { PageIntro, FinalCTA } from '@/components/site-ui';
import { BookCallLink } from '@/components/book-call-link';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'About Novren | Managed WordPress Care',
  'A focused WordPress care service for small and local businesses, with transparent pricing, clear scope, and Novren as your point of contact.',
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
          Novren brings routine WordPress maintenance and small website changes
          into one straightforward monthly service.
        </p>
      </PageIntro>
      <div className="container page-content">
        <div className="prose">
          <h2>One place for ongoing website care.</h2>
          <p>
            Your website needs updates, backups, monitoring, and occasional
            content changes even when you are busy running your business. Novren
            coordinates that recurring work for eligible existing WordPress
            sites.
          </p>
          <p>
            Novren is your primary contact. We use professional care systems and
            specialist service partners to support delivery, while keeping your
            questions, requests, and care reporting organized.
          </p>
          <h2>Clear scope before you subscribe.</h2>
          <p>
            The plan is $399/month per website, with no setup fee and normal
            onboarding included. It combines recurring care with up to five
            small human edits each month. Larger projects are evaluated
            separately.
          </p>
          <p>
            Read <a href="/service">what is included</a>, the{' '}
            <a href="/terms">service terms</a>, and{' '}
            <a href="/process">how it works</a>, then{' '}
            <a href="/get-started">get started online</a>. No sales meeting is
            required.
          </p>
          <h2>Practical care, honestly described.</h2>
          <p>
            Updates, scanning, monitoring, and backups do not guarantee
            uninterrupted availability or complete security. We explain the
            actual work, its limits, and the input we need from you.
          </p>
          <p>
            Prefer a conversation first? <BookCallLink className="text-link" />
          </p>
        </div>
      </div>
      <FinalCTA />
    </>
  );
}
