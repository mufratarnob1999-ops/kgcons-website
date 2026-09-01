import { Suspense } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { VerifyForm } from "@/components/forms/VerifyForm";

export const metadata = pageMetadata({
  title: "Verify your email",
  description: "Enter the verification code sent to your email.",
  path: "/account/verify",
  noIndex: true,
});

export default function VerifyPage() {
  return (
    <Section space="generous" width="narrow">
      <Reveal>
        <Heading as="h1" size="title">
          Verify your email
        </Heading>
        <p className="measure mt-4 text-lead text-muted">
          We sent a 6-digit code to your email. Enter it below to finish
          creating your account.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <VerifyForm />
          </Suspense>
        </div>
      </Reveal>
    </Section>
  );
}
