"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { Search, ChevronDown, Check, LayoutGrid, MapPin, Maximize } from "lucide-react";
import Image from "next/image";

// ── Light Theme Dot grid ──────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="showcase-dots-light" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.04)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#showcase-dots-light)" />
      </svg>
    </div>
  );
}

// ── Light Theme Filter Dropdown ───────────────────────────────────────────────
function FilterDropdown({
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
    <div className="relative group flex-1 min-w-0" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col px-1.5 sm:px-3 md:px-6 py-1.5 md:py-2.5 rounded-sm bg-transparent hover:bg-gray-50 transition-colors duration-200 cursor-pointer w-full"
      >
        <span className="text-[9px] md:text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5 text-left">{label}</span>
        <div className="flex items-center justify-between gap-0.5 sm:gap-1">
          <span className={`text-[12px] md:text-[15px] font-bold truncate ${value ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedOption.name}
          </span>
          <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 shrink-0 ml-1 sm:ml-2 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-orange" : "text-gray-400"}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 sm:mt-3 w-full min-w-[140px] sm:min-w-[200px] md:min-w-[240px] bg-white border border-gray-200 shadow-xl overflow-hidden z-50 py-1 rounded-sm"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col p-1 gap-0.5">
              <div
                onClick={() => { onChange(""); setIsOpen(false); }}
                className={`px-3 py-2.5 text-[13px] font-bold cursor-pointer transition-colors ${!value ? "bg-gray-50 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                {defaultLabel}
              </div>
              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`px-3 py-2.5 text-[13px] font-bold cursor-pointer transition-colors flex items-center justify-between ${value === opt.id ? "bg-gray-50 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  {opt.name}
                  {value === opt.id && <Check className="w-3.5 h-3.5" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CityShowcase() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(CITIES[0].id);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(null);

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

  const results = useMemo(() => {
    return MEDIA_INVENTORY.filter((m) => {
      if (selectedCityId && m.cityId !== selectedCityId) return false;
      if (selectedLocation && m.area !== selectedLocation) return false;
      if (selectedMediaType && m.type !== selectedMediaType) return false;
      return true;
    });
  }, [selectedCityId, selectedLocation, selectedMediaType]);

  return (
    <div className="relative min-h-screen pt-[150px] pb-24 bg-gray-50 text-gray-900 overflow-hidden">
      {/* Background & Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] z-0 pointer-events-none bg-gradient-to-b from-white to-gray-50" />
      <DotGrid />

      <div className="relative z-10 w-full">
        {/* Minimal Header */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-gray-900 mb-4 leading-[1.05]"
          >
            Explore <span className="text-brand-orange">Inventory</span>
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Search our nationwide network of premium out-of-home advertising locations.
          </p>
        </div>

        {/* Home-Page Style Filter Bar (Light Theme) */}
        <div className="max-w-[850px] mx-auto px-6 lg:px-8 mb-20 relative z-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-row items-center justify-between p-2 bg-white border border-gray-200 shadow-xl rounded-sm"
          >
            <div className="flex flex-row items-center w-full flex-1 px-2">
              <FilterDropdown 
                value={selectedCityId}
                options={CITIES}
                onChange={(val) => { setSelectedCityId(val); setSelectedMediaType(null); setSelectedLocation(null); }}
                label="Location"
                defaultLabel="Any City"
              />
              <div className="w-[1px] h-12 bg-gray-200 mx-2 shrink-0" />
              <FilterDropdown 
                value={selectedMediaType}
                options={availableMediaTypes.map(t => ({ id: t, name: t }))}
                onChange={(val) => { setSelectedMediaType(val); setSelectedLocation(null); }}
                label="Media Type"
                defaultLabel="All Types"
              />
              <div className="w-[1px] h-12 bg-gray-200 mx-2 shrink-0" />
              <FilterDropdown 
                value={selectedLocation}
                options={availableLocations.map(l => ({ id: l, name: l }))}
                onChange={(val) => setSelectedLocation(val || null)}
                label="Area"
                defaultLabel="All Areas"
              />
            </div>
            <div className="ml-4 flex w-16 h-16 items-center justify-center bg-brand-orange hover:bg-[#e65100] text-white transition-colors duration-200 cursor-pointer shadow-lg shrink-0 rounded-sm">
              <Search className="w-6 h-6" />
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8 pl-2 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-brand-orange" />
                <h3 className="text-xl md:text-2xl font-heading font-black text-gray-900 tracking-tight">
                  {results.length} {results.length === 1 ? 'Location' : 'Locations'} found
                </h3>
              </div>
            </div>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((media, idx) => (
                  <motion.div
                    key={media.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.5) }}
                  >
                    {/* Brutalist Premium Card - Light Theme */}
                    <div className="group bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer relative">
                      
                      {/* Image Container */}
                      <div className="relative h-56 w-full overflow-hidden bg-gray-100 rounded-t-sm">
                        <Image 
                          src={media.imageUrl} 
                          alt={media.locationDetails} 
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-white/95 backdrop-blur-md border border-gray-200 text-gray-900 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm shadow-sm">
                            {media.type}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1 relative z-10 bg-white">
                        <div className="flex items-center space-x-2 text-brand-orange mb-3">
                          <MapPin className="h-3 w-3" />
                          <span className="text-[10px] font-black uppercase tracking-[0.1em]">{media.cityName}, {media.area}</span>
                        </div>
                        
                        <h3 className="font-heading font-black text-xl text-brand-navy mb-2 line-clamp-2 leading-tight">
                          {media.locationDetails}
                        </h3>
                        
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1 font-medium leading-relaxed">
                          {media.description}
                        </p>
                        
                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div className="text-xs font-bold text-gray-400 tracking-[0.1em] flex items-center uppercase">
                            <Maximize className="w-3.5 h-3.5 mr-2 text-gray-300" />
                            {media.size}
                          </div>
                          <div className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm ${media.availability === 'Available' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                            {media.availability}
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-sm border border-gray-200 shadow-sm max-w-3xl mx-auto mt-8">
                <div className="h-20 w-20 bg-gray-50 rounded-sm flex items-center justify-center mx-auto mb-6 border border-gray-100">
                  <Search className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-2xl font-heading font-black text-brand-navy mb-3">No results found</h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm font-medium leading-relaxed">
                  Try adjusting your filters or selecting a different city to explore our inventory.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
