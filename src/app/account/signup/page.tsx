import { Suspense } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { SignupForm } from "@/components/forms/SignupForm";

export const metadata = pageMetadata({
  title: "Create an account",
  description: "Create an account to book and manage consultation appointments.",
  path: "/account/signup",
  noIndex: true,
});

export default function SignupPage() {
  return (
    <Section space="generous" width="narrow">
      <Reveal>
        <Heading as="h1" size="title">
          Create an account
        </Heading>
        <p className="measure mt-4 text-lead text-muted">
          You&rsquo;ll need an account to book a consultation and manage
          your appointments.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <SignupForm />
          </Suspense>
        </div>
        <p className="mt-6 text-small text-muted">
          Already have an account?{" "}
          <Link
            href="/account/login"
            className="text-ink underline-offset-4 hover:text-accent hover:underline"
          >
            Log in
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
