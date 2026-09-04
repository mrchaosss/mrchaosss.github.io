import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://novren.co'),
  title: {
    default: 'Novren | Managed reputation for local businesses',
    template: '%s | Novren',
  },
  description:
    'Novren helps established local businesses request honest reviews, manage responses, keep listings accurate, and stay active on Google.',
  openGraph: {
    type: 'website',
    url: 'https://novren.co',
    siteName: 'Novren',
    title: 'Novren | Managed reputation for local businesses',
    description:
      'Honest review requests, thoughtful responses, accurate listings, and consistent Google profile management.',
  },
  twitter: {
    card: 'summary',
    title: 'Novren | Managed reputation for local businesses',
    description:
      'Honest review requests, thoughtful responses, accurate listings, and consistent Google profile management.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
