"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES, CITY_CATEGORY_STATS, MEDIA_INVENTORY } from "@/data";
import { 
  MapPin, 
  Eye, 
  Navigation2, 
  SlidersHorizontal, 
  X, 
  ArrowLeft, 
  LayoutGrid, 
  MonitorPlay, 
  Presentation, 
  Bus, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Wrench,
  PhoneCall,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Light Theme Dot grid (Subtle pattern) ───────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="inventory-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.03)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#inventory-dots)" />
      </svg>
    </div>
  );
}

const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("digital") || name.includes("screen")) return <MonitorPlay className="w-6 h-6" />;
  if (name.includes("metro") || name.includes("pillar") || name.includes("piller")) return <Building2 className="w-6 h-6" />;
  if (name.includes("bus") || name.includes("bqs") || name.includes("shelter")) return <Bus className="w-6 h-6" />;
  if (name.includes("kiosk") || name.includes("pole")) return <Building2 className="w-6 h-6" />;
  if (name.includes("island") || name.includes("traffic")) return <Navigation2 className="w-6 h-6" />;
  if (name.includes("gantry") || name.includes("cantilever") || name.includes("cantiliver")) return <SlidersHorizontal className="w-6 h-6" />;
  if (name.includes("hoarding") || name.includes("unipole") || name.includes("billboard")) return <Presentation className="w-6 h-6" />;
  return <LayoutGrid className="w-6 h-6" />;
};

