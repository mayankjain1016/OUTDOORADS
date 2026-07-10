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
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-zinc-100">
          <SectionHeading 
            title="Dominating Markets" 
            subtitle="We hold prime media assets in the most densely populated and commercially significant cities in India."
            align="left"
            className="mb-0"
          />
          <Link href="/city-showcase" className="mt-8 md:mt-0 group inline-flex items-center justify-center py-2.5 px-6 rounded-full border border-zinc-200 text-zinc-900 font-medium hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300">
            View All Cities 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5">
          {topCities.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden bg-zinc-50 rounded-xl md:rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-xl hover:border-zinc-300/80 transition-all duration-500 ${
                i === 0 ? "col-span-1 md:col-span-8 h-[140px] md:h-[450px]" : 
                i === 1 ? "col-span-1 md:col-span-4 h-[140px] md:h-[450px]" : 
                i === 2 ? "col-span-1 md:col-span-5 h-[140px] md:h-[350px]" : 
                "col-span-1 md:col-span-7 h-[140px] md:h-[350px]"
              }`}
            >
              <Image 
                src={city.image} 
                alt={city.name} 
                fill
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[0.6] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
              
              <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end pointer-events-none">
                <motion.h3 
                  className="text-base sm:text-lg md:text-3xl lg:text-4xl font-heading font-bold text-white mb-0.5 md:mb-2 tracking-tight drop-shadow-md"
                >
                  {city.name}
                </motion.h3>
                <div className="flex items-center text-zinc-200 font-medium text-[10px] sm:text-xs md:text-sm drop-shadow-sm group-hover:text-white transition-colors">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  {city.mediaCount} Prime Locations
                </div>
              </div>
              
              {/* Corner accent arrow that appears on hover */}
              <div className="absolute top-6 right-6 h-12 w-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg pointer-events-none">
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
