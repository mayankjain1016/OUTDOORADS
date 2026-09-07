"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// ── Light Theme Dot grid ──────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="services-dots-light" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.03)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#services-dots-light)" />
      </svg>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "billboards",
    index: "01",
    title: "Classic Billboards",
    subtitle: "High-impact static displays.",
    description: "Command attention on major highways and arterial roads. The ultimate format for sheer scale, brand building, and establishing a dominant physical presence in the city.",
    details: ["Strategic Locations", "Massive Canvas", "24/7 Visibility", "High Traffic"],
    image: "/images/service_classic_billboard.jpg",
  },
  {
    id: "transit",
    index: "02",
    title: "Transit Media",
    subtitle: "Street-level engagement.",
    description: "Connect with audiences on the move. Transit shelters, bus wraps, and street furniture position your brand right at eye level, capturing attention at the point of decision.",
    details: ["Eye-level Impact", "Commuter Reach", "Hyper-local", "Pedestrian Traffic"],
    image: "/images/service_transit_shelter.jpg",
  },
  {
    id: "dooh",
    index: "03",
    title: "Digital OOH",
    subtitle: "Dynamic & contextual.",
    description: "The future of outdoor. Vibrant, motion-ready digital screens that allow for real-time updates, day-parting, and contextual triggers that static media simply cannot match.",
    details: ["Video Ready", "Day-parting", "Real-time Updates", "Dynamic Content"],
    image: "/images/service_digital_dooh.jpg",
  },
  {
    id: "custom",
    index: "04",
    title: "Experiential",
    subtitle: "Unconventional formats.",
    description: "Break the mold. We build 3D installations, metro pillar takeovers, and custom gantries that transform ordinary spaces into memorable brand experiences.",
    details: ["3D Installations", "Metro Pillars", "Traffic Islands", "Bespoke Builds"],
    image: "/images/adv_solutions.jpg",
  },
];

const PROCESS = [
  { step: "01", title: "Strategy & Planning", desc: "We analyze your audience and select the optimal mix of locations." },
  { step: "02", title: "Creative & Production", desc: "Expert guidance on artwork adaptation and high-quality printing." },
  { step: "03", title: "Execution", desc: "Flawless on-time installation across our entire network." },
  { step: "04", title: "Reporting", desc: "Comprehensive proof-of-performance and visibility analytics." },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Services() {
  const [activeService, setActiveService] = useState(0);

  // Intersection observer to change image based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.service-row');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveService(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 selection:bg-brand-orange selection:text-white">
      
      {/* Background Gradient & Pattern */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />
      <DotGrid />

      {/* ── 1. MINIMAL HERO ─────────────────────────────────────────────── */}
      <section className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto border-b border-gray-200">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-sm shadow-sm border border-gray-200 mb-6 text-[10px] font-black tracking-widest uppercase text-brand-navy">
              Our Capabilities
            </h1>
            <h2 className="text-5xl md:text-6xl lg:text-[6rem] font-black font-heading tracking-tight leading-[1.05] mb-8 text-gray-900">
              Formats that <br/> <span className="text-brand-orange">demand attention.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
              We operate a diverse portfolio of premium outdoor media. From iconic highway spectaculars to dynamic digital screens, we provide the canvas for your brand to dominate the physical world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STICKY SHOWCASE (DESKTOP) & LIST (MOBILE) ───────────────── */}
      <section className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row bg-white border-b border-gray-200 shadow-sm">
        
        {/* Left Column: Scrollable List */}
        <div className="w-full lg:w-1/2 flex flex-col py-10 lg:py-24 px-6 md:px-12 lg:pl-24 lg:pr-16 bg-white">
          {SERVICES.map((s, i) => (
            <div 
              key={s.id} 
              className="service-row py-16 border-b border-gray-100 last:border-0 group cursor-default"
              onMouseEnter={() => setActiveService(i)}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-sm font-black text-gray-300 font-mono transition-colors duration-300 group-hover:text-brand-orange">
                  {s.index}
                </span>
                <h3 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-brand-navy">
                  {s.title}
                </h3>
              </div>
              
              <h4 className="text-xl text-brand-orange font-black mb-6 uppercase tracking-tight">
                {s.subtitle}
              </h4>
              
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg font-medium">
                {s.description}
              </p>
              
              <ul className="grid grid-cols-2 gap-y-3 gap-x-6 max-w-md">
                {s.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-sm bg-brand-orange" />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Mobile Image (Hidden on Desktop) */}
              <div className="block lg:hidden mt-10 relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-gray-200 shadow-xl">
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Image Panel (Desktop Only) */}
        <div className="hidden lg:block w-1/2 h-[calc(100vh-80px)] sticky top-20 self-start p-8 lg:p-12 pl-0 bg-white z-20">
          <div className="w-full h-full relative rounded-sm overflow-hidden border border-gray-200 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image 
                  src={SERVICES[activeService].image} 
                  alt={SERVICES[activeService].title} 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Info */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
              <div className="bg-white/95 backdrop-blur-md border border-gray-200 px-6 py-4 rounded-sm shadow-xl">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-navy">
                  {SERVICES[activeService].title}
                </span>
              </div>
              <Link href="/inventory">
                <div className="w-14 h-14 bg-brand-orange flex items-center justify-center rounded-sm text-white hover:bg-brand-navy hover:text-white shadow-xl transition-all duration-300 cursor-pointer">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROCESS (EDITORIAL STYLE) ───────────────────────────────── */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-orange mb-6">
              Our Methodology
            </h2>
            <h3 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-6 text-brand-navy">
              How we execute.
            </h3>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              A transparent, rigorous process ensures that your campaign moves seamlessly from concept to massive real-world impact.
            </p>
          </div>
          
          <div className="lg:w-3/5">
            <div className="flex flex-col">
              {PROCESS.map((p, i) => (
                <div key={i} className="flex gap-6 md:gap-12 py-8 border-b border-gray-200 first:pt-0 last:border-0 group">
                  <div className="text-2xl font-mono font-black text-gray-200 group-hover:text-brand-orange transition-colors">
                    {p.step}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black font-heading mb-3 text-gray-900">{p.title}</h4>
                    <p className="text-gray-500 text-base font-medium">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA (MINIMAL & BRUTALIST) ───────────────────────────────── */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-gray-200 bg-brand-navy">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-4 text-white">
              Start your campaign.
            </h2>
            <p className="text-xl text-white/60 font-medium">
              Access India's premium OOH network today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <div className="bg-brand-orange text-white px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-center rounded-sm hover:bg-white hover:text-brand-navy shadow-xl transition-all duration-300">
                Contact Sales
              </div>
            </Link>
            <Link href="/inventory" className="w-full sm:w-auto">
              <div className="bg-transparent border border-white/20 text-white px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-center rounded-sm hover:bg-white/10 transition-colors duration-300">
                View Inventory
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
