import { Billing } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Billing and cancellation | Novren',
  'Billing and cancellation for Novren WordPress Care. $399/month, no setup fee.',
  '/billing',
  false,
);
export const dynamic = 'force-static';
export default function Page() {
  return <Billing />;
}
