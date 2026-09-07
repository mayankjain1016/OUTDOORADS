"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY, INDUSTRIES } from "@/data";
import { type GalleryItem } from "@/types";
import { MapPin, ChevronDown, Check, ImageIcon, X } from "lucide-react";
import Image from "next/image";

// ── Light Theme Dot grid ──────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gallery-dots-light" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.04)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gallery-dots-light)" />
      </svg>
    </div>
  );
}

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
        className="flex items-center justify-between px-6 py-4 rounded-sm bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-orange transition-all duration-300 cursor-pointer"
      >
        <span className="text-[12px] font-black uppercase tracking-widest text-brand-navy">
          {value === "All" ? "All Campaigns" : value}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-gray-400 ${isOpen ? "rotate-180 text-brand-orange" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-sm shadow-xl overflow-hidden py-1"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col p-1 gap-1">
              <div 
                onClick={() => { onChange("All"); setIsOpen(false); }}
                className={`px-4 py-3 rounded-sm text-[11px] font-black uppercase tracking-wider cursor-pointer transition-all flex items-center justify-between ${
                  value === "All" ? "bg-gray-50 text-brand-orange border border-gray-200" : "text-gray-600 hover:bg-gray-50 hover:text-brand-navy border border-transparent"
                }`}
              >
                All Industries
                {value === "All" && <Check className="w-4 h-4" />}
              </div>
              {options.map((opt) => (
                <div 
                  key={opt}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={`px-4 py-3 rounded-sm text-[11px] font-black uppercase tracking-wider cursor-pointer transition-all flex items-center justify-between ${
                    value === opt ? "bg-gray-50 text-brand-orange border border-gray-200" : "text-gray-600 hover:bg-gray-50 hover:text-brand-navy border border-transparent"
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
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  
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
    ? GALLERY.filter((item, index, self) => 
        index === self.findIndex((t) => t.industryName === item.industryName)
      )
    : GALLERY.filter(item => item.industryName === selectedIndustry);

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 pb-16 md:pb-32 overflow-hidden">
      
      {/* Background Gradient & Pattern */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />
      <DotGrid />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 md:pt-40 pb-8 md:pb-12 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-sm shadow-sm border border-gray-200 mb-6"
        >
          <ImageIcon className="w-4 h-4 text-brand-orange animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy">
            Campaign Showcase
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-black font-heading tracking-tight text-gray-900 mb-4 leading-[1.05]"
        >
          The <span className="text-brand-orange">Gallery</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Explore a curated selection of our most impactful outdoor campaigns across India's premium advertising network.
        </motion.p>
      </section>

      {/* Dropdown Filter Sub-Navbar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-30">
        <GalleryFilterDropdown 
          value={selectedIndustry}
          options={INDUSTRIES.map(ind => ind.name)}
          onChange={setSelectedIndustry}
        />
      </section>

      {/* Responsive Grid */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => {
                      if (selectedIndustry === "All") {
                        setSelectedIndustry(item.industryName);
                      } else {
                        setLightboxImage(item);
                      }
                    }}
                    className="group relative aspect-[3/4] md:aspect-[4/5] rounded-sm overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer shadow-sm hover:shadow-2xl hover:border-brand-orange transition-all duration-500"
                  >
                  {/* Image */}
                  <Image 
                    src={item.imageUrl} 
                    alt={item.campaignTitle} 
                    fill
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122] via-[#0a1122]/40 to-transparent opacity-80 md:opacity-40 md:group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-block px-2.5 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-sm text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase mb-3 w-max">
                      {item.industryName}
                    </span>
                    <h2 className="text-base sm:text-lg md:text-2xl font-black font-heading text-white mb-2 leading-tight tracking-tight">
                      {item.campaignTitle}
                    </h2>
                    <div className="flex items-center text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5 text-brand-orange" />
                      {item.cityName}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full h-64 flex flex-col items-center justify-center border border-gray-200 rounded-sm bg-white shadow-sm">
                <ImageIcon className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-brand-navy font-black text-xl mb-2">No campaigns found</p>
                <p className="text-gray-500 font-medium text-sm">Please select another industry to view our work.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030811]/95 backdrop-blur-md p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-brand-orange hover:border-brand-orange transition-colors z-[60]"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className="relative w-full max-w-6xl aspect-video md:aspect-[16/9] bg-[#0a1122] rounded-sm overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.imageUrl}
                alt={lightboxImage.campaignTitle}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-[#030811] via-[#030811]/80 to-transparent pointer-events-none">
                <span className="inline-block px-3 py-1 bg-brand-orange text-white rounded-sm text-[10px] font-black tracking-[0.2em] uppercase mb-3">
                  {lightboxImage.industryName}
                </span>
                <h3 className="text-white text-2xl md:text-4xl font-black font-heading tracking-tight">{lightboxImage.campaignTitle}</h3>
                <p className="text-white/60 text-xs md:text-sm mt-3 flex items-center font-bold uppercase tracking-widest">
                  <MapPin className="w-4 h-4 mr-2 text-brand-orange" />
                  {lightboxImage.cityName}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
