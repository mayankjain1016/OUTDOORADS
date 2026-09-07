"use client";

import { motion } from "framer-motion";
import { CITIES } from "@/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function FeaturedCities() {
  const topCities = CITIES.slice(0, 4);

  return (
    <section className="py-20 md:py-32 bg-brand-light">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-border">
          <SectionHeading 
            title="Dominating Markets" 
            subtitle="We hold prime media assets in the most densely populated and commercially significant cities in India."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link href="/city-showcase" className="mt-8 md:mt-0 group inline-flex items-center justify-center py-3 px-8 rounded-sm bg-brand-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-all duration-300">
            View All Cities 
            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {topCities.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden bg-white rounded-sm border border-border shadow-sm hover:shadow-premium-hover transition-all duration-500 ${
                i === 0 ? "md:col-span-8 h-[250px] md:h-[500px]" : 
                i === 1 ? "md:col-span-4 h-[250px] md:h-[500px]" : 
                i === 2 ? "md:col-span-5 h-[250px] md:h-[400px]" : 
                "md:col-span-7 h-[250px] md:h-[400px]"
              }`}
            >
              <Image 
                src={city.image} 
                alt={city.name} 
                fill
                className="object-cover transition-transform duration-700 ease-premium grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
              
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
                <motion.h3 
                  className="text-2xl md:text-4xl lg:text-5xl font-heading font-black text-white mb-2 md:mb-3 tracking-tight"
                >
                  {city.name}
                </motion.h3>
                <div className="flex items-center text-brand-orange font-bold uppercase tracking-widest text-[10px] md:text-xs drop-shadow-sm">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  {city.mediaCount} Prime Locations
                </div>
              </div>
              
              {/* Corner accent arrow */}
              <div className="absolute top-6 right-6 h-12 w-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-premium shadow-lg pointer-events-none">
                <ArrowRight className="h-5 w-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              
              <Link href={`/city-showcase#${city.id}`} className="absolute inset-0 z-10" aria-label={`View ${city.name} showcase`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
