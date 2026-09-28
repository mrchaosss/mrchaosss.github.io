import { Onboarding } from '@/components/design/journey';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Connect your website | Novren',
  'Connect your website for Novren WordPress Care. $399/month, no setup fee.',
  '/onboarding',
  true,
);
export const dynamic = 'force-static';
export default function Page() {
  return <Onboarding />;
}
