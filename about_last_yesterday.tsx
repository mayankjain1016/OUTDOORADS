"use client";

import { motion, useInView } from "framer-motion";
import { Shield, Target, Zap, Globe, Users, TrendingUp, Building, ArrowRight, CheckCircle2, Mail, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STATS } from "@/data";
import { useState, useRef, useEffect } from "react";

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

export default function About() {
  const storyHighlights = [
    {
      id: "mission",
      title: "Our Mission",
      description: "To empower brands to make bold statements in the real world. We strive to provide premium outdoor advertising solutions that are highly visible and contextually relevant, elevating the urban environment while delivering exceptional value to our clients.",
      features: ["Premium Inventory Access", "Contextually Relevant Ads", "Urban Environment Enhancement", "Client-Centric Value"],
      image: "/images/highway.png",
      icon: <Target className="w-6 h-6" />
    },
    {
      id: "vision",
      title: "Our Vision",
      description: "To be the undisputed leader in out-of-home media innovation, seamlessly blending technology with physical structures to create immersive, data-driven, and sustainable advertising experiences that shape the future of urban communication.",
      features: ["Technological Integration", "Immersive Experiences", "Data-Driven Approach", "Sustainable Practices"],
      image: "/images/hoarding.png",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const values = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Nationwide Reach",
      description: "Extensive network covering prime locations across major cities, ensuring maximum visibility."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Targeted Impact",
      description: "Strategic placements designed to capture the right audience at the perfect moment."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Dynamic Solutions",
      description: "From classic billboards to cutting-edge digital displays, offering versatile formats."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Audience First",
      description: "Data-driven insights to understand audience behavior and optimize your advertising ROI."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Impeccably maintained assets and high-resolution displays reflecting premium brand standards."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Proven Results",
      description: "Decades of expertise delivering measurable success for local businesses and global enterprises."
    }
  ];

  const team = [
    {
      step: "SJ",
      title: "Sarah Jenkins",
      description: "Chief Executive Officer. Driving the strategic vision and nationwide expansion of ApexOOH.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", damping: 20, stiffness: 100 } 
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Hero Section with Parallax Image Background & Staggered Text */}
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-40 overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bg.png" 
            alt="Cityscape Background" 
            fill 
            className="object-cover opacity-15 saturate-0 animate-[pulse_10s_ease-in-out_infinite]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-slate-50" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/50 mb-8 hover:scale-105 transition-transform cursor-pointer"
          >
            <Building className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Our Story
            </span>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center overflow-hidden mb-8"
          >
            {["Pioneering", "Urban", "Media"].map((word, index) => (
              <motion.span 
                key={index}
                variants={wordVariants}
                className={`text-5xl md:text-7xl lg:text-[7rem] font-black font-heading tracking-tight inline-block mr-3 md:mr-6 leading-[1.1] ${
                  word === "Urban" ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400" : "text-slate-900"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
          >
            For over a decade, we have been at the forefront of out-of-home advertising, connecting brands with their audiences through larger-than-life experiences.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 bg-white border border-slate-100 rounded-[2.5rem] px-12 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500"
          >
            <div className="text-center group">
              <span className="text-5xl font-black font-heading text-brand-blue block mb-1 group-hover:scale-110 transition-transform"><Counter end={10} suffix="+" /></span>
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">Years Exp</span>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden sm:block" />
            <div className="text-center group">
              <span className="text-5xl font-black font-heading text-brand-blue block mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.citiesCovered} /></span>
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">Cities</span>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden sm:block" />
            <div className="text-center group">
              <span className="text-5xl font-black font-heading text-brand-blue block mb-1 group-hover:scale-110 transition-transform"><Counter end={STATS.campaignsExecuted} suffix="+" /></span>
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">Campaigns</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Magazine Style Alternating Layout - Mission & Vision */}
      <section className="relative z-10 py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 space-y-40">
          {storyHighlights.map((highlight, index) => (
            <div key={highlight.id} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Side with 3D Hover Tilt */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 relative perspective-[1200px]"
              >
                <motion.div 
                  whileHover={{ rotateY: index % 2 === 0 ? 5 : -5, rotateX: 2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-slate-100/50"
                >
                  <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-700" />
                  <Image 
                    src={highlight.image} 
                    alt={highlight.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  
                  {/* Glassmorphism badge */}
                  <div className="absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur-xl p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center space-x-5 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 border border-white/20">
                    <div className="p-4 bg-brand-blue/10 rounded-2xl text-brand-blue">
                      {highlight.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Core Pillar</p>
                      <p className="text-base font-bold text-slate-900">{highlight.title}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 space-y-8"
              >
                <div className="inline-flex items-center space-x-3 text-brand-blue mb-2">
                  <div className="p-2 bg-brand-blue/10 rounded-lg">
                    {highlight.icon}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">Purpose</span>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-black font-heading text-slate-900 leading-tight tracking-tight">
                  {highlight.title}
                </h2>
                
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                  {highlight.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 pt-6">
                  {highlight.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-3 cursor-default"
                    >
                      <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-semibold">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          ))}
        </div>
      </section>

      {/* Specialty Services Bento Grid style for Core Values */}
      <section className="relative z-10 py-32 bg-slate-50 border-y border-slate-100">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-6 tracking-tight"
            >
              The Apex Advantage
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, rotateX: 2, scale: 1.02 }}
                className="group bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                   {value.icon}
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500 mb-8 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dramatic Dark Section for Leadership */}
      <section className="relative z-10 py-32 md:py-48 bg-zinc-950 text-white overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[150px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_10s_ease-in-out_infinite_reverse]" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-zinc-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-800 mb-8"
              >
                <Users className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
                  Our People
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tight mb-6">Our Leadership</h2>
              <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-xl">The visionaries driving the future of urban media and brand experiences.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative perspective-[1200px]">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-16 right-16 h-px bg-gradient-to-r from-zinc-800/0 via-brand-blue/50 to-zinc-800/0" />

            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="relative z-10 group"
              >
                <div className="relative">
                  <div className="h-32 w-32 rounded-3xl bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-4xl font-black font-heading text-zinc-700 mb-8 transition-all duration-500 group-hover:border-brand-blue group-hover:bg-zinc-800 group-hover:text-white shadow-2xl group-hover:shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                    {member.step}
                  </div>
                  {/* Social Links Reveal */}
                  <div className="absolute top-0 left-40 h-32 flex flex-col justify-center space-y-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                     <div className="p-2 bg-zinc-800 rounded-full hover:bg-brand-blue transition-colors cursor-pointer border border-zinc-700">
                       <Mail className="w-4 h-4 text-white" />
                     </div>
                     <div className="p-2 bg-zinc-800 rounded-full hover:bg-brand-blue transition-colors cursor-pointer border border-zinc-700">
                       <LinkIcon className="w-4 h-4 text-white" />
                     </div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-2 text-white font-heading tracking-tight">{member.title}</h3>
                <div className="text-brand-blue font-bold uppercase tracking-[0.2em] text-xs mb-4">{member.role}</div>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-sm font-light">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature CTA Section */}
      <section className="relative z-10 py-32 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black font-heading text-white mb-8 tracking-tight">Ready to make history?</h2>
          <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Join the hundreds of brands that trust ApexOOH to elevate their presence in the physical world.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-12 py-6 text-brand-blue bg-white rounded-full font-black text-lg hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 shadow-2xl group">
            <span>Start Your Campaign</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
      
    </div>
  );
}
