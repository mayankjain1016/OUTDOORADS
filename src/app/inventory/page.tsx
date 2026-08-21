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

// Helper function to get an icon based on category name
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("digital") || name.includes("screen")) return <MonitorPlay className="w-8 h-8" />;
  if (name.includes("metro") || name.includes("pillar") || name.includes("piller")) return <Building2 className="w-8 h-8" />;
  if (name.includes("bus") || name.includes("bqs") || name.includes("shelter")) return <Bus className="w-8 h-8" />;
  if (name.includes("kiosk") || name.includes("pole")) return <Building2 className="w-8 h-8" />;
  if (name.includes("island") || name.includes("traffic")) return <Navigation2 className="w-8 h-8" />;
  if (name.includes("gantry") || name.includes("cantilever") || name.includes("cantiliver")) return <SlidersHorizontal className="w-8 h-8" />;
  if (name.includes("hoarding") || name.includes("unipole") || name.includes("billboard")) return <Presentation className="w-8 h-8" />;
  return <LayoutGrid className="w-8 h-8" />;
};

// Helper for availability status styling
const getStatusConfig = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("available")) return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: <CheckCircle2 className="w-4 h-4" /> };
  if (normalized.includes("book")) return { color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", icon: <Clock className="w-4 h-4" /> };
  return { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: <Wrench className="w-4 h-4" /> };
};

