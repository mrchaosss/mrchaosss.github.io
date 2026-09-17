import { siteConfig as c } from '@/lib/site-config';
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <a className="wordmark" href="/" aria-label="Novren home">
            NOVREN<span>.</span>
          </a>
          <p>
            Managed WordPress care.
            <br />
            For local service businesses.
          </p>
        </div>
        <nav aria-label="Website care">
          <h2>Website care</h2>
          <a href="/service">What’s included</a>
          <a href="/process">How it works</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <nav aria-label="Company">
          <h2>Novren</h2>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          {c.portal.visible && <a href={c.portal.href}>Client login</a>}
        </nav>
        <div className="footer-contact">
          <h2>Let’s talk about your website.</h2>
          <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>
          <p>
            WordPress sites only.
            <br />
            Fit confirmed before onboarding.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date(c.updatedDate).getUTCFullYear()} Novren</p>
        <nav aria-label="Legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Website terms</a>
          <a href="/accessibility">Accessibility</a>
        </nav>
      </div>
    </footer>
  );
}
