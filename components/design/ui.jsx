import React from 'react';
export function Link({ to, children, className = '', ...rest }) {
  return (
    <a href={to} className={className} {...rest}>
      {children}
    </a>
  );
}
export function Icon({ name = 'arrow', size = 22, ...rest }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    refresh: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M5.4 8a7 7 0 0 1 11.5-3L20 8M4 16l3.1 3a7 7 0 0 0 11.5-3" />
      </>
    ),
    backup: (
      <>
        <path d="M6 16a4 4 0 0 1-1-7.9A7 7 0 0 1 18.5 7a4.5 4.5 0 0 1-.5 9" />
        <path d="M12 12v9m-3-3 3 3 3-3" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v5c0 5-8 10-8 10s-8-5-8-10V6Z" />
        <path d="m8.5 11.5 2.5 2.5 4.5-5" />
      </>
    ),
    pulse: (
      <>
        <path d="M3 12h4l3-7 4 14 3-7h4" />
      </>
    ),
    edit: (
      <>
        <path d="m14 5 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 14Z" />
      </>
    ),
    report: (
      <>
        <path d="M14 3H5v18h14V8ZM14 3v5h5M8 12h8M8 16h5" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),
    external: (
      <>
        <path d="M14 3h7v7m0-7L10 14M10 5H4v15h15v-6" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7v.5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
export function Button({
  to = '',
  children,
  secondary = false,
  quiet = false,
  arrow = false,
  className = '',
  ...props
}) {
  const cls = `button ${secondary ? 'button-secondary' : ''} ${quiet ? 'button-quiet' : ''} ${className}`;
  return to ? (
    <Link to={to} className={cls} {...props}>
      {children}
      {arrow && <Icon name="arrow" size={18} />}
    </Link>
  ) : (
    <button className={cls} {...props}>
      {children}
      {arrow && <Icon name="arrow" size={18} />}
    </button>
  );
}
export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}
export function PageIntro({ eyebrow, title, children }) {
  return (
    <section className="page-intro">
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {children && <div className="intro-copy">{children}</div>}
      </div>
    </section>
  );
}
export function Notice({ children, tone = 'info' }) {
  return (
    <div className={`notice ${tone}`}>
      <Icon name={tone === 'success' ? 'check' : 'info'} size={20} />
      <div>{children}</div>
    </div>
  );
}
export function Field({
  label,
  id,
  hint,
  error,
  children,
  optional = false,
  ...props
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional && <span className="optional">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {children || (
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [hint ? `${id}-hint` : '', error ? `${id}-error` : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
        />
      )}{' '}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
export function Steps({
  current = 0,
  labels = ['Your website', 'Checkout', 'Onboarding'],
}) {
  return (
    <ol className="steps" aria-label="Signup progress">
      {labels.map((label, i) => (
        <li
          key={label}
          className={`${i === current ? 'current' : ''} ${i < current ? 'done' : ''}`}
          aria-current={i === current ? 'step' : undefined}
        >
          <span>{i < current ? <Icon name="check" size={14} /> : i + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}
export function PriceSummary({ compact = false }) {
  return (
    <aside className={`price-summary ${compact ? 'compact' : ''}`}>
      <Eyebrow>Novren WordPress Care</Eyebrow>
      <div className="summary-price">
        <span id="billing-summary-price">$399</span><span id="billing-summary-period">/month</span>
      </div>
      <p>One eligible WordPress website.</p>
      <div className="summary-rule" />
      <ul className="check-list">
        <li>
          <Icon name="check" />
          Updates, backups & monitoring
        </li>
        <li>
          <Icon name="check" />
          Daily security scanning
        </li>
        <li>
          <Icon name="check" />
          50 AI edits/month
        </li>
        <li>
          <Icon name="check" />5 small human edits/month
        </li>
        <li>
          <Icon name="check" />
          Support & monthly care reports
        </li>
      </ul>
      <dl className="totals">
        <div>
          <dt>Setup & normal onboarding</dt>
          <dd>$0</dd>
        </div>
        <div>
          <dt>Due at checkout</dt>
          <dd id="billing-summary-due">$399 USD</dd>
        </div>
      </dl>
      <p id="billing-summary-terms" className="small">
        Monthly renewal. No minimum term. Cancel before your next renewal.
      </p>
      <Link to="/terms" className="text-link small">
        Read the service terms <Icon name="arrow" size={15} />
      </Link>
    </aside>
  );
}
export function CTA({
  title = 'Make website care one less thing to manage.',
  text = 'One clear plan. $399/month per website. No setup fee.',
}) {
  return (
    <section className="cta-section">
      <div className="wrap cta-inner">
        <div>
          <Eyebrow>Your next step</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Button to="/get-started" arrow>
            Get Started
          </Button>
          <Link to="/book-a-call" className="text-link">
            Have questions? Book a Call <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