const getStatusConfig = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("available")) return { color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
  if (normalized.includes("book")) return { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", icon: <Clock className="w-3.5 h-3.5" /> };
  return { color: "text-gray-500", bg: "bg-gray-100", border: "border-gray-200", icon: <Wrench className="w-3.5 h-3.5" /> };
};

export default function Inventory() {
  const [selectedCityId, setSelectedCityId] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalNationwideCount = useMemo(() => {
    return CITIES.reduce((acc, c) => acc + c.mediaCount, 0);
  }, []);

  const categories = useMemo(() => {
    if (selectedCityId === "All") {
      const aggMap: Record<string, number> = {};
      Object.values(CITY_CATEGORY_STATS).forEach(cityCats => {
        cityCats.forEach(({ category, count }) => {
          aggMap[category] = (aggMap[category] || 0) + count;
        });
      });
      return Object.entries(aggMap)
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort((a, b) => b.count - a.count);
    }
    const cityCats = CITY_CATEGORY_STATS[selectedCityId] || [];
    return [...cityCats].map(c => ({ name: c.category, count: c.count })).sort((a, b) => b.count - a.count);
  }, [selectedCityId]);

  const holdings = useMemo(() => {
    if (!selectedCategory) return [];
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetNorm = normalize(selectedCategory);
    return MEDIA_INVENTORY.filter((media) => {
      const matchCity = selectedCityId === "All" || media.cityId === selectedCityId;
      if (!matchCity) return false;
      const mediaTypeNorm = normalize(media.type);
      return (
        media.type === selectedCategory ||
        mediaTypeNorm.includes(targetNorm) ||
        targetNorm.includes(mediaTypeNorm)
      );
    });
  }, [selectedCityId, selectedCategory]);

  const activeCityName = useMemo(() => {
    if (selectedCityId === "All") return "All Locations";
    return CITIES.find((c) => c.id === selectedCityId)?.name || selectedCityId;
  }, [selectedCityId]);

  return (
    <div className="relative min-h-screen pt-24 md:pt-36 pb-12 md:pb-24 bg-gray-50 overflow-hidden text-gray-900">
      
      {/* Background Gradient & Pattern */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />
      <DotGrid />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-gray-900 mb-4 leading-[1.05]"
        >
          Media <span className="text-brand-orange">Catalog</span>
        </motion.h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
          Browse our entire premium network, organized by city and media format.
        </p>

        {/* Mobile Sidebar Toggle */}
        <div className="flex justify-center mt-8 md:hidden relative z-40">
          <button 
            className="flex items-center px-6 py-3 bg-brand-navy text-white rounded-sm shadow-xl text-sm font-bold uppercase tracking-wider hover:bg-[#1a2942] transition-colors cursor-pointer"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span>Filter: {activeCityName}</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row gap-10 relative z-10">
        
        {/* Mobile Slide-Out Drawer (AnimatePresence) */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-[100] flex justify-end">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              <motion.div 
                initial={{ x: "100%" }} 
                animate={{ x: 0 }} 
                exit={{ x: "100%" }} 
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col border-l border-gray-200 rounded-l-sm"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div>
                    <h3 className="font-black font-heading text-xl text-gray-900 tracking-tight">Locations</h3>
                  </div>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors rounded-sm border border-gray-200">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {/* All Locations */}
                  <button
                    className={`group w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-300 rounded-sm border ${
                      selectedCityId === "All" 
                        ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedCityId("All");
                      setSelectedCategory(null);
                      setExpandedId(null);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    <span className="font-bold text-sm tracking-wide">All Locations</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-sm ${
                      selectedCityId === "All" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {totalNationwideCount}
                    </span>
                  </button>

                  {/* Cities */}
                  {CITIES.map((city) => (
                    <button
                      key={city.id}
                      className={`group w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-300 rounded-sm border ${
                        selectedCityId === city.id 
                          ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedCityId(city.id);
                        setSelectedCategory(null);
                        setExpandedId(null);
                        setIsMobileSidebarOpen(false);
                      }}
                    >
                      <span className="font-bold text-sm tracking-wide">{city.name}</span>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-sm ${
                        selectedCityId === city.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {city.mediaCount}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <aside className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 hidden md:block">
          <div className="sticky top-28 bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-black font-heading text-xl text-brand-navy tracking-tight uppercase">Filter By City</h3>
              {selectedCityId !== "All" && (
                <button 
                  onClick={() => { 
                    setSelectedCityId("All"); 
                    setSelectedCategory(null);
                    setExpandedId(null);
                  }}
                  className="text-[10px] uppercase font-black tracking-wider text-brand-orange hover:text-[#e65100]"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-3">
              {/* All Locations Option */}
              <button
                className={`group w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-300 rounded-sm border ${
                  selectedCityId === "All" 
                    ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-navy hover:text-brand-navy hover:shadow-sm'
                }`}
                onClick={() => {
                  setSelectedCityId("All");
                  setSelectedCategory(null);
                  setExpandedId(null);
                }}
              >
                <span className="font-bold text-sm tracking-wide">All Locations</span>
                <span className={`text-[10px] font-black px-2 py-1 rounded-sm ${
                  selectedCityId === "All" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  {totalNationwideCount}
                </span>
              </button>

              {/* Cities */}
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  className={`group w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-300 rounded-sm border ${
                    selectedCityId === city.id 
                      ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-brand-navy hover:text-brand-navy hover:shadow-sm'
                  }`}
                  onClick={() => {
                    setSelectedCityId(city.id);
                    setSelectedCategory(null);
                    setExpandedId(null);
                  }}
                >
                  <span className="font-bold text-sm tracking-wide">{city.name}</span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-sm ${
                    selectedCityId === city.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}>
                    {city.mediaCount}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: CATEGORY GRID */}
            {selectedCategory === null && (
              <motion.div
                key="categories-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-black font-heading text-brand-navy tracking-tight flex items-center gap-3 uppercase">
                    {activeCityName} 
                    {selectedCityId !== "All" && (
                      <span className="text-[10px] font-bold tracking-widest px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-sm border border-brand-orange/20">
                        {CITIES.find(c => c.id === selectedCityId)?.mediaCount} Total
                      </span>
                    )}
                  </h2>
                </div>

                {categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => setSelectedCategory(category.name)}
                        className="group cursor-pointer bg-white rounded-sm p-6 border border-gray-200 hover:border-brand-navy hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                      >
                        <div className="relative z-10 flex items-start justify-between mb-8">
                          <div className="text-gray-900 group-hover:text-brand-orange transition-colors duration-300">
                            {getCategoryIcon(category.name)}
                          </div>
                          <div className="text-[10px] font-black text-gray-400 group-hover:text-brand-navy uppercase tracking-widest transition-colors duration-300 flex items-center gap-1">
                            Explore <Eye className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                          <h3 className="font-black font-heading text-xl text-gray-900 mb-2 group-hover:text-brand-navy transition-colors duration-300 leading-tight">
                            {category.name}
                          </h3>
                          <div className="flex items-center text-gray-500 font-medium text-sm">
                            <span className="font-bold text-brand-orange mr-1.5">{category.count}</span> Sites
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 px-6 bg-white rounded-sm border border-gray-200 text-center shadow-sm">
                    <div className="h-20 w-20 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center mb-6">
                      <MapPin className="h-8 w-8 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-black font-heading text-brand-navy mb-3 tracking-tight">No categories found</h3>
                    <p className="text-gray-500 max-w-md font-medium">
                      Try selecting "All Locations" or another city.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* VIEW 2: HOLDINGS GRID */}
            {selectedCategory !== null && (
              <motion.div
                key="holdings-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 border-b border-gray-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <button 
                      onClick={() => {
                        setSelectedCategory(null);
                        setExpandedId(null);
                      }}
                      className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors mb-3 group cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
                      Back to Categories
                    </button>
                    <h2 className="text-2xl md:text-3xl font-black font-heading text-brand-navy flex items-center gap-3 uppercase tracking-tight">
                      {selectedCategory}
                      <span className="text-[10px] md:text-[11px] font-bold px-3 py-1 bg-brand-navy text-white rounded-sm tracking-widest align-middle">
                        {categories.find(c => c.name === selectedCategory)?.count || holdings.length} SITES
                      </span>
                    </h2>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-brand-orange hover:bg-[#e65100] text-white text-[11px] font-black tracking-widest uppercase shadow-md transition-all shrink-0"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Inquire Now</span>
                  </Link>
                </div>

                {holdings.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                    <AnimatePresence mode="wait">
                      {holdings.map((media) => {
                        const isExpanded = expandedId === media.id;
                        const status = getStatusConfig(media.availability);
                        
                        return (
                          <motion.div 
                            key={media.id} 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className={`group flex flex-col bg-white border border-gray-200 overflow-hidden transition-all duration-300 rounded-sm ${
                              isExpanded 
                                ? 'col-span-full shadow-2xl border-brand-navy scale-[1.01] z-20' 
                                : 'hover:border-brand-orange hover:shadow-xl'
                            }`}
                          >
                            <div className={`flex ${isExpanded ? 'flex-col md:flex-row' : 'flex-col'} w-full h-full`}>
                              
                              {/* Image Section */}
                              <div className={`relative overflow-hidden bg-gray-100 shrink-0 ${isExpanded ? 'h-64 md:h-auto md:w-1/2' : 'h-56 w-full'}`}>
                                <Image 
                                  src={media.imageUrl} 
                                  alt={media.locationDetails} 
                                  fill
                                  className={`object-cover transition-transform duration-[1500ms] ease-out ${isExpanded ? '' : 'group-hover:scale-105'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-60" />
                                
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                  <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-md text-brand-navy rounded-sm text-[9px] font-black tracking-[0.2em] uppercase shadow-sm border border-gray-200">
                                    {media.size}
                                  </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.1em] shadow-sm border ${status.bg} ${status.color} ${status.border}`}>
                                    {status.icon}
                                    {media.availability}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Content Section */}
                              <div className={`p-6 md:p-8 flex flex-col flex-1 relative bg-white`}>
                                {isExpanded && (
                                  <button 
                                    onClick={() => setExpandedId(null)}
                                    className="absolute top-4 right-4 p-2 bg-gray-50 border border-gray-200 rounded-sm text-gray-500 hover:bg-brand-navy hover:text-white transition-colors shadow-sm"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                                
                                <div className="flex items-center space-x-2 text-brand-orange mb-3 text-[10px] font-black uppercase tracking-wider">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{media.cityName} &bull; {media.area}</span>
                                </div>
                                
                                <h3 className={`font-black font-heading text-brand-navy tracking-tight ${isExpanded ? 'mb-4 text-3xl md:text-4xl pr-10' : 'mb-4 text-xl line-clamp-2 leading-tight'}`}>
                                  {media.locationDetails}
                                </h3>

                                {isExpanded ? (
                                  <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-2xl font-medium">{media.description}</p>
                                ) : (
                                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-2 flex-1">{media.description}</p>
                                )}
                                
                                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    ID: <span className="text-brand-navy">{media.id}</span>
                                  </div>
                                  <button 
                                    onClick={() => setExpandedId(isExpanded ? null : media.id)}
                                    className={`flex items-center justify-center px-6 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-widest shadow-sm transition-all duration-300 cursor-pointer ${isExpanded ? 'bg-brand-navy text-white hover:bg-black' : 'bg-gray-100 text-brand-navy hover:bg-brand-navy hover:text-white'}`}
                                  >
                                    {isExpanded ? 'Close View' : 'Details'}
                                  </button>
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="p-12 bg-white rounded-sm border border-gray-200 text-center shadow-sm max-w-2xl mx-auto my-12">
                    <div className="w-16 h-16 bg-gray-50 border border-gray-100 text-brand-navy rounded-sm flex items-center justify-center mx-auto mb-6">
                      {getCategoryIcon(selectedCategory)}
                    </div>
                    <h3 className="text-2xl font-black font-heading text-brand-navy mb-3">
                      {categories.find(c => c.name === selectedCategory)?.count || 0} {selectedCategory} Sites
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-lg mx-auto">
                      We maintain extensive inventory in this category. Contact our planning team for the full coordinate matrix and live availability.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto px-8 py-4 rounded-sm bg-brand-navy text-white text-[11px] uppercase tracking-widest font-black shadow-md hover:bg-black transition-all"
                      >
                        Request Media Deck
                      </Link>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="w-full sm:w-auto px-8 py-4 rounded-sm border border-gray-200 text-gray-700 text-[11px] uppercase tracking-widest font-black hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        Back to Categories
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
