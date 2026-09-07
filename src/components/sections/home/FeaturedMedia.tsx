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
    <section className="py-20 md:py-32 bg-brand-light border-t border-border">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-border">
          <SectionHeading 
            title="Premium Inventory" 
            subtitle="Explore our most sought-after media locations, meticulously selected for maximum brand visibility and prestige."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link href="/inventory" className="mt-8 md:mt-0 group inline-flex items-center justify-center py-3 px-8 rounded-sm bg-brand-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-all duration-300">
            View All Inventory 
            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((media, i) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-white rounded-sm border border-border shadow-sm hover:shadow-premium-hover overflow-hidden transition-all duration-500 ease-premium"
            >
              <div className="relative aspect-video md:h-72 md:aspect-auto w-full overflow-hidden bg-brand-light">
                <Image 
                  src={media.imageUrl} 
                  alt={media.locationDetails} 
                  fill
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105 grayscale-[0.2] opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <div className="py-1.5 px-4 bg-brand-navy text-brand-orange rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {media.type}
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-brand-orange mb-3 text-[10px] md:text-[11px] font-bold tracking-widest uppercase">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{media.cityName}, {media.area}</span>
                </div>
                
                <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-navy mb-4 leading-snug group-hover:text-brand-orange transition-colors duration-300">
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
