import type { ReactNode } from 'react';
import { siteConfig } from '@/lib/site-config';

type BookCallLinkProps = {
  className?: string;
  children?: ReactNode;
};

export function BookCallLink({ className, children = 'Book a call' }: BookCallLinkProps) {
  return (
    <a className={className} href={siteConfig.bookingHref} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
