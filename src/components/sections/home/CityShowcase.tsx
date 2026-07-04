"use client";

import { motion } from "framer-motion";
import { CITIES } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function CityShowcase() {
  const getGridClasses = (index: number) => {
    switch(index) {
      case 0: return "md:col-span-2 md:row-span-2 h-[400px] md:h-auto"; // Mumbai: Big block
      case 1: return "md:col-span-2 md:row-span-1 h-[300px]"; // Delhi: Wide
      case 2: return "md:col-span-1 md:row-span-1 h-[300px]"; // Bangalore: Square
      case 3: return "md:col-span-1 md:row-span-1 h-[300px]"; // Hyderabad: Square
      case 4: return "md:col-span-2 md:row-span-1 h-[300px]"; // Chennai: Wide
      case 5: return "md:col-span-2 md:row-span-1 h-[300px]"; // Kolkata: Wide
      default: return "md:col-span-1 md:row-span-1 h-[300px]";
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue text-sm font-semibold tracking-wide uppercase mb-6 border border-brand-blue/10"
          >
            <MapPin className="h-4 w-4" />
            <span>National Presence</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-primary-900 mb-6"
          >
            Dominating India&apos;s <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-accent">Key Markets</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-500 font-light"
          >
            Explore our premium outdoor advertising inventory across major metropolitan cities. From iconic billboards to digital screens, we are where your audience is.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
          {CITIES.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative rounded-[2rem] overflow-hidden cursor-pointer bg-zinc-100 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500",
                getGridClasses(idx)
              )}
            >
              <Link href={`/city-showcase?city=${city.id}`} className="absolute inset-0 z-20">
                <span className="sr-only">Explore {city.name}</span>
              </Link>
              
              <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              
              {/* Clean Overlay - darker at bottom for text readability, clear at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 tracking-tight">
                      {city.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-white/90 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                      <span>{city.mediaCount}+ Locations</span>
                      <span className="w-1 h-1 rounded-full bg-brand-accent" />
                      <span>{city.areas.length} Prime Areas</span>
                    </div>
                  </div>
                  
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-brand-blue transition-all duration-500 shadow-lg">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
