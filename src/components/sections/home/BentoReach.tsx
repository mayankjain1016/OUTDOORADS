"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Users, Target } from "lucide-react";
import { CITIES } from "@/data";
import { useRouter } from "next/navigation";

export function BentoReach() {
  const router = useRouter();

  // Feature the top 3 cities
  const featuredCities = CITIES.slice(0, 3);

  return (
    <section className="py-24 bg-[#081221] text-white overflow-hidden relative">
      {/* Cool Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Simpler, Punchier Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[12px] font-bold tracking-widest uppercase text-white/80">Huge Scale</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black font-heading tracking-tight mb-6 leading-[1.1] text-white"
          >
            Big Reach. <br />
            <span className="text-brand-orange">
              Right Places.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 font-medium max-w-xl leading-relaxed"
          >
            We put your ads on the best roads and busy areas. Get seen by millions of people every day.
          </motion.p>
        </div>

        {/* Improved Bento Grid: More creative layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[250px]">
          
          {/* Box 1: Giant Daily Impressions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-3 row-span-1 lg:row-span-2 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 flex flex-col justify-between group hover:border-brand-orange/50 transition-all duration-500 relative overflow-hidden"
          >
            {/* Background Texture/Icon */}
            <Users className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 flex items-center gap-3 text-white/60 mb-2">
              <span className="text-sm font-bold uppercase tracking-widest bg-brand-orange/20 text-brand-orange px-3 py-1 rounded-full">Daily Views</span>
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-7xl md:text-8xl font-black font-heading text-white tracking-tighter drop-shadow-lg">
                50M<span className="text-brand-orange">+</span>
              </h3>
              <p className="text-white/70 text-lg md:text-xl font-medium mt-4 max-w-sm">
                We show your brand to millions of people on the go.
              </p>
            </div>
          </motion.div>

          {/* Box 2: City 1 (Lucknow) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => router.push(`/city-showcase#${featuredCities[0].id}`)}
            className="md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer"
          >
            <Image 
              src={featuredCities[0].image}
              alt={featuredCities[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-bold uppercase tracking-widest text-brand-orange">{featuredCities[0].name}</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-white group-hover:text-brand-orange transition-colors duration-300">
                {featuredCities[0].mediaCount}+ Top Sites
              </h3>
            </div>
          </motion.div>

          {/* Box 3: Active Sites Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-1 row-span-1 rounded-3xl bg-brand-orange p-8 flex flex-col justify-center group overflow-hidden relative items-center text-center hover:bg-brand-orange/90 transition-colors cursor-pointer"
            onClick={() => router.push('/inventory')}
          >
            <Target className="w-10 h-10 text-white mb-4" />
            <h3 className="text-5xl font-black font-heading text-white tracking-tighter">1,200+</h3>
            <span className="text-sm font-bold uppercase tracking-widest text-white/80 mt-2">Active Ads</span>
          </motion.div>

          {/* Box 4: City 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => router.push(`/city-showcase#${featuredCities[1].id}`)}
            className="md:col-span-2 lg:col-span-1 row-span-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer"
          >
            <Image 
              src={featuredCities[1].image}
              alt={featuredCities[1].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">{featuredCities[1].name}</span>
              <h3 className="text-xl font-bold font-heading text-white">{featuredCities[1].mediaCount}+ Sites</h3>
            </div>
          </motion.div>

          {/* Box 5: City 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => router.push(`/city-showcase#${featuredCities[2].id}`)}
            className="md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer"
          >
            <Image 
              src={featuredCities[2].image}
              alt={featuredCities[2].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-1">{featuredCities[2].name}</span>
              <h3 className="text-2xl font-bold font-heading text-white">{featuredCities[2].mediaCount}+ Sites</h3>
            </div>
          </motion.div>

          {/* Box 6: View All Cities Link */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-4 lg:col-span-3 row-span-1 rounded-3xl border border-white/20 p-8 flex items-center justify-between group hover:bg-white/5 transition-all duration-300 cursor-pointer"
            onClick={() => router.push('/city-showcase')}
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-black font-heading text-white tracking-tighter">15+ Cities</h3>
              <p className="text-white/60 font-medium mt-2">We are growing everywhere.</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
