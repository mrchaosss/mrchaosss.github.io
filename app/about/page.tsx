import { About } from '@/components/design/marketing';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'About Novren | Novren',
  'Straightforward WordPress care with transparent pricing, clear scope and one place to ask for help.',
  '/about',
);
export const dynamic = 'force-static';
export default function Page() {
  return <About />;
}
