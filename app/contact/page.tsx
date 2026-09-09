import type { Metadata } from 'next';
import { BookCallLink } from '@/components/book-call-link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Book an introductory call with Novren about managed online reputation for your local business.',
  alternates: { canonical: '/contact' },
};
export const dynamic = 'force-static';

export default function ContactPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="contact-page">
        <div className="contact-intro">
          <p className="eyebrow">Book a call</p>
          <h1>Let’s see if the fit is right.</h1>
          <p>A short introductory call is enough to understand your locations, current review process, and what you want taken off your team’s plate.</p>
        </div>
        <div className="contact-card">
          <p className="card-kicker">Scheduling</p>
          <h2>Choose a time that works.</h2>
          <p>Open the calendar, choose an available time, and add a few details about your business so the conversation can start in the right place.</p>
          <BookCallLink className="button button-primary">View available times</BookCallLink>
          <dl>
            <div><dt>Email</dt><dd><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></dd></div>
            <div><dt>Phone</dt><dd>{siteConfig.contactPhone}</dd></div>
            <div><dt>Service area</dt><dd>{siteConfig.serviceArea}</dd></div>
          </dl>
        </div>
      </section>
      <section className="call-prep">
        <p className="eyebrow">Helpful before the call</p>
        <h2>Four details give us a useful starting point.</h2>
        <ul>
          <li>Your business name and primary city</li>
          <li>The number of locations you manage</li>
          <li>Your current Google Business Profile</li>
          <li>The reputation task that causes the most friction</li>
        </ul>
      </section>
      <SiteFooter />
    </main>
  );
}
