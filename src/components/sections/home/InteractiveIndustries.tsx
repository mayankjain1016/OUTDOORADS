"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDUSTRIES } from "@/data";
import { Car, Building2, Gem, Smartphone, ShoppingCart, Clapperboard, Briefcase, Activity, Plane, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getIndustryIcon = (name: string) => {
  switch (name) {
    case "Automotive": return <Car className="h-6 w-6 md:h-8 md:w-8" />;
    case "Real Estate": return <Building2 className="h-6 w-6 md:h-8 md:w-8" />;
    case "Jewelry": return <Gem className="h-6 w-6 md:h-8 md:w-8" />;
    case "Technology": return <Smartphone className="h-6 w-6 md:h-8 md:w-8" />;
    case "FMCG": return <ShoppingCart className="h-6 w-6 md:h-8 md:w-8" />;
    case "Entertainment": return <Clapperboard className="h-6 w-6 md:h-8 md:w-8" />;
    case "Finance": return <Briefcase className="h-6 w-6 md:h-8 md:w-8" />;
    case "Healthcare": return <Activity className="h-6 w-6 md:h-8 md:w-8" />;
    default: return <Plane className="h-6 w-6 md:h-8 md:w-8" />;
  }
};

const INDUSTRY_IMAGES: Record<string, string> = {
  "Automotive": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200",
  "Real Estate": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
  "Jewelry": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200",
  "Technology": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
  "FMCG": "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200",
  "Entertainment": "https://images.unsplash.com/photo-1540039155732-6761b54f2252?q=80&w=1200",
  "Finance": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
  "Healthcare": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200",
};

export function InteractiveIndustries() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const topIndustries = INDUSTRIES.slice(0, 5); // We take the top 5 for an elegant accordion

  return (
    <section className="py-24 bg-brand-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-brand-orange/20 bg-brand-orange/10 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-orange">Sectors We Dominate</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black font-heading tracking-tight"
            >
              Tailored Solutions For <br />
              <span className="text-brand-orange">Every Industry.</span>
            </motion.h2>
          </div>
          <Link href="/gallery">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-white/60 hover:text-brand-orange transition-colors duration-300 font-bold uppercase tracking-widest text-sm cursor-pointer"
            >
              View All Gallery <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>

        {/* Desktop Interactive Accordion */}
        <div className="hidden lg:flex w-full h-[600px] gap-4">
          {topIndustries.map((industry, index) => {
            const isActive = hoveredIndex === index;
            const bgImage = INDUSTRY_IMAGES[industry.name] || INDUSTRY_IMAGES["Automotive"];

            return (
              <motion.div
                key={industry.id}
                onMouseEnter={() => setHoveredIndex(index)}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  layout: { type: "spring", stiffness: 200, damping: 30 } 
                }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end transition-all duration-500 ease-out ${
                  isActive ? "flex-[5]" : "flex-[1]"
                } border border-white/10 group`}
              >
                <div className="absolute inset-0 bg-black">
                  <Image 
                    src={bgImage} 
                    alt={industry.name}
                    fill
                    className={`object-cover transition-transform duration-1000 ${isActive ? "scale-100 opacity-80" : "scale-110 opacity-40 grayscale"}`}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "bg-gradient-to-t from-[#081221] via-[#081221]/50 to-transparent" : "bg-[#081221]/70 group-hover:bg-[#081221]/50"}`} />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col">
                  
                  {/* INACTIVE STATE (Vertical Text) */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-end pb-8 transition-all duration-500 ${isActive ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"}`}>
                    <span 
                      style={{ writingMode: 'vertical-rl' }} 
                      className="text-white/40 font-bold uppercase tracking-widest text-sm rotate-180 mb-6 group-hover:text-brand-orange transition-colors duration-300"
                    >
                      {industry.name}
                    </span>
                    <div className="text-white/40 group-hover:text-brand-orange transition-colors duration-300">
                      {getIndustryIcon(industry.name)}
                    </div>
                  </div>

                  {/* ACTIVE STATE (Full Content) */}
                  <div className={`absolute inset-0 p-10 flex flex-col justify-end transition-all duration-700 delay-100 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"}`}>
                    <div className="max-w-lg">
                      <div className="flex items-center gap-3 text-brand-orange mb-4">
                        {getIndustryIcon(industry.name)}
                        <span className="font-bold uppercase tracking-widest text-sm">Industry Sector</span>
                      </div>
                      <h3 className="text-5xl font-black font-heading text-white mb-4 leading-tight drop-shadow-lg">
                        {industry.name}
                      </h3>
                      <p className="text-white/70 font-medium text-lg mb-8 max-w-md line-clamp-2">
                        Premium outdoor advertising strategies perfectly engineered to elevate {industry.name.toLowerCase()} brands in top markets.
                      </p>
                      
                      <Link href={`/gallery?industry=${industry.name}`}>
                        <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all duration-300 hover:scale-105 shadow-xl">
                          View Gallery <ArrowRight className="w-5 h-5" />
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet Grid (Fallback) */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-4">
          {INDUSTRIES.slice(0, 6).map((industry, index) => {
             const bgImage = INDUSTRY_IMAGES[industry.name] || INDUSTRY_IMAGES["Automotive"];
             return (
               <Link key={industry.id} href={`/gallery?industry=${industry.name}`}>
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                   className="relative h-48 rounded-xl overflow-hidden group border border-white/10"
                 >
                   <Image 
                     src={bgImage} 
                     alt={industry.name}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent group-hover:bg-brand-navy/40 transition-colors duration-500" />
                   
                   <div className="absolute bottom-0 left-0 p-6 w-full flex items-center gap-3 text-brand-orange">
                     {getIndustryIcon(industry.name)}
                     <h3 className="text-xl font-bold font-heading text-white">{industry.name}</h3>
                   </div>
                 </motion.div>
               </Link>
             );
          })}
        </div>

      </div>
    </section>
  );
}
