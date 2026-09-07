"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-20 md:py-32 relative bg-white px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative overflow-hidden rounded-sm bg-brand-navy shadow-premium border border-border"
      >
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        <div className="relative z-10 px-8 py-16 md:py-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-8 inline-flex items-center space-x-3 bg-white/5 text-white border border-white/10 px-6 py-2 rounded-sm text-[11px] font-bold tracking-widest uppercase"
          >
            <Sparkles className="h-4 w-4 text-brand-orange" />
            <span>Launch Your Campaign</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-heading text-white mb-6 tracking-tight max-w-4xl leading-tight">
            Ready to make a massive impact?
          </h2>
          
          <p className="text-base md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with our media experts today to plan your next nationwide outdoor advertising campaign.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto group">
              <Button size="lg" className="w-full px-10">
                Contact Sales
                <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link href="/inventory" className="w-full sm:w-auto group">
              <Button size="lg" variant="outline" className="w-full px-10 border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                Browse Inventory
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
