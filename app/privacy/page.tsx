import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Privacy',
  alternates: { canonical: '/privacy/' },
};
export const dynamic = 'force-static';

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <article className="legal-page">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy notice</h1>
        <p className="legal-date">Effective September 4, 2026</p>

        <h2>Information you send us</h2>
        <p>
          If you email Novren, we receive the information you include, such as your name,
          business details, email address, and message. We use it to answer your request,
          assess whether our service is a fit, and communicate about services you ask about.
        </p>

        <h2>Website data</h2>
        <p>
          This website does not intentionally use advertising trackers or analytics cookies.
          Our hosting and email providers may process basic technical information needed to
          deliver the site, prevent abuse, and transmit messages.
        </p>

        <h2>Sharing and retention</h2>
        <p>
          We do not sell personal information. We may share information with service providers
          that help us operate the business, or when required by law. We keep information only
          as long as reasonably needed for those purposes.
        </p>

        <h2>Your choices</h2>
        <p>
          You may ask us to correct or delete information you sent us, subject to legal and
          operational requirements. Contact <a href="mailto:hello@novren.co">hello@novren.co</a>.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
