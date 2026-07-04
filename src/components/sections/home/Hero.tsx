"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-black overflow-hidden flex flex-col items-center">
      
      {/* Cinematic Background Image Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2500&auto=format&fit=crop"
          alt="Urban cityscape background"
          fill
          priority
          className="object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      {/* Background ambient glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-zinc-800/30 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Apple-style pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Link href="/inventory" className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all duration-300 group">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
              New Inventory Added
            </span>
            <ChevronRight className="h-3 w-3 text-zinc-500 group-hover:text-white transition-colors" />
          </Link>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tighter text-white leading-[0.95] mb-6 font-heading"
        >
          The Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">
            Out-of-Home.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Command attention in the physical world. Access India&apos;s most premium, high-traffic advertising network with a single click.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link href="/contact">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold text-sm">
              Start Your Campaign
            </Button>
          </Link>
          <Link href="/inventory" className="group">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors px-6 py-3">
              Explore Locations
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Massive Cinematic Image Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="relative w-[95%] max-w-7xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-zinc-800/50 shadow-2xl shadow-black"
      >
        <Image 
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2500&auto=format&fit=crop"
          alt="Premium Digital Billboard"
          fill
          priority
          className="object-cover scale-105 hover:scale-110 transition-transform duration-[10s] ease-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        {/* Floating Glassmorphic Stats */}
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="flex gap-4">
            <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">5M+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-semibold">Daily Reach</span>
            </div>
            <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col hidden sm:flex">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">200+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-semibold">Premium Sites</span>
            </div>
          </div>
          
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white tracking-wide">Network is fully operational</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
