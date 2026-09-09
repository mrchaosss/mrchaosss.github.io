import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://novren.co'),
  title: {
    default: 'Novren | Managed reputation for local businesses',
    template: '%s | Novren',
  },
  description:
    'Novren manages review requests, responses, listings, Google Business Profile activity, and monthly reporting for established local businesses.',
  openGraph: {
    type: 'website',
    url: 'https://novren.co',
    siteName: 'Novren',
    title: 'Novren | Managed reputation for local businesses',
    description:
      'A managed monthly program for review requests, responses, listings, Google profile activity, and reporting.',
  },
  twitter: {
    card: 'summary',
    title: 'Novren | Managed reputation for local businesses',
    description:
      'A managed monthly program for review requests, responses, listings, Google profile activity, and reporting.',
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
