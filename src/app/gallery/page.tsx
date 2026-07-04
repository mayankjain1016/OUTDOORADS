"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY, INDUSTRIES } from "@/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/Button";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

export default function Gallery() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [lightboxItem, setLightboxItem] = useState<typeof GALLERY[0] | null>(null);

  const filteredGallery = selectedIndustry === "All" 
    ? GALLERY 
    : GALLERY.filter(item => item.industryName === selectedIndustry);

  return (
    <div className="min-h-screen pt-24 pb-24 bg-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="Campaign Gallery" 
          subtitle="Explore our portfolio of successful outdoor campaigns across various industries and cities."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12 mb-16">
          <Button
            variant={selectedIndustry === "All" ? "primary" : "outline"}
            onClick={() => setSelectedIndustry("All")}
            className="rounded-full"
          >
            All Industries
          </Button>
          {INDUSTRIES.map((industry) => (
            <Button
              key={industry.id}
              variant={selectedIndustry === industry.name ? "primary" : "outline"}
              onClick={() => setSelectedIndustry(industry.name)}
              className="rounded-full"
            >
              {industry.name}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredGallery.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer border border-primary-200 shadow-sm"
                onClick={() => setLightboxItem(item)}
              >
                {/* Simulated varied heights for masonry effect */}
                <div className={`relative w-full ${i % 3 === 0 ? 'h-[400px]' : i % 2 === 0 ? 'h-[300px]' : 'h-[500px]'}`}>
                  <Image 
                    src={item.imageUrl} 
                    alt={item.campaignTitle} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-brand-accent text-sm font-semibold tracking-wider uppercase mb-1">
                      {item.industryName}
                    </span>
                    <h3 className="text-white font-heading font-bold text-xl mb-1">
                      {item.campaignTitle}
                    </h3>
                    <p className="text-primary-200 text-sm">
                      {item.cityName}
                    </p>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-lg">
                      <ZoomIn className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-primary-950/95 backdrop-blur-sm"
            onClick={() => setLightboxItem(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={() => setLightboxItem(null)}
            >
              <X className="h-8 w-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[40vh] md:h-[70vh] w-full">
                <Image 
                  src={lightboxItem.imageUrl} 
                  alt={lightboxItem.campaignTitle} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8 bg-white flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-semibold mb-3">
                    {lightboxItem.industryName}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-heading font-bold text-primary-900 mb-2">
                    {lightboxItem.campaignTitle}
                  </h3>
                  <p className="text-primary-500 font-medium text-lg">
                    {lightboxItem.cityName}
                  </p>
                </div>
                <Button variant="primary">View Location Details</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
