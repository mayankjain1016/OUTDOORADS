"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  Shield, 
  Target, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Link as LinkIcon 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STATS } from "@/data";
import React, { useState, useRef, useEffect } from "react";
import { AboutHeroSlideshow } from "@/components/sections/about/AboutHeroSlideshow";

// Animated Counter Component
function Counter({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
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
    <span ref={ref} suppressHydrationWarning>
      {prefix}{count}
      <span className="text-slate-400 font-bold">{suffix}</span>
    </span>
  );
}

interface StoryHighlight {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
}

function StoryHighlightItem({ highlight, index }: { highlight: StoryHighlight; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <div ref={ref} className={`flex flex-col lg:flex-row gap-10 lg:gap-24 items-start ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
      {/* Image Side with Parallax and 3D Hover (Sticky on Mobile) */}
      <motion.div 
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 relative perspective-[1200px] sticky top-24 lg:relative lg:top-0 z-0"
      >
        <motion.div 
          whileHover={{ rotateY: index % 2 === 0 ? 5 : -5, rotateX: 2, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-slate-100/50 bg-slate-900"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
          <motion.div style={{ y: yImage }} className="absolute inset-0 -top-[20%] h-[140%] w-full">
            <Image 
              src={highlight.image} 
              alt={highlight.title} 
              fill 
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
          </motion.div>
          
          {/* Glassmorphism badge */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 bg-slate-900/80 backdrop-blur-xl p-3 md:p-5 rounded-2xl md:rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center space-x-3 md:space-x-5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 border border-white/20">
            <div className="p-3 md:p-4 bg-brand-blue/20 rounded-xl md:rounded-2xl text-brand-blue border border-brand-blue/30 shadow-inner">
              {highlight.icon}
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5 md:mb-1">Core Pillar</p>
              <p className="text-sm md:text-base font-bold text-white">{highlight.title}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Text Side with Parallax (Scrolls over image on mobile) */}
      <motion.div 
        style={{ y: yText }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 space-y-6 md:space-y-8 bg-white/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 rounded-3xl lg:p-0 lg:rounded-none z-10 shadow-[0_-20px_40px_rgba(255,255,255,1)] lg:shadow-none"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black font-heading text-slate-900 leading-tight tracking-tight">
          {highlight.title}
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
          {highlight.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
          {highlight.features.map((feature: string, i: number) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 5 }}
              className="flex items-start space-x-3 cursor-default"
            >
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-brand-blue shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-slate-700 font-semibold">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const storyHighlights = [
    {
      id: "mission",
      title: "Our Mission",
      description: "To empower brands to make bold statements in the real world. We strive to provide premium outdoor advertising solutions that are highly visible and contextually relevant, elevating the urban environment while delivering exceptional value to our clients.",
      features: ["Strategic Ad Placements", "High Footfall Locations", "End-to-End Campaign Management", "Client-Centric Value"],
      image: "/images/our_mission.jpg",
      icon: <Target className="w-6 h-6" />
    },
    {
      id: "vision",
      title: "Our Vision",
      description: "To be the most trusted and innovative out-of-home media agency, transforming urban landscapes with dynamic, data-driven, and highly engaging advertising experiences that bridge the gap between brands and consumers.",
      features: ["Prime Location Network", "Data-Driven Targeting", "Creative Excellence", "Transparent Reporting"],
      image: "/images/our_vision.jpg",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const values = [
    {
      step: "01",
      title: "Extensive Reach",
      description: "A robust network of premium hoardings and digital screens across key locations, ensuring maximum audience visibility.",
      image: "/images/adv_reach.jpg"
    },
    {
      step: "02",
      title: "Targeted Impact",
      description: "Data-backed site selection designed to capture the attention of your target demographics at the perfect moment.",
      image: "/images/adv_impact.jpg"
    },
    {
      step: "03",
      title: "Dynamic Solutions",
      description: "Offering a versatile portfolio from classic unipoles and hoardings to modern digital OOH screens and transit media.",
      image: "/images/adv_solutions.jpg"
    },
    {
      step: "04",
      title: "Audience First",
      description: "We prioritize audience engagement, helping you maximize your campaign ROI through smart geographic targeting.",
      image: "/images/adv_audience.jpg"
    },
    {
      step: "05",
      title: "Premium Quality",
      description: "Impeccably maintained physical assets and high-resolution flex prints that reflect your brand's premium standards.",
      image: "/images/adv_quality.jpg"
    },
    {
      step: "06",
      title: "Proven Results",
      description: "Years of on-ground expertise delivering highly successful campaigns for both local businesses and national enterprises.",
      image: "/images/adv_results.jpg"
    }
  ];

  const team = [
    {
      step: "SJ",
      title: "Sarah Jenkins",
      description: "Chief Executive Officer. Driving the strategic vision and nationwide expansion of OOH ADExpo.",
      role: "CEO"
    },
    {
      step: "DC",
      title: "David Chen",
      description: "Head of Operations. Ensuring flawless execution and asset maintenance across our entire network.",
      role: "Operations"
    },
    {
      step: "MT",
      title: "Marcus Torres",
      description: "Director of Strategy. Leading our data initiatives and helping brands optimize their OOH spend.",
      role: "Strategy"
    }
  ];


  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* ─── Hero Section with 3D Page-Flip Background Carousel (Full Viewport Height) ─── */}
      <section className="relative min-h-screen min-h-[100dvh] w-full pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden flex flex-col justify-center items-center z-20">
        
        {/* Background Slideshow Layer */}
        <AboutHeroSlideshow />

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full text-center">
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border border-white/20 mb-4 md:mb-6"
            >
              <Building className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-blue animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-200">
                Our Story
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white mb-4 md:mb-6 drop-shadow-md"
            >
              Your Partner in <br className="hidden sm:block lg:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-blue">Media.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow"
            >
              With extensive local expertise and a growing network across major cities, OOH ADExpo connects brands with their audiences through high-impact, real-world advertising.
            </motion.p>
          </div>
          
          {/* Corporate Stats Row Style (Glassmorphism on Dark Hero) */}
          <div className="max-w-4xl mx-auto px-2 md:px-6 relative z-30">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-row items-center justify-between p-4 md:p-8 bg-black/40 backdrop-blur-2xl border border-white/15 rounded-2xl md:rounded-3xl shadow-2xl gap-2 md:gap-0"
            >
              <div className="text-center group flex-1 w-full">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-brand-blue block mb-0.5 md:mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.yearsOfExperience} suffix="+" /></span>
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] text-slate-300">Years Exp</span>
              </div>
              
              <div className="w-px h-10 md:h-16 bg-white/15 shrink-0" />
              
              <div className="text-center group flex-1 w-full">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-brand-blue block mb-0.5 md:mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.citiesCovered} /></span>
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] text-slate-300">Cities</span>
              </div>
              
              <div className="w-px h-10 md:h-16 bg-white/15 shrink-0" />
              
              <div className="text-center group flex-1 w-full">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-brand-blue block mb-0.5 md:mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.campaignsExecuted} suffix="+" /></span>
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] text-slate-300">Campaigns</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Magazine Style Alternating Layout - Mission & Vision */}
      <section className="relative z-10 py-16 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 space-y-16 md:space-y-40">
          {storyHighlights.map((highlight, index) => (
            <StoryHighlightItem key={highlight.id} highlight={highlight} index={index} />
          ))}
        </div>
      </section>

      {/* Specialty Services - The OOH ADExpo Advantage Section */}
      <section className="relative z-10 py-14 md:py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm mb-6"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Why Choose Us
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-black font-heading text-slate-900 mb-4 md:mb-6 tracking-tight"
            >
              The OOH ADExpo Advantage
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg md:text-xl font-light"
            >
              What sets us apart in the competitive landscape of out-of-home advertising.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative h-[250px] sm:h-[270px] md:h-[290px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-slate-900"
              >
                {/* Background Image */}
                <Image 
                  src={value.image} 
                  alt={value.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/90 pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Massive Step Number Top Right */}
                <div className="absolute top-4 right-4">
                  <span className="text-3xl md:text-4xl font-black font-heading text-white/40 group-hover:text-brand-blue transition-colors duration-500 drop-shadow-md">
                    {value.step}
                  </span>
                </div>

                {/* Content at Bottom with Frosted Glassmorphism Card */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden group-hover:border-brand-blue/50 transition-colors duration-500 group-hover:bg-black/40">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1 font-heading leading-tight group-hover:text-brand-blue transition-colors duration-300 relative z-10">
                      {value.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-[13px] font-light leading-relaxed relative z-10 line-clamp-2">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Style Leadership Section */}
      <section className="relative z-10 py-16 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-slate-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-200 mb-4 md:mb-6"
            >
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-blue" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-700">
                Our People
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-slate-900 mb-4 md:mb-6"
            >
              Meet the Experts Behind the Boards
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 font-light"
            >
              The dedicated professionals driving flawless execution and high-impact brand experiences.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 mb-6 md:mb-10">
                  {/* Outer spinning ring on hover */}
                  <div className="absolute inset-[-6px] md:inset-[-8px] rounded-full border border-transparent group-hover:border-brand-blue/20 transition-all duration-700 group-hover:scale-105" />
                  
                  {/* Clean avatar placeholder */}
                  <div className="w-full h-full rounded-full bg-slate-50 border-4 md:border-[6px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden relative flex items-center justify-center group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500">
                    <div className="text-3xl md:text-6xl font-black font-heading text-slate-200 group-hover:text-brand-blue/40 transition-colors duration-500 group-hover:scale-110">
                      {member.step}
                    </div>
                    <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Floating social links */}
                  <div className="absolute -bottom-3 md:-bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 z-10">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:text-brand-blue cursor-pointer hover:scale-110 transition-transform">
                      <Mail className="w-3 h-3 md:w-5 md:h-5" />
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:text-brand-blue cursor-pointer hover:scale-110 transition-transform">
                      <LinkIcon className="w-3 h-3 md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl md:text-3xl font-bold text-slate-900 font-heading tracking-tight mb-1 md:mb-2 group-hover:text-brand-blue transition-colors">{member.title}</h3>
                <div className="text-brand-blue font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2 md:mb-4">{member.role}</div>
                <p className="text-slate-500 leading-relaxed font-light text-sm md:text-base max-w-xs mx-auto">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Ready to Launch Your Campaign Section (Full-Bleed Boardroom Feature) ─── */}
      <section className="relative z-10 py-20 md:py-32 lg:py-36 overflow-hidden bg-slate-950 text-white group">
        {/* Full-Bleed Strategic Boardroom Background Image (Sharp & Clear, No Blur) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/group-at-large.jpg"
            alt="Strategic Boardroom"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000 group-hover:scale-100 opacity-85"
          />
          {/* Clean Dark Gradient Overlay for Text Readability - Zero Blur */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-[1.15] text-white">
                Ready to launch your campaign?
              </h2>
            </motion.div>

            {/* Middle: Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-4"
            >
              <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
                Join the growing list of brands that trust OOH ADExpo to elevate their presence in the physical world.
              </p>
            </motion.div>

            {/* Right: Interactive Action & Arrow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-3 lg:pl-4"
            >
              <Link
                href="/contact"
                className="group/link flex flex-col items-start lg:items-start space-y-4 cursor-pointer"
              >
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover/link:text-brand-blue transition-colors duration-300">
                  Start Your Campaign
                </span>
                
                {/* Horizontal Divider Line */}
                <div className="w-full h-px bg-white/30 group-hover/link:bg-brand-blue/70 transition-colors duration-300" />
                
                {/* Animated Bold Arrow */}
                <div className="flex items-center text-white group-hover/link:text-brand-blue transition-colors duration-300 pt-1">
                  <ArrowRight className="w-10 h-10 sm:w-12 sm:h-12 transform group-hover/link:translate-x-3 transition-transform duration-300 stroke-[2.5]" />
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
