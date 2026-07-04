"use client";

import { motion } from "framer-motion";
import { CLIENTS, STATS } from "@/data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import Image from "next/image";

export default function Clients() {
  const categories = Array.from(new Set(CLIENTS.map(c => c.category)));

  return (
    <div className="min-h-screen pt-24 bg-primary-foreground">
      
      {/* Hero Section */}
      <section className="py-20 bg-primary-950 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The Brands We <span className="text-brand-accent">Elevate</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-primary-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Join hundreds of industry leaders who trust ApexOOH for their nationwide outdoor campaigns.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">{STATS.happyClients}+</h3>
              <p className="text-sm text-primary-400 uppercase tracking-wider">Active Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">{STATS.campaignsExecuted}+</h3>
              <p className="text-sm text-primary-400 uppercase tracking-wider">Campaigns</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">98%</h3>
              <p className="text-sm text-primary-400 uppercase tracking-wider">Retention Rate</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">{STATS.yearsOfExperience}</h3>
              <p className="text-sm text-primary-400 uppercase tracking-wider">Years Experience</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categorized Logo Wall */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading 
            title="Our Partners" 
            subtitle="From Fortune 500 companies to rising startups, we deliver impact across all industries."
          />

          <div className="mt-16 space-y-20">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-2xl font-heading font-semibold text-primary-900 border-b border-primary-100 pb-4 mb-8">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {CLIENTS.filter(c => c.category === category).map((client, i) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-primary-50 bg-primary-50/30 hover:bg-white hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-16 w-32 mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                        {/* Placeholder for actual logos */}
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-primary-800">
                          {client.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Mock empty slots for grid fullness */}
                  {[...Array(3)].map((_, i) => (
                     <div key={`empty-${category}-${i}`} className="hidden lg:block opacity-0" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collaboration */}
      <section className="py-24 bg-brand-blue text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-white/20 border border-white/30 text-sm font-semibold mb-6">
                Featured Collaboration
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Redefining Tech Launches
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-lg">
                When TechGiant wanted to launch their latest smartphone, they chose ApexOOH for a synchronized takeover of digital screens across 15 major cities, resulting in a record-breaking day-one sales volume.
              </p>
              <blockquote className="text-xl font-heading border-l-4 border-brand-accent pl-6 mb-6">
                &quot;The most coordinated and impactful outdoor campaign we&apos;ve ever executed in India.&quot;
                <footer className="mt-4 text-sm font-sans font-semibold">— Priya Patel, VP Brand Strategy, TechGiant</footer>
              </blockquote>
            </div>
            <div className="w-full md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80" 
                alt="TechGiant Campaign" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div>
                  <p className="text-white font-bold text-2xl font-heading mb-1">TechGiant Z-Series Launch</p>
                  <p className="text-primary-300 text-sm">Nationwide DOOH Takeover</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
