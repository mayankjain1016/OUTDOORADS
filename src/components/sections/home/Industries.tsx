"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Car, Building2, Gem, Smartphone, ShoppingCart, Clapperboard, Briefcase, Activity, Plane } from "lucide-react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const getIndustryIcon = (name: string) => {
  switch (name) {
    case "Automotive": return <Car className="h-8 w-8" />;
    case "Real Estate": return <Building2 className="h-8 w-8" />;
    case "Jewelry": return <Gem className="h-8 w-8" />;
    case "Technology": return <Smartphone className="h-8 w-8" />;
    case "FMCG": return <ShoppingCart className="h-8 w-8" />;
    case "Entertainment": return <Clapperboard className="h-8 w-8" />;
    case "Finance": return <Briefcase className="h-8 w-8" />;
    case "Healthcare": return <Activity className="h-8 w-8" />;
    default: return <Plane className="h-8 w-8" />;
  }
};

export function Industries() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <SectionHeading 
          title="Industries We Dominate" 
          subtitle="Our tailored outdoor media solutions deliver high-impact results and unrivaled visibility across all major sectors."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-24">
          {INDUSTRIES.map((industry, i) => (
            <Link key={industry.id} href={`/gallery?industry=${industry.name}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative flex flex-col items-center justify-center py-8 px-4 md:p-12 bg-white rounded-sm shadow-sm hover:shadow-premium-hover transition-all duration-500 hover:-translate-y-2 border border-border cursor-pointer overflow-hidden h-full ease-premium"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-brand-navy translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-premium" />

                <div className="relative z-10 text-brand-navy/50 group-hover:text-brand-orange transition-all duration-500 mb-4 md:mb-6 group-hover:scale-110 ease-premium">
                  {getIndustryIcon(industry.name)}
                </div>
                
                <h4 className="relative z-10 font-bold text-sm sm:text-base md:text-lg text-brand-navy group-hover:text-white transition-colors duration-300 text-center tracking-tight">
                  {industry.name}
                </h4>
                
                <div className="relative z-10 mt-3 md:mt-5 opacity-0 group-hover:opacity-100 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden md:flex items-center text-brand-orange text-xs font-bold uppercase tracking-widest">
                  View Gallery <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
