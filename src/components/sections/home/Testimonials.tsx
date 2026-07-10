"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/data";
import { Star, CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";

// Custom Google 'G' Icon SVG
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 relative bg-gray-50 overflow-hidden border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full text-gray-700 text-xs font-bold tracking-widest uppercase mb-6"
          >
            <ShieldCheck className="h-4 w-4 text-brand-blue" />
            <span>Verified Reviews</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-gray-900 mb-6"
          >
            Trusted by <span className="text-brand-blue">Top Brands</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            See what our partners say about our premium out-of-home advertising solutions and campaign execution.
          </motion.p>
        </div>

        {/* Premium Google-Style Review Grid (Masonry) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-500 break-inside-avoid"
            >
              {/* Header: User & Google Icon */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <Image 
                      src={t.image} 
                      alt={t.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{t.name}</h4>
                    <p className="text-[13px] font-medium text-gray-400 mt-0.5">{t.role} at {t.company}</p>
                  </div>
                </div>
                <div className="opacity-90">
                  <GoogleIcon />
                </div>
              </div>
              
              {/* Rating & Verified Tag */}
              <div className="flex items-center space-x-3 mb-5">
                <div className="flex text-[#FBBC05] space-x-0.5">
                  {[...Array(t.rating || 5)].map((_, idx) => (
                    <Star key={idx} className="h-[18px] w-[18px] fill-current" />
                  ))}
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <div className="flex items-center space-x-1.5 text-gray-400 text-[13px] font-medium">
                  <CheckCircle className="h-4 w-4 text-[#34A853]" />
                  <span>Verified Client</span>
                </div>
              </div>
              
              {/* Review Text */}
              <blockquote className="text-gray-600 leading-relaxed text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
