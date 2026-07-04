"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/data";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
  return (
    <section className="py-16 md:py-20 bg-zinc-50 relative overflow-hidden border-t border-zinc-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 text-brand-blue text-sm font-semibold tracking-wide uppercase mb-3"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>Client Success Stories</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black font-heading tracking-tight text-primary-900"
            >
              Trusted by Top Brands
            </motion.h2>
          </div>
        </div>

        {/* Compact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
              className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200/60 hover:shadow-lg hover:border-brand-blue/30 transition-all duration-300 relative"
            >
              {/* Subtle Quote Icon */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Quote className="h-12 w-12 text-brand-blue rotate-180" />
              </div>
              
              {/* Author Header Row */}
              <div className="flex items-center space-x-4 mb-5">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-zinc-100">
                  <Image src={t.photoUrl} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-primary-900 leading-tight">{t.name}</h4>
                  <p className="text-xs text-primary-500 mt-0.5">{t.role}, <span className="font-semibold text-brand-blue">{t.company}</span></p>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex text-amber-400 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current mr-0.5" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-base text-primary-700 leading-relaxed font-medium">
                "{t.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
