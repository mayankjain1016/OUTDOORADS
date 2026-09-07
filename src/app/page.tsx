import { Hero } from "@/components/sections/home/Hero";
import { MediaMarquee } from "@/components/sections/home/MediaMarquee";
import { LogoWall } from "@/components/sections/home/LogoWall";
import { BentoReach } from "@/components/sections/home/BentoReach";
import { FeaturedMedia } from "@/components/sections/home/FeaturedMedia";
import { InteractiveIndustries } from "@/components/sections/home/InteractiveIndustries";
import { Process } from "@/components/sections/home/Process";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CTA } from "@/components/sections/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MediaMarquee />
      <LogoWall />
      <BentoReach />
      <FeaturedMedia />
      <InteractiveIndustries />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
