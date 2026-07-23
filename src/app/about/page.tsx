"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Shield, Target, Zap, Globe, Users, TrendingUp, Building, ArrowRight, CheckCircle2, Mail, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STATS } from "@/data";
import React, { useState, useRef, useEffect } from "react";

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
    <span ref={ref}>
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
          className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-slate-100/50"
        >
          <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
          <motion.div style={{ y: yImage }} className="absolute inset-0 -top-[20%] h-[140%] w-full">
            <Image 
              src={highlight.image} 
              alt={highlight.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
          </motion.div>
          
          {/* Glassmorphism badge */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 bg-white/90 backdrop-blur-xl p-3 md:p-5 rounded-2xl md:rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center space-x-3 md:space-x-5 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 border border-white/20">
            <div className="p-3 md:p-4 bg-brand-blue/10 rounded-xl md:rounded-2xl text-brand-blue">
              {highlight.icon}
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-0.5 md:mb-1">Core Pillar</p>
              <p className="text-sm md:text-base font-bold text-slate-900">{highlight.title}</p>
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
        <div className="inline-flex items-center space-x-3 text-brand-blue mb-2">
          <div className="p-2 bg-brand-blue/10 rounded-lg">
            {highlight.icon}
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.2em]">Purpose</span>
        </div>
        
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
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ctaRef.current) {
      const rect = ctaRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const storyHighlights = [
    {
      id: "mission",
      title: "Our Mission",
      description: "To empower brands to make bold statements in the real world. We strive to provide premium outdoor advertising solutions that are highly visible and contextually relevant, elevating the urban environment while delivering exceptional value to our clients.",
      features: ["Strategic Ad Placements", "High Footfall Locations", "End-to-End Campaign Management", "Client-Centric Value"],
      image: "/images/highway.png",
      icon: <Target className="w-6 h-6" />
    },
    {
      id: "vision",
      title: "Our Vision",
      description: "To be the most trusted and innovative out-of-home media agency, transforming urban landscapes with dynamic, data-driven, and highly engaging advertising experiences that bridge the gap between brands and consumers.",
      features: ["Prime Location Network", "Data-Driven Targeting", "Creative Excellence", "Transparent Reporting"],
      image: "/images/hoarding.png",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const values = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Extensive Reach",
      description: "A robust network of premium hoardings and digital screens across key locations, ensuring maximum audience visibility."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Targeted Impact",
      description: "Data-backed site selection designed to capture the attention of your target demographics at the perfect moment."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Dynamic Solutions",
      description: "Offering a versatile portfolio from classic unipoles and hoardings to modern digital OOH screens and transit media."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Audience First",
      description: "We prioritize audience engagement, helping you maximize your campaign ROI through smart geographic targeting."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Impeccably maintained physical assets and high-resolution flex prints that reflect your brand's premium standards."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Proven Results",
      description: "Years of on-ground expertise delivering highly successful campaigns for both local businesses and national enterprises."
    }
  ];

  const team = [
    {
      step: "SJ",
      title: "Sarah Jenkins",
      description: "Chief Executive Officer. Driving the strategic vision and nationwide expansion of OOH Ad Expo.",
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
      
      {/* Centered Showcase-Style Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-0 text-center mb-8 md:mb-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border border-gray-200 mb-4 md:mb-6"
            >
              <Building className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-blue animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-700">
                Our Story
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-gray-900 mb-4 md:mb-6"
            >
              Your Partner in <br className="hidden sm:block lg:hidden" /><span className="text-brand-blue">Media.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              With extensive local expertise and a growing network across major cities, OOH Ad Expo connects brands with their audiences through high-impact, real-world advertising.
            </motion.p>
          </div>
          
          {/* Corporate Stats Row Style */}
          <div className="max-w-4xl mx-auto px-2 md:px-6 relative z-40 mb-8 md:mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-row items-center justify-between p-4 md:p-8 bg-white border border-gray-200 rounded-xl md:rounded-2xl shadow-sm gap-2 md:gap-0"
            >
              <div className="text-center group flex-1 w-full">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-brand-blue block mb-0.5 md:mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.yearsOfExperience} suffix="+" /></span>
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Years Exp</span>
              </div>
              
              <div className="w-px h-10 md:h-16 bg-gray-200 shrink-0" />
              
              <div className="text-center group flex-1 w-full">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-brand-blue block mb-0.5 md:mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.citiesCovered} /></span>
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Cities</span>
              </div>
              
              <div className="w-px h-10 md:h-16 bg-gray-200 shrink-0" />
              
              <div className="text-center group flex-1 w-full">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-brand-blue block mb-0.5 md:mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.campaignsExecuted} suffix="+" /></span>
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Campaigns</span>
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

      {/* Specialty Services Bento Grid style for Core Values */}
      <section className="relative z-10 py-16 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-black font-heading text-slate-900 mb-4 md:mb-6 tracking-tight"
            >
              The OOH Ad Expo Advantage
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-xl font-light"
            >
              What sets us apart in the competitive landscape of out-of-home advertising.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 perspective-[1000px]">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, rotateX: 2, scale: 1.02 }}
                className="group bg-white rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 border border-slate-100 hover:border-brand-blue shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500 relative overflow-hidden"
              >
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-4 md:mb-8 shadow-sm border border-brand-blue/10 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-8 md:[&>svg]:h-8">
                  {value.icon}
                </div>
                <h3 className="text-sm sm:text-base md:text-2xl font-bold font-heading text-slate-900 mb-2 md:mb-4">{value.title}</h3>
                <p className="text-slate-500 text-[10px] sm:text-xs md:text-base leading-tight md:leading-relaxed font-medium">{value.description}</p>
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

      {/* Floating Contained Interactive CTA Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            ref={ctaRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-3xl md:rounded-[3rem] bg-zinc-950 overflow-hidden px-6 py-16 md:py-32 text-center flex flex-col items-center shadow-2xl border border-zinc-800"
          >
            {/* Spotlight Hover Effect */}
            <div 
              className="pointer-events-none absolute -inset-px rounded-3xl md:rounded-[3rem] opacity-0 transition duration-500 group-hover:opacity-100 z-10"
              style={{
                background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.15), transparent 40%)`
              }}
            />

            {/* Premium Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Background glowing orbs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-brand-blue/30 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/20 rounded-full blur-[60px] md:blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3 animate-[pulse_10s_ease-in-out_infinite_reverse]" />

            <div className="relative z-20">
              <div className="inline-flex items-center space-x-2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-zinc-800 mb-6 md:mb-8">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
                  Take Action
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-heading text-white mb-6 md:mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
                Ready to launch your <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">campaign?</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed">
                Join the growing list of brands that trust OOH Ad Expo to elevate their presence in the physical world.
              </p>
              
              <Link href="/contact" className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-white bg-brand-blue rounded-full font-bold text-base md:text-lg hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.3)] group border border-blue-400/50 z-30">
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <span className="relative z-10">Start Your Campaign</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 relative z-10 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
