"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MapPin, Search, Maximize, Activity, Navigation2, ChevronDown, Check } from "lucide-react";
import Image from "next/image";

function CustomDropdown({ 
  value, 
  options, 
  onChange, 
  icon: Icon, 
  label,
  defaultLabel
}: { 
  value: string | null, 
  options: { id: string, name: string }[], 
  onChange: (val: string) => void,
  icon: React.ElementType,
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
    <div className="relative group w-full flex-1" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-3 rounded-xl bg-white hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200 cursor-pointer w-full"
      >
        <div className="p-2 bg-brand-blue/10 rounded-lg mr-3 text-brand-blue">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col flex-1 text-left">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-0.5">{label}</span>
          <span className="text-sm font-bold text-gray-900 truncate">
            {selectedOption.name}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ml-2 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 py-2"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col">
              <div 
                onClick={() => { onChange(""); setIsOpen(false); }}
                className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                  !value ? "bg-brand-blue/5 text-brand-blue" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {defaultLabel}
              </div>
              {options.map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                    value === opt.id ? "bg-brand-blue/5 text-brand-blue" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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

export default function CityShowcase() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(CITIES[0].id);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const availableLocations = useMemo(() => {
    if (!selectedCityId) return [];
    let media = MEDIA_INVENTORY.filter((m) => m.cityId === selectedCityId);
    const locations = new Set(media.map((m) => m.area));
    return Array.from(locations);
  }, [selectedCityId]);

  const results = useMemo(() => {
    return MEDIA_INVENTORY.filter((m) => {
      if (selectedCityId && m.cityId !== selectedCityId) return false;
      if (selectedLocation && m.area !== selectedLocation) return false;
      return true;
    });
  }, [selectedCityId, selectedLocation]);

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    setSelectedLocation(null);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-0 text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-6"
          >
            <Activity className="w-4 h-4 text-brand-blue animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Live Inventory Network
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-black font-heading tracking-tight text-gray-900 mb-4"
          >
            Explore <span className="text-brand-blue">Inventory</span>
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find the perfect out-of-home media locations across premium areas.
          </p>
        </div>

        {/* Corporate Filter Row */}
        <div className="max-w-5xl mx-auto px-4 md:px-0 mb-12 relative z-40">
          <div className="flex flex-col md:flex-row items-center justify-center p-2 bg-white border border-gray-200 rounded-2xl shadow-sm">
            
            <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-1 md:gap-4">
              <CustomDropdown 
                value={selectedCityId}
                options={CITIES}
                onChange={handleCitySelect}
                icon={MapPin}
                label="City"
                defaultLabel="Any City"
              />

              <div className="hidden sm:block w-px h-8 bg-gray-200 mx-2" />
              <CustomDropdown 
                value={selectedLocation}
                options={availableLocations.map(l => ({ id: l, name: l }))}
                onChange={(val) => setSelectedLocation(val || null)}
                icon={Navigation2}
                label="Area"
                defaultLabel="All Areas"
              />
            </div>


          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          {selectedCityId ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8 pl-2">
                <h3 className="text-2xl font-heading font-bold text-gray-900">
                  {results.length} {results.length === 1 ? 'Location' : 'Locations'} found
                </h3>
              </div>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((media, idx) => (
                    <motion.div
                      key={media.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full">
                        
                        {/* Image Container */}
                        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                          <Image 
                            src={media.imageUrl} 
                            alt={media.locationDetails} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Badge */}
                          <div className="absolute top-4 left-4 z-20">
                            <span className="bg-white/95 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                              {media.type}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center space-x-2 text-brand-blue mb-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">{media.cityName}, {media.area}</span>
                          </div>
                          
                          <h3 className="font-heading font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                            {media.locationDetails}
                          </h3>
                          
                          <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
                            {media.description}
                          </p>
                          
                          {/* Footer */}
                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div className="text-sm font-semibold text-gray-700 flex items-center">
                              <Maximize className="w-4 h-4 mr-2 text-gray-400" />
                              {media.size}
                            </div>
                            <div className={`text-xs font-bold px-3 py-1 rounded-full ${media.availability === 'Available' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                              {media.availability}
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 shadow-sm max-w-3xl mx-auto">
                  <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">No results found</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Try adjusting your filters or selecting a different city to explore our inventory.
                  </p>
                </div>
              )}
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
