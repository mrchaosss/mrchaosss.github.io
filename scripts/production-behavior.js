(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const menu = $('menu-toggle');
  const closeMenu = () => {
    if (!menu) return;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    $('mobile-nav').hidden = true;
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('mobile-nav').hidden = !open;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  $('mobile-nav')?.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });
  $('faq-search')?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    let visible = 0;
    document.querySelectorAll('#faq-results details').forEach((item) => {
      item.hidden = !item.textContent.toLowerCase().includes(term);
      if (!item.hidden) visible++;
    });
    $('faq-empty').hidden = visible > 0;
  });
  const status = (el, message, error = false) => {
    el.replaceChildren();
    el.className = 'form-status notice' + (error ? ' error' : '');
    el.textContent = message;
    el.focus?.();
  };
  async function api(path, data) {
    const r = await fetch(path, {
      method: data === undefined ? 'GET' : 'POST',
      headers: data === undefined ? {} : { 'Content-Type': 'application/json' },
      body: data === undefined ? undefined : JSON.stringify(data),
      credentials: 'same-origin',
      cache: 'no-store',
    });
    const result = await r.json();
    if (!r.ok)
      throw new Error(
        result.error ||
          'We couldn’t complete that step. Please try again or email hello@novren.co.',
      );
    return result;
  }
  const lock = (form, busy) => {
    const b = form.querySelector('[type=submit]');
    b.disabled = busy;
    b.setAttribute('aria-busy', String(busy));
  };
  const fit = $('fit-form');
  fit?.addEventListener('change', (e) => {
    if (e.target.name !== 'complexity') return;
    const checked = e.target.checked;
    if (!checked) return;
    fit.querySelectorAll('[name=complexity]').forEach((box) => {
      if (
        (e.target.value === 'none' && box !== e.target) ||
        (e.target.value !== 'none' && box.value === 'none')
      )
        box.checked = false;
    });
  });
  fit?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const out = $('fit-status');
    const data = Object.fromEntries(new FormData(fit));
    data.complexity = new FormData(fit).getAll('complexity');
    lock(fit, true);
    status(out, 'Checking your answers…');
    try {
      const result = await api('/api/checkout', data);
      if (result.url) {
        window.location.assign(result.url);
        return;
      }
      status(out, result.message);
      for (const [label, to] of [
        ['Book an optional call', '/book-a-call'],
        ['Ask by email', 'mailto:hello@novren.co'],
      ]) {
        const a = document.createElement('a');
        a.href = to;
        a.className = 'button button-secondary';
        a.textContent = label;
        out.append(document.createElement('br'), a);
      }
    } catch (err) {
      status(out, err.message, true);
    } finally {
      lock(fit, false);
    }
  });
  const resume = $('resume-form');
  resume?.addEventListener('submit', async (e) => {
    e.preventDefault();
    lock(resume, true);
    const out = resume.querySelector('.form-status');
    try {
      await api('/api/resume', Object.fromEntries(new FormData(resume)));
      status(
        out,
        'If this email matches a paid signup, a link will arrive shortly. It expires in 20 minutes. Check spam, or contact hello@novren.co if you need help.',
      );
    } catch (err) {
      status(out, err.message, true);
    } finally {
      lock(resume, false);
    }
  });
  const onboarding = $('onboarding-form');
  let pollCount = 0;
  async function loadOnboarding() {
    try {
      const fragment = new URLSearchParams(location.hash.slice(1));
      const token = fragment.get('resume');
      if (token) {
        history.replaceState(null, '', location.pathname);
        await api('/api/resume/verify', { token });
      }
      const s = await api('/api/status');
      $('onboarding-loading').hidden = true;
      for (const id of [
        'onboarding-locked',
        'onboarding-pending',
        'onboarding-payment-review',
        'onboarding-complete',
        'onboarding-form',
      ])
        $(id).hidden = true;
      if (!s.authenticated) {
        $('onboarding-locked').hidden = false;
        return;
      }
      if (s.payment !== 'paid') {
        if (s.payment === 'review' || s.payment === 'failed') {
          $('onboarding-payment-review').hidden = false;
          return;
        }
        $('onboarding-pending').hidden = false;
        if (++pollCount < 20) setTimeout(loadOnboarding, 6000);
        return;
      }
      if (s.intake) {
        $('onboarding-complete').hidden = false;
        return;
      }
      onboarding.hidden = false;
      $('onboarding-site').textContent = 'Website: ' + s.website;
    } catch (err) {
      $('onboarding-loading').hidden = false;
      status($('onboarding-loading'), err.message, true);
      $('onboarding-locked').hidden = false;
    }
  }
  if (onboarding) void loadOnboarding();
  onboarding?.addEventListener('submit', async (e) => {
    e.preventDefault();
    lock(onboarding, true);
    const out = onboarding.querySelector('.form-status');
    try {
      await api(
        '/api/onboarding',
        Object.fromEntries(new FormData(onboarding)),
      );
      onboarding.reset();
      onboarding.hidden = true;
      $('onboarding-complete').hidden = false;
      $('onboarding-complete').setAttribute('tabindex', '-1');
      $('onboarding-complete').focus();
    } catch (err) {
      status(out, err.message, true);
    } finally {
      lock(onboarding, false);
    }
  });
})();
