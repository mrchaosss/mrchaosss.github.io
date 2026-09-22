import { PageIntro } from '@/components/site-ui';
import { BookCallLink } from '@/components/book-call-link';
import { siteConfig as c } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Get Started with WordPress Care | Novren',
  'Check your WordPress website’s eligibility, then subscribe for $399/month. No setup fee. No required sales call.',
  '/get-started',
);
export const dynamic = 'force-static';
export default function GetStarted() {
  return (
    <>
      <PageIntro eyebrow="Get started" title="Let’s make sure the plan fits.">
        <p>
          $399/month for one eligible existing WordPress website. No setup fee.
          No required sales call.
        </p>
      </PageIntro>
      <div className="container page-content signup-grid">
        <section className="form-card" aria-labelledby="eligibility-title">
          <p className="eyebrow">A short eligibility check</p>
          <h2 id="eligibility-title">Tell us about your website.</h2>
          <p className="form-help">
            These answers stay in this page. You will provide your website URL
            and billing details securely in Stripe. No passwords here.
          </p>
          <form
            id="eligibility-form"
            data-static-form="eligibility"
            action="/get-started"
            method="get"
          >
            <fieldset disabled>
              <legend className="sr-only">Website eligibility</legend>
              <label htmlFor="website-url">Website URL</label>
              <input
                id="website-url"
                name="website"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="yourbusiness.com"
                maxLength={200}
                required
                aria-describedby="website-help"
              />
              <p id="website-help" className="field-hint">
                Use your public website address, without login details or
                private links.
              </p>
              <label htmlFor="wordpress">
                Is this an existing WordPress website?
              </label>
              <select id="wordpress" name="wordpress" required defaultValue="">
                <option value="" disabled>
                  Choose an answer
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">I’m not sure</option>
              </select>
              <label htmlFor="one-site">Is this for one website?</label>
              <select id="one-site" name="oneSite" required defaultValue="">
                <option value="" disabled>
                  Choose an answer
                </option>
                <option value="yes">Yes, one website</option>
                <option value="no">No, more than one</option>
              </select>
              <label htmlFor="complexity">
                Does your site have any of these?
              </label>
              <ul className="form-scope-list">
                <li>WooCommerce or substantial ecommerce</li>
                <li>Memberships or WordPress multisite</li>
                <li>Custom application features or unusual infrastructure</li>
                <li>Regulated or sensitive-data workflows</li>
                <li>Severe existing problems needing major repair</li>
              </ul>
              <select
                id="complexity"
                name="complexity"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose an answer
                </option>
                <option value="standard">None of these</option>
                <option value="review">Yes, one or more</option>
                <option value="unsure">I’m not sure</option>
              </select>
              <button className="button button-primary" type="submit">
                Check eligibility →
              </button>
            </fieldset>
          </form>
          <noscript>
            <p className="notice">
              Enable JavaScript for this short check, or email{' '}
              <a href="mailto:hello@novren.co">hello@novren.co</a> with your
              site URL and the answers above. No sales call is required.
            </p>
          </noscript>
          <div
            id="eligibility-error"
            className="form-error"
            role="alert"
            hidden
          ></div>
          <section
            id="eligible-result"
            className="form-result"
            aria-labelledby="eligible-title"
            tabIndex={-1}
            hidden
          >
            <h3 id="eligible-title">Your answers fit the standard plan.</h3>
            <p>
              Continue with <strong id="qualified-site"></strong>. You will
              confirm the website URL in Stripe.
            </p>
            <p>
              <strong>$399 today, then $399/month.</strong> No setup fee. One
              website. Up to five small human edits per month. Normal onboarding
              is included.
            </p>
            <p>
              Review the <a href="/terms">service terms</a> and{' '}
              <a href="/privacy">privacy policy</a> before paying. Cancel before
              a future renewal to prevent its charge. Care begins after
              connection and baseline confirmation.
            </p>
            <a
              id="checkout-link"
              className="button button-primary"
              href={c.checkoutHref}
              rel="noreferrer"
            >
              Continue to checkout →
            </a>
            <p className="field-hint">
              Checkout is hosted by Stripe. Novren confirms technical
              compatibility during onboarding; see the terms if we cannot accept
              your site.
            </p>
          </section>
          <section
            id="review-result"
            className="form-result"
            aria-labelledby="review-title"
            tabIndex={-1}
            hidden
          >
            <h3 id="review-title">Let’s review the fit before you pay.</h3>
            <p id="review-reason"></p>
            <p>
              A quick conversation can establish the right scope. You can also
              email your website URL and context to{' '}
              <a href="mailto:hello@novren.co">hello@novren.co</a>.
            </p>
            <BookCallLink />
          </section>
        </section>
        <aside className="signup-aside">
          <p className="eyebrow">One focused plan</p>
          <h2>
            WordPress care,
            <br />
            without the extra steps.
          </h2>
          <ul className="check-list">
            <li>Managed core, plugin, and theme updates</li>
            <li>Daily offsite backups · 90-day history</li>
            <li>Daily security scanning</li>
            <li>Uptime and SSL monitoring</li>
            <li>Maintenance support and a monthly report</li>
            <li>Five small human edits per month</li>
          </ul>
          <p>
            Hosting, licenses, redesigns, migrations, and larger projects are
            separate.
          </p>
          <a className="text-link" href="/service">
            Read the full scope →
          </a>
          <div className="optional-call">
            <h3>Have questions?</h3>
            <p>A call is available if you want one.</p>
            <BookCallLink className="text-link" />
          </div>
        </aside>
      </div>
    </>
  );
}
