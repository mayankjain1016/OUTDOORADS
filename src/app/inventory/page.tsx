"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MapPin, Eye, Navigation2, SlidersHorizontal } from "lucide-react";
import Image from "next/image";



export default function Inventory() {
  const [selectedCityId, setSelectedCityId] = useState<string>("All");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);



  // Filter media based on selections
  const filteredMedia = useMemo(() => {
    return MEDIA_INVENTORY.filter((media) => {
      const matchesCity = selectedCityId !== "All" ? media.cityId === selectedCityId : true;
      const matchesArea = selectedArea !== "All" ? media.area === selectedArea : true;
      return matchesCity && matchesArea;
    });
  }, [selectedCityId, selectedArea]);

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-slate-50 overflow-hidden text-slate-900">
      
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
              {(selectedCityId !== "All" || selectedArea !== "All") && (
                <button 
                  onClick={() => { setSelectedCityId("All"); setSelectedArea("All"); }}
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
                        : 'bg-white text-slate-600 border-slate-100 hover:border-brand-blue/30 hover:bg-blue-50/30 hover:text-brand-blue hover:shadow-sm hover:translate-x-1'
                    }`}
                    onClick={() => {
                      setSelectedCityId(city.id);
                      setSelectedArea("All");
                    }}
                  >
                    <span className="font-semibold">{city.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Grid */}
        <main className="flex-1">
        <div className="mb-8 flex items-center justify-between">
          <div className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredMedia.length}</span> locations
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMedia.length > 0 ? (
              filteredMedia.map((media) => (
                <motion.div 
                  key={media.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
                >
                  
                  {/* Image Section */}
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <Image 
                      src={media.imageUrl} 
                      alt={media.locationDetails} 
                      fill
                      className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                        {media.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center space-x-2 text-slate-400 mb-3 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{media.cityName} &bull; {media.area}</span>
                    </div>
                    
                    <h3 className="font-bold text-xl text-slate-900 mb-4 line-clamp-2 leading-tight tracking-tight">
                      {media.locationDetails}
                    </h3>
                    
                    <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-end">
                      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32 px-4 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
                <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">No locations found</h3>
                <p className="text-slate-500 max-w-md mb-8">
                  We couldn&apos;t find any media inventory in this specific area. Try selecting &quot;All Areas&quot; or another city.
                </p>
                <button 
                  className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:bg-black"
                  onClick={() => {
                    setSelectedCityId("All");
                    setSelectedArea("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
        </main>
      </div>
    </div>
  );
}
