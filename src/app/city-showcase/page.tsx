"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES, MEDIA_INVENTORY } from "@/data";
import { MediaType } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function CityShowcase() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Derived data based on selections
  const availableMediaTypes = useMemo(() => {
    if (!selectedCityId) return [];
    const mediaInCity = MEDIA_INVENTORY.filter((m) => m.cityId === selectedCityId);
    const types = new Set(mediaInCity.map((m) => m.type));
    return Array.from(types);
  }, [selectedCityId]);

  const availableLocations = useMemo(() => {
    if (!selectedCityId || !selectedMediaType) return [];
    const media = MEDIA_INVENTORY.filter(
      (m) => m.cityId === selectedCityId && m.type === selectedMediaType
    );
    const locs = new Set(media.map((m) => m.area));
    return Array.from(locs);
  }, [selectedCityId, selectedMediaType]);

  const results = useMemo(() => {
    if (!selectedCityId || !selectedMediaType || !selectedLocation) return [];
    return MEDIA_INVENTORY.filter(
      (m) =>
        m.cityId === selectedCityId &&
        m.type === selectedMediaType &&
        m.area === selectedLocation
    );
  }, [selectedCityId, selectedMediaType, selectedLocation]);

  // Handlers
  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    setSelectedMediaType(null);
    setSelectedLocation(null);
  };

  const handleMediaTypeSelect = (type: MediaType) => {
    setSelectedMediaType(type);
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="City Showcase" 
          subtitle="Precision targeting at your fingertips. Follow the steps to discover premium media assets in your desired locations."
        />

        <div className="max-w-5xl mx-auto mt-12 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-100">
          {/* Step 1: City */}
          <div className="mb-10">
            <h3 className="text-xl font-heading font-semibold text-primary-900 mb-4 flex items-center">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-blue text-white text-sm mr-3">1</span>
              Select City
            </h3>
            <div className="flex flex-wrap gap-3">
              {CITIES.map((city) => (
                <Button
                  key={city.id}
                  variant={selectedCityId === city.id ? "primary" : "outline"}
                  onClick={() => handleCitySelect(city.id)}
                  className="rounded-full px-6"
                >
                  {city.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Step 2: Media Type */}
          <AnimatePresence>
            {selectedCityId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 overflow-hidden"
              >
                <h3 className="text-xl font-heading font-semibold text-primary-900 mb-4 flex items-center">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-blue text-white text-sm mr-3">2</span>
                  Select Media Type
                </h3>
                {availableMediaTypes.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {availableMediaTypes.map((type) => (
                      <Button
                        key={type}
                        variant={selectedMediaType === type ? "primary" : "outline"}
                        onClick={() => handleMediaTypeSelect(type as MediaType)}
                        className="rounded-full px-6"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-primary-500 italic">No media available in this city yet.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Location */}
          <AnimatePresence>
            {selectedMediaType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <h3 className="text-xl font-heading font-semibold text-primary-900 mb-4 flex items-center">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-blue text-white text-sm mr-3">3</span>
                  Select Location Area
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableLocations.map((loc) => (
                    <Button
                      key={loc}
                      variant={selectedLocation === loc ? "primary" : "outline"}
                      onClick={() => setSelectedLocation(loc)}
                      className="rounded-full px-6"
                    >
                      {loc}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Section */}
        <div className="mt-16">
          {selectedCityId && selectedMediaType && selectedLocation ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-heading font-bold text-primary-900 mb-8">
                Available Media in {selectedLocation}
              </h3>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((media) => (
                    <Card key={media.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary-100">
                      <div className="relative h-64 overflow-hidden">
                        <Image 
                          src={media.imageUrl} 
                          alt={media.locationDetails} 
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/50 backdrop-blur-md border-white/20 text-white">
                            {media.type}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 text-primary-500 mb-3 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{media.cityName}, {media.area}</span>
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-primary-900 mb-2 line-clamp-1">
                          {media.locationDetails}
                        </h3>
                        <p className="text-primary-600 text-sm mb-4 line-clamp-2">
                          {media.description}
                        </p>
                        <div className="flex justify-between items-center pt-4 border-t border-primary-100">
                          <span className="text-sm font-medium text-primary-600">Size: {media.size}</span>
                          <Badge variant={media.availability === 'Available' ? 'success' : 'warning'}>
                            {media.availability}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-primary-100">
                  <ImageIcon className="h-16 w-16 text-primary-200 mx-auto mb-4" />
                  <p className="text-xl text-primary-500">No media found for this specific combination.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-24 bg-transparent border-2 border-dashed border-primary-200 rounded-3xl">
              <div className="h-20 w-20 bg-primary-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-primary-900 mb-2">Awaiting Selections</h3>
              <p className="text-primary-500 max-w-md mx-auto">
                Please complete the 3 steps above to view our premium inventory for your targeted area.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
