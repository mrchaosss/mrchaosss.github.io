import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Novren is a focused reputation-management partner for established local businesses.',
  alternates: { canonical: '/about/' },
};
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="page-intro">
        <p className="eyebrow">About Novren</p>
        <h1>Focused by design.</h1>
        <p>
          Novren is a reputation-management partner for established local businesses
          whose next customer is likely to check reviews before making contact.
        </p>
      </section>

      <section className="manifesto-grid">
        <div>
          <p className="section-index">Why we exist</p>
          <h2>Your public reputation deserves the same care as the work behind it.</h2>
        </div>
        <div className="manifesto-copy">
          <p>
            Plenty of good businesses leave review requests, responses, listings, and
            Google profile updates to chance. Not because those things do not matter,
            but because the day-to-day work always comes first.
          </p>
          <p>
            Novren creates one accountable system for that work. The scope is narrow on
            purpose: help real customers share honest experiences, answer feedback,
            maintain accurate business information, and keep the profile current.
          </p>
        </div>
      </section>

      <section className="principles-section">
        <p className="section-index">How we work</p>
        <div className="principle-list">
          <article>
            <span>01</span>
            <h2>Earned, not manufactured.</h2>
            <p>Review requests go to real customers. We do not buy, write, or invent customer reviews.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Honest feedback stays honest.</h2>
            <p>We do not screen for positive sentiment or promise to remove legitimate criticism.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Visible work, plain reporting.</h2>
            <p>You should know what was managed, what changed, and what needs attention next.</p>
          </article>
          <article>
            <span>04</span>
            <h2>One service, managed well.</h2>
            <p>We are not a vague full-service agency. Our job is your online reputation.</p>
          </article>
        </div>
      </section>

      <section className="about-fit">
        <div>
          <p className="section-index">A good fit</p>
          <h2>Built for businesses with real customers and no consistent review system.</h2>
        </div>
        <ul className="fit-checks">
          <li>You serve a defined local market.</li>
          <li>You complete enough work to request feedback regularly.</li>
          <li>You have an active Google Business Profile.</li>
          <li>You want a managed process, not another dashboard to learn.</li>
        </ul>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Start with the facts</p>
        <h2>See what customers see when they compare you.</h2>
        <p>Send your business name and city. We’ll return a short, no-obligation reputation snapshot.</p>
        <a className="button button-light" href="mailto:hello@novren.co?subject=Free%20reputation%20snapshot">
          Request your snapshot
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
