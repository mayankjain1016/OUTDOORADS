"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Search, Map, Zap, LineChart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Planning",
    description: "Data-driven audience analysis to identify the perfect demographics and geographies for your brand.",
  },
  {
    icon: Map,
    title: "Location Selection",
    description: "Hand-picking prime media assets from our nationwide inventory to maximize reach and frequency.",
  },
  {
    icon: Zap,
    title: "Campaign Execution",
    description: "Flawless printing, mounting, and activation of your creatives across all selected locations.",
  },
  {
    icon: LineChart,
    title: "Monitoring & Reporting",
    description: "Continuous proof-of-performance monitoring and post-campaign analysis metrics.",
  },
];

export function Process() {
  return (
    <section className="py-24 md:py-32 bg-zinc-50 border-t border-zinc-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="How We Work" 
          subtitle="Our streamlined process ensures your campaign goes from concept to nationwide execution seamlessly, with precision at every step."
        />

        <div className="mt-24 relative max-w-6xl mx-auto">
          {/* Main Connector Line (Horizontal) */}
          <div className="hidden lg:block absolute top-[1.5rem] left-[10%] right-[10%] h-px bg-zinc-200 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start lg:items-center text-left lg:text-center group relative"
              >
                {/* Structural Step Indicator */}
                <div className="relative h-12 w-12 bg-white border border-zinc-200 flex items-center justify-center mb-8 shrink-0 lg:mx-auto group-hover:border-zinc-400 group-hover:bg-zinc-100 transition-colors">
                  <span className="text-xs font-bold tracking-widest text-zinc-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 transition-opacity">
                    0{i + 1}
                  </span>
                  <step.icon className="h-4 w-4 text-zinc-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Mobile Connector Line (Vertical) */}
                {i !== steps.length - 1 && (
                  <div className="block lg:hidden absolute top-12 left-6 bottom-[-3rem] w-px bg-zinc-200 -z-10" />
                )}
                
                <h3 className="text-lg font-bold font-heading text-zinc-950 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
