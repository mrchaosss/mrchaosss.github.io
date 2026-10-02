import { Billing } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Billing and cancellation | Novren',
  'Monthly and annual billing, renewal and cancellation for Novren WordPress Care. No setup fee.',
  '/billing',
  false,
);
export const dynamic = 'force-static';
export default function Page() {
  return <Billing />;
}
