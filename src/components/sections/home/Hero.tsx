"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MediaType } from "@/types";

// ─── Dropdown for desktop hero filter ───────────────────────────────────────
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
    <div className="relative group flex-1 min-w-0" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col px-1.5 sm:px-3 md:px-6 py-1.5 md:py-2.5 rounded-full bg-transparent hover:bg-white/5 transition-colors duration-200 cursor-pointer w-full"
      >
        <span className="text-[7px] sm:text-[9px] md:text-[11px] font-medium tracking-wide text-white/50 mb-0.5 text-left">{label}</span>
        <div className="flex items-center justify-between gap-0.5 sm:gap-1">
          <span className={`text-[9px] sm:text-[12px] md:text-[15px] font-semibold truncate ${value ? 'text-white' : 'text-white/80'}`}>
            {selectedOption.name}
          </span>
          <ChevronDown className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0 ml-1 sm:ml-2 transition-transform duration-200 ${isOpen ? "rotate-180 text-white" : "text-white/40"}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 sm:mt-3 w-full min-w-[140px] sm:min-w-[200px] md:min-w-[240px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden z-50 py-1 sm:py-1.5"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col p-1 sm:p-1.5 gap-0.5">
              <div 
                onClick={() => { onChange(""); setIsOpen(false); }}
                className={`px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-[14px] font-medium cursor-pointer transition-colors ${
                  !value ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {defaultLabel}
              </div>
              {options.map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-[14px] font-medium cursor-pointer transition-colors flex items-center justify-between ${
                    value === opt.id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {opt.name}
                  {value === opt.id && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Hero Component ──────────────────────────────────────────────────────────
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
    <>
      {/* Mobile-Only Wrapper: Image positioned behind content (edge-to-edge) */}
      <section className="block md:hidden relative w-full min-h-[500px] flex flex-col pt-[90px] overflow-visible z-20">
        {/* Absolute Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/Hero_image.jpeg"
            alt="Premium Billboard Advertising"
            fill
            className="object-cover object-[70%_top]"
            priority
          />
        </div>
        
        {/* Mobile Content (Overlays the image) */}
        <div className="px-4 py-6 w-full text-left flex flex-col items-start z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-gray-900 leading-[1.05] mb-4"
          >
            Premium Outdoor <br />
            <span className="text-brand-blue">Advertising.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed max-w-sm"
          >
            Command attention in the physical world. Access India&apos;s most premium, high-traffic advertising network.
          </motion.p>

          {/* Mobile Horizontal Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-full mt-8 relative z-40"
          >
            <div className="flex flex-row items-center justify-between p-1 sm:p-1.5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
              <div className="flex flex-row items-center w-full flex-1 px-0.5 sm:px-1 min-w-0">
                <HeroDropdown 
                  value={selectedCityId}
                  options={CITIES}
                  onChange={(val) => { setSelectedCityId(val); setSelectedMediaType(null); setSelectedLocation(null); }}
                  label="Location"
                  defaultLabel="Any City"
                />
                <div className="w-[1px] h-6 sm:h-8 bg-white/10 shrink-0" />
                <HeroDropdown 
                  value={selectedMediaType}
                  options={availableMediaTypes.map(t => ({ id: t, name: t }))}
                  onChange={(val) => { setSelectedMediaType(val ? (val as MediaType) : null); setSelectedLocation(null); }}
                  label="Media Type"
                  defaultLabel="All Types"
                />
                <div className="w-[1px] h-6 sm:h-8 bg-white/10 shrink-0" />
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
                className="ml-1 sm:ml-2 flex w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-brand-blue hover:bg-blue-500 text-white transition-colors duration-200 cursor-pointer shadow-lg shrink-0"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Desktop-Only Wrapper: Full screen exact layout */}
      <section className="hidden md:flex relative overflow-visible flex-col justify-end min-h-screen z-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/Hero_image.jpeg"
            alt="Premium Billboard Advertising"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col justify-end w-full">
          <div className="px-12 pb-16 max-w-7xl mx-auto w-full">
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.8rem] lg:text-[3.8rem] xl:text-[5.8rem] font-black font-heading tracking-tight text-gray-900 leading-[1.05] mb-6"
            >
              Premium Outdoor <br />
              <span className="text-brand-blue">Advertising.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-gray-900 font-medium leading-relaxed mb-12 max-w-2xl"
            >
              Command attention in the physical world. Access India&apos;s most premium, high-traffic advertising network.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-full max-w-[800px] relative z-40"
            >
              <div className="flex flex-row items-center justify-between p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
                <div className="flex flex-row items-center w-full flex-1 px-1">
                  <HeroDropdown 
                    value={selectedCityId}
                    options={CITIES}
                    onChange={(val) => { setSelectedCityId(val); setSelectedMediaType(null); setSelectedLocation(null); }}
                    label="Location"
                    defaultLabel="Any City"
                  />
                  <div className="w-[1px] h-10 bg-white/10 mx-1" />
                  <HeroDropdown 
                    value={selectedMediaType}
                    options={availableMediaTypes.map(t => ({ id: t, name: t }))}
                    onChange={(val) => { setSelectedMediaType(val ? (val as MediaType) : null); setSelectedLocation(null); }}
                    label="Media Type"
                    defaultLabel="All Types"
                  />
                  <div className="w-[1px] h-10 bg-white/10 mx-1" />
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
                  className="ml-3 flex w-14 h-14 items-center justify-center rounded-full bg-brand-blue hover:bg-blue-500 text-white transition-colors duration-200 cursor-pointer shadow-lg shrink-0"
                >
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
