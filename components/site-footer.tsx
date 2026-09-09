import { BookCallLink } from '@/components/book-call-link';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="wordmark footer-wordmark" href="/" aria-label="Novren home">
          NOVREN<span>.</span>
        </a>
        <p>Managed online reputation for established local businesses.</p>
      </div>

      <nav aria-label="Service and company links">
        <p>Explore</p>
        <a href="/service">Service</a>
        <a href="/process">Process</a>
        <a href="/about">About</a>
        <BookCallLink />
      </nav>

      <div className="footer-contact">
        <p>Contact</p>
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        <span>{siteConfig.contactPhone}</span>
        <span>{siteConfig.serviceArea}</span>
      </div>

      <div className="footer-base">
        <p>© 2026 Novren. All rights reserved.</p>
        <nav aria-label="Legal links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
