import { Booking } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Book an optional call | Novren',
  'Book an optional call for Novren WordPress Care. $399/month, no setup fee.',
  '/book-a-call',
  false,
);
export const dynamic = 'force-static';
export default function Page() {
  return <Booking />;
}
