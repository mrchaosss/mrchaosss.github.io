export class InputError extends Error {}
export function text(value: unknown, max: number, required = false): string {
  if (typeof value !== 'string') {
    if (required)
      throw new InputError('Please complete the required information.');
    return '';
  }
  const result = value.trim();
  if (
    result.length > max ||
    // Reject ASCII control characters while allowing ordinary multiline text.
    // eslint-disable-next-line no-control-regex
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(result)
  )
    throw new InputError(
      'Please shorten the information and remove unusual characters.',
    );
  if (required && !result)
    throw new InputError('Please complete the required information.');
  return result;
}
export function email(value: unknown, required = true) {
  const result = text(value, 254, required).toLowerCase();
  if (result && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(result))
    throw new InputError('Enter a valid email address.');
  return result;
}
export function website(value: unknown) {
  let raw = text(value, 300, true);
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  let u;
  try {
    u = new URL(raw);
  } catch {
    throw new InputError(
      'Enter your public website address, for example example.com.',
    );
  }
  if (
    !['http:', 'https:'].includes(u.protocol) ||
    u.username ||
    u.password ||
    u.search ||
    u.hash ||
    u.port ||
    !u.hostname.includes('.') ||
    /\s/.test(raw) ||
    /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
      u.hostname,
    ) ||
    u.hostname.endsWith('.local') ||
    u.hostname.endsWith('.internal') ||
    /^\d+\.\d+\.\d+\.\d+$/.test(u.hostname) ||
    u.hostname.includes(':')
  )
    throw new InputError(
      'Use a public website address without passwords, private links or query parameters.',
    );
  return u.origin + u.pathname.replace(/\/$/, '');
}
const complexities = new Set([
  'store',
  'members',
  'multisite',
  'custom',
  'sensitive',
  'repair',
  'unsure',
  'none',
]);
export function qualify(input: Record<string, unknown>) {
  const site = website(input.website);
  if (
    !['yes', 'no', 'unsure'].includes(String(input.platform)) ||
    !['yes', 'multiple'].includes(String(input.oneSite))
  )
    throw new InputError('Answer the WordPress and website-count questions.');
  if (
    !Array.isArray(input.complexity) ||
    !input.complexity.length ||
    input.complexity.length > 8 ||
    input.complexity.some((x) => !complexities.has(String(x))) ||
    new Set(input.complexity).size !== input.complexity.length ||
    (input.complexity.includes('none') && input.complexity.length > 1)
  )
    throw new InputError(
      'Select the features that apply, or only “None of these.”',
    );
  if (input.platform === 'no')
    return {
      kind: 'unsupported',
      website: site,
      message:
        'This plan is for an existing WordPress website. It does not include other platforms or building a new site. Contact us if you’d like to discuss your situation.',
    };
  if (
    input.platform !== 'yes' ||
    input.oneSite !== 'yes' ||
    input.complexity[0] !== 'none'
  )
    return {
      kind: 'review',
      website: site,
      message:
        'Let’s check the fit before you pay. Send your website and a short description to hello@novren.co, or book a call. We’ll confirm whether this plan is suitable.',
    };
  return { kind: 'eligible', website: site };
}
export function onboardingDetails(input: Record<string, unknown>) {
  const access = text(input.access, 20, true);
  if (!['self', 'developer', 'help'].includes(access))
    throw new InputError('Choose who can arrange WordPress connection.');
  const admin = text(input.adminUrl, 300);
  return {
    hosting: text(input.hosting, 160),
    adminUrl: admin ? website(admin) : '',
    critical: text(input.critical, 2000, true),
    issues: text(input.issues, 2000),
    licenses: text(input.licenses, 500),
    access,
    administrator: text(input.administrator, 120),
    reportEmail: email(input.reportEmail, false),
  };
}
