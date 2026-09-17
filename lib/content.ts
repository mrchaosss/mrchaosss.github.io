import { siteConfig as c } from './site-config';
export const services = [
  {
    id: 'updates',
    title: 'Updates, with a check after.',
    label: 'AUTOMATIC UPDATES',
    icon: 'updates',
    copy: 'WordPress, plugin, and theme updates with visual checks and a restore point before each update run.',
    detail:
      'Updates run on a schedule confirmed during onboarding. Key pages are compared before and after updates. Visual checks do not test every function. Updates that need a valid license or a different server environment may need your action first.',
  },
  {
    id: 'backups',
    title: 'A backup to come back to.',
    label: 'DAILY OFF-SITE BACKUPS',
    icon: 'backups',
    copy: `Daily backups of your WordPress files and database, stored off-site with ${c.backupHistoryDays} days of history.`,
    detail:
      'Backup history builds from the time care is connected; it does not include earlier versions of your site. A backup provides a restore option, not a guarantee that every change or transaction can be recovered.',
  },
  {
    id: 'security',
    title: 'Checks for unwanted changes.',
    label: 'DAILY SECURITY SCANS',
    icon: 'security',
    copy: 'Daily security scanning, with malware cleanup when malware is found.',
    detail:
      'Supported issues can be cleaned automatically; other findings require review. Scanning and cleanup are care activities. They do not guarantee that a website will never be compromised. Your hosting, access practices, and licensed software remain important.',
  },
  {
    id: 'monitoring',
    title: 'Keep an eye on availability.',
    label: 'UPTIME + SSL MONITORING',
    icon: 'monitoring',
    copy: 'Uptime and SSL monitoring to flag availability and certificate issues.',
    detail:
      'Monitoring identifies issues; it does not prevent outages or replace your hosting provider. A monitoring alert is not a guaranteed response or resolution time.',
  },
  {
    id: 'edits',
    title: 'The small changes, handled.',
    label: `UP TO ${c.humanEditsPerMonth} HUMAN EDITS / MONTH`,
    icon: 'edits',
    copy: `Small website changes completed by a real person, typically about ${c.smallEditMinutes} minutes or less per edit.`,
    detail:
      'You supply the final text, images, and instructions. Novren checks whether a request fits before work begins. The allowance is for qualifying individual edits, not a pooled development project.',
  },
  {
    id: 'support',
    title: 'A person to ask. A record of care.',
    label: 'SUPPORT + MONTHLY REPORT',
    icon: 'support',
    copy: 'Real-person website-care support and a monthly care report. Novren remains your point of contact.',
    detail:
      'The report records maintenance and monitoring activity. Email Novren with care questions or small-edit requests. Timing depends on the request and any access or approvals needed; no round-the-clock support or response deadline is promised.',
  },
] as const;
export const faqs = [
  {
    q: 'Does my website need to be on WordPress?',
    a: 'Yes. This plan is for one qualifying WordPress website. Sites built on other platforms are outside the plan. If you are unsure what your site uses, bring its URL to the fit call.',
  },
  {
    q: 'What counts as a small edit?',
    a: `A task typically requiring about ${c.smallEditMinutes} minutes or less, using content you supply. Examples include changing business hours, replacing an image, or adding a team member to an existing page. The plan includes up to ${c.humanEditsPerMonth} qualifying human edits per month.`,
  },
  {
    q: 'What if my site needs more work?',
    a: 'A redesign, a new page, custom development, or substantial repair is outside the monthly plan. We explain the scope boundary before work begins. Separate work is only considered when Novren has an approved way to fulfill it; availability is not guaranteed.',
  },
  {
    q: 'Will I need to change my hosting?',
    a: 'Hosting is not included. We review your existing setup during qualification and confirm whether it can support the care plan. Keep your hosting, domain, business email, and required software licenses active.',
  },
  {
    q: 'How do I ask for help?',
    a: 'Email Novren with the page URL, a description of the issue or requested change, and any supplied content. We check the scope and ask for context or approval where needed. Do not email passwords or sensitive customer information.',
  },
  {
    q: 'Do you guarantee security or uptime?',
    a: 'No. Updates, backups, scanning, and monitoring support ongoing care, but they cannot guarantee security, uninterrupted availability, or a particular business result.',
  },
  {
    q: 'What are the billing and cancellation terms?',
    a: 'The offer is monthly care plus one-time onboarding. Billing, cancellation, responsibilities, and any other service terms are set out in a separately signed service agreement before enrollment. Booking a fit call does not enroll you.',
  },
] as const;
