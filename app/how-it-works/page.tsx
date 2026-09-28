import { Process } from '@/components/design/marketing';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'How onboarding works | Novren',
  'Check your site’s fit, subscribe, arrange connection and receive confirmation when care is active.',
  '/how-it-works',
);
export const dynamic = 'force-static';
export default function Page() {
  return <Process />;
}
