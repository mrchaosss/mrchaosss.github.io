import { Care } from '@/components/design/marketing';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'What’s included | Novren',
  'Explore Novren’s WordPress care, monthly edit allowances, monitoring, backups, reporting and service boundaries.',
  '/care',
);
export const dynamic = 'force-static';
export default function Page() {
  return <Care />;
}
