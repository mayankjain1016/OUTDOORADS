"use client";

import { motion } from "framer-motion";
import { CLIENTS, STATS } from "@/data";
import Image from "next/image";
import { Network } from "lucide-react";

// ── Light Theme Dot grid ──────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="clients-dots-light" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.03)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#clients-dots-light)" />
      </svg>
    </div>
  );
}

export default function Clients() {
  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
      
      {/* Background Gradient & Pattern */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />
      <DotGrid />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-24 flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-sm shadow-sm border border-gray-200 mb-6"
          >
            <Network className="w-4 h-4 text-brand-orange animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy">
              Our Network
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black font-heading tracking-tight text-brand-navy mb-6 max-w-5xl whitespace-nowrap leading-[1.05]"
          >
            The Brands We <span className="text-brand-orange">Elevate</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
          >
            Join hundreds of industry leaders who trust ApexOOH for their nationwide premium outdoor campaigns.
          </motion.p>

          {/* Brutalist Centered Metrics Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center justify-between sm:justify-evenly md:justify-center gap-x-1 sm:gap-x-6 md:gap-16 bg-white border border-gray-200 rounded-sm px-4 sm:px-8 md:px-16 py-6 md:py-10 shadow-xl w-full max-w-[360px] sm:max-w-max relative z-20"
          >
            <div className="text-center flex-1">
              <span className="text-2xl sm:text-4xl md:text-6xl font-black font-heading text-brand-navy block mb-2">{STATS.happyClients}+</span>
              <span className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400">Active Clients</span>
            </div>
            <div className="w-px h-8 sm:h-12 md:h-20 bg-gray-200" />
            <div className="text-center flex-1">
              <span className="text-2xl sm:text-4xl md:text-6xl font-black font-heading text-brand-navy block mb-2">{STATS.campaignsExecuted}+</span>
              <span className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400">Campaigns</span>
            </div>
            <div className="w-px h-8 sm:h-12 md:h-20 bg-gray-200" />
            <div className="text-center flex-1">
              <span className="text-2xl sm:text-4xl md:text-6xl font-black font-heading text-brand-navy block mb-2">98%</span>
              <span className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400">Retention</span>
            </div>
            <div className="w-px h-8 sm:h-12 md:h-20 bg-gray-200" />
            <div className="text-center flex-1">
              <span className="text-2xl sm:text-4xl md:text-6xl font-black font-heading text-brand-navy block mb-2">{STATS.yearsOfExperience}</span>
              <span className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400">Years Exp.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brutalist Marquee Logo Wall */}
      <section className="relative py-16 md:py-32 overflow-hidden bg-white border-t border-b border-gray-200">
        
        <div className="relative flex flex-col gap-6 md:gap-8 group">
          
          {/* Hard Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          {/* Row 1 - Left to Right */}
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee-left whitespace-nowrap flex items-center shrink-0">
              {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                <div 
                  key={`r1-${client.id}-${i}`}
                  className="mx-3 md:mx-4 flex items-center justify-center p-6 md:p-10 bg-gray-50 border border-gray-200 rounded-sm hover:border-brand-orange hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group/logo"
                >
                  <div className="relative h-16 w-24 sm:h-20 sm:w-32 md:h-24 md:w-40 transition-transform duration-500 group-hover/logo:scale-110">
                    <Image src={client.logoUrl} alt="Partner Logo" fill className="object-contain" style={{ filter: 'grayscale(100%) opacity(60%)', transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%) opacity(100%)'} onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%) opacity(60%)'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee-right whitespace-nowrap flex items-center shrink-0" style={{ transform: 'translateX(-20%)' }}>
              {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].reverse().map((client, i) => (
                <div 
                  key={`r2-${client.id}-${i}`}
                  className="mx-3 md:mx-4 flex items-center justify-center p-6 md:p-10 bg-gray-50 border border-gray-200 rounded-sm hover:border-brand-orange hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group/logo"
                >
                  <div className="relative h-16 w-24 sm:h-20 sm:w-32 md:h-24 md:w-40 transition-transform duration-500 group-hover/logo:scale-110">
                    <Image src={client.logoUrl} alt="Partner Logo" fill className="object-contain" style={{ filter: 'grayscale(100%) opacity(60%)', transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%) opacity(100%)'} onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%) opacity(60%)'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marqueeLeft {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-20%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-20%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-left {
            animation: marqueeLeft 40s linear infinite;
          }
          .animate-marquee-right {
            animation: marqueeRight 40s linear infinite;
          }
          .group:hover .animate-marquee-left,
          .group:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        `}} />
      </section>
    </div>
  );
}
