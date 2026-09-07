"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { MEDIA_INVENTORY } from "@/data";

export function MediaMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create a smooth parallax scrolling effect tied to window scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x1 = useTransform(smoothProgress, [0, 1], [0, -1000]);
  const x2 = useTransform(smoothProgress, [0, 1], [-1000, 0]);

  // Extract high-quality images from inventory
  const marqueeImagesRow1 = MEDIA_INVENTORY.slice(0, 8).map(m => m.imageUrl);
  const marqueeImagesRow2 = MEDIA_INVENTORY.slice(8, 16).map(m => m.imageUrl);

  // Duplicate arrays for infinite loop effect
  const row1 = [...marqueeImagesRow1, ...marqueeImagesRow1, ...marqueeImagesRow1];
  const row2 = [...marqueeImagesRow2, ...marqueeImagesRow2, ...marqueeImagesRow2];

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 bg-white overflow-hidden border-t border-brand-navy/5"
    >
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

      <div className="mb-12 text-center relative z-20 px-6">
        <h2 className="text-3xl md:text-5xl font-black font-heading text-brand-navy tracking-tight mb-4">
          Dominating The <span className="text-brand-orange">Skyline.</span>
        </h2>
        <p className="text-lg text-brand-navy/60 font-medium max-w-2xl mx-auto">
          A glimpse of our premium inventory capturing millions of impressions daily across top national corridors.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-[300vw] sm:w-[200vw] relative left-[-50vw] sm:left-[-25vw]">
        {/* Row 1 (Moves Left) */}
        <motion.div 
          style={{ x: x1 }}
          className="flex flex-row gap-6 items-center"
        >
          {row1.map((src, idx) => (
            <div 
              key={`r1-${idx}`}
              className="relative w-[280px] h-[160px] md:w-[400px] md:h-[220px] rounded-sm overflow-hidden shrink-0 shadow-lg border border-brand-navy/10 group"
            >
              <Image
                src={src}
                alt="Billboard Display"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 400px"
              />
              <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </motion.div>

        {/* Row 2 (Moves Right) */}
        <motion.div 
          style={{ x: x2 }}
          className="flex flex-row gap-6 items-center"
        >
          {row2.map((src, idx) => (
            <div 
              key={`r2-${idx}`}
              className="relative w-[320px] h-[180px] md:w-[450px] md:h-[250px] rounded-sm overflow-hidden shrink-0 shadow-lg border border-brand-navy/10 group"
            >
              <Image
                src={src}
                alt="Billboard Display"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 320px, 450px"
              />
              <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
