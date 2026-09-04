import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Terms',
  alternates: { canonical: '/terms/' },
};
export const dynamic = 'force-static';

export default function TermsPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <article className="legal-page">
        <p className="eyebrow">Terms</p>
        <h1>Website terms</h1>
        <p className="legal-date">Effective September 4, 2026</p>

        <h2>Informational website</h2>
        <p>
          This website describes Novren’s reputation-management services in general terms.
          It is not a promise of a particular number of reviews, rating, search position,
          customer inquiries, or revenue.
        </p>

        <h2>Service agreements</h2>
        <p>
          If you hire Novren, the signed service agreement controls the scope, fees,
          responsibilities, timing, and cancellation terms. Website content does not replace
          that agreement.
        </p>

        <h2>Acceptable use</h2>
        <p>
          You may not misuse this website, attempt unauthorized access, interfere with its
          operation, or use its content in a way that violates applicable law.
        </p>

        <h2>Third-party services</h2>
        <p>
          Some functions may rely on third-party hosting, email, directory, or platform
          services. Their availability and policies are outside Novren’s control.
        </p>

        <h2>Contact</h2>
        <p>Questions about these terms may be sent to <a href="mailto:hello@novren.co">hello@novren.co</a>.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
