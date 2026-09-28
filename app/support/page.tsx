import { Support } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Contact and support | Novren',
  'Contact and support for Novren WordPress Care. $399/month, no setup fee.',
  '/support',
  false,
);
export const dynamic = 'force-static';
export default function Page() {
  return <Support />;
}
