"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, ChevronDown, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MediaType } from "@/types";

// ── Hero Dropdown ─────────────────────────────────────────────────────────────
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
        className="flex flex-col px-4 md:px-6 py-4 rounded-none bg-transparent hover:bg-gray-50 transition-colors duration-200 cursor-pointer w-full border-r border-transparent hover:border-gray-200"
      >
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-1 text-left">{label}</span>
        <div className="flex items-center justify-between gap-2">
          <span className={`text-base md:text-lg font-black font-heading truncate ${value ? 'text-[#030811]' : 'text-gray-900'}`}>
            {selectedOption.name}
          </span>
          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-orange" : "text-gray-400"}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white shadow-2xl overflow-hidden z-50 py-2 rounded-sm border border-gray-100"
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar flex flex-col p-1 gap-1">
              <div
                onClick={() => { onChange(""); setIsOpen(false); }}
                className={`px-4 py-3 text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors rounded-sm ${!value ? "bg-gray-50 text-brand-orange" : "text-gray-500 hover:bg-gray-50 hover:text-[#030811]"}`}
              >
                {defaultLabel}
              </div>
              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`px-4 py-3 text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors flex items-center justify-between rounded-sm ${value === opt.id ? "bg-gray-50 text-brand-orange" : "text-gray-500 hover:bg-gray-50 hover:text-[#030811]"}`}
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

// ── Hero Component ────────────────────────────────────────────────────────────
export function Hero() {
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 1000], ["0%", "15%"]);
  const textY = useTransform(scrollY, [0, 1000], [0, -80]);

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
      <section className="relative w-full h-[100vh] min-h-[700px] flex flex-col justify-center z-20 bg-[#030811] overflow-hidden">
        
        {/* Cinematic Parallax Background Image */}
        <motion.div style={{ y: imgY }} className="absolute -top-[15%] -bottom-[15%] left-0 right-0 z-0">
          <Image
            src="/images/service_classic_billboard.jpg"
            alt="City Billboards"
            fill
            className="object-cover object-[75%_center]"
            priority
          />
        </motion.div>

        {/* Premium Dark Gradients */}
        {/* Left side deep fade for typography */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#030811] via-[#030811]/90 md:via-[#030811]/75 to-transparent w-full md:w-[90%]" />
        {/* Bottom vertical gradient to ground the section */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#030811] via-[#030811]/20 to-transparent opacity-90" />
        
        {/* Extremely subtle ambient glow behind text to ensure contrast */}
        <div className="absolute top-1/4 -left-[10%] w-[500px] h-[500px] rounded-full bg-[#030811] blur-[150px] z-[2] pointer-events-none opacity-80" />

        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 xl:px-16 flex flex-col relative z-10 h-full justify-center">
          
          <div className="w-full lg:w-[70%] xl:w-[60%] flex flex-col pt-10 md:pt-0">
            
            {/* Minimalist Accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-brand-orange" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand-orange">
                Premium Outdoor Media
              </span>
            </motion.div>

            {/* Ultra-Clean Typography */}
            <motion.div style={{ y: textY }} className="flex flex-col">
              <div className="overflow-hidden mb-[-10px] md:mb-[-15px]">
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] font-black font-heading tracking-tight text-white leading-[0.9] uppercase"
                >
                  OWN THE
                </motion.h1>
              </div>
              
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] font-black font-heading tracking-tight leading-[0.9] uppercase text-white"
                >
                  SKYLINE.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl xl:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl mb-14"
              >
                Launch high-impact campaigns across India with our elite network of prime outdoor inventory. Precision reach, absolute scale.
              </motion.p>
            </motion.div>

            {/* High-Contrast Pristine White Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="w-full max-w-[900px] relative z-40"
            >
              <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-sm p-2 gap-2 relative shadow-2xl">
                
                <div className="flex flex-col md:flex-row items-stretch w-full flex-1 gap-2 md:gap-0 bg-white rounded-sm">
                  <HeroDropdown
                    value={selectedCityId}
                    options={CITIES}
                    onChange={(val) => { setSelectedCityId(val); setSelectedMediaType(null); setSelectedLocation(null); }}
                    label="Location"
                    defaultLabel="Any City"
                  />
                  <div className="hidden md:block w-px bg-gray-200 my-4" />
                  <div className="block md:hidden h-px bg-gray-200 mx-4" />
                  <HeroDropdown
                    value={selectedMediaType}
                    options={availableMediaTypes.map(t => ({ id: t, name: t }))}
                    onChange={(val) => { setSelectedMediaType(val ? (val as MediaType) : null); setSelectedLocation(null); }}
                    label="Format"
                    defaultLabel="All Types"
                  />
                  <div className="hidden md:block w-px bg-gray-200 my-4" />
                  <div className="block md:hidden h-px bg-gray-200 mx-4" />
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
                  className="flex w-full sm:w-28 md:w-36 h-16 md:h-auto items-center justify-center bg-[#030811] hover:bg-brand-orange text-white transition-all duration-300 cursor-pointer rounded-sm shrink-0 group"
                >
                  <span className="font-black tracking-widest uppercase text-[11px] mr-3 group-hover:-translate-x-1 transition-transform">Explore</span>
                  <ArrowRight className="w-5 h-5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Refined Quick Links */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Trending</span>
                {["Lucknow", "Digital OOH", "Agra", "Transit"].map((tag) => (
                  <button
                    key={tag}
                    onClick={handleSearch}
                    className="text-[10px] font-black text-white/80 hover:text-brand-orange transition-colors duration-200 uppercase tracking-widest border-b border-white/20 hover:border-brand-orange pb-0.5"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solid sharp break to light theme with an ultra-minimal marquee */}
      <div className="w-full bg-white py-5 overflow-hidden border-b border-gray-200 relative z-30">
        <div className="flex whitespace-nowrap animate-marquee-left">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-10">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">Elevate Your Brand</span>
              <span className="mx-10 text-brand-orange">✦</span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">Nationwide Reach</span>
              <span className="mx-10 text-brand-orange">✦</span>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 30s linear infinite;
        }
      `}} />
    </>
  );
}
