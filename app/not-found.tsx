import { BookCallLink } from '@/components/book-call-link';
export default function NotFound() {
  return (
    <section className="container error-page">
      <p className="eyebrow">404 / Page not found</p>
      <h1>Let’s get you back on track.</h1>
      <p>
        This address does not match a page on the Novren website. You can head
        home, read the care plan, or get started online.
      </p>
      <div className="error-actions">
        <a className="button button-primary" href="/">
          Back to the homepage
        </a>
        <a className="text-link" href="/service">
          See Website Care
        </a>
        <BookCallLink className="text-link" />
      </div>
    </section>
  );
}
