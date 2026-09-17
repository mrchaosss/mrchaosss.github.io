// Progressive enhancement only. All navigation and FAQ controls work without JS.
(() => {
  const settings = __NOVREN_SETTINGS__;
  const incoming = new URLSearchParams(window.location.search);
  const campaign = new URLSearchParams();
  for (const key of settings.utmParameters) {
    const values = incoming.getAll(key);
    // Campaign slugs only: reject duplicates, PII-like punctuation, and long values.
    if (
      values.length === 1 &&
      /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/.test(values[0])
    )
      campaign.set(key, values[0]);
  }
  if (campaign.size) {
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
})();

