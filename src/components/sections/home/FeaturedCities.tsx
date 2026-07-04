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
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-zinc-200">
          <SectionHeading 
            title="Dominating Markets" 
            subtitle="We hold prime media assets in the most densely populated and commercially significant cities in India."
            align="left"
            className="mb-0"
          />
          <Link href="/city-showcase" className="mt-8 md:mt-0 group inline-flex items-center justify-center py-2.5 px-5 rounded-full border border-zinc-200 text-zinc-900 font-medium hover:bg-zinc-50 transition-colors">
            View All Cities 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {topCities.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden bg-zinc-100 border border-zinc-200 ${
                i === 0 ? "md:col-span-8 h-[450px]" : 
                i === 1 ? "md:col-span-4 h-[450px]" : 
                i === 2 ? "md:col-span-5 h-[350px]" : 
                "md:col-span-7 h-[350px]"
              }`}
            >
              <Image 
                src={city.image} 
                alt={city.name} 
                fill
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
              
              {/* Subtle gradient just to protect text legibility, no heavy overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3 tracking-tight">
                  {city.name}
                </h3>
                <div className="flex items-center text-zinc-300 font-medium text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {city.mediaCount} Prime Locations
                </div>
              </div>
              
              {/* Corner accent arrow that appears on hover */}
              <div className="absolute top-6 right-6 h-10 w-10 bg-white rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm pointer-events-none">
                <ArrowRight className="h-4 w-4 text-zinc-900 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              
              {/* Make the entire card a link conceptually */}
              <Link href={`/city-showcase#${city.id}`} className="absolute inset-0 z-10" aria-label={`View ${city.name} showcase`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
