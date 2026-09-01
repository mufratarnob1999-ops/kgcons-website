import { Suspense } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata = pageMetadata({
  title: "Log in",
  description: "Log in to book or manage your consultation appointments.",
  path: "/account/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Section space="generous" width="narrow">
      <Reveal>
        <Heading as="h1" size="title">
          Log in
        </Heading>
        <p className="measure mt-4 text-lead text-muted">
          Sign in to book or manage your consultation appointments.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-small text-muted">
          Don&rsquo;t have an account?{" "}
          <Link
            href="/account/signup"
            className="text-ink underline-offset-4 hover:text-accent hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
