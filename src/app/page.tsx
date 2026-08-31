import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { ServicesSummary } from "@/components/sections/ServicesSummary";
import { MethodSummary } from "@/components/sections/MethodSummary";
import { Perspective } from "@/components/sections/Perspective";
import { HowToWorkWithUs } from "@/components/sections/HowToWorkWithUs";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <ServicesSummary />
      <MethodSummary />
      <Perspective />
      <HowToWorkWithUs />
      <Faq />
      <FinalCta />
    </>
  );
}
