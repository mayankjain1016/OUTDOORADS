"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Showcase", href: "/city-showcase" },
  { name: "Inventory", href: "/inventory" },
  { name: "Clients", href: "/clients" },
  { name: "Gallery", href: "/gallery" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b w-full",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-gray-200 py-3 shadow-sm" 
            : "bg-white border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-50">
            <Image 
              src="/LOGO.png"
              alt="AdExpo Logo"
              width={180}
              height={45}
              priority
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[13px] font-bold tracking-widest uppercase transition-colors duration-300 relative group",
                    isActive ? "text-brand-orange" : "text-brand-navy hover:text-brand-orange"
                  )}
                >
                  {link.name}
                  <span 
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-[2px] bg-brand-orange transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/contact"
              className="group flex items-center space-x-2 bg-brand-navy text-white px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-brand-orange transition-all duration-300"
            >
              <span>Contact Sales</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 p-2 text-brand-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col lg:hidden"
          >
            <nav className="flex flex-col space-y-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-black uppercase tracking-tight",
                      isActive ? "text-brand-orange" : "text-brand-navy"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-8 border-t border-gray-100">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center space-x-2 bg-brand-navy text-white px-8 py-4 rounded-sm text-lg font-bold uppercase tracking-wider"
                >
                  <span>Contact Sales</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
