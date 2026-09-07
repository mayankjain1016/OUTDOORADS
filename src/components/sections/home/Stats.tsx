"use client";

import { motion } from "framer-motion";
import { STATS } from "@/data";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

function Counter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      <span className="text-brand-orange">{suffix}</span>
    </span>
  );
}

export function Stats() {
  const statsList = [
    { label: "Campaigns Executed", value: STATS.campaignsExecuted, suffix: "+" },
    { label: "Premium Locations", value: STATS.premiumLocations, suffix: "+" },
    { label: "Cities Covered", value: STATS.citiesCovered, suffix: "+" },
    { label: "Brand Partners", value: STATS.happyClients, suffix: "+" },
  ];

  return (
    <section className="py-20 md:py-32 bg-brand-navy text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-orange mb-6"
          >
            Unmatched Scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white max-w-4xl leading-[1.1]"
          >
            The network and precision required to make your brand unmissable.
          </motion.p>
        </div>

        {/* Mobile Layout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden grid grid-cols-2 gap-px bg-white/10 p-px rounded-sm overflow-hidden"
        >
          {statsList.map((stat, i) => (
             <div key={i} className="text-center p-6 bg-brand-navy flex flex-col justify-center">
              <span className="text-3xl font-light text-white block mb-2"><Counter end={stat.value} suffix={stat.suffix} /></span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12 border-t border-white/10 pt-16">
          {statsList.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="text-6xl lg:text-7xl font-bold font-heading text-white tracking-tighter mb-4">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 font-bold uppercase tracking-widest text-[11px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}