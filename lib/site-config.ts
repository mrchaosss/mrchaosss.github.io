// Owner-supplied offer; consult docs/site-claims.md before changing scope.
export const siteConfig = {
  name: 'Novren',
  siteUrl: 'https://novren.co',
  planName: 'Novren Website Care',
  monthlyPrice: 299,
  onboardingFee: 199,
  currency: 'USD',
  siteLimit: 1,
  humanEditsPerMonth: 5,
  smallEditMinutes: 30,
  fitCallMinutes: 20,
  backupHistoryDays: 90,
  bookingHref: 'https://cal.com/gabe-glenn-9zwzc2/strategy-call',
  contactEmail: 'hello@novren.co',
  portal: { visible: false, href: 'https://app.novren.co' },
  updatedDate: '2026-09-17',
  updatedLabel: 'September 17, 2026',
  utmParameters: [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ],
  goodFit: [
    'One existing WordPress website for a local service business.',
    'A reasonably functional site needing routine care and small content updates.',
    'You can provide access, licensed plugins, content, and timely approvals.',
  ],
  manualApproval: [
    'WooCommerce or membership websites',
    'WordPress multisite networks',
    'Heavily custom applications or fragile legacy sites',
    'Regulated or high-risk systems',
  ],
  exclusions: [
    'Redesigns, entire new pages, or new website builds',
    'Custom software or plugin development',
    'Copywriting or original content production',
    'Hosting, domains, business email, or premium-plugin licenses',
    'Large migrations or major performance reconstruction',
    'Requests beyond the small-edit definition',
  ],
} as const;
export const money = (value: number) => '$' + value;
export const offerLine = `${money(siteConfig.monthlyPrice)}/month + ${money(siteConfig.onboardingFee)} one-time onboarding`;
