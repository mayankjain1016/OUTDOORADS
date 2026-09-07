"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Target, Globe, ArrowRight, CheckCircle2, Users, Shield, Zap, TrendingUp,
  MapPin, Calendar, Award, Eye
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STATS } from "@/data";
import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

// -- Animated counter ----------------------------------------------------------
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (2000 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.ceil(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref} suppressHydrationWarning>{count}{suffix}</span>;
}

// -- Magnetic card wrapper -----------------------------------------------------
function MagneticCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// -- Dot grid background -------------------------------------------------------
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}

// -- Scroll marquee ------------------------------------------------------------
const marqueeWords = [
  "OUTDOOR MEDIA", "BRAND IMPACT", "PREMIUM OOH", "INDIA'S BEST",
  "UNIPOLES", "BUS SHELTERS", "METRO PILLARS", "HOARDINGS",
  "REAL WORLD ADS", "TARGETED REACH",
];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden gap-0 select-none">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          animate={{ x: reverse ? ["0%", "100%"] : ["0%", "-100%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex shrink-0 gap-8 pr-8"
        >
          {marqueeWords.map((word, j) => (
            <span key={j} className="flex items-center gap-8 whitespace-nowrap text-[13px] font-black tracking-[0.25em] uppercase text-white/20">
              {word}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/50 shrink-0" />
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// -- Parallax image section ----------------------------------------------------
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

// -- Story data -----------------------------------------------------------------
const highlights = [
  {
    id: "mission",
    tag: "Our Mission",
    title: "We Put Your Brand Where People Look.",
    description:
      "To empower brands to make bold statements in the real world. We deliver premium outdoor advertising that is highly visible, contextually relevant, and designed to turn heads.",
    features: ["Strategic ad placements", "High footfall locations", "End-to-end campaign management", "Client-first value"],
    image: "/images/our_mission.jpg",
    icon: Target,
  },
  {
    id: "vision",
    tag: "Our Vision",
    title: "Build the Most Trusted OOH Network in India.",
    description:
      "To be the most trusted and innovative outdoor media agency � transforming urban landscapes with data-driven advertising that bridges the gap between brands and consumers.",
    features: ["Prime location network", "Data-driven targeting", "Creative excellence", "Transparent reporting"],
    image: "/images/our_vision.jpg",
    icon: Globe,
  },
];

// -- Advantage cards -----------------------------------------------------------
const advantages = [
  { number: "01", title: "Extensive Reach", description: "A robust network of premium hoardings across key locations, ensuring maximum audience visibility.", image: "/images/adv_reach.jpg" },
  { number: "02", title: "Targeted Impact", description: "Data-backed site selection designed to capture your target demographics at the perfect moment.", image: "/images/adv_impact.jpg" },
  { number: "03", title: "Dynamic Solutions", description: "From classic unipoles to modern digital OOH screens and transit media � we have it all.", image: "/images/adv_solutions.jpg" },
  { number: "04", title: "Audience First", description: "We prioritize audience engagement, maximizing your ROI through smart geographic targeting.", image: "/images/adv_audience.jpg" },
  { number: "05", title: "Premium Quality", description: "Impeccably maintained assets and high-resolution prints that reflect your brand standards.", image: "/images/adv_quality.jpg" },
  { number: "06", title: "Proven Results", description: "Years of on-ground expertise delivering successful campaigns for local and national brands.", image: "/images/adv_results.jpg" },
];

// -- Values list ---------------------------------------------------------------
const values = [
  { icon: Shield, title: "Integrity", description: "We are honest about every location, every metric, every result.", color: "from-blue-600 to-blue-400" },
  { icon: Zap, title: "Speed", description: "Fast campaign setup, fast execution, fast results.", color: "from-amber-500 to-orange-400" },
  { icon: Users, title: "Partnership", description: "We work as an extension of your marketing team, not a vendor.", color: "from-emerald-600 to-teal-400" },
  { icon: TrendingUp, title: "Growth", description: "We grow when your brand grows. Your success is our metric.", color: "from-orange-600 to-red-400" },
];

// -- Timeline milestones --------------------------------------------------------
const milestones = [
  { year: "2010", icon: MapPin, title: "Founded in Lucknow", description: "Started with a vision to revolutionize OOH advertising in tier-2 cities." },
  { year: "2014", icon: Globe, title: "Expanded to 3 Cities", description: "Grew our network to Kanpur and Allahabad, tripling our media assets." },
  { year: "2018", icon: Award, title: "500+ Campaigns", description: "Crossed 500 successful campaigns and earned best OOH agency recognition." },
  { year: "2022", icon: Eye, title: "Digital OOH Launch", description: "Pioneered digital OOH screens in prime locations across our city network." },
  { year: "2024", icon: Calendar, title: "1000+ Media Assets", description: "A milestone network covering 6+ cities with 1000+ premium media assets." },
];

// -----------------------------------------------------------------------------
export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">

      {/* -- 1. CINEMATIC HERO ----------------------------------------------- */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end bg-[#030811] overflow-hidden">
        {/* Parallax background image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/images/group-at-large.jpg"
            alt="AdExpo team"
            fill
            className="object-cover opacity-35"
            priority
          />
        </motion.div>

        {/* Layered gradients */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#030811] via-[#030811]/50 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#030811]/90 via-[#030811]/40 to-transparent" />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 z-[2]">
          <DotGrid />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[120px] z-[2] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px] z-[2] pointer-events-none" />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white/60">Our Story</span>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight text-white leading-[1.0]"
            >
              Your Partner in
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight leading-[1.0] text-brand-orange"
            >
              Outdoor Media.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-white/60 font-medium max-w-lg leading-relaxed mb-14"
          >
            With deep local expertise and a growing network across major Indian cities, AdExpo connects brands with audiences through high-impact, real-world advertising.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-10 md:gap-16"
          >
            {[
              { value: STATS.yearsOfExperience, suffix: "+", label: "Years of experience" },
              { value: STATS.citiesCovered, suffix: "+", label: "Cities covered" },
              { value: STATS.campaignsExecuted, suffix: "+", label: "Campaigns executed" },
              { value: STATS.premiumLocations, suffix: "+", label: "Premium locations" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col group">
                <span className="text-4xl md:text-5xl font-black font-heading text-white group-hover:text-brand-orange transition-colors duration-300">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom marquee band */}
        <div className="relative z-10 border-t border-white/5 py-4 bg-white/[0.02] backdrop-blur-sm">
          <Marquee />
        </div>
      </section>

      {/* -- 2. MISSION / VISION ----------------------------------------------- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-40">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Parallax image with floating badge */}
                <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shrink-0 shadow-2xl">
                  <ParallaxImage src={item.image} alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-black text-white uppercase tracking-wider">{item.tag}</span>
                  </motion.div>
                </div>

                {/* Text content */}
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 border border-brand-navy/10 mb-6">
                    <Icon className="w-3.5 h-3.5 text-brand-orange" />
                    <span className="text-[11px] font-black tracking-[0.2em] uppercase text-brand-navy/50">{item.tag}</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-brand-navy leading-tight tracking-tight mb-6">
                    {item.title}
                  </h2>

                  <div className="relative mb-8">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-orange to-brand-orange/20 rounded-full" />
                    <p className="text-lg text-brand-navy/65 leading-relaxed font-medium pl-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, duration: 0.4 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-brand-navy/[0.03] border border-brand-navy/5 hover:border-brand-orange/20 hover:bg-brand-orange/[0.03] transition-all duration-300"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-orange shrink-0" />
                        <span className="text-sm font-semibold text-brand-navy/80">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* -- 3. TIMELINE -------------------------------------------------------- */}
      <section className="py-28 bg-brand-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 border border-brand-navy/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-brand-navy/50">Our Journey</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black font-heading text-brand-navy tracking-tight"
            >
              A Decade of <span className="text-brand-orange">Impact.</span>
            </motion.h2>
          </div>

          <div className="relative">
            {/* Vertical center line for desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-brand-navy/10 to-transparent hidden lg:block" />

            <div className="flex flex-col">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                const isRight = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex items-center mb-8 lg:mb-12 ${isRight ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Card panel */}
                    <div className={`w-full lg:w-[calc(50%-3rem)] ${isRight ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"}`}>
                      <div className={`inline-flex items-center gap-4 p-5 rounded-2xl bg-white border border-brand-navy/8 shadow-sm hover:shadow-lg hover:border-brand-orange/25 transition-all duration-300 group ${isRight ? "lg:ml-auto" : ""}`}>
                        <div className={`w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-all duration-300 ${isRight ? "lg:order-last" : ""}`}>
                          <Icon className="w-5 h-5 text-brand-orange group-hover:text-white transition-colors" />
                        </div>
                        <div className={isRight ? "lg:text-right" : ""}>
                          <div className="text-[11px] font-black tracking-[0.15em] uppercase text-brand-orange mb-1">{m.year}</div>
                          <h3 className="text-base font-black font-heading text-brand-navy mb-1">{m.title}</h3>
                          <p className="text-xs text-brand-navy/55 leading-relaxed font-medium max-w-[220px]">{m.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-brand-orange items-center justify-center z-10 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-brand-orange" />
                    </div>

                    {/* Right spacer */}
                    <div className="hidden lg:block w-[calc(50%-3rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* -- 4. ADVANTAGE GRID -------------------------------------------------- */}
      <section className="py-28 bg-[#030811] text-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/5 blur-[120px] pointer-events-none" />
        <DotGrid />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white/50">Why Choose Us</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white"
            >
              The AdExpo <span className="text-brand-orange">Advantage.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative h-[300px] rounded-2xl overflow-hidden border border-white/8 group cursor-default"
              >
                <Image src={adv.image} alt={adv.title} fill className="object-cover opacity-40 group-hover:opacity-65 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
                {/* Orange glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-5 right-5">
                  <span className="text-5xl font-black font-heading text-white/6 group-hover:text-brand-orange/25 transition-colors duration-500">{adv.number}</span>
                </div>

                {/* Bottom accent bar sweep */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-black font-heading text-white mb-2 group-hover:text-brand-orange transition-colors duration-300">{adv.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors duration-300">{adv.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-white/5 pt-5">
          <Marquee reverse />
        </div>
      </section>

      {/* -- 5. VALUES � 3D Magnetic Cards ------------------------------------ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 border border-brand-navy/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-brand-navy/50">Our Values</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black font-heading text-brand-navy tracking-tight"
            >
              What We Stand For.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: "1200px" }}>
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <MagneticCard className="relative p-8 rounded-2xl border border-brand-navy/8 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-300 group cursor-default overflow-hidden h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl`} />
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black font-heading text-brand-navy mb-3">{val.title}</h3>
                      <p className="text-brand-navy/55 text-sm leading-relaxed font-medium">{val.description}</p>
                    </div>
                  </MagneticCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- 6. CTA ----------------------------------------------------------- */}
      <section className="relative py-28 bg-[#030811] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/group-at-large.jpg" alt="Start your campaign" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030811] via-[#030811]/80 to-[#030811]" />
        </div>
        <DotGrid />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-orange/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white/50">Get Started</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight mb-4"
            >
              Ready to launch your <span className="text-brand-orange">campaign?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/55 font-medium"
            >
              Join the brands that trust AdExpo to put them in front of millions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-3 bg-brand-orange text-white px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-wider cursor-pointer shrink-0 overflow-hidden group shadow-2xl shadow-brand-orange/25"
              >
                {/* Shine sweep animation */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <span className="relative z-10">Contact Sales</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
