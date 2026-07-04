"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-12 md:py-24 relative bg-white px-4 md:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] bg-brand-blue shadow-2xl shadow-brand-blue/20"
      >
        {/* Dynamic Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 px-6 py-20 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-xl"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Launch Your Campaign</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading text-white mb-6 tracking-tighter max-w-4xl leading-[1.1]">
            Ready to make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">massive impact?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with our media experts today to plan your next nationwide outdoor advertising campaign and secure the highest-traffic locations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto group">
              <Button size="lg" className="w-full h-14 px-10 text-base font-bold rounded-full bg-white text-brand-blue hover:bg-zinc-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 border-none">
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link href="/inventory" className="w-full sm:w-auto group">
              <Button variant="ghost" size="lg" className="w-full h-14 px-10 text-base font-semibold rounded-full border-2 border-white/30 text-white hover:text-brand-blue hover:bg-white transition-all hover:scale-105">
                Browse Inventory
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
