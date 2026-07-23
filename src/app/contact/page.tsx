"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, Phone, Clock, Send, MessageSquare, Mail, CheckCircle, XCircle, X } from "lucide-react";

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
        console.error("API Error Response:", result);
        setPopup({ show: true, type: "error", message: `Failed to send message: ${result.message || "Unknown error"}` });
      }
    } catch (error: any) {
      console.error("Fetch Error!", error);
      setPopup({ show: true, type: "error", message: `Something went wrong connecting to the server: ${error.message || error}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-24 bg-primary-foreground relative">
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <button
                onClick={() => setPopup(null)}
                className="absolute top-4 right-4 text-primary-400 hover:text-primary-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-6 bg-primary-50">
                  {popup.type === "success" ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-primary-900 mb-2">
                  {popup.type === "success" ? "Success!" : "Oops!"}
                </h3>
                
                <p className="text-primary-600 mb-8">
                  {popup.message}
                </p>
                
                <Button 
                  onClick={() => setPopup(null)}
                  className="w-full h-12 rounded-xl"
                  variant={popup.type === "success" ? "primary" : "outline"}
                >
                  {popup.type === "success" ? "Done" : "Try Again"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    <h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Office</h3>
                    <p className="text-primary-600 text-sm md:text-base">5th floor Corporate Park<br/>Sanjay Place<br/>Agra</p>
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
                    <p className="text-primary-600 text-sm md:text-base mb-1">9997927300</p>
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
                    <Mail className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Email Us</h3>
                    <p className="text-primary-600 text-sm md:text-base mb-1">oohadexpo@gmail.com</p>
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
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-primary-700">Full Name</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all text-black"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-primary-700">Work Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-primary-700">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-medium text-primary-700">Primary Interest</label>
                    <select 
                      id="interest"
                      name="interest" 
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
              <h4 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-0.5 md:mb-1">Adexpo Office</h4>
              <p className="text-primary-600 text-sm md:text-base">Sanjay Place, Agra</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
