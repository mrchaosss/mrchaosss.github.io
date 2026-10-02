import { Button, Icon, Link } from './design/ui';
export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap nav-inner">
          <Link to="/" className="brand" aria-label="Novren home">
            <img src="/logo.svg" alt="Novren" width="155" height="42" />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/care">What’s included</Link>
            <Link to="/#pricing">Pricing</Link>
            <Link to="/faq">FAQs</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/book-a-call" className="nav-call">
              Book a Call
            </Link>
            <Button to="/get-started" className="nav-start">
              Get Started <Icon name="arrow" size={17} />
            </Button>
            <button
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-nav"
              id="menu-toggle"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden
        >
          {[
            ['What’s included', '/care'],
            ['Pricing', '/#pricing'],
            ['How it works', '/how-it-works'],
            ['FAQs', '/faq'],
            ['About Novren', '/about'],
            ['Contact & support', '/support'],
            ['Book a Call', '/book-a-call'],
          ].map(([name, url]) => (
            <Link key={url} to={url}>
              {name}
              <Icon name="arrow" size={16} />
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
