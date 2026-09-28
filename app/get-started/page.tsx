import { GetStarted } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Get started | Novren',
  'Get started for Novren WordPress Care. $399/month, no setup fee.',
  '/get-started',
  false,
);
export const dynamic = 'force-static';
export default function Page() {
  return <GetStarted />;
}
