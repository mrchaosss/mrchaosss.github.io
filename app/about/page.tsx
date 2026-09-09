import type { Metadata } from 'next';
import { BookCallLink } from '@/components/book-call-link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'About',
  description: 'Novren is a focused reputation-management partner for established local businesses.',
  alternates: { canonical: '/about' },
};
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="subpage-hero about-hero">
        <p className="eyebrow">About Novren</p>
        <h1>A narrower kind of marketing partner.</h1>
        <p>
          Novren exists to own one important operating system for local businesses: the work
          that keeps reviews, responses, listings, and Google profile activity moving.
        </p>
        <BookCallLink className="button button-primary" />
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <div>
          <p className="eyebrow">Why we exist</p>
          <h2 id="about-story-title">Good service deserves a reputation that stays current.</h2>
        </div>
        <div>
          <p>
            Most local businesses do not ignore reputation work because it is unimportant.
            They ignore it because customers, crews, schedules, and day-to-day problems always arrive first.
          </p>
          <p>
            Novren turns that scattered work into one managed monthly program. The scope is
            deliberately focused, the responsibilities are clear, and the reporting shows what actually happened.
          </p>
        </div>
      </section>

      <section className="principles-section" aria-labelledby="principles-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">How we work</p>
          <h2 id="principles-title">Straightforward on purpose.</h2>
        </div>
        <div className="principle-grid">
          <article>
            <h3>One accountable scope</h3>
            <p>We focus on reputation management instead of presenting ourselves as a full-service agency that does everything.</p>
          </article>
          <article>
            <h3>Real customer feedback</h3>
            <p>Requests are for honest experiences. No purchased reviews, positive-only screening, or manufactured praise.</p>
          </article>
          <article>
            <h3>Human judgment where it matters</h3>
            <p>Tools can assist the work, but responses and sensitive situations still require review, context, and care.</p>
          </article>
          <article>
            <h3>Evidence over promises</h3>
            <p>Monthly reporting covers completed work and useful measures without guaranteeing a rating, ranking, lead count, or revenue result.</p>
          </article>
        </div>
      </section>

      <section className="fit-detail" aria-labelledby="fit-detail-title">
        <div>
          <p className="eyebrow">A good fit</p>
          <h2 id="fit-detail-title">Built for established, review-dependent local businesses.</h2>
        </div>
        <ul>
          <li>You serve a defined local market.</li>
          <li>You have genuine customer activity every month.</li>
          <li>You maintain at least one active Google Business Profile.</li>
          <li>Your team can identify honest moments to request feedback.</li>
          <li>You want the work managed, not another platform to learn.</li>
        </ul>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Start with a conversation</p>
        <h2>Tell us what keeps slipping through the cracks.</h2>
        <p>We’ll help you decide whether a managed reputation program makes sense for the way your business operates.</p>
        <BookCallLink className="button button-light" />
      </section>
      <SiteFooter />
    </main>
  );
}
