import Link from 'next/link';
import { BookCallLink } from '@/components/book-call-link';

const navigation = [
  ['Service', '/service'],
  ['Process', '/process'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Novren home">
          NOVREN<span>.</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <BookCallLink className="header-cta" />
      </header>
    </>
  );
}
