import Link from 'next/link';

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Novren home">
          NOVREN<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#service">Service</Link>
          <Link href="/#process">Process</Link>
          <Link href="/about">About</Link>
        </nav>
        <a className="header-cta" href="mailto:hello@novren.co?subject=Reputation%20snapshot">
          Request a snapshot
        </a>
      </header>
    </>
  );
}
