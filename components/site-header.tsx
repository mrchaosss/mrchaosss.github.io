import { BookCallLink } from './book-call-link';
import { siteConfig } from '@/lib/site-config';
const navigation = [
  ['What’s included', '/service'],
  ['How it works', '/process'],
  ['Pricing', '/#pricing'],
  ['FAQ', '/#faq'],
  ['About', '/about'],
];
export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="/" aria-label="Novren home">
            NOVREN<span>.</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <BookCallLink className="button button-primary header-book">
            <span className="desktop-book-label">
              Book a website-care fit call
            </span>
            <span className="mobile-book-label">Book a fit call</span>
          </BookCallLink>
          <details className="mobile-menu" id="mobile-menu">
            <summary aria-label="Navigation menu">
              <span className="menu-lines" aria-hidden="true">
                <span></span>
                <span></span>
              </span>
            </summary>
            <nav aria-label="Mobile navigation">
              {navigation.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
              <a href="/contact">Contact</a>
              {siteConfig.portal.visible && (
                <a href={siteConfig.portal.href}>Client login</a>
              )}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
