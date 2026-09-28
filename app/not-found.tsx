import { Button } from '@/components/design/ui';
export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow">
        <p className="eyebrow">404 / Page not found</p>
        <h1>Let’s get you back on track.</h1>
        <p>
          This address does not match a page on the Novren website. You can head
          home, read the care plan, or get started online.
        </p>
        <div className="button-row">
          <Button to="/">Back to the homepage</Button>
          <Button to="/care" secondary>
            See WordPress Care
          </Button>
        </div>
      </div>
    </section>
  );
}