export default function Inventory() {
  const [selectedCityId, setSelectedCityId] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Total locations across all cities
  const totalNationwideCount = useMemo(() => {
    return CITIES.reduce((acc, c) => acc + c.mediaCount, 0);
  }, []);

  // 1. Compute categories and their counts for the selected city
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
    return [...cityCats]
      .map(c => ({
        name: c.category,
        count: c.count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [selectedCityId]);

  // 2. Get the final holdings (filtered by city AND category)
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
    <div className="relative min-h-screen pt-24 md:pt-32 pb-12 md:pb-24 bg-slate-50 overflow-hidden text-slate-900">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-gradient-to-b from-white to-slate-50 z-0 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 mb-6"
        >
          <Navigation2 className="w-4 h-4 text-brand-blue animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Media Network
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-900 mb-3 md:mb-4"
        >
          Premium <span className="text-brand-blue">Inventory</span>
        </motion.h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-light">
          Where Visibility Meets Impact
        </p>

        {/* Mobile Sidebar Toggle */}
        <div className="flex justify-center mt-8 md:hidden relative z-40">
          <button 
            className="flex items-center px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2 text-brand-blue" />
            <span>{activeCityName}</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-4 md:mt-8 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Mobile Slide-Out Drawer (AnimatePresence) */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-[100] flex justify-end">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              <motion.div 
                initial={{ x: "100%" }} 
                animate={{ x: 0 }} 
                exit={{ x: "100%" }} 
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Locations Filter</h3>
                    <p className="text-xs text-slate-500">Select city to view categories</p>
                  </div>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-2.5">
                  {/* All Locations Button */}
                  <button
                    className={`group w-full flex items-center justify-between px-4 py-3.5 text-left transition-all duration-300 rounded-2xl border ${
                      selectedCityId === "All" 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                        : 'bg-white text-slate-700 border-slate-100'
                    }`}
                    onClick={() => {
                      setSelectedCityId("All");
                      setSelectedCategory(null);
                      setExpandedId(null);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">All Locations</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      selectedCityId === "All" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                      {totalNationwideCount}
                    </span>
                  </button>

                  {/* Individual Cities */}
                  {CITIES.map((city) => (
                    <button
                      key={city.id}
                      className={`group w-full flex items-center justify-between px-4 py-3.5 text-left transition-all duration-300 rounded-2xl border ${
                        selectedCityId === city.id 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-white text-slate-700 border-slate-100'
                      }`}
                      onClick={() => {
                        setSelectedCityId(city.id);
                        setSelectedCategory(null);
                        setExpandedId(null);
                        setIsMobileSidebarOpen(false);
                      }}
                    >
                      <span className="font-semibold text-sm">{city.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        selectedCityId === city.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        {city.mediaCount}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="p-5 sm:p-6 border-t border-slate-100 flex items-center gap-3 bg-slate-50">
                  <button 
                    onClick={() => { 
                      setSelectedCityId("All"); 
                      setSelectedCategory(null); 
                      setIsMobileSidebarOpen(false);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold bg-white text-sm"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="flex-[2] px-4 py-3 rounded-xl bg-brand-blue text-white font-bold text-sm shadow-md"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0 hidden md:block">
          <div className="sticky top-28 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Locations Filter</h3>
                <p className="text-xs text-slate-400 font-medium">Filter inventory by city</p>
              </div>
              {selectedCityId !== "All" && (
                <button 
                  onClick={() => { 
                    setSelectedCityId("All"); 
                    setSelectedCategory(null);
                    setExpandedId(null);
                  }}
                  className="text-xs text-brand-blue hover:underline font-bold"
                >
                  Show All
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {/* All Locations Option */}
              <button
                className={`group w-full flex items-center justify-between px-4 py-3.5 text-left transition-all duration-300 rounded-2xl border ${
                  selectedCityId === "All" 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-brand-blue/30 hover:bg-blue-50/30 hover:text-brand-blue hover:shadow-sm hover:-translate-y-0.5'
                }`}
                onClick={() => {
                  setSelectedCityId("All");
                  setSelectedCategory(null);
                  setExpandedId(null);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">All Locations</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  selectedCityId === "All" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-brand-blue/10 group-hover:text-brand-blue"
                }`}>
                  {totalNationwideCount}
                </span>
              </button>

              {/* Cities */}
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  className={`group w-full flex items-center justify-between px-4 py-3.5 text-left transition-all duration-300 rounded-2xl border ${
                    selectedCityId === city.id 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10' 
                      : 'bg-white text-slate-600 border-slate-100 hover:border-brand-blue/30 hover:bg-blue-50/30 hover:text-brand-blue hover:shadow-sm hover:-translate-y-0.5'
                  }`}
                  onClick={() => {
                    setSelectedCityId(city.id);
                    setSelectedCategory(null); // Reset category when changing city
                    setExpandedId(null);
                  }}
                >
                  <span className="font-semibold text-sm">{city.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedCityId === city.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-brand-blue/10 group-hover:text-brand-blue"
                  }`}>
                    {city.mediaCount}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick stats footer box in sidebar */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>Prime Media Footprint</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Over 1,300+ strategic OOH formats covering prime high-footfall intersections.
              </p>
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 flex items-center gap-2">
                      <span>{activeCityName} Categories</span>
                      {selectedCityId !== "All" && (
                        <span className="text-xs font-bold px-2.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded-full">
                          {CITIES.find(c => c.id === selectedCityId)?.mediaCount} Total
                        </span>
                      )}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Select a media category below to explore specific locations and inventory details.
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium shrink-0">
                    <span className="text-slate-900 font-bold">{categories.length}</span> {categories.length === 1 ? "category" : "categories"}
                  </div>
                </div>

                {categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => setSelectedCategory(category.name)}
                        className="group cursor-pointer bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-200 hover:border-brand-blue/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                      >
                        {/* Subtle background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10 flex items-center justify-between mb-4 md:mb-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shadow-sm shrink-0 [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8">
                            {getCategoryIcon(category.name)}
                          </div>
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors duration-300">
                            <Eye className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                          <h3 className="font-bold font-heading text-lg sm:text-xl md:text-2xl text-slate-900 mb-1.5 group-hover:text-brand-blue transition-colors duration-300 leading-tight">
                            {category.name}
                          </h3>
                          <div className="flex items-center justify-between text-slate-500 font-medium text-xs md:text-sm">
                            <span className="text-slate-900 font-black text-sm md:text-base">
                              {category.count} <span className="font-medium text-xs md:text-sm text-slate-500">{category.count === 1 ? 'Location' : 'Locations'}</span>
                            </span>
                            <span className="text-xs font-bold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              View Details &rarr;
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
                    <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <MapPin className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">No categories found</h3>
                    <p className="text-slate-500 max-w-md mb-8">
                      We couldn&apos;t find any media inventory for this specific city. Try selecting &quot;All Locations&quot; or another city.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* VIEW 2: HOLDINGS GRID */}
            {selectedCategory !== null && (
              <motion.div
                key="holdings-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <button 
                      onClick={() => {
                        setSelectedCategory(null);
                        setExpandedId(null);
                      }}
                      className="inline-flex items-center text-xs md:text-sm font-bold text-slate-500 hover:text-brand-blue transition-colors mb-1.5 md:mb-2 group cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                      Back to {activeCityName} Categories
                    </button>
                    <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 flex items-center gap-2 md:gap-3">
                      <span>{selectedCategory}</span>
                      <span className="text-[11px] md:text-sm font-bold px-3 py-0.5 bg-brand-blue/10 text-brand-blue rounded-full">
                        {categories.find(c => c.name === selectedCategory)?.count || holdings.length} {categories.find(c => c.name === selectedCategory)?.count === 1 ? 'Location' : 'Locations'} ({activeCityName})
                      </span>
                    </h2>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-brand-blue text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Inquire for {selectedCategory}</span>
                  </Link>
                </div>

                {holdings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-start">
                    <AnimatePresence mode="wait">
                      {holdings.map((media) => {
                        const isExpanded = expandedId === media.id;
                        const status = getStatusConfig(media.availability);
                        
                        return (
                          <motion.div 
                            key={media.id} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 ${
                              isExpanded 
                                ? 'col-span-full shadow-2xl ring-4 ring-slate-900/5 border-slate-300' 
                                : 'hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1'
                            }`}
                          >
                            <div className={`flex ${isExpanded ? 'flex-col md:flex-row' : 'flex-col'} w-full`}>
                              {/* Image Section */}
                              <div className={`relative overflow-hidden bg-slate-100 shrink-0 ${isExpanded ? 'h-56 sm:h-64 md:h-auto md:w-5/12 lg:w-1/3' : 'h-48 sm:h-52 md:h-60 w-full'}`}>
                                <Image 
                                  src={media.imageUrl} 
                                  alt={media.locationDetails} 
                                  fill
                                  className={`object-cover transition-transform duration-[1500ms] ease-out ${isExpanded ? '' : 'group-hover:scale-105'}`}
                                />
                                <div className="absolute top-3 md:top-4 left-3 md:left-4 flex flex-col gap-2">
                                  <span className="inline-block px-2.5 py-1 md:px-3 md:py-1.5 bg-white/95 backdrop-blur-md text-slate-900 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-sm border border-white/20">
                                    {media.size}
                                  </span>
                                </div>
                                <div className="absolute top-3 md:top-4 right-3 md:right-4">
                                  <span className={`inline-flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-sm border ${status.bg} ${status.color} ${status.border}`}>
                                    {status.icon}
                                    {media.availability}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Content Section */}
                              <div className={`p-4 sm:p-5 md:p-8 flex flex-col flex-1 relative ${isExpanded ? 'bg-slate-50' : ''}`}>
                                {isExpanded && (
                                  <button 
                                    onClick={() => setExpandedId(null)}
                                    className="absolute top-4 right-4 md:top-6 md:right-6 p-1.5 md:p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:bg-slate-900 hover:text-white transition-colors shadow-sm"
                                  >
                                    <X className="w-4 h-4 md:w-5 md:h-5" />
                                  </button>
                                )}
                                <div className="flex items-center space-x-1.5 md:space-x-2 text-slate-500 mb-2 md:mb-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                  <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand-blue" />
                                  <span>{media.cityName} &bull; {media.area}</span>
                                </div>
                                
                                <h3 className={`font-black font-heading text-slate-900 tracking-tight ${isExpanded ? 'mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl pr-10 md:pr-12' : 'mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl line-clamp-2 leading-tight'}`}>
                                  {media.locationDetails}
                                </h3>

                                {isExpanded && (
                                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-2xl">{media.description}</p>
                                )}
                                
                                <div className="mt-auto pt-4 md:pt-6 border-t border-slate-100 flex items-center justify-between">
                                  <div className="text-xs md:text-sm font-medium text-slate-500">
                                    ID: <span className="text-slate-900 font-bold uppercase">{media.id}</span>
                                  </div>
                                  <button 
                                    onClick={() => setExpandedId(isExpanded ? null : media.id)}
                                    className="flex items-center justify-center px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-slate-900 text-white text-xs md:text-sm font-bold shadow-md hover:bg-brand-blue hover:shadow-lg transition-all duration-300 cursor-pointer"
                                  >
                                    {isExpanded ? 'Close' : 'Details'}
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
                  <div className="p-8 md:p-12 bg-white rounded-3xl border border-slate-200 text-center shadow-sm max-w-2xl mx-auto my-8">
                    <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {getCategoryIcon(selectedCategory)}
                    </div>
                    <h3 className="text-2xl font-black font-heading text-slate-900 mb-2">
                      {categories.find(c => c.name === selectedCategory)?.count || 0} {selectedCategory} Available in {activeCityName}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-lg mx-auto">
                      We have exclusive rights and active media sites across all prime commercial roads in {activeCityName}. Get in touch with our media planning team to receive the detailed media deck, coordinates, and live availability matrix.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-blue text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-all"
                      >
                        Request Media Deck &amp; Rates
                      </Link>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        View Other Categories
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
