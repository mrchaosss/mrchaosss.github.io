import { PageIntro } from '@/components/site-ui';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'WordPress Care Onboarding | Novren',
  'After checkout, share non-sensitive site details and arrange your secure WordPress connection. Never submit passwords through this page.',
  '/onboarding',
  true,
);
export const dynamic = 'force-static';
export default function Onboarding() {
  return (
    <>
      <PageIntro
        eyebrow="After checkout"
        title="Welcome. Let’s connect your website."
      >
        <p>
          Your Stripe receipt confirms your payment. The next step is to share
          your site details so Novren can arrange a secure connection and
          confirm when care is active.
        </p>
        <p className="small">
          Haven’t subscribed yet?{' '}
          <a href="/get-started">Start with the eligibility check.</a>
        </p>
      </PageIntro>
      <div className="container page-content signup-grid">
        <section className="form-card" aria-labelledby="onboarding-title">
          <h2 id="onboarding-title">Prepare your onboarding details.</h2>
          <p className="form-help">
            This form prepares an email for you to send to hello@novren.co.
            Nothing is submitted or stored by this page. Use the same email
            address you used at checkout.
          </p>
          <p className="notice">
            Site details only. Do not include passwords, login links containing
            secrets, SSH keys, payment details, or sensitive customer
            information.
          </p>
          <form
            id="onboarding-form"
            data-static-form="onboarding"
            action="/onboarding"
            method="get"
          >
            <fieldset disabled>
              <legend className="sr-only">
                Non-sensitive onboarding details
              </legend>
              <label htmlFor="business">Business name</label>
              <input
                id="business"
                name="business"
                autoComplete="organization"
                maxLength={100}
                required
              />
              <label htmlFor="contact-name">Primary contact name</label>
              <input
                id="contact-name"
                name="contactName"
                autoComplete="name"
                maxLength={100}
                required
              />
              <label htmlFor="contact-email">Email used at checkout</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={150}
                required
              />
              <label htmlFor="onboarding-website">Website URL</label>
              <input
                id="onboarding-website"
                name="website"
                inputMode="url"
                autoComplete="url"
                placeholder="yourbusiness.com"
                maxLength={200}
                required
              />
              <label htmlFor="admin-url">
                WordPress admin URL{' '}
                <span className="optional">(if nonstandard)</span>
              </label>
              <input
                id="admin-url"
                name="adminUrl"
                inputMode="url"
                placeholder="Public login page address only"
                maxLength={200}
              />
              <p className="field-hint">
                Leave blank for the usual /wp-admin address. No passwords or
                secret login tokens.
              </p>
              <label htmlFor="hosting">
                Hosting provider <span className="optional">(if known)</span>
              </label>
              <input id="hosting" name="hosting" maxLength={100} />
              <label htmlFor="site-context">
                Known issues and critical pages/functions{' '}
                <span className="optional">(optional)</span>
              </label>
              <textarea
                id="site-context"
                name="context"
                rows={4}
                maxLength={700}
                placeholder="For example: contact form, booking page, or a current error. No sensitive data."
              />
              <label htmlFor="licenses">Premium plugin/theme licenses</label>
              <select id="licenses" name="licenses" defaultValue="" required>
                <option value="" disabled>
                  Choose an answer
                </option>
                <option value="Customer maintains active licenses">
                  I own and maintain the licenses
                </option>
                <option value="Previous provider manages licenses">
                  A previous provider manages them
                </option>
                <option value="No premium licenses known">
                  No premium licenses that I know of
                </option>
                <option value="Needs review">I’m not sure</option>
              </select>
              <label htmlFor="recipients">
                Different report or billing contact{' '}
                <span className="optional">(optional)</span>
              </label>
              <input
                id="recipients"
                name="recipients"
                maxLength={200}
                placeholder="Name and business email, if different"
              />
              <button className="button button-primary" type="submit">
                Prepare onboarding email →
              </button>
            </fieldset>
          </form>
          <noscript>
            <p className="notice">
              Email the site details listed above to{' '}
              <a href="mailto:hello@novren.co">hello@novren.co</a> from your
              checkout email. Never email passwords.
            </p>
          </noscript>
          <div
            id="onboarding-error"
            className="form-error"
            role="alert"
            hidden
          ></div>
          <section
            id="onboarding-result"
            className="form-result"
            aria-labelledby="onboarding-result-title"
            tabIndex={-1}
            hidden
          >
            <h3 id="onboarding-result-title">Your email is ready to send.</h3>
            <p>
              Open your email app, review the message, and send it to
              hello@novren.co. Preparing this message has not submitted it.
            </p>
            <a
              id="onboarding-email"
              className="button button-primary"
              href="mailto:hello@novren.co"
            >
              Open email app →
            </a>
            <p className="field-hint">
              No email app opens? Copy the text below into a message to
              hello@novren.co.
            </p>
            <label htmlFor="onboarding-summary">Onboarding message</label>
            <textarea id="onboarding-summary" readOnly rows={12} />
            <button
              id="copy-onboarding"
              className="button button-secondary"
              type="button"
            >
              Copy message
            </button>
            <output id="copy-status" className="field-hint"></output>
          </section>
        </section>
        <aside className="signup-aside">
          <p className="eyebrow">What happens next</p>
          <ol className="onboarding-steps">
            <li>
              <h3>Novren reviews your details.</h3>
              <p>
                We match your subscription and check the site’s setup, licenses,
                and any existing issues.
              </p>
            </li>
            <li>
              <h3>We arrange secure access.</h3>
              <p>
                Novren sends the appropriate WordPress connector and pairing
                instructions or arranges another secure access method. An
                authorized administrator can install the connector. No hosting
                move is normally needed.
              </p>
            </li>
            <li>
              <h3>We establish the baseline.</h3>
              <p>
                We verify the connection, first backup, scans, update policy,
                and important pages, then confirm care is active.
              </p>
            </li>
            <li>
              <h3>Send requests to Novren.</h3>
              <p>
                Email <a href="mailto:hello@novren.co">hello@novren.co</a> for
                maintenance support and your five small monthly edits. We review
                and send a monthly care report.
              </p>
            </li>
          </ol>
          <p className="small">
            Normal onboarding is included. Major repairs, migrations, or unusual
            infrastructure may need separate agreement. Your site is not under
            active care merely because this page is open.
          </p>
        </aside>
      </div>
    </>
  );
}
