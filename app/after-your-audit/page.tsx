import { AfterAudit } from '@/components/design/marketing';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'After your website audit | Novren',
  'Understand what Novren’s care plan covers after your website audit and which findings need separate project work.',
  '/after-your-audit',
);
export const dynamic = 'force-static';
export default function Page() {
  return <AfterAudit />;
}
