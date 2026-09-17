import type { Metadata } from 'next';
import { siteConfig as c } from './site-config';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  noindex = false,
): Metadata {
  const url = c.siteUrl + path;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: !noindex, follow: true },
    openGraph: {
      type: 'website',
      siteName: c.name,
      title,
      description,
      url,
      images: [
        {
          url: c.siteUrl + '/social-card.png',
          width: 1200,
          height: 630,
          alt: 'Novren Website Care — managed WordPress care for local service businesses',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [c.siteUrl + '/social-card.png'],
    },
  };
}
