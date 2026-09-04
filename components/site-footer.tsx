import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark footer-wordmark" href="/" aria-label="Novren home">
        NOVREN<span>.</span>
      </Link>
      <p>Managed reputation for local businesses.</p>
      <nav aria-label="Footer navigation">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href="mailto:hello@novren.co">hello@novren.co</a>
      </nav>
      <p className="copyright">© 2026 Novren. All rights reserved.</p>
    </footer>
  );
}
