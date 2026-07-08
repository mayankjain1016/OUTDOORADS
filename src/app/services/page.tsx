"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MonitorPlay, LayoutTemplate, BusFront, MapPin, Sparkles, BarChart3, Briefcase, ArrowRight, ArrowDown, CheckCircle2, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Services() {
  const [activeProcessStep, setActiveProcessStep] = useState(0);

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
      
      {/* Minimalist Premium Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-white overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
        {/* Very subtle ambient background */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-blue/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 text-slate-500 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>Premium OOH Services</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black font-heading text-slate-900 tracking-tight leading-[1.05] max-w-5xl mb-8"
          >
            Unmissable impact in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">physical world.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed mb-12"
          >
            We provide the ultimate canvas for your brand to dominate the urban landscape, from iconic highways to bustling city centers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center bg-white p-2 md:p-2 rounded-[2rem] md:rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 gap-2 md:gap-0">
              
              <div className="flex-1 w-full px-5 py-3 border-b sm:border-b-0 sm:border-r border-slate-100 relative group">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 text-left">Your Objective</label>
                <div className="relative">
                  <select className="w-full bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer appearance-none pr-8">
                    <option>Mass Brand Awareness</option>
                    <option>Local Market Domination</option>
                    <option>Commuter Targeting</option>
                    <option>High-Frequency Digital</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-brand-blue transition-colors" />
                </div>
              </div>

              <div className="flex-1 w-full px-5 py-3 relative group">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 text-left">Prime Location</label>
                <div className="relative">
                  <select className="w-full bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer appearance-none pr-8">
                    <option>Highways & Arterials</option>
                    <option>Downtown City Centers</option>
                    <option>Transit & Bus Hubs</option>
                    <option>Airports & Premium</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-brand-blue transition-colors" />
                </div>
              </div>

              <Link href="#services-list" className="w-full sm:w-auto mt-2 sm:mt-0 bg-brand-blue text-white px-8 py-4 md:py-5 rounded-full font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 group shrink-0 shadow-lg hover:shadow-brand-blue/30">
                Find Inventory
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-6 text-sm text-slate-400 font-medium">
              Over <span className="text-brand-blue font-bold">5,000+</span> premium locations available nationwide.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services - Magazine Style Alternating Layout */}
      <section className="relative z-10 py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 space-y-32">
          {premiumServices.map((service, index) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 relative"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-700" />
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  
                  {/* Glassmorphism badge */}
                  <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center space-x-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                      {service.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Format</p>
                      <p className="text-sm font-bold text-slate-900">{service.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 space-y-8"
              >
                <div className="inline-flex items-center space-x-2 text-brand-blue mb-2">
                  {service.icon}
                  <span className="text-sm font-bold uppercase tracking-widest">Premium Inventory</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-black font-heading text-slate-900 leading-tight">
                  {service.title}
                </h2>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{feature}</span>
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
          ))}
        </div>
      </section>

      {/* Specialty Services Bento Grid */}
      <section className="relative z-10 py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 mb-6">Beyond the Billboard</h2>
            <p className="text-slate-600 text-lg">
              Specialized services designed to complete your 360-degree out-of-home strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500 mb-8">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / Process Section - Premium Original Layout */}
      <section className="relative z-10 py-32 bg-white overflow-hidden">
        {/* Very subtle architectural lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-200 shadow-sm mb-8"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Our Process
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tight mb-6 text-slate-900 leading-[1.1]">
                How We Launch Your Campaign
              </h2>
              <p className="text-xl md:text-2xl text-slate-500 font-light">
                A seamless, data-driven journey from the first handshake to the final analytics report.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
            {/* Connecting Line with animated gradient */}
            <div className="hidden md:block absolute top-[3.5rem] left-14 right-14 h-[2px] bg-slate-100 overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand-blue to-transparent" 
              />
            </div>

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative z-10 group"
              >
                <div className="w-28 h-28 bg-white rounded-full border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-8 relative group-hover:border-brand-blue group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500 mx-auto md:mx-0">
                  <span className="text-4xl font-black font-heading text-slate-300 group-hover:text-brand-blue transition-colors duration-500">
                    {step.step}
                  </span>
                  {/* Subtle pulsing dot when active/hovered */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-brand-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-brand-blue transition-colors duration-500 text-center md:text-left">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light text-center md:text-left">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Breakout Layout */}
      <section className="relative z-10 py-40 bg-white overflow-visible">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto relative">
            
            {/* The Main Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between min-h-[500px]"
            >
              {/* Left Content */}
              <div className="w-full lg:w-3/5 relative z-10">
                <div className="inline-flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm mb-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Your Next Campaign
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black font-heading text-slate-900 mb-8 tracking-tight leading-[1.05]">
                  Ready to dominate <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">the skyline?</span>
                </h2>
                
                <p className="text-slate-500 text-lg md:text-xl max-w-lg mb-12 font-light leading-relaxed">
                  Connect with our OOH experts to discover the perfect premium inventory for your next big move.
                </p>
                
                <Link href="/contact" className="group relative inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg overflow-hidden shadow-[0_20px_40px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.4)] hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Campaign
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
