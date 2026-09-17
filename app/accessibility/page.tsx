import { PageIntro } from '@/components/site-ui';
import { siteConfig as c } from '@/lib/site-config';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Accessibility Statement | Novren',
  'Novren targets WCAG 2.2 Level AA for its marketing website. Read our assessment approach and how to report an accessibility barrier.',
  '/accessibility',
);
export const dynamic = 'force-static';
export default function Accessibility() {
  return (
    <>
      <PageIntro
        eyebrow="Accessibility"
        title="A website that’s easier to use."
      >
        <p>Statement updated: {c.updatedLabel}</p>
      </PageIntro>
      <div className="container page-content">
        <div className="prose">
          <h2>Our target.</h2>
          <p>
            Novren targets{' '}
            <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2 Level AA</a> for
            this marketing website. This is a design and testing target, not a
            certification or a claim of complete legal compliance.
          </p>
          <h2>How we assess the site.</h2>
          <p>
            Our assessment combines automated Lighthouse checks with manual
            browser testing of keyboard navigation, visible focus, mobile
            layouts, zoom, and content reflow. We use semantic headings and
            landmarks, a skip link, and native keyboard-operable navigation and
            FAQ controls.
          </p>
          <h2>Known limitations.</h2>
          <p>
            Automated checks and a manual browser review cannot identify every
            accessibility barrier. The site has not received an independent
            accessibility audit or comprehensive testing with every
            assistive-technology combination. Cal.com is an external scheduling
            service with its own interface.
          </p>
          <h2>Tell us about a barrier.</h2>
          <p>
            Email <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a> with
            the page URL, what you were trying to do, and the problem
            encountered. If helpful, include your browser and assistive
            technology. Do not send sensitive personal information.
          </p>
          <p>
            If the booking page is difficult to use, email Novren to arrange the
            conversation.
          </p>
        </div>
      </div>
    </>
  );
}
