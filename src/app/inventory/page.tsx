"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MapPin, Eye, Navigation2, SlidersHorizontal, X, ArrowLeft, LayoutGrid, MonitorPlay, Presentation, Bus, Building2, CheckCircle2, Clock, Wrench } from "lucide-react";
import Image from "next/image";

// Helper function to get an icon based on category name
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("digital") || name.includes("screen")) return <MonitorPlay className="w-8 h-8" />;
  if (name.includes("hoarding") || name.includes("unipole") || name.includes("billboard") || name.includes("gantry")) return <Presentation className="w-8 h-8" />;
  if (name.includes("bus") || name.includes("transit") || name.includes("metro") || name.includes("airport")) return <Bus className="w-8 h-8" />;
  if (name.includes("wall") || name.includes("mall") || name.includes("kiosk") || name.includes("booth")) return <Building2 className="w-8 h-8" />;
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

  // 1. Get media filtered ONLY by city (for Categories View)
  const cityMedia = useMemo(() => {
    if (selectedCityId === "All") return MEDIA_INVENTORY;
    return MEDIA_INVENTORY.filter((media) => media.cityId === selectedCityId);
  }, [selectedCityId]);

  // 2. Compute categories and their counts for the selected city
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    cityMedia.forEach((media) => {
      counts[media.type] = (counts[media.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    })).sort((a, b) => b.count - a.count);
  }, [cityMedia]);

  // 3. Get the final holdings (filtered by city AND category)
  const holdings = useMemo(() => {
    if (!selectedCategory) return [];
    return cityMedia.filter((media) => media.type === selectedCategory);
  }, [cityMedia, selectedCategory]);

  return (
    <div className="relative min-h-screen pt-32 pb-16 md:pb-24 bg-slate-50 overflow-hidden text-slate-900">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-slate-50 z-0 pointer-events-none" />

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
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-900 mb-4"
        >
          Premium <span className="text-brand-blue">Inventory</span>
        </motion.h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Explore our nationwide network of exclusive outdoor advertising locations, carefully curated for maximum impact.
        </p>

        {/* Mobile Sidebar Toggle */}
        <div className="flex justify-center mt-8 md:hidden relative z-40">
          <button 
            className="flex items-center px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-semibold text-slate-700"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-8 flex flex-col md:flex-row gap-8 relative z-10">
        {/* Sidebar */}
        <aside className={`w-full md:w-72 flex-shrink-0 ${isMobileSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-900">Locations Filter</h3>
              {selectedCityId !== "All" && (
                <button 
                  onClick={() => { 
                    setSelectedCityId("All"); 
                    setSelectedCategory(null);
                  }}
                  className="text-xs text-brand-blue hover:underline font-bold"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-4">
              {CITIES.map((city) => (
                <div key={city.id} className="rounded-2xl overflow-hidden">
                  <button
                    className={`group w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-300 rounded-2xl border ${
                      selectedCityId === city.id 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                        : 'bg-white text-slate-600 border-slate-100 hover:border-brand-blue/30 hover:bg-blue-50/30 hover:text-brand-blue hover:shadow-sm hover:-translate-y-0.5'
                    }`}
                    onClick={() => {
                      setSelectedCityId(city.id);
                      setSelectedCategory(null); // Reset category when changing city
                      setExpandedId(null);
                      if (window.innerWidth < 768) setIsMobileSidebarOpen(false);
                    }}
                  >
                    <span className="font-semibold">{city.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
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
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-2xl font-black font-heading text-slate-900">
                    {selectedCityId === "All" ? "All Locations" : CITIES.find(c => c.id === selectedCityId)?.name} Categories
                  </h3>
                  <div className="text-sm text-slate-500 font-medium">
                    <span className="text-slate-900 font-bold">{categories.length}</span> categories found
                  </div>
                </div>

                {categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => setSelectedCategory(category.name)}
                        className="group cursor-pointer bg-white rounded-3xl p-8 border border-slate-200 hover:border-brand-blue/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                      >
                        {/* Subtle background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10 flex items-center justify-between mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                            {getCategoryIcon(category.name)}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors duration-300">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                          <h4 className="font-bold font-heading text-2xl text-slate-900 mb-2 group-hover:text-brand-blue transition-colors duration-300">
                            {category.name}
                          </h4>
                          <p className="text-slate-500 font-medium">
                            {category.count} {category.count === 1 ? 'Location' : 'Locations'}
                          </p>
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
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <button 
                      onClick={() => {
                        setSelectedCategory(null);
                        setExpandedId(null);
                      }}
                      className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-blue transition-colors mb-2 group"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                      Back to Categories
                    </button>
                    <h3 className="text-2xl font-black font-heading text-slate-900 flex items-center gap-3">
                      {selectedCategory}
                      <span className="text-sm font-medium px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full">
                        {holdings.length} {holdings.length === 1 ? 'Location' : 'Locations'}
                      </span>
                    </h3>
                  </div>
                </div>

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
                            <div className={`relative overflow-hidden bg-slate-100 ${isExpanded ? 'h-64 md:h-auto md:w-5/12 lg:w-1/3 shrink-0' : 'h-60 w-full'}`}>
                              <Image 
                                src={media.imageUrl} 
                                alt={media.locationDetails} 
                                fill
                                className={`object-cover transition-transform duration-[1500ms] ease-out ${isExpanded ? '' : 'group-hover:scale-105'}`}
                              />
                              <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-md text-slate-900 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border border-white/20">
                                  {media.size}
                                </span>
                              </div>
                              <div className="absolute top-4 right-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border ${status.bg} ${status.color} ${status.border}`}>
                                  {status.icon}
                                  {media.availability}
                                </span>
                              </div>
                            </div>
                            
                            {/* Content Section */}
                            <div className={`p-6 md:p-8 flex flex-col flex-1 relative ${isExpanded ? 'bg-slate-50' : ''}`}>
                              {isExpanded && (
                                <button 
                                  onClick={() => setExpandedId(null)}
                                  className="absolute top-6 right-6 p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:bg-slate-900 hover:text-white transition-colors shadow-sm"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              )}
                              <div className="flex items-center space-x-2 text-slate-500 mb-4 text-xs font-bold uppercase tracking-wider">
                                <MapPin className="h-4 w-4 text-brand-blue" />
                                <span>{media.cityName} &bull; {media.area}</span>
                              </div>
                              
                              <h3 className={`font-black font-heading text-slate-900 tracking-tight ${isExpanded ? 'mb-4 text-3xl lg:text-4xl pr-12' : 'mb-6 text-2xl line-clamp-2'}`}>
                                {media.locationDetails}
                              </h3>

                              {isExpanded && (
                                <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-2xl">{media.description}</p>
                              )}
                              
                              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                <div className="text-sm font-medium text-slate-500">
                                  ID: <span className="text-slate-900 font-bold uppercase">{media.id}</span>
                                </div>
                                <button 
                                  onClick={() => setExpandedId(isExpanded ? null : media.id)}
                                  className="flex items-center justify-center px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow-md hover:bg-brand-blue hover:shadow-lg transition-all duration-300"
                                >
                                  {isExpanded ? 'Close Details' : 'View Details'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
