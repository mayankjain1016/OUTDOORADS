"use client";

import { motion } from "framer-motion";
import { STATS } from "@/data";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

function Counter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      <span className="text-zinc-400">{suffix}</span>
    </span>
  );
}

export function Stats() {
  const statsList = [
    { label: "Campaigns Executed", value: STATS.campaignsExecuted, suffix: "+" },
    { label: "Premium Locations", value: STATS.premiumLocations, suffix: "+" },
    { label: "Cities Covered", value: STATS.citiesCovered, suffix: "" },
    { label: "Brand Partners", value: STATS.happyClients, suffix: "+" },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4"
          >
            Unmatched Scale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-heading font-medium text-zinc-950 max-w-2xl leading-tight"
          >
            The network and precision required to make your brand unmissable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 lg:divide-x divide-zinc-200">
          {statsList.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:px-8"
            >
              <div className="text-6xl md:text-7xl font-bold font-heading text-zinc-950 tracking-tighter mb-4">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-zinc-500 font-medium text-sm tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
