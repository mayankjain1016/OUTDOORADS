"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MediaType } from "@/types";

function HeroDropdown({ 
  value, 
  options, 
  onChange, 
  label,
  defaultLabel
}: { 
  value: string | null, 
  options: { id: string, name: string }[], 
  onChange: (val: string) => void,
  label: string,
  defaultLabel: string
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

  const selectedOption = options.find(opt => opt.id === value) || { id: "", name: defaultLabel };

  return (
    <div className="relative group w-full sm:w-auto flex-1" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col px-6 py-2.5 rounded-full bg-transparent hover:bg-white/5 transition-colors duration-200 cursor-pointer w-full"
      >
        <span className="text-[11px] font-medium tracking-wide text-white/50 mb-0.5 text-left">{label}</span>
        <div className="flex items-center justify-between">
          <span className={`text-[15px] font-semibold truncate ${value ? 'text-white' : 'text-white/80'}`}>
            {selectedOption.name}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180 text-white" : "text-white/40"}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-3 w-full min-w-[240px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 py-1.5"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col p-1.5 gap-0.5">
              <div 
                onClick={() => { onChange(""); setIsOpen(false); }}
                className={`px-4 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer transition-colors ${
                  !value ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {defaultLabel}
              </div>
              {options.map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`px-4 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer transition-colors flex items-center justify-between ${
                    value === opt.id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {opt.name}
                  {value === opt.id && <Check className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const availableMediaTypes = useMemo(() => {
    if (!selectedCityId) return [];
    const mediaInCity = MEDIA_INVENTORY.filter((m) => m.cityId === selectedCityId);
    const types = new Set(mediaInCity.map((m) => m.type));
    return Array.from(types);
  }, [selectedCityId]);

  const availableLocations = useMemo(() => {
    if (!selectedCityId) return [];
    let media = MEDIA_INVENTORY.filter((m) => m.cityId === selectedCityId);
    if (selectedMediaType) {
      media = media.filter((m) => m.type === selectedMediaType);
    }
    const locations = new Set(media.map((m) => m.area));
    return Array.from(locations);
  }, [selectedCityId, selectedMediaType]);

  const handleSearch = () => {
    router.push("/city-showcase");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Edge-to-Edge Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=2000&auto=format&fit=crop"
          alt="Premium Billboard Advertising"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Gradient Overlay for perfect text readability */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950/90" />
      </div>

      {/* Top Centered Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center pt-24">
        
        {/* Ultra-Clean Dark Pill UI */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[800px] mx-auto mb-16 relative z-40"
        >
          <div className="flex flex-col md:flex-row items-center justify-between p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-full shadow-2xl">
            
            <div className="flex flex-col sm:flex-row items-center w-full md:w-auto flex-1 px-1">
              <HeroDropdown 
                value={selectedCityId}
                options={CITIES}
                onChange={(val) => {
                  setSelectedCityId(val);
                  setSelectedMediaType(null);
                  setSelectedLocation(null);
                }}
                label="Location"
                defaultLabel="Any City"
              />
              <div className="hidden sm:block w-[1px] h-10 bg-white/10 mx-1" />
              <HeroDropdown 
                value={selectedMediaType}
                options={availableMediaTypes.map(t => ({ id: t, name: t }))}
                onChange={(val) => {
                  setSelectedMediaType(val ? (val as MediaType) : null);
                  setSelectedLocation(null);
                }}
                label="Media Type"
                defaultLabel="All Types"
              />
              <div className="hidden sm:block w-[1px] h-10 bg-white/10 mx-1" />
              <HeroDropdown 
                value={selectedLocation}
                options={availableLocations.map(l => ({ id: l, name: l }))}
                onChange={(val) => setSelectedLocation(val || null)}
                label="Area"
                defaultLabel="All Areas"
              />
            </div>

            <div 
              onClick={handleSearch}
              className="mt-3 md:mt-0 ml-0 md:ml-3 flex w-full md:w-14 h-12 md:h-14 items-center justify-center rounded-[1.5rem] md:rounded-full bg-brand-blue hover:bg-blue-500 text-white transition-colors duration-200 cursor-pointer shadow-lg shrink-0"
            >
               <Search className="w-5 h-5" />
            </div>
            
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[7.5rem] font-light tracking-tight text-white leading-[1.05] mb-6 max-w-5xl"
        >
          Premium Outdoor <br className="hidden md:block" />
          <span className="text-white/70">Advertising.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/80 font-light max-w-2xl mb-16 leading-relaxed"
        >
          Command attention in the physical world. Access India&apos;s most premium, high-traffic advertising network.
        </motion.p>

        {/* Clean Metrics Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-12 md:gap-24"
        >
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-light text-white block mb-2">5M+</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">Daily Views</span>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-light text-white block mb-2">200+</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">Premium Sites</span>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div className="text-center hidden sm:block">
            <span className="text-4xl md:text-5xl font-light text-white block mb-2">Pan India</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">Active Regions</span>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
