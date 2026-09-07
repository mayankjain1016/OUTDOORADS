"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/data";
import { Star, CheckCircle, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

// Custom Google 'G' Icon SVG
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Single review card — shared between carousel and grid
function ReviewCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm hover:shadow-premium-hover transition-all duration-500 ease-premium h-full flex flex-col border border-border">
      {/* Header: User & Google Icon */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12 rounded-sm overflow-hidden bg-brand-light shrink-0">
            <Image 
              src={t.photoUrl} 
              alt={t.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold font-heading text-brand-navy text-base md:text-lg">{t.name}</h4>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-orange mt-1">{t.role} at {t.company}</p>
          </div>
        </div>
        <div className="opacity-90 shrink-0">
          <GoogleIcon />
        </div>
      </div>
      
      {/* Rating & Verified Tag */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex text-[#FBBC05] space-x-0.5">
          {[...Array(t.rating || 5)].map((_, idx) => (
            <Star key={idx} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <div className="w-1 h-1 rounded-sm bg-border" />
        <div className="flex items-center space-x-1.5 text-brand-navy/60 text-[11px] font-bold uppercase tracking-widest">
          <CheckCircle className="h-3.5 w-3.5 text-[#34A853]" />
          <span>Verified Client</span>
        </div>
      </div>
      
      {/* Review Text */}
      <blockquote className="text-brand-navy/80 leading-relaxed text-sm md:text-base flex-1 italic">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
    </div>
  );
}

// Mobile carousel
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const total = TESTIMONIALS.length;

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent((idx + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(next, 5000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [next]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) { next(); } else { prev(); } }
    autoplayRef.current = setInterval(next, 5000);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="relative">
      {/* Card */}
      <div
        className="overflow-hidden p-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReviewCard t={TESTIMONIALS[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          className="p-3 rounded-sm bg-white border border-border shadow-sm text-brand-navy hover:text-brand-orange hover:border-brand-orange transition-colors duration-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dot pagination */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`rounded-sm transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-brand-orange"
                  : "w-2 h-2 bg-border hover:bg-brand-navy/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-3 rounded-sm bg-white border border-border shadow-sm text-brand-navy hover:text-brand-orange hover:border-brand-orange transition-colors duration-300"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 relative bg-brand-light overflow-hidden border-t border-border">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white border border-border shadow-sm px-4 py-2 rounded-sm text-brand-navy text-xs font-bold tracking-widest uppercase mb-6"
          >
            <ShieldCheck className="h-4 w-4 text-brand-orange" />
            <span>Verified Reviews</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black font-heading tracking-tight text-brand-navy mb-6"
          >
            Trusted by <span className="text-brand-orange italic">Top Brands</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-brand-navy/60 font-medium max-w-2xl mx-auto"
          >
            See what our partners say about our premium out-of-home advertising solutions and campaign execution.
          </motion.p>
        </div>

        {/* Mobile: carousel */}
        <div className="block md:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop: masonry grid */}
        <div className="hidden md:block columns-2 lg:columns-3 gap-8 max-w-7xl mx-auto space-y-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="break-inside-avoid"
            >
              <ReviewCard t={t} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
