import { FAQPage } from '@/components/design/marketing';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Questions, answered | Novren',
  'Answers about WordPress care, edits, hosting, access, billing and cancellation.',
  '/faq',
);
export const dynamic = 'force-static';
export default function Page() {
  return <FAQPage />;
}
