// Pure helpers shared by the static enhancement and its eligibility tests.
export function normalizeWebsiteUrl(value) {
  const raw = String(value || '').trim();
  if (!raw || raw.length > 200 || /\s/.test(raw)) return null;
  try {
    const url = new URL(
      /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : 'https://' + raw,
    );
    const host = url.hostname.toLowerCase();
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    )
      return null;
    if (
      !host.includes('.') ||
      host === 'localhost' ||
      /^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
      host.includes(':')
    )
      return null;
    return (
      url.origin + (url.pathname === '/' ? '' : url.pathname.replace(/\/$/, ''))
    );
  } catch {
    return null;
  }
}
export function qualifyWebsite(answers) {
  const website = normalizeWebsiteUrl(answers.website);
  if (!website)
    return {
      status: 'error',
      reason:
        'Enter a public website address, such as yourbusiness.com. Leave out login details, query strings, and private links.',
    };
  if (
    !['yes', 'no', 'unsure'].includes(answers.wordpress) ||
    !['yes', 'no'].includes(answers.oneSite) ||
    !['standard', 'review', 'unsure'].includes(answers.complexity)
  )
    return {
      status: 'error',
      reason: 'Please answer all three eligibility questions.',
    };
  if (answers.wordpress !== 'yes')
    return {
      status: 'review',
      website,
      reason:
        'This plan is for an existing WordPress website. We need to confirm your platform before you subscribe.',
    };
  if (answers.oneSite !== 'yes')
    return {
      status: 'review',
      website,
      reason:
        'The standard subscription covers one website. Let’s confirm the right arrangement for your sites before you purchase.',
    };
  if (answers.complexity !== 'standard')
    return {
      status: 'review',
      website,
      reason:
        'Your site may need a different scope. Let’s review its features and condition before you start the standard subscription.',
    };
  return { status: 'eligible', website };
}
export function buildOnboardingMessage(data) {
  return [
    'Novren WordPress Care onboarding',
    '',
    'Business: ' + data.business,
    'Primary contact: ' + data.contactName,
    'Checkout email: ' + data.email,
    'Website: ' + data.website,
    'WordPress admin URL: ' + (data.adminUrl || 'Standard /wp-admin'),
    'Hosting provider: ' + (data.hosting || 'Not provided'),
    'Known issues / critical functions: ' + (data.context || 'None provided'),
    'Premium licenses: ' + data.licenses,
    'Different report / billing contact: ' +
      (data.recipients || 'Use primary contact'),
    '',
    'Please verify my subscription and send the secure site connection steps.',
    'This message contains site details only, not passwords or secret access links.',
  ].join('\n');
}
