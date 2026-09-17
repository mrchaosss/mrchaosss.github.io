import type { ReactNode } from 'react';
import { siteConfig } from '@/lib/site-config';
export function BookCallLink({
  className = 'button button-primary',
  children = 'Book a website-care fit call',
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      className={className}
      href={siteConfig.bookingHref}
      data-booking-link=""
      rel="noreferrer"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
