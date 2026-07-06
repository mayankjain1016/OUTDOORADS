import { Hero } from "@/components/sections/home/Hero";
import { Stats } from "@/components/sections/home/Stats";
import { FeaturedMedia } from "@/components/sections/home/FeaturedMedia";
import { FeaturedCities } from "@/components/sections/home/FeaturedCities";
import { Industries } from "@/components/sections/home/Industries";
import { LogoWall } from "@/components/sections/home/LogoWall";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Process } from "@/components/sections/home/Process";
import { CTA } from "@/components/sections/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoWall />
      <Stats />
      <FeaturedCities />
      <FeaturedMedia />
      <Industries />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
