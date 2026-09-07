"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MediaType } from "@/types";
import { BillboardSlideshow } from "./BillboardSlideshow";

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
        className="flex flex-col px-1.5 sm:px-3 md:px-6 py-1.5 md:py-2.5 rounded-sm bg-transparent hover:bg-white/5 transition-colors duration-200 cursor-pointer w-full"
      >
        <span className="text-[9px] md:text-[11px] font-bold tracking-widest uppercase text-white/50 mb-0.5 text-left">{label}</span>
        <div className="flex items-center justify-between gap-0.5 sm:gap-1">
          <span className={`text-[12px] md:text-[15px] font-semibold truncate ${value ? 'text-white' : 'text-white/80'}`}>
            {selectedOption.name}
          </span>
          <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 shrink-0 ml-1 sm:ml-2 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-orange" : "text-white/40"}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 sm:mt-3 w-full min-w-[140px] sm:min-w-[200px] md:min-w-[240px] bg-brand-navy border border-white/10 shadow-2xl overflow-hidden z-50 py-1"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col p-1 gap-0.5">
              <div
                onClick={() => { onChange(""); setIsOpen(false); }}
                className={`px-3 py-2.5 text-[13px] font-medium cursor-pointer transition-colors ${!value ? "bg-white/5 text-brand-orange" : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {defaultLabel}
              </div>
              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`px-3 py-2.5 text-[13px] font-medium cursor-pointer transition-colors flex items-center justify-between ${value === opt.id ? "bg-white/5 text-brand-orange" : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
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
      {/* Mobile-Only Wrapper */}
      <section className="block md:hidden relative w-full min-h-[550px] flex flex-col pt-[100px] z-20">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/HeroBG.jpeg"
            alt="Premium Billboard Advertising"
            fill
            className="object-cover object-[70%_top] opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081221] via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
        </div>

        <div className="px-6 py-8 w-full text-left flex flex-col items-start z-10 relative mt-auto pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-black font-heading tracking-tight text-white leading-[1.05] mb-4"
          >
            Premium Outdoor <br />
            <span className="text-brand-orange">Advertising.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-white/80 font-medium leading-relaxed max-w-sm mb-6"
          >
            Connect with your audience in the real world. Elevate your brand with our premium outdoor advertising network.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-full relative z-40"
          >
            <div className="flex flex-row items-center justify-between p-1.5 bg-brand-navy/95 backdrop-blur-md border border-brand-navy/20 shadow-2xl">
              <div className="flex flex-row items-center w-full flex-1 min-w-0">
                <HeroDropdown
                  value={selectedCityId}
                  options={CITIES}
                  onChange={(val) => { setSelectedCityId(val); setSelectedMediaType(null); setSelectedLocation(null); }}
                  label="Location"
                  defaultLabel="Any City"
                />
                <div className="w-[1px] h-8 bg-white/10 shrink-0" />
                <HeroDropdown
                  value={selectedMediaType}
                  options={availableMediaTypes.map(t => ({ id: t, name: t }))}
                  onChange={(val) => { setSelectedMediaType(val ? (val as MediaType) : null); setSelectedLocation(null); }}
                  label="Media"
                  defaultLabel="All Types"
                />
              </div>
              <div
                onClick={handleSearch}
                className="ml-2 flex w-12 h-12 items-center justify-center bg-brand-orange hover:bg-[#e65100] text-white transition-colors duration-200 cursor-pointer shadow-lg shrink-0"
              >
                <Search className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Desktop-Only Wrapper */}
      <section className="hidden md:flex relative flex-col justify-end min-h-[90vh] z-20">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/HeroBG.jpeg"
            alt="Premium Billboard Advertising"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081221]/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081221] via-transparent to-transparent" />
          <BillboardSlideshow />
        </div>

        <div className="relative z-10 flex flex-col justify-end w-full pb-24 pt-[15vh]">
          <div className="px-12 max-w-7xl mx-auto w-full">

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black font-heading tracking-tight text-white leading-[1.05] mb-6"
            >
              Premium Outdoor <br />
              <span className="text-brand-orange">Advertising.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-white/80 font-medium leading-relaxed mb-12 max-w-xl"
            >
              Command attention with India's most premium outdoor advertising network. We build landmarks, not just ads.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-full max-w-[850px] relative z-40"
            >
              <div className="flex flex-row items-center justify-between p-2 bg-brand-navy border border-brand-navy shadow-2xl rounded-sm">
                <div className="flex flex-row items-center w-full flex-1 px-2">
                  <HeroDropdown
                    value={selectedCityId}
                    options={CITIES}
                    onChange={(val) => { setSelectedCityId(val); setSelectedMediaType(null); setSelectedLocation(null); }}
                    label="Location"
                    defaultLabel="Any City"
                  />
                  <div className="w-[1px] h-12 bg-white/10 mx-2" />
                  <HeroDropdown
                    value={selectedMediaType}
                    options={availableMediaTypes.map(t => ({ id: t, name: t }))}
                    onChange={(val) => { setSelectedMediaType(val ? (val as MediaType) : null); setSelectedLocation(null); }}
                    label="Media Type"
                    defaultLabel="All Types"
                  />
                  <div className="w-[1px] h-12 bg-white/10 mx-2" />
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
                  className="ml-4 flex w-16 h-16 items-center justify-center rounded-sm bg-brand-orange hover:bg-[#e65100] text-white transition-colors duration-200 cursor-pointer shadow-lg shrink-0"
                >
                  <Search className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
