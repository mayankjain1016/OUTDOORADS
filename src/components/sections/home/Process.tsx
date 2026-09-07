"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Zap, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Planning",
    tag: "Strategy",
    description: "We study your brand, your audience, and the best areas to reach them. No guesswork — just smart data.",
    detail: "We run a deep analysis of your target audience — where they travel, what roads they use, and what time they are out. This ensures every rupee you spend is working hard for you.",
  },
  {
    number: "02",
    icon: Map,
    title: "Site Selection",
    tag: "Location",
    description: "We handpick the best billboard spots from our 1,200+ inventory — on the roads your customers actually use.",
    detail: "From national highways to busy city crossings — we know every location in our network. We pick sites that give you maximum visibility and the highest footfall.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Going Live",
    tag: "Execution",
    description: "We handle everything — printing, mounting, and putting your ad up. You just relax.",
    detail: "Our ground team handles all the hard work. Premium printing, weatherproof installation, and on-time launch across every location in your campaign. Zero hassle for you.",
  },
  {
    number: "04",
    icon: LineChart,
    title: "Results & Reports",
    tag: "Analytics",
    description: "We track your campaign and send you clear performance reports so you always know it's working.",
    detail: "Get regular photo proofs, traffic data, and simple reports showing exactly how your ad is performing. You know what you paid for, and we show you that you got it.",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/5 border border-brand-navy/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-brand-navy/50">Our Process</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-brand-navy"
            >
              How We Get <br />
              <span className="text-brand-orange">Your Ad Up.</span>
            </motion.h2>
          </div>
          <Link href="/contact">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 text-brand-navy/40 hover:text-brand-orange transition-colors duration-300 font-bold uppercase tracking-widest text-sm cursor-pointer"
            >
              Start Your Campaign <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 min-h-[480px]">

          {/* Left Tabs */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const StepIcon = step.icon;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full text-left flex items-center gap-5 p-6 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-brand-navy text-white border-brand-navy shadow-xl"
                      : "bg-white text-brand-navy border-brand-navy/10 hover:border-brand-navy/30 hover:bg-brand-navy/5"
                  }`}
                >
                  <span className={`text-4xl font-black font-heading leading-none shrink-0 ${
                    isActive ? "text-brand-orange" : "text-brand-navy/15"
                  }`}>
                    {step.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-center gap-1.5 mb-1 text-[11px] font-bold uppercase tracking-widest ${
                      isActive ? "text-brand-orange" : "text-brand-navy/40"
                    }`}>
                      <StepIcon className="w-3 h-3" />
                      {step.tag}
                    </div>
                    <h3 className={`text-xl font-black font-heading truncate ${isActive ? "text-white" : "text-brand-navy"}`}>
                      {step.title}
                    </h3>
                  </div>
                  {isActive && (
                    <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-3xl border border-brand-navy/10 bg-brand-navy/[0.03] p-10 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Watermark Number */}
                <span className="absolute -right-6 -bottom-10 text-[220px] font-black font-heading text-brand-navy/[0.04] leading-none select-none pointer-events-none">
                  {active.number}
                </span>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-navy/10 bg-white mb-8 shadow-sm">
                    <ActiveIcon className="w-4 h-4 text-brand-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/50">{active.tag}</span>
                  </div>

                  <h3 className="text-4xl xl:text-5xl font-black font-heading text-brand-navy mb-6 leading-tight">
                    {active.title}
                  </h3>

                  <p className="text-brand-navy text-xl font-medium leading-relaxed mb-6 border-l-4 border-brand-orange pl-5">
                    {active.description}
                  </p>

                  <p className="text-brand-navy/50 text-base leading-relaxed">
                    {active.detail}
                  </p>
                </div>

                {/* Dot Stepper */}
                <div className="relative z-10 mt-10 flex items-center gap-3">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeStep ? "w-8 bg-brand-orange" : "w-4 bg-brand-navy/15 hover:bg-brand-navy/30"
                      }`}
                    />
                  ))}
                  <span className="ml-auto text-brand-navy/30 text-sm font-bold">
                    {activeStep + 1} / {steps.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile: Accordion */}
        <div className="flex lg:hidden flex-col divide-y divide-brand-navy/10 border border-brand-navy/10 rounded-2xl overflow-hidden">
          {steps.map((step, i) => {
            const isOpen = activeStep === i;
            const StepIcon = step.icon;
            return (
              <motion.div key={i} className="overflow-hidden">
                <button
                  onClick={() => setActiveStep(isOpen ? -1 : i)}
                  className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-colors duration-300 ${
                    isOpen ? "bg-brand-navy/5" : "bg-white hover:bg-brand-navy/[0.02]"
                  }`}
                >
                  <span className={`text-3xl font-black font-heading leading-none w-14 shrink-0 ${
                    isOpen ? "text-brand-orange" : "text-brand-navy/15"
                  }`}>
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <p className={`text-[11px] font-bold uppercase tracking-widest mb-0.5 ${isOpen ? "text-brand-orange" : "text-brand-navy/40"}`}>
                      {step.tag}
                    </p>
                    <h3 className="text-lg font-black font-heading text-brand-navy">{step.title}</h3>
                  </div>
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? "border-brand-orange bg-brand-orange rotate-90" : "border-brand-navy/20"
                  }`}>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <p className="text-brand-navy font-medium text-base leading-relaxed border-l-2 border-brand-orange pl-4 mb-4">
                          {step.description}
                        </p>
                        <p className="text-brand-navy/50 text-sm leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
