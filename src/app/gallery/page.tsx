"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY, INDUSTRIES } from "@/data";
import { MapPin, ChevronDown, Check, ImageIcon } from "lucide-react";
import Image from "next/image";

function GalleryFilterDropdown({ 
  value, 
  options, 
  onChange, 
}: { 
  value: string, 
  options: string[], 
  onChange: (val: string) => void,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-20 w-full max-w-[280px] mx-auto" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-6 py-3.5 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer"
      >
        <span className="text-[15px] font-semibold text-slate-700 tracking-wide">
          {value === "All" ? "All Campaigns" : value}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-400 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 w-full bg-white border border-slate-200 rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] overflow-hidden py-2"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col p-2 gap-1">
              <div 
                onClick={() => { onChange("All"); setIsOpen(false); }}
                className={`px-4 py-3 rounded-2xl text-[14px] font-semibold cursor-pointer transition-all flex items-center justify-between ${
                  value === "All" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                All Industries
                {value === "All" && <Check className="w-4 h-4" />}
              </div>
              {options.map((opt) => (
                <div 
                  key={opt}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={`px-4 py-3 rounded-2xl text-[14px] font-semibold cursor-pointer transition-all flex items-center justify-between ${
                    value === opt ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {opt}
                  {value === opt && <Check className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Gallery() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ind = params.get("industry");
      if (ind && INDUSTRIES.some(i => i.name === ind)) {
        setSelectedIndustry(ind);
      }
    }
  }, []);
  
  const filteredGallery = selectedIndustry === "All" 
    ? GALLERY 
    : GALLERY.filter(item => item.industryName === selectedIndustry);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 pb-16 md:pb-32 overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-slate-50 z-0 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 mb-6"
        >
          <ImageIcon className="w-4 h-4 text-brand-blue animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Campaign Showcase
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-900 mb-4"
        >
          The <span className="text-brand-blue">Gallery</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto"
        >
          Explore a curated selection of our most impactful outdoor campaigns across India&apos;s premium advertising network.
        </motion.p>
      </section>

      {/* Dropdown Filter Sub-Navbar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <GalleryFilterDropdown 
          value={selectedIndustry}
          options={INDUSTRIES.map(ind => ind.name)}
          onChange={setSelectedIndustry}
        />
      </section>

      {/* Classic 3-Column Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
                >
                  {/* Image */}
                  <Image 
                    src={item.imageUrl} 
                    alt={item.campaignTitle} 
                    fill
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />
                  
                  {/* Dark Gradient Overlay (Appears on Hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Content (Slides up on Hover) */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 w-max">
                      {item.industryName}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight uppercase tracking-tight">
                      {item.campaignTitle}
                    </h2>
                    <div className="flex items-center text-white/70 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      {item.cityName}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50">
                <p className="text-slate-400 text-lg">No campaigns found for this industry.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
}
