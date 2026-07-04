"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Car, Building2, Gem, Smartphone, ShoppingCart, Clapperboard, Briefcase, Plane } from "lucide-react";

const getIndustryIcon = (name: string) => {
  switch (name) {
    case "Automotive": return <Car className="h-6 w-6" />;
    case "Real Estate": return <Building2 className="h-6 w-6" />;
    case "Jewelry": return <Gem className="h-6 w-6" />;
    case "Technology": return <Smartphone className="h-6 w-6" />;
    case "FMCG": return <ShoppingCart className="h-6 w-6" />;
    case "Entertainment": return <Clapperboard className="h-6 w-6" />;
    case "Finance": return <Briefcase className="h-6 w-6" />;
    default: return <Plane className="h-6 w-6" />;
  }
};

export function Industries() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="Industries We Dominate" 
          subtitle="Our tailored outdoor media solutions deliver high-impact results and unrivaled visibility across all major sectors."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-20 border-l border-t border-zinc-200">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group flex flex-col items-center justify-center p-12 bg-white border-r border-b border-zinc-200 hover:bg-zinc-50 transition-colors cursor-default"
            >
              <div className="text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300 mb-6">
                {getIndustryIcon(industry.name)}
              </div>
              <h4 className="font-heading font-semibold text-sm text-zinc-900 text-center tracking-wide">
                {industry.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
