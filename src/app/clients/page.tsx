"use client";

import { motion } from "framer-motion";
import { CLIENTS, STATS } from "@/data";
import Image from "next/image";

import { Network } from "lucide-react";

export default function Clients() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-gradient-to-b from-white to-slate-50 z-0 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 md:pt-32 pb-10 md:pb-16 flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-12 flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border border-slate-200 mb-4 md:mb-6"
          >
            <Network className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-blue animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-700">
              Our Network
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[1.65rem] leading-none sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-900 mb-3 md:mb-4 max-w-5xl whitespace-nowrap"
          >
            The Brands We <span className="text-brand-blue">Elevate</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-10 md:mb-16 font-light"
          >
            Join hundreds of industry leaders who trust ApexOOH for their nationwide outdoor campaigns.
          </motion.p>

          {/* Clean Centered Metrics Pill (Single Row on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center justify-between sm:justify-evenly md:justify-center gap-x-1 sm:gap-x-6 md:gap-16 bg-white border border-slate-100 rounded-2xl md:rounded-[2.5rem] px-3 sm:px-6 md:px-10 py-4 md:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[360px] sm:max-w-max"
          >
            <div className="text-center flex-1">
              <span className="text-[1.1rem] sm:text-3xl md:text-5xl font-light text-slate-900 block mb-0.5 md:mb-2">{STATS.happyClients}+</span>
              <span className="text-[6px] sm:text-[9px] md:text-[11px] font-semibold uppercase tracking-widest text-slate-400">Active Clients</span>
            </div>
            <div className="w-px h-6 sm:h-8 md:h-12 bg-slate-100" />
            <div className="text-center flex-1">
              <span className="text-[1.1rem] sm:text-3xl md:text-5xl font-light text-slate-900 block mb-0.5 md:mb-2">{STATS.campaignsExecuted}+</span>
              <span className="text-[6px] sm:text-[9px] md:text-[11px] font-semibold uppercase tracking-widest text-slate-400">Campaigns</span>
            </div>
            <div className="w-px h-6 sm:h-8 md:h-12 bg-slate-100" />
            <div className="text-center flex-1">
              <span className="text-[1.1rem] sm:text-3xl md:text-5xl font-light text-slate-900 block mb-0.5 md:mb-2">98%</span>
              <span className="text-[6px] sm:text-[9px] md:text-[11px] font-semibold uppercase tracking-widest text-slate-400">Retention</span>
            </div>
            <div className="w-px h-6 sm:h-8 md:h-12 bg-slate-100" />
            <div className="text-center flex-1">
              <span className="text-[1.1rem] sm:text-3xl md:text-5xl font-light text-slate-900 block mb-0.5 md:mb-2">{STATS.yearsOfExperience}</span>
              <span className="text-[6px] sm:text-[9px] md:text-[11px] font-semibold uppercase tracking-widest text-slate-400">Years Exp.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee Logo Wall with Logos Only (Straight, Clean) */}
      <section className="relative py-12 md:py-24 overflow-hidden bg-white">
        
        {/* Dual Marquees with Client Logos */}
        <div className="relative flex flex-col gap-8 md:gap-12 group pb-16 md:pb-24">
          
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Row 1 - Left to Right */}
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee-left whitespace-nowrap flex items-center shrink-0">
              {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                <div 
                  key={`r1-${client.id}-${i}`}
                  className="mx-4 md:mx-6 flex items-center justify-center p-3 sm:p-4 md:p-6 rounded-full bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 rounded-full overflow-hidden transition-all duration-500 bg-white">
                    <Image src={client.logoUrl} alt="Partner Logo" fill className="object-contain p-2" />
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
                  className="mx-4 md:mx-6 flex items-center justify-center p-3 sm:p-4 md:p-6 rounded-full bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 rounded-full overflow-hidden transition-all duration-500 bg-white">
                    <Image src={client.logoUrl} alt="Partner Logo" fill className="object-contain p-2" />
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
            animation: marqueeLeft 35s linear infinite;
          }
          .animate-marquee-right {
            animation: marqueeRight 35s linear infinite;
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
