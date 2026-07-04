"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/logo.jpeg";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "City Showcase", href: "/city-showcase" },
  { name: "Inventory", href: "/inventory" },
  { name: "Clients", href: "/clients" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/90 backdrop-blur-md shadow-sm py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image 
              src={logoImg}
              alt="ApexOOH Logo"
              className="h-12 w-auto object-contain scale-[1.5] origin-left group-hover:scale-[1.55] transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue",
                  isScrolled ? "text-primary-600" : "text-primary-900 lg:text-white/90 lg:hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button variant={isScrolled ? "primary" : "outline"} className={!isScrolled ? "border-white text-primary-900 lg:text-white hover:bg-white hover:text-brand-blue" : ""}>
              Get a Quote
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-primary-900"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className={cn("h-6 w-6", !isScrolled && "text-primary-900 lg:text-white")} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-primary-100">
              <Image 
                src={logoImg}
                alt="ApexOOH Logo"
                className="h-10 w-auto object-contain scale-150 origin-left"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-primary-500 hover:text-primary-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-primary-800 hover:text-brand-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 mt-auto">
                <Button className="w-full" size="lg">
                  Get a Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
