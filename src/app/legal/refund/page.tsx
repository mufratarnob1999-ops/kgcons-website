/*
  TODO(owner): This is a draft prepared without legal review. The company
  operates two entities across two jurisdictions and handles personal data.
  Have a US attorney review before launch.
*/

import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { guarantee } from "@/content/guarantee";

export const metadata = pageMetadata({
  title: "Refund policy",
  description: "Our guarantee, and how to request a refund.",
  path: "/legal/refund",
  noIndex: false,
});

export default function RefundPage() {
  return (
    <Section space="default">
      <Heading as="h1" size="title">
        Refund policy
      </Heading>
      <p className="measure mt-5 text-lead text-muted">
        Last updated {site.founded}. This policy applies to work delivered
        by Kishoreganj Consultancy LLC (Wyoming, USA).
      </p>

      <div className="measure mt-14 space-y-10 border-t border-hairline pt-10 text-body text-muted">
        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            {guarantee.heading}
          </Heading>
          <p className="mt-3">
            {guarantee.short} {guarantee.detail}
          </p>
        </div>

        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            Timeframe
          </Heading>
          <p className="mt-3">
            You have 30 days from the date the work is delivered to tell us
            it didn't match what we agreed. After 30 days, we're not able to
            offer a refund.
          </p>
        </div>

        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            How to request a refund
          </Heading>
          <p className="mt-3">
            Email{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {site.contact.email}
            </a>{" "}
            with what was agreed and what was delivered. We'll review it and
            get back to you.
          </p>
        </div>
      </div>
    </Section>
  );
}
