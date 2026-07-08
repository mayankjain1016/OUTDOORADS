"use client";

import { motion } from "framer-motion";
import { MEDIA_INVENTORY } from "@/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedMedia() {
  const featured = MEDIA_INVENTORY.slice(0, 3); // Top 3

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-zinc-50 border-t border-zinc-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-zinc-100">
          <SectionHeading 
            title="Premium Inventory" 
            subtitle="Explore our most sought-after media locations, meticulously selected for maximum brand visibility and prestige."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link href="/inventory" className="mt-8 md:mt-0 group inline-flex items-center justify-center py-2.5 px-6 rounded-full border border-zinc-200 text-zinc-900 font-medium hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300">
            View All Inventory 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((media, i) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-white rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-xl hover:border-zinc-300/80 overflow-hidden transition-all duration-500"
            >
              <div className="relative h-64 w-full overflow-hidden bg-zinc-100 m-2 rounded-xl w-[calc(100%-16px)]">
                <Image 
                  src={media.imageUrl} 
                  alt={media.locationDetails} 
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 grayscale-[0.4] opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <div className="py-1.5 px-4 bg-white/90 backdrop-blur-md rounded-full text-zinc-900 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {media.type}
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-zinc-500 mb-3 text-xs font-bold tracking-widest uppercase">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{media.cityName}, {media.area}</span>
                </div>
                
                <h3 className="font-heading font-bold text-xl text-zinc-950 mb-6 leading-snug group-hover:text-zinc-700 transition-colors">
                  {media.locationDetails}
                </h3>
                

              </div>
              
              {/* Entire card link */}
              <Link href={`/inventory#${media.id}`} className="absolute inset-0 z-10" aria-label={`View details for ${media.locationDetails}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
