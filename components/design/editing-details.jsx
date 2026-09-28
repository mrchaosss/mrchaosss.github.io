import React from 'react';
import { Icon, Eyebrow } from './ui.jsx';

export function EditingSection() {
  return (
    <section className="section editing-section" id="ai-and-human-edits">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Everyday changes</Eyebrow>
            <h2>
              Two ways to get
              <br />
              the small things done.
            </h2>
          </div>
          <p>
            Both allowances are included. Choose the help that suits the change.
          </p>
        </div>
        <div className="editing-options">
          <article>
            <Icon name="edit" />
            <h3>50 AI edits a month</h3>
            <p>
              Describe a small change in your client portal, then review the
              preview before publication.
            </p>
            <div className="edit-example-tags">
              <span>Business hours</span>
              <span>Phone numbers</span>
              <span>Short text changes</span>
            </div>
            <details className="edit-explainer">
              <summary>What counts as an AI edit?</summary>
              <p>
                One approved, published change counts as one edit, even across
                multiple pages. Publishing follows your portal’s approval
                permissions. Review the result carefully. Extra AI edits need
                separate agreement.
              </p>
            </details>
          </article>
          <article id="small-edits">
            <Icon name="user" />
            <h3>5 small human edits a month</h3>
            <p>
              Send the page and your finished text or image. A person handles
              the change for you.
            </p>
            <div className="edit-example-tags">
              <span>Team information</span>
              <span>Banner swaps</span>
              <span>Supplied articles</span>
            </div>
            <details className="edit-explainer">
              <summary>What counts as a human edit?</summary>
              <p>
                A clearly bounded task typically taking about 30 minutes or
                less. Provide final content. Extra requests and larger work need
                separate agreement; unused human edits do not roll over or pool
                into development hours. Maintenance questions do not use this
                allowance.
              </p>
            </details>
          </article>
        </div>
        <p className="editing-caption">
          AI is optional. The allowances are separate. Redesigns and custom
          development are scoped as project work.
        </p>
      </div>
    </section>
  );
}
