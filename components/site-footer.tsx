import { siteConfig as c } from '@/lib/site-config';
import { BookCallLink } from './book-call-link';
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
            For small and local businesses.
          </p>
        </div>
        <nav aria-label="Website care">
          <h2>Website care</h2>
          <a href="/service">What’s included</a>
          <a href="/process">How it works</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#faq">FAQ</a>
          <a href="/get-started">Get Started</a>
        </nav>
        <nav aria-label="Company">
          <h2>Novren</h2>
          <a href="/about">About</a>
          <a href="/contact">Contact &amp; support</a>
          <BookCallLink className="footer-call" />
          <a href="/onboarding">Onboarding</a>
        </nav>
        <div className="footer-contact">
          <h2>One place to ask for help.</h2>
          <a href={'mailto:' + c.contactEmail}>{c.contactEmail}</a>
          <p>
            $399/month per website.
            <br />
            No setup fee. No required sales call.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Novren</p>
        <nav aria-label="Legal">
          <a href="/terms">Service terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/accessibility">Accessibility</a>
        </nav>
      </div>
    </footer>
  );
}
