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
    <section className="py-16 md:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Industries We Dominate" 
          subtitle="Our tailored outdoor media solutions deliver high-impact results and unrivaled visibility across all major sectors."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-10 md:mt-20">
          {INDUSTRIES.map((industry, i) => (
            <Link key={industry.id} href={`/gallery?industry=${industry.name}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative flex flex-col items-center justify-center py-6 px-4 md:p-10 bg-white rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 cursor-pointer overflow-hidden h-full"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-slate-950 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                <div className="relative z-10 text-slate-400 group-hover:text-white transition-all duration-300 mb-3 md:mb-6 group-hover:scale-110">
                  {getIndustryIcon(industry.name)}
                </div>
                
                <h4 className="relative z-10 font-bold text-sm sm:text-base md:text-xl text-slate-900 group-hover:text-white transition-colors duration-300 text-center tracking-tight">
                  {industry.name}
                </h4>
                
                <div className="relative z-10 mt-2 md:mt-4 opacity-0 group-hover:opacity-100 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden md:flex items-center text-white text-sm font-semibold tracking-wide">
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
