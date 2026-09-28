import { Portal } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Client portal | Novren',
  'Client portal for Novren WordPress Care. $399/month, no setup fee.',
  '/portal',
  true,
);
export const dynamic = 'force-static';
export default function Page() {
  return <Portal />;
}
