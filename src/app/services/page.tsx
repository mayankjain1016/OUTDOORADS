"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MonitorPlay, LayoutTemplate, BusFront, MapPin, Sparkles, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
}

function ParallaxServiceCard({ service, index }: { service: ServiceItem, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <div ref={ref} className={`flex flex-col lg:flex-row gap-8 lg:gap-24 items-start ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
      
      {/* Image Side with Parallax */}
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
          className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group border border-slate-100/50"
        >
          <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-700" />
          
          <motion.div style={{ y, height: "200%", top: "-50%" }} className="absolute inset-x-0">
            <Image 
              src={service.image} 
              alt={service.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
          </motion.div>
          
          {/* Glassmorphism badge */}
          <motion.div style={{ y: badgeY }} className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center space-x-3 md:space-x-4 transform opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="p-2 md:p-3 bg-brand-blue/10 rounded-lg md:rounded-xl text-brand-blue">
              {service.icon}
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Format</p>
              <p className="text-xs md:text-sm font-bold text-slate-900">{service.title}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Text Side */}
      <motion.div 
        style={{ y: textY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 space-y-4 md:space-y-8"
      >
        <div className="inline-flex items-center space-x-2 text-brand-blue mb-1 md:mb-2 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
          {service.icon}
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 leading-tight">
          {service.title}
        </h2>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {service.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 md:pt-4">
          {service.features.map((feature: string, i: number) => (
            <div key={i} className="flex items-start space-x-2 md:space-x-3">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-blue shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-slate-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <Link href="/inventory" className="inline-flex items-center space-x-2 text-brand-blue font-bold hover:text-blue-700 transition-colors group">
            <span>View Available Inventory</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>

    </div>
  );
}

export default function Services() {

  const premiumServices = [
    {
      id: "classic",
      title: "Classic Billboards",
      description: "Command attention with high-impact static displays on major highways and arterial roads. Unbeatable for brand building and long-term presence. Our premium locations ensure your message is seen by thousands of commuters daily.",
      features: ["Strategic Highway Locations", "High Traffic Volume", "24/7 Brand Exposure", "Massive Canvas for Creative"],
      image: "/images/highway.png",
      icon: <LayoutTemplate className="w-6 h-6" />
    },
    {
      id: "transit",
      title: "Transit & Street Furniture",
      description: "Take your message to the streets. High-visibility transit shelters and wraps that move with your audience, connecting with pedestrians and local traffic at a granular level.",
      features: ["Eye-Level Engagement", "Commuter Audience", "Point-of-Sale Proximity", "Hyper-local Reach"],
      image: "/images/bus-shelter.png",
      icon: <BusFront className="w-6 h-6" />
    },
    {
      id: "dooh",
      title: "Digital Out-of-Home (DOOH)",
      description: "Dynamic, bright, and engaging. Our digital displays allow for day-parting, real-time updates, and highly contextual messaging. Perfect for time-sensitive campaigns.",
      features: ["Real-time Updates", "Video & Motion Graphics", "Programmatic Buying Ready", "Contextual Triggers"],
      image: "/images/hoarding.png",
      icon: <MonitorPlay className="w-6 h-6" />
    }
  ];

  const additionalServices = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Experiential & Custom",
      description: "Break the mold with custom-built installations, 3D props, and interactive displays that create unforgettable brand moments."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Place-Based Media",
      description: "Reach audiences in specific environments like malls, airports, and gyms when they are highly receptive."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Campaign Analytics",
      description: "We back our placements with robust mobile location data to measure footfall, attribution, and overall campaign effectiveness."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Strategy",
      description: "We start by understanding your brand goals, target audience, and key KPIs to define the perfect OOH strategy.",
      image: "/images/hoarding.jpg"
    },
    {
      step: "02",
      title: "Location Selection",
      description: "Using our data-driven tools, we handpick premium inventory that aligns perfectly with your audience's daily journey.",
      image: "/images/hero-bg.png"
    },
    {
      step: "03",
      title: "Creative & Production",
      description: "Our team ensures your creative is optimized for the physical world, coordinating high-quality printing and installation.",
      image: "/images/bus-shelter.png"
    },
    {
      step: "04",
      title: "Execution & Analytics",
      description: "Your campaign goes live. We monitor performance and provide post-campaign attribution reports to measure ROI.",
      image: "/images/highway.png"
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Ultra Minimal Corporate Hero (Matching Showcase Page) */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-24 bg-gray-50 overflow-hidden" id="services-list">
        <div className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-8 md:mb-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border border-gray-200 mb-4 md:mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-blue animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-700">
                OOH Media Solutions
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-gray-900 mb-4 md:mb-6"
            >
              Amplify Your Brand <br className="hidden sm:block lg:hidden" /><span className="text-brand-blue">Everywhere.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              From towering highway billboards to hyper-local street furniture, we offer a comprehensive suite of out-of-home formats to reach your audience everywhere.
            </motion.p>
          </div>


        </div>
      </section>

      {/* Featured Services - Magazine Style Alternating Layout */}
      <section className="relative z-10 py-12 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 space-y-12 md:space-y-32">
          {premiumServices.map((service, index) => (
            <ParallaxServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Beyond the Billboard - Ultra Premium List Layout (Extremely Compact) */}
      <section className="relative z-10 py-12 md:py-16 bg-black text-white overflow-hidden">
        {/* Minimalist Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-brand-blue/10 border border-brand-blue/20 px-3 py-1.5 rounded-full mb-4 backdrop-blur-md"
              >
                <Sparkles className="w-3 h-3 text-brand-blue" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-blue">
                  360° Strategy
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-white leading-tight">
                Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Billboard</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm md:text-base font-light max-w-sm lg:pb-2">
              Specialized services designed to complete your out-of-home strategy and create unforgettable brand moments.
            </p>
          </div>

          <div className="w-full h-px bg-white/10 mb-2" />

          <div className="flex flex-col">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group border-b border-white/10 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 cursor-pointer border-l-2 border-l-transparent hover:border-l-brand-blue hover:bg-gradient-to-r hover:from-brand-blue/5 hover:to-transparent px-4 md:px-6 hover:pl-6 md:hover:pl-8"
              >
                <div className="flex items-center gap-4 md:gap-8 w-full md:w-1/2 mb-2 md:mb-0">
                  <span className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-white/5 group-hover:from-brand-blue group-hover:to-blue-600 transition-all duration-500 font-heading">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-white mb-0.5 md:mb-1">{service.title}</h3>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 flex items-center justify-between gap-6 pl-10 md:pl-0">
                  <p className="text-slate-400 text-sm font-light max-w-sm group-hover:text-slate-300 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 transform group-hover:scale-105">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / Process Section - Ultra Premium Image Cards */}
      <section className="relative z-10 py-16 md:py-32 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm mb-8"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Our Process
                </span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-heading tracking-tight mb-4 md:mb-6 text-slate-900 leading-[1.1]">
                How We Launch Your Campaign
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-500 font-light max-w-2xl">
                A seamless, data-driven journey from the first handshake to the final analytics report.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative h-[280px] sm:h-[320px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-900"
              >
                {/* Background Image */}
                <Image 
                  src={step.image || "/images/hero-bg.png"} 
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/90 pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Massive Step Number Top Right */}
                <div className="absolute top-6 right-6">
                  <span className="text-4xl md:text-5xl font-black font-heading text-white/50 group-hover:text-brand-blue transition-colors duration-500 drop-shadow-lg">
                    {step.step}
                  </span>
                </div>

                {/* Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden group-hover:border-brand-blue/50 transition-colors duration-500 group-hover:bg-black/40">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-heading leading-tight group-hover:text-brand-blue transition-colors duration-300 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Breakout Layout */}
      <section className="relative z-10 py-16 md:py-40 bg-white overflow-visible">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto relative">
            
            {/* The Main Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 rounded-3xl md:rounded-[4rem] p-8 sm:p-10 md:p-20 border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between min-h-[400px] md:min-h-[500px]"
            >
              {/* Left Content */}
              <div className="w-full lg:w-3/5 relative z-10">
                <div className="inline-flex items-center space-x-3 bg-white px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-slate-200 shadow-sm mb-6 md:mb-10">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-brand-blue animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Your Next Campaign
                  </span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading text-slate-900 mb-6 md:mb-8 tracking-tight leading-[1.05]">
                  Ready to dominate <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">the skyline?</span>
                </h2>
                
                <p className="text-slate-500 text-base sm:text-lg md:text-xl max-w-lg mb-8 md:mb-12 font-light leading-relaxed">
                  Connect with our OOH experts to discover the perfect premium inventory for your next big move.
                </p>
                
                <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-slate-900 text-white rounded-full font-bold text-base md:text-lg overflow-hidden shadow-[0_20px_40px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.4)] hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2 md:gap-3">
                    Start Your Campaign
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Right Background Gradients */}
              <div className="absolute top-0 right-0 bottom-0 w-2/5 bg-gradient-to-l from-brand-blue/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_20%_50%,#000_20%,transparent_100%)] opacity-[0.15] pointer-events-none" />
            </motion.div>

            {/* The Primary Breakout Image */}
            <motion.div
              initial={{ opacity: 0, x: 100, y: 50, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
              className="hidden lg:block absolute -right-12 -top-16 w-[28rem] h-[36rem] z-20 pointer-events-none"
            >
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[12px] border-white">
                <Image src="/images/highway.png" alt="OOH Advertising" fill className="object-cover" />
                <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" />
              </div>
            </motion.div>
            
            {/* The Secondary Breakout Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 100, rotate: -15 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
              className="hidden lg:block absolute right-72 -bottom-12 w-64 h-48 z-30 pointer-events-none"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-8 border-white">
                <Image src="/images/bus-shelter.png" alt="Transit Advertising" fill className="object-cover grayscale" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
