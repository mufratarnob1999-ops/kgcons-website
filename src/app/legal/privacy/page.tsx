/* Reviewed by a US attorney — 2026-09-01. */

import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How Kishoreganj Consultancy LLC handles your data.",
  path: "/legal/privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <Section space="default">
      <Reveal>
        <Heading as="h1" size="title">
          Privacy policy
        </Heading>
        <p className="measure mt-5 text-lead text-muted">
          Last updated {site.founded}. This policy is written by Kishoreganj
          Consultancy LLC (Wyoming, USA), the contracting entity for
          kgcons.org, for both Kishoreganj Consultancy LLC and Kishoreganj
          Consultancy Ltd (Bangladesh).
        </p>
      </Reveal>

      <div className="measure mt-14 space-y-10 border-t border-hairline pt-10 text-body text-muted">
        <Reveal delay={0}>
          <Heading as="h2" size="subheading" className="text-ink">
            What we collect
          </Heading>
          <p className="mt-3">
            When you contact us or book a consultation, we collect the
            details you give us directly — your name, email, phone number
            and whatever you tell us about what you need. If you pay for a
            service, our payment processor handles your payment details; we
            don't see or store your card or bank information ourselves.
          </p>
          <p className="mt-3">
            We don't run analytics or tracking software on this site. If
            that changes, we'll update this policy first.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <Heading as="h2" size="subheading" className="text-ink">
            How we use it
          </Heading>
          <p className="mt-3">
            We use your information to respond to you, deliver the
            consultation or engagement you booked, and handle payment. We
            don't use your data for our own marketing or content, and we
            don't sell or share it with third parties.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Heading as="h2" size="subheading" className="text-ink">
            How long we keep it
          </Heading>
          <p className="mt-3">
            We don't retain client data for longer than six months after an
            engagement ends, unless we're required to keep it longer for a
            legal or tax reason.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <Heading as="h2" size="subheading" className="text-ink">
            Using your project as a reference
          </Heading>
          <p className="mt-3">
            With your written consent, we may use a selected project as an
            internal benchmark or future reference. Unless you agree
            otherwise, anything we use this way is anonymised — your name
            and identifying details are removed. We won't do this without
            asking first.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <Heading as="h2" size="subheading" className="text-ink">
            Contact
          </Heading>
          <p className="mt-3">
            Questions about this policy or your data can be sent to{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
