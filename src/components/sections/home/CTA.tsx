"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-12 md:py-16 relative bg-white px-4 md:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-zinc-950 shadow-xl border border-zinc-900"
      >
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        <div className="relative z-10 px-6 py-12 md:py-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 inline-flex items-center space-x-2 bg-zinc-900 text-zinc-300 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
            <span>Launch Your Campaign</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 tracking-tight max-w-2xl leading-tight">
            Ready to make a massive impact?
          </h2>
          
          <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl mx-auto font-medium leading-relaxed">
            Connect with our media experts today to plan your next nationwide outdoor advertising campaign.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto group">
              <Button className="w-full h-12 px-8 text-sm font-semibold rounded-full bg-brand-blue text-white hover:bg-blue-600 transition-all hover:scale-105 border-none shadow-lg shadow-brand-blue/20">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link href="/inventory" className="w-full sm:w-auto group">
              <Button variant="ghost" className="w-full h-12 px-8 text-sm font-semibold rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all hover:scale-105">
                Browse Inventory
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
