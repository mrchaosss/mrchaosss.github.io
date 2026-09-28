import { Link, Icon } from './design/ui';
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/">
            <img src="/logo.svg" alt="Novren home" width="170" height="46" />
          </Link>
          <p>
            Managed WordPress care.
            <br />
            One website. One clear plan.
          </p>
          <p className="footer-price">$399/month · $0 setup</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/care">What’s included</Link>
          <Link to="/after-your-audit">After your audit</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/about">About Novren</Link>
        </div>
        <div>
          <h2>Your next step</h2>
          <Link to="/get-started">Get Started</Link>
          <Link to="/book-a-call">Book a Call · optional</Link>
          <Link to="/onboarding">Finish onboarding</Link>
          <Link to="https://app.novren.co" target="_blank" rel="noreferrer">
            Client portal <Icon name="external" size={13} />
          </Link>
          <Link to="/billing">Billing & cancellation</Link>
        </div>
        <div>
          <h2>Talk to Novren</h2>
          <Link to="mailto:hello@novren.co">hello@novren.co</Link>
          <p>
            Questions about your site,
            <br />
            your plan or getting started.
          </p>
          <Link to="/support">
            Contact & support <Icon name="arrow" size={15} />
          </Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Novren</span>
        <div>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
