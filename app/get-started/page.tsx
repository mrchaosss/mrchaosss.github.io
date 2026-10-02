import { GetStarted } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Get started | Novren',
  'Start Novren WordPress Care: $399/month or $3,999/year. No setup fee. Check your website before checkout.',
  '/get-started',
  false,
);
export const dynamic = 'force-static';
export default function Page() {
  return <GetStarted />;
}
