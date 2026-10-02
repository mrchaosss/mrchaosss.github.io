import { Button, Icon, Notice, PageIntro, PriceSummary, Steps } from './ui';
import { complexityOptions } from './content';

export function GetStarted() {
  return (
    <>
      <PageIntro
        eyebrow="Get started"
        title="First, a quick check of your website."
      >
        <p>
          One existing WordPress website. $399/month, with optional annual billing. No setup fee or required
          call.
        </p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap checkout-layout">
          <div className="flow-content">
            <Steps />
            <form
              id="fit-form"
              className="flow-form"
              action="/api/checkout"
              method="post"
            >
              <fieldset className="billing-choice">
                <legend>Choose your billing</legend>
                <label className="check-option">
                  <input type="radio" name="billing" value="month" defaultChecked required />
                  <span>Monthly — $399/month<small>Month to month. No setup fee.</small></span>
                </label>
                <label className="check-option">
                  <input type="radio" name="billing" value="year" required />
                  <span>Annual — $3,999/year<small>12 months paid upfront. Save $789. Same monthly edit allowances.</small></span>
                </label>
                <p id="annual-billing-notice" className="small" hidden>Renews at $3,999 each year unless canceled before renewal. You can leave early, but unused months are not refunded for voluntary early departure. See the service terms for exceptions.</p>
              </fieldset>
              <div className="field">
                <label htmlFor="website">Your website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  inputMode="url"
                  placeholder="example.com"
                  autoComplete="url"
                  maxLength={200}
                  required
                />
              </div>
              <fieldset>
                <legend>Is this an existing WordPress website?</legend>
                {[
                  ['yes', 'Yes'],
                  ['no', 'No'],
                  ['unsure', 'I’m not sure'],
                ].map(([v, l]) => (
                  <label className="check-option" key={v}>
                    <input type="radio" name="platform" value={v} required />
                    <span>{l}</span>
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>Is this for one website?</legend>
                {[
                  ['yes', 'Yes, one website'],
                  ['multiple', 'More than one website'],
                ].map(([v, l]) => (
                  <label className="check-option" key={v}>
                    <input type="radio" name="oneSite" value={v} required />
                    <span>{l}</span>
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>Does any of this apply?</legend>
                <p className="small">
                  Select all that apply, or “None of these.”
                </p>
                {complexityOptions.map(([v, l, h]) => (
                  <label className="check-option" key={v}>
                    <input type="checkbox" name="complexity" value={v} />
                    <span>
                      {l}
                      <small>{h}</small>
                    </span>
                  </label>
                ))}
              </fieldset>
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="company-fax">Leave this empty</label>
                <input
                  id="company-fax"
                  name="fax"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>
              <p className="small">
                We’ll check these answers before sending you to Stripe’s secure
                checkout. Name, business and billing information are collected
                there. Please don’t include passwords.
              </p>
              <div className="button-row">
                <Button type="submit" arrow>
                  Continue to checkout
                </Button>
                <a href="/book-a-call" className="text-link">
                  Prefer to talk first?
                </a>
              </div>
              <p className="legal-links">
                <a href="/terms">Service terms</a> ·{' '}
                <a href="/privacy">Privacy</a>
              </p>
              <div
                id="fit-status"
                className="form-status"
                aria-live="polite"
                tabIndex={-1}
              />
            </form>
            <noscript>
              <Notice>
                JavaScript is needed for the short fit check. You can also
                contact <a href="mailto:hello@novren.co">hello@novren.co</a> to
                get started.
              </Notice>
            </noscript>
          </div>
          <PriceSummary />
        </div>
      </section>
    </>
  );
}

export function Onboarding() {
  return (
    <>
      <PageIntro
        eyebrow="After checkout"
        title="Let’s get your website connected."
      >
        <p>
          Share the practical details. Novren will coordinate the connection and
          confirm when care is active.
        </p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap narrow">
          <Steps current={2} />
          <div id="onboarding-loading" className="notice" aria-live="polite">
            Checking your signup securely…
          </div>
          <div id="onboarding-locked" hidden>
            <div className="status-card">
              <h2>Resume your onboarding</h2>
              <p>
                Use the email you entered at checkout. If a paid signup matches,
                we’ll send a short-lived link to continue.
              </p>
            </div>
            <form
              id="resume-form"
              className="flow-form"
              method="post"
              action="/api/resume"
            >
              <div className="field">
                <label htmlFor="resume-email">Checkout email</label>
                <input
                  id="resume-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
              <Button type="submit">Send my link</Button>
              <div className="form-status" aria-live="polite" />
            </form>
            <p className="small">
              Haven’t subscribed yet?{' '}
              <a href="/get-started">Start with the website fit check.</a>
            </p>
          </div>
          <div id="onboarding-pending" className="status-card" hidden>
            <h2>We’re waiting for payment confirmation.</h2>
            <p>
              This page updates when Stripe confirms payment. Some payment
              methods take longer. Please don’t pay again while a payment is
              processing.
            </p>
            <div className="button-row">
              <a className="button button-secondary" href="/onboarding">
                Check again
              </a>
              <a href="mailto:hello@novren.co">Contact Novren</a>
            </div>
          </div>
          <div id="onboarding-payment-review" className="status-card" hidden>
            <h2>Let’s check your payment together.</h2>
            <p>
              Stripe reported a payment issue that needs a review. Please contact
              Novren from your checkout email before trying another payment.
              We’ll confirm what happened and help you continue.
            </p>
            <a className="button" href="mailto:hello@novren.co">Contact Novren</a>
          </div>
          <div id="onboarding-complete" className="status-card" hidden>
            <h2>Your website details are saved.</h2>
            <p>
              Novren will review them, prepare your client workspace and
              coordinate connection with you or your administrator. Care is not
              active until we confirm the baseline.
            </p>
            <p>
              Your portal invitation and activation instructions will follow. No
              separate care subscription is needed.
            </p>
            <div className="button-row">
              <a className="button button-secondary" href="/support">
                Contact Novren
              </a>
              <a href="https://app.novren.co" rel="noreferrer">
                Already invited? Open your portal
              </a>
            </div>
          </div>
          <form
            id="onboarding-form"
            className="flow-form"
            method="post"
            action="/api/onboarding"
            hidden
          >
            <Notice tone="success">
              <strong>Payment confirmed.</strong> Your subscription is{' '}
              <span id="onboarding-billing">verified</span>. Normal onboarding is included.
            </Notice>
            <p id="onboarding-site" className="small" />
            <div className="field">
              <label htmlFor="hosting">
                Hosting provider <span className="optional">Optional</span>
              </label>
              <input
                id="hosting"
                name="hosting"
                maxLength={160}
                placeholder="It’s okay if you don’t know"
              />
            </div>
            <div className="field">
              <label htmlFor="adminUrl">
                WordPress admin URL <span className="optional">Optional</span>
              </label>
              <input
                id="adminUrl"
                name="adminUrl"
                type="url"
                maxLength={300}
                placeholder="Only if it differs from /wp-admin"
              />
              <p className="small">
                An address only—no secret access links or passwords.
              </p>
            </div>
            <div className="field">
              <label htmlFor="critical">Important pages and functions</label>
              <textarea
                id="critical"
                name="critical"
                rows={3}
                maxLength={2000}
                required
                placeholder="For example: contact form, booking link, homepage and phone links"
              />
            </div>
            <div className="field">
              <label htmlFor="issues">
                Known problems or current work{' '}
                <span className="optional">Optional</span>
              </label>
              <textarea
                id="issues"
                name="issues"
                rows={3}
                maxLength={2000}
                placeholder="Tell us about anything we should check or coordinate with your developer."
              />
            </div>
            <div className="field">
              <label htmlFor="licenses">
                Premium plugin/theme licenses{' '}
                <span className="optional">Optional</span>
              </label>
              <input
                id="licenses"
                name="licenses"
                maxLength={500}
                placeholder="Who manages them? No license keys, please."
              />
            </div>
            <div className="field">
              <label htmlFor="access">
                Who can arrange WordPress connection?
              </label>
              <select id="access" name="access" required defaultValue="">
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="self">
                  I can install the connector with instructions
                </option>
                <option value="developer">
                  My developer or website administrator can help
                </option>
                <option value="help">I need help working this out</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="administrator">
                Administrator or developer name{' '}
                <span className="optional">Optional</span>
              </label>
              <input id="administrator" name="administrator" maxLength={120} />
            </div>
            <div className="field">
              <label htmlFor="reportEmail">
                Report/contact email <span className="optional">Optional</span>
              </label>
              <input
                id="reportEmail"
                name="reportEmail"
                type="email"
                maxLength={254}
                placeholder="Leave blank to use your checkout email"
              />
            </div>
            <Notice>
              Keep passwords, SSH keys, payment information and private customer
              records out of this form. Novren will coordinate the WordPress
              connector and any additional access separately.
            </Notice>
            <div className="button-row">
              <Button type="submit" arrow>
                Save website details
              </Button>
            </div>
            <p className="small">
              Your information is saved securely for setup.{' '}
              <a href="/privacy">Privacy policy</a>.
            </p>
            <div className="form-status" aria-live="polite" tabIndex={-1} />
          </form>
          <noscript>
            <Notice>
              Please enable JavaScript to verify your signup and submit
              onboarding, or contact hello@novren.co for help.
            </Notice>
          </noscript>
        </div>
      </section>
    </>
  );
}

export function Support() {
  return (
    <>
      <PageIntro eyebrow="Contact & support" title="One place to ask for help.">
        <p>
          Questions before signup, a website issue or a small edit request?
          Contact Novren.
        </p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap narrow">
          <div className="status-card">
            <Icon name="mail" />
            <h2>
              <a href="mailto:hello@novren.co">hello@novren.co</a>
            </h2>
            <p>
              Include your website URL, the affected page and what you need. For
              edits, provide the finished text or image and explain where it
              goes.
            </p>
            <p>
              Don’t send passwords or private customer records. If hosting or
              another provider needs to act, we’ll coordinate the next steps.
            </p>
            <a className="button" href="mailto:hello@novren.co">
              Email Novren
            </a>
          </div>
          <div className="status-card">
            <h2>Prefer a conversation?</h2>
            <p>
              A 15-minute call is available for questions and unusual websites.
              Ordinary qualifying sites can sign up directly.
            </p>
            <a className="button button-secondary" href="/book-a-call">
              Book a Call
            </a>
          </div>
          <p className="small">
            Automated monitoring runs continuously after activation. Human
            support is not a 24/7 emergency service and no response time is
            guaranteed.
          </p>
        </div>
      </section>
    </>
  );
}
export function Booking() {
  return (
    <>
      <PageIntro
        eyebrow="Optional 15-minute call"
        title="Have a few questions first?"
      >
        <p>
          Talk through the care plan or an unusual website. A call is optional
          for a standard qualifying site.
        </p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap narrow">
          <div className="status-card">
            <h2>WordPress Care Questions</h2>
            <p>
              $399/month per eligible website. No setup fee. Bring your website
              URL and the questions you’d like answered.
            </p>
            <div className="button-row">
              <a
                className="button"
                href="https://cal.com/gabe-glenn-9zwzc2/strategy-call"
                rel="noreferrer"
              >
                Choose a time on Cal.com <Icon name="external" size={17} />
              </a>
              <a href="/get-started" className="text-link">
                Ready now? Get Started
              </a>
            </div>
          </div>
          <p>
            Prefer email? <a href="mailto:hello@novren.co">hello@novren.co</a>
          </p>
        </div>
      </section>
    </>
  );
}
export function Billing() {
  return (
    <>
      <PageIntro
        eyebrow="Billing & cancellation"
        title="Simple billing. Clear cancellation."
      >
        <p>$399/month or $3,999/year per website. No setup fee.</p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap narrow prose">
          <h2>Stop a future renewal.</h2>
          <p>
            Email{' '}
            <a href="mailto:hello@novren.co?subject=Cancel%20my%20Novren%20subscription">
              hello@novren.co
            </a>{' '}
            from your checkout email before the next renewal. Identify your
            website and say you want to cancel. A request received before
            renewal prevents that renewal even if our confirmation follows
            later.
          </p>
          <h2>Payment or invoice questions.</h2>
          <p>
            Use the same email for billing corrections, invoices or help
            updating payment details. Don’t send card numbers in email. Stripe
            handles payment information.
          </p>
          <h2>Your current period.</h2>
          <p>
            Cancellation normally takes effect at the end of the paid period.
            Monthly billing pays for one month; annual billing pays upfront for 12 months and renews at $3,999 each year. You may cancel future renewal anytime or ask to end care early. Voluntary early departure does not receive a prorated refund for unused months. If we cannot
            accept a site during initial onboarding before activation, we cancel
            and refund the first payment. See the{' '}
            <a href="/terms">service terms</a> for the complete policy.
            {' '}Refunds required by law and billing corrections remain protected.
          </p>
        </div>
      </section>
    </>
  );
}
export function Portal() {
  return (
    <>
      <PageIntro
        eyebrow="Client portal"
        title="Your care workspace, ready for you."
      >
        <p>
          Novren prepares your portal and sends your invitation during setup.
        </p>
      </PageIntro>
      <section className="section top-small">
        <div className="wrap narrow">
          <div className="status-card">
            <h2>Already received your invitation?</h2>
            <p>
              Use the invitation to establish your sign-in, then access your
              website’s enabled care tools in the Novren client portal.
            </p>
            <a className="button" href="https://app.novren.co" rel="noreferrer">
              Open client portal <Icon name="external" size={17} />
            </a>
          </div>
          <p>
            Still setting up? <a href="/onboarding">Finish onboarding</a> or
            contact <a href="mailto:hello@novren.co">hello@novren.co</a>. This
            website does not create a second portal account.
          </p>
        </div>
      </section>
    </>
  );
}
