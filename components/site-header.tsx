import { BookCallLink } from './book-call-link';
const navigation = [
  ['What’s included', '/service'],
  ['How it works', '/process'],
  ['Pricing', '/#pricing'],
  ['FAQ', '/#faq'],
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
            <BookCallLink className="nav-call" />
          </nav>
          <a className="button button-primary header-book" href="/get-started">
            Get Started <span aria-hidden="true">→</span>
          </a>
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
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <BookCallLink className="text-link" />
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
