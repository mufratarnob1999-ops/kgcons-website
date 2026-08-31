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
  title: "Terms of service",
  description: "The terms that apply when you work with Kishoreganj Consultancy.",
  path: "/legal/terms",
  noIndex: false,
});

export default function TermsPage() {
  return (
    <Section space="default">
      <Heading as="h1" size="title">
        Terms of service
      </Heading>
      <p className="measure mt-5 text-lead text-muted">
        Last updated {site.founded}. These terms are between you and
        Kishoreganj Consultancy LLC (Wyoming, USA), the contracting entity
        for kgcons.org.
      </p>

      <div className="measure mt-14 space-y-10 border-t border-hairline pt-10 text-body text-muted">
        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            What we provide
          </Heading>
          <p className="mt-3">
            Our services are advisory. We give you strategy, direction and
            guidance — you or your team decide what to act on and carry it
            out. We don't manage, post to, or take control of your accounts.
          </p>
        </div>

        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            No guaranteed outcomes
          </Heading>
          <p className="mt-3">
            We don't guarantee specific results on any platform — followers,
            views, engagement or sales. Platform algorithms, your market and
            your own execution are outside our control. What we do
            guarantee is scope of work: {guarantee.short}
          </p>
        </div>

        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            Fees
          </Heading>
          <p className="mt-3">
            Fees are agreed before work starts. For consultation calls and
            ongoing engagements, this means a quote before you book. For
            live-session answers, this means a price quoted on the spot
            before we begin work on your question.
          </p>
        </div>

        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            Governing law
          </Heading>
          <p className="mt-3">
            These terms are governed by the laws of the State of Wyoming,
            USA, without regard to conflict-of-law principles.
          </p>
        </div>

        <div>
          <Heading as="h2" size="subheading" className="text-ink">
            Contact
          </Heading>
          <p className="mt-3">
            Questions about these terms can be sent to{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
