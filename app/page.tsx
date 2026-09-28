import { Home } from '@/components/design/marketing';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'WordPress care for your business | Novren',
  'Managed WordPress care for $399/month. Updates, backups, security, monitoring, 50 AI edits and five small human edits. No setup fee.',
  '/',
);
export const dynamic = 'force-static';
export default function Page() {
  return <Home />;
}
