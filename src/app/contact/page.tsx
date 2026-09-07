"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Send, MessageSquare, Mail, CheckCircle, XCircle, X } from "lucide-react";

// ── Light Theme Dot grid ──────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="contact-dots-light" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.03)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-dots-light)" />
      </svg>
    </div>
  );
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      number: (form.elements.namedItem("phone") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setPopup({ show: true, type: "success", message: "Thank you! Your message has been sent successfully. We will get back to you soon." });
        form.reset();
      } else {
        setPopup({ show: true, type: "error", message: `Failed to send message: ${result.message || "Unknown error"}` });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setPopup({ show: true, type: "error", message: `Something went wrong connecting to the server: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-12 md:pb-24 bg-gray-50 text-gray-900 relative overflow-hidden">
      
      {/* Background Gradient & Pattern */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-gray-50 z-0 pointer-events-none" />
      <DotGrid />

      {/* Popup Modal */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-white border border-gray-200 rounded-sm shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <button
                onClick={() => setPopup(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-brand-orange transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-sm mb-6 bg-gray-50 border border-gray-100">
                  {popup.type === "success" ? (
                    <CheckCircle className="h-8 w-8 text-brand-orange" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                </div>
                
                <h3 className="text-2xl font-black font-heading text-brand-navy mb-2 tracking-tight">
                  {popup.type === "success" ? "Success!" : "Oops!"}
                </h3>
                
                <p className="text-gray-500 font-medium mb-8">
                  {popup.message}
                </p>
                
                <button 
                  onClick={() => setPopup(null)}
                  className={`w-full py-4 px-6 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    popup.type === "success" 
                      ? "bg-brand-navy text-white hover:bg-black shadow-lg" 
                      : "bg-gray-100 text-brand-navy border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {popup.type === "success" ? "Done" : "Try Again"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-sm shadow-sm border border-gray-200 mb-6"
          >
            <MessageSquare className="w-4 h-4 text-brand-orange animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black font-heading tracking-tight text-gray-900 mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Let's Plan Your Next <br /> <span className="text-brand-orange">Big Campaign.</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Our team of outdoor media experts is ready to help you identify the perfect locations and maximize your brand's reach across India.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-sm shadow-sm hover:shadow-xl hover:border-brand-orange transition-all duration-300 group">
                <div className="flex items-start space-x-5">
                  <div className="h-12 w-12 rounded-sm bg-gray-50 border border-gray-100 text-brand-navy flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-colors duration-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-brand-navy mb-2 tracking-tight">Office</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">5th floor Corporate Park<br/>Sanjay Place<br/>Agra</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-sm shadow-sm hover:shadow-xl hover:border-brand-orange transition-all duration-300 group">
                <div className="flex items-start space-x-5">
                  <div className="h-12 w-12 rounded-sm bg-gray-50 border border-gray-100 text-brand-navy flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-colors duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-brand-navy mb-2 tracking-tight">Call Us</h3>
                    <p className="text-gray-500 font-medium">9997927300</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-sm shadow-sm hover:shadow-xl hover:border-brand-orange transition-all duration-300 group">
                <div className="flex items-start space-x-5">
                  <div className="h-12 w-12 rounded-sm bg-gray-50 border border-gray-100 text-brand-navy flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-brand-navy mb-2 tracking-tight">Email Us</h3>
                    <p className="text-gray-500 font-medium">oohadexpo@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white border border-gray-200 rounded-sm shadow-xl p-8 md:p-12 h-full">
              <div className="flex items-center space-x-4 mb-10">
                <div className="h-8 w-8 bg-brand-navy rounded-sm flex items-center justify-center text-white">
                  <Send className="h-4 w-4" />
                </div>
                <h2 className="text-3xl font-heading font-black tracking-tight text-brand-navy">Send an Inquiry</h2>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName"
                    required
                    className="w-full px-5 py-4 rounded-sm border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50 transition-all text-gray-900 font-medium placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Work Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required 
                      className="w-full px-5 py-4 rounded-sm border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50 transition-all text-gray-900 font-medium placeholder-gray-400"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      required 
                      className="w-full px-5 py-4 rounded-sm border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50 transition-all text-gray-900 font-medium placeholder-gray-400"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Primary Interest</label>
                  <select 
                    id="interest"
                    name="interest" 
                    className="w-full px-5 py-4 rounded-sm border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50 transition-all appearance-none text-gray-900 font-medium"
                  >
                    <option value="">Select an option...</option>
                    <option value="hoardings">Hoardings & Billboards</option>
                    <option value="digital">Digital OOH Screens</option>
                    <option value="transit">Transit Media (Buses, Metro)</option>
                    <option value="campaign">Full Nationwide Campaign</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-5 py-4 rounded-sm border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50 transition-all resize-none text-gray-900 font-medium placeholder-gray-400"
                    placeholder="Tell us about your campaign goals..."
                  ></textarea>
                </div>

                <button 
                  disabled={loading} 
                  type="submit" 
                  className="w-full md:w-auto px-12 py-5 rounded-sm bg-brand-navy text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="ml-3 h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Brutalist Map Placeholder */}
        <motion.div 
          className="mt-16 md:mt-24 w-full h-[300px] md:h-[450px] rounded-sm overflow-hidden relative bg-gray-100 border border-gray-200 shadow-sm group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Grayscale Map BG */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')] bg-cover bg-center grayscale opacity-40 transition-opacity duration-500 group-hover:opacity-60 group-hover:grayscale-0" />
          
          <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center">
            <div className="bg-brand-navy p-4 rounded-sm shadow-xl mb-4 text-white">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-sm shadow-2xl border border-gray-200">
              <h4 className="font-heading font-black tracking-tight text-xl text-brand-navy mb-1">ADExpo HQ</h4>
              <p className="text-gray-500 font-medium text-sm">Sanjay Place, Agra</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
