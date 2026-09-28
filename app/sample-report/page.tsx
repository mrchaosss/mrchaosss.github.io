import { SampleReport } from '@/components/design/marketing';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Your monthly care report | Novren',
  'An illustration of the maintenance information covered in your reviewed monthly care report.',
  '/sample-report',
);
export const dynamic = 'force-static';
export default function Page() {
  return <SampleReport />;
}
