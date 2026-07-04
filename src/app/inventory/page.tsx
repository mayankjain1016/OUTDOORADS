"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPin, Search, ChevronDown, ChevronUp, SlidersHorizontal, Eye } from "lucide-react";
import Image from "next/image";

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCityId, setExpandedCityId] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toggle city accordion in sidebar
  const toggleCity = (cityId: string) => {
    if (expandedCityId === cityId) {
      setExpandedCityId(null);
    } else {
      setExpandedCityId(cityId);
    }
  };

  // Filter media based on selections and search
  const filteredMedia = useMemo(() => {
    return MEDIA_INVENTORY.filter((media) => {
      const matchesSearch = 
        media.locationDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
        media.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCityId ? media.cityId === selectedCityId : true;
      const matchesArea = selectedArea ? media.area === selectedArea : true;
      return matchesSearch && matchesCity && matchesArea;
    });
  }, [searchQuery, selectedCityId, selectedArea]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-primary-foreground">
      {/* Header */}
      <div className="bg-white border-b border-primary-200 pt-10 pb-8 px-4 md:px-8 shadow-sm">
        <div className="container mx-auto">
          <SectionHeading 
            title="Browse Inventory" 
            subtitle="Explore our nationwide network of premium outdoor advertising locations."
            align="left"
            className="mb-6"
          />
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
              <input
                type="text"
                placeholder="Search by location or media type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue bg-primary-50 text-primary-900 transition-all"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="md:hidden w-full flex items-center"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className={`w-full md:w-72 flex-shrink-0 ${isMobileSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 bg-white p-6 rounded-2xl border border-primary-200 shadow-sm h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-lg text-primary-900">Locations Filter</h3>
              {(selectedCityId || selectedArea) && (
                <button 
                  onClick={() => { setSelectedCityId(null); setSelectedArea(null); }}
                  className="text-xs text-brand-blue hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-4">
              {CITIES.map((city) => (
                <div key={city.id} className="border border-primary-100 rounded-xl overflow-hidden">
                  <button
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                      selectedCityId === city.id || expandedCityId === city.id ? 'bg-primary-50' : 'bg-white hover:bg-primary-50/50'
                    }`}
                    onClick={() => {
                      toggleCity(city.id);
                      setSelectedCityId(city.id);
                      setSelectedArea(null); // Reset area on city change
                    }}
                  >
                    <span className="font-medium text-primary-900">{city.name}</span>
                    {expandedCityId === city.id ? (
                      <ChevronUp className="h-4 w-4 text-primary-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-primary-500" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedCityId === city.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white px-4 pb-4"
                      >
                        <div className="pt-2 space-y-2 flex flex-col">
                          {city.areas.map((area) => (
                            <button
                              key={area}
                              onClick={() => {
                                setSelectedCityId(city.id);
                                setSelectedArea(area);
                              }}
                              className={`text-sm text-left py-1.5 px-3 rounded-md transition-colors ${
                                selectedArea === area 
                                  ? 'bg-brand-blue text-white font-medium' 
                                  : 'text-primary-600 hover:bg-primary-50 hover:text-primary-900'
                              }`}
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Grid */}
        <main className="flex-1">
          <div className="mb-6 text-sm text-primary-500 font-medium">
            Showing {filteredMedia.length} results
          </div>

          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMedia.map((media) => (
                <Card key={media.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary-100 flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={media.imageUrl} 
                      alt={media.locationDetails} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 backdrop-blur-md border-white/20 text-white shadow-sm">
                        {media.type}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center space-x-2 text-primary-500 mb-2 text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{media.cityName} • {media.area}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {media.locationDetails}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-primary-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-primary-400 uppercase tracking-widest font-semibold">Size</span>
                        <span className="text-sm font-medium text-primary-900">{media.size}</span>
                      </div>
                      <Badge variant={media.availability === 'Available' ? 'success' : 'warning'}>
                        {media.availability}
                      </Badge>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4 group/btn relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Quick View
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border border-primary-100 text-center">
              <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-primary-300" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary-900 mb-2">No results found</h3>
              <p className="text-primary-500 max-w-md">
                Try adjusting your search query or removing some filters to see more available media locations.
              </p>
              <Button 
                variant="primary" 
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCityId(null);
                  setSelectedArea(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
