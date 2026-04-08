import { Features } from "@/components/Features";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhoItsFor } from "@/components/WhoItsFor";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <HowItWorks />
      <Features />
      <WhoItsFor />
      <FinalCta />
    </main>
  );
}
