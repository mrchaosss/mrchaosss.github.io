import { Link, PageIntro } from '@/components/design/ui';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Continue to WordPress care | Novren',
  'Explore Novren’s managed WordPress care plan.',
  '/care',
  true,
);
export const dynamic = 'force-static';
export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/care" />
      <PageIntro eyebrow="WordPress care" title="Continue to the care plan.">
        <p>This page has moved. <Link to="/care">See what’s included.</Link></p>
      </PageIntro>
    </>
  );
}
