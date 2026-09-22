import { siteConfig as c } from './site-config';
export const services = [
  {
    id: 'updates',
    title: 'Updates, handled with care.',
    label: 'MANAGED WORDPRESS UPDATES',
    icon: 'updates',
    copy: 'Core, plugin, and theme updates through a process that treats security fixes, routine updates, and major changes differently.',
    detail:
      'Security and minor plugin/theme updates follow nightly checks. WordPress core uses a safety delay for major releases; major plugin/theme changes wait for review. Restore points, key-page visual checks, and rollback workflows are used where supported. Visual checks do not test every feature. License or hosting issues may need your action.',
  },
  {
    id: 'backups',
    title: 'A backup to come back to.',
    label: 'DAILY OFFSITE BACKUPS',
    icon: 'backups',
    copy:
      'Daily backups of your WordPress files and database, stored offsite with ' +
      c.backupHistoryDays +
      ' days of history.',
    detail:
      'Backup history builds after your site is connected. Restores depend on available, usable backups and the condition of your site. Changes and transactions between backups may not be recoverable. This is not a guarantee that every change can be restored.',
  },
  {
    id: 'security',
    title: 'Security findings get attention.',
    label: 'DAILY SECURITY SCANNING',
    icon: 'security',
    copy: 'Daily security scans, with Novren coordinating review and remediation of flagged issues.',
    detail:
      'Flagged findings are reviewed through the maintenance support workflow. Remediation depends on the issue and supported tools; major repairs or specialist work may need separate approval and pricing. Scanning cannot prevent or detect every compromise, and automatic removal of every infection is not promised.',
  },
  {
    id: 'monitoring',
    title: 'Know when your site needs attention.',
    label: 'UPTIME + SSL MONITORING',
    icon: 'monitoring',
    copy: 'Uptime checks every five minutes, around the clock, plus daily SSL certificate checks.',
    detail:
      'Three consecutive failed uptime checks trigger a support ticket. Certificate expiry also triggers alerts. Novren receives the technical notifications and coordinates next steps. Monitoring does not prevent outages, renew certificates by itself, or guarantee a response time.',
  },
  {
    id: 'edits',
    title: 'The small changes, handled.',
    label: 'UP TO 5 HUMAN EDITS / MONTH',
    icon: 'edits',
    copy: 'Five small website or content changes each month, completed by a person using text and images you supply.',
    detail:
      'Each edit is a bounded task typically taking about 30 minutes or less: changing hours, updating team information, replacing a banner, or publishing supplied content. The allowance is not a block of development hours. We check scope before work and quote additional requests separately if available.',
  },
  {
    id: 'support',
    title: 'One contact. A clear record of care.',
    label: 'MAINTENANCE SUPPORT + REPORTING',
    icon: 'support',
    copy: 'Email Novren for maintenance help and small requests. A monthly care report records the work and monitoring activity.',
    detail:
      'Novren reviews reports before release and remains your point of contact. Maintenance questions do not use the small-edit allowance. Timing depends on the issue, access, and approvals; this plan does not include a guaranteed response time or 24/7 human emergency coverage.',
  },
] as const;
export const faqs = [
  {
    q: 'Do I have to book a call?',
    a: 'No. Use Get Started to answer a few short eligibility questions, then continue to secure checkout. Book a Call is an optional way to ask questions. Complex sites need a fit review before purchasing the standard plan.',
  },
  {
    q: 'What happens after I sign up?',
    a: 'After Stripe checkout, you go to our onboarding page. Send the non-sensitive details about your site, then Novren arranges a secure connection, checks the starting condition, and confirms when care is active. Normal onboarding is included; there is no setup fee.',
  },
  {
    q: 'What counts as a small edit?',
    a: 'A single content or website change typically taking about 30 minutes or less, using material you supply. Examples include changing hours, updating team details, replacing an image, or publishing a supplied article. Up to five qualifying human edits are included each monthly billing period.',
  },
  {
    q: 'What happens if I need more than five edits?',
    a: 'Send the request and we will explain the options before work begins. Additional edits or larger work may be quoted separately, or you can use a future monthly allowance. Unused edits do not accumulate or turn into project hours.',
  },
  {
    q: 'Is hosting included?',
    a: 'No. Keep your existing hosting, domain, email, and required premium plugin/theme licenses active. Those costs are your responsibility unless separately agreed.',
  },
  {
    q: 'Will Novren redesign my site?',
    a: 'A full redesign, new website, major page build, custom development, branding, or content production is outside this care subscription. Larger projects can be evaluated separately.',
  },
  {
    q: 'Do you support WooCommerce?',
    a: 'WooCommerce and other ecommerce or membership sites need a fit review before purchase. Their transactions and extra functionality may require a different scope. The standard checkout is for ordinary qualifying WordPress business sites.',
  },
  {
    q: 'Do I need to move hosting?',
    a: 'Normally, no. The care system connects to your existing WordPress site. We check compatibility during onboarding. Migrations and unusual infrastructure work are separate unless explicitly agreed.',
  },
  {
    q: 'What access is required?',
    a: 'We need authorization and WordPress administrator-level access or your help installing and pairing the care connector. Hosting or other access is requested only when a specific issue requires it. Do not enter passwords in website forms, checkout, booking notes, or ordinary email; Novren coordinates the secure access step.',
  },
  {
    q: 'What happens if my site goes down?',
    a: 'The system checks every five minutes. Three consecutive failed checks trigger a support ticket for Novren to review and coordinate next steps, including with your host when needed. Monitoring is not a promise of immediate human response or guaranteed recovery.',
  },
  {
    q: 'Do you guarantee uptime or security?',
    a: 'No. Updates, backups, scans, and monitoring help care for your site, but no care process can promise uninterrupted availability, complete security, or that every change or transaction can be recovered.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes. The subscription is month-to-month with no minimum term. Email hello@novren.co from your billing email before a future renewal to stop that renewal. Care normally continues through the paid period. Started billing periods are not prorated or routinely refunded; see the service terms for exceptions.',
  },
  {
    q: 'What if my website is unusually complex?',
    a: 'The eligibility check routes ecommerce, membership, multisite, custom applications, unusual infrastructure, sensitive-data workflows, and severe existing problems to a fit review before checkout. Book a call or email your site URL so we can assess the scope.',
  },
] as const;
