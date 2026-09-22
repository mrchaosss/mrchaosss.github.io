// Progressive enhancement; no credentials, server submission, or browser storage.
(() => {
  const settings = __NOVREN_SETTINGS__;
  /* __NOVREN_FLOW_LOGIC__ */
  const incoming = new URLSearchParams(window.location.search);
  const campaign = new URLSearchParams();
  for (const key of settings.utmParameters) {
    const values = incoming.getAll(key);
    if (
      values.length === 1 &&
      /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/.test(values[0])
    )
      campaign.set(key, values[0]);
  }
  if (campaign.size)
    for (const link of document.querySelectorAll('a[href]')) {
      const destination = new URL(
        link.getAttribute('href'),
        window.location.href,
      );
      const internal = destination.origin === window.location.origin;
      const booking =
        link.hasAttribute('data-booking-link') &&
        destination.origin + destination.pathname === settings.bookingHref;
      if (!internal && !booking) continue;
      if (internal) destination.search = '';
      for (const [key, value] of campaign)
        destination.searchParams.set(key, value);
      link.href = internal
        ? destination.pathname + destination.search + destination.hash
        : destination.href;
    }
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) menu.open = false;
    });
  }
  const eligibility = document.getElementById('eligibility-form');
  if (eligibility) {
    const error = document.getElementById('eligibility-error');
    const eligible = document.getElementById('eligible-result');
    const review = document.getElementById('review-result');
    const reset = () => {
      error.hidden = true;
      eligible.hidden = true;
      review.hidden = true;
    };
    eligibility.addEventListener('input', reset);
    eligibility.addEventListener('change', reset);
    eligibility.addEventListener('submit', (event) => {
      event.preventDefault();
      reset();
      const result = qualifyWebsite(
        Object.fromEntries(new FormData(eligibility)),
      );
      if (result.status === 'error') {
        error.textContent = result.reason;
        error.hidden = false;
        return;
      }
      if (result.status === 'eligible') {
        document.getElementById('qualified-site').textContent = result.website;
        document.getElementById('checkout-link').href = settings.checkoutHref;
        eligible.hidden = false;
        eligible.focus();
      } else {
        document.getElementById('review-reason').textContent = result.reason;
        review.hidden = false;
        review.focus();
      }
    });
    eligibility.querySelector('fieldset').disabled = false;
  }
  const onboarding = document.getElementById('onboarding-form');
  if (onboarding) {
    const error = document.getElementById('onboarding-error');
    const result = document.getElementById('onboarding-result');
    const summary = document.getElementById('onboarding-summary');
    const status = document.getElementById('copy-status');
    const reset = () => {
      error.hidden = true;
      result.hidden = true;
      status.textContent = '';
    };
    onboarding.addEventListener('input', reset);
    onboarding.addEventListener('change', reset);
    onboarding.addEventListener('submit', (event) => {
      event.preventDefault();
      reset();
      const data = Object.fromEntries(
        Array.from(new FormData(onboarding), ([key, value]) => [
          key,
            typeof value === 'string' ? value : '',
        ]),
      );
      data.website = normalizeWebsiteUrl(data.website);
      if (!data.website) {
        error.textContent =
          'Enter a public website address without login details, query strings, or private links.';
        error.hidden = false;
        return;
      }
      if (data.adminUrl) {
        data.adminUrl = normalizeWebsiteUrl(data.adminUrl);
        if (!data.adminUrl) {
          error.textContent =
            'Use only the public WordPress login page address, without passwords or secret tokens, or leave it blank.';
          error.hidden = false;
          return;
        }
      }
      summary.value = buildOnboardingMessage(data);
      document.getElementById('onboarding-email').href =
        'mailto:' +
        settings.contactEmail +
        '?subject=' +
        encodeURIComponent('WordPress Care onboarding — ' + data.business) +
        '&body=' +
        encodeURIComponent(summary.value);
      result.hidden = false;
      result.focus();
    });
    document
      .getElementById('copy-onboarding')
      .addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(summary.value);
          status.textContent =
            'Copied. Paste into an email to ' +
            settings.contactEmail +
            ' and send it.';
        } catch {
          summary.focus();
          summary.select();
          status.textContent =
            'Select and copy the message, then email it to ' +
            settings.contactEmail +
            '.';
        }
      });
    onboarding.querySelector('fieldset').disabled = false;
  }
})();
