"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, Phone, Clock, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-24 bg-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading text-primary-900 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Let&apos;s Plan Your Next <span className="text-brand-blue">Big Campaign</span>
          </motion.h1>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-primary-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Our team of outdoor media experts is ready to help you identify the perfect locations and maximize your brand&apos;s reach.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-none shadow-md overflow-hidden group">
                <CardContent className="p-5 sm:p-6 md:p-8 flex items-start space-x-4 md:space-x-5">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Headquarters</h3>
                    <p className="text-primary-600 text-sm md:text-base">Level 4, Trade Centre, BKC<br/>Bandra East, Mumbai<br/>Maharashtra 400051</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-none shadow-md overflow-hidden group">
                <CardContent className="p-5 sm:p-6 md:p-8 flex items-start space-x-4 md:space-x-5">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <Phone className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Call Us</h3>
                    <p className="text-primary-600 text-sm md:text-base mb-1">+91 98765 43210</p>
                    <p className="text-primary-600 text-sm md:text-base">1800-OOH-APEX (Toll Free)</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-none shadow-md overflow-hidden group">
                <CardContent className="p-5 sm:p-6 md:p-8 flex items-start space-x-4 md:space-x-5">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <Clock className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Business Hours</h3>
                    <p className="text-primary-600 text-sm md:text-base mb-1">Monday - Friday</p>
                    <p className="text-primary-900 text-sm md:text-base font-medium">9:00 AM - 6:30 PM</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full border-none shadow-xl shadow-primary-900/5">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="flex items-center space-x-3 mb-6 md:mb-8">
                  <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-brand-blue" />
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-900">Send an Inquiry</h2>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-primary-700">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-primary-700">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-primary-700">Work Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-primary-700">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-medium text-primary-700">Primary Interest</label>
                    <select 
                      id="interest" 
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all appearance-none"
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
                    <label htmlFor="message" className="text-sm font-medium text-primary-700">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all resize-none text-sm md:text-base"
                      placeholder="Tell us about your campaign goals..."
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all">
                    Send Message
                    <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div 
          className="mt-12 md:mt-20 w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden relative bg-primary-100 border border-primary-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* This represents where a Google Map iframe would go */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')] bg-cover bg-center grayscale opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center flex-col p-4 md:p-6 text-center">
            <div className="bg-white p-3 md:p-4 rounded-full shadow-2xl mb-3 md:mb-4 text-brand-blue">
              <MapPin className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <div className="bg-white/90 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-lg border border-white/20">
              <h4 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-0.5 md:mb-1">ApexOOH Headquarters</h4>
              <p className="text-primary-600 text-sm md:text-base">BKC, Mumbai</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
