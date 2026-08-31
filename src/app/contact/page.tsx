import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/content/site";
import { SocialIcons } from "@/components/layout/SocialIcons";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Every way to reach Kishoreganj Consultancy — email, phone, WhatsApp and Telegram, in the US and in Bangladesh.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section space="compact">
        <Reveal>
          <Heading as="h1" size="title">
            Get in touch
          </Heading>
          <p className="measure mt-5 text-lead text-muted">
            Email, phone, WhatsApp or Telegram — whichever is easiest for
            you. A real person reads every one of these.
          </p>
        </Reveal>
      </Section>

      <Section space="default" divided>
        <ul className="grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <Reveal>
              <Heading as="h2" size="subheading">
                Email
              </Heading>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-3 block text-body text-ink underline-offset-4 hover:text-accent hover:underline"
              >
                {site.contact.email}
              </a>
            </Reveal>
          </li>

          {site.contact.phones.map((phone, i) => (
            <li key={phone.region}>
              <Reveal delay={(i + 1) * 80}>
                <Heading as="h2" size="subheading">
                  {phone.region}
                </Heading>
                <a
                  href={`tel:${phone.tel}`}
                  className="mt-3 block text-body text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  {phone.display}
                </a>
                <a
                  href={whatsappLink(phone.whatsapp)}
                  className="mt-1 block text-small text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  WhatsApp
                </a>
              </Reveal>
            </li>
          ))}

          <li>
            <Reveal delay={(site.contact.phones.length + 1) * 80}>
              <Heading as="h2" size="subheading">
                Telegram
              </Heading>
              <a
                href={site.contact.telegram.href}
                className="mt-3 block text-body text-ink underline-offset-4 hover:text-accent hover:underline"
              >
                {site.contact.telegram.handle}
              </a>
            </Reveal>
          </li>
        </ul>
      </Section>

      <Section space="default" tone="surface" divided width="narrow">
        <Reveal>
          <Heading as="h2" size="heading">
            Five languages
          </Heading>
          <p className="measure mt-5 text-body text-muted">
            We work in English, Bangla, Hindi, Urdu and Spanish — reach out
            in whichever you're most comfortable with.
          </p>
        </Reveal>
      </Section>

      <Section space="default" divided>
        <Reveal>
          <Heading as="h2" size="heading">
            Social
          </Heading>
          <p className="measure mt-4 text-body text-muted">
            Facebook, Instagram and TikTok — where our live sessions happen.
          </p>
          <SocialIcons className="mt-8" />
        </Reveal>
      </Section>
    </>
  );
}
