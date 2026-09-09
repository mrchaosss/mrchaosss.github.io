import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="wordmark footer-wordmark" href="/" aria-label="Novren home">
          NOVREN<span>.</span>
        </Link>
        <p>Managed online reputation for established local businesses.</p>
      </div>

      <nav aria-label="Service and company links">
        <p>Explore</p>
        <Link href="/service">Service</Link>
        <Link href="/process">Process</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Book a call</Link>
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
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
