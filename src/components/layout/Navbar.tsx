"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Map, LayoutGrid, Users, ImageIcon, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  { name: "Showcase", href: "/city-showcase", icon: <Map className="w-4 h-4" /> },
  { name: "Inventory", href: "/inventory", icon: <LayoutGrid className="w-4 h-4" /> },
  { name: "Clients", href: "/clients", icon: <Users className="w-4 h-4" /> },
  { name: "Gallery", href: "/gallery", icon: <ImageIcon className="w-4 h-4" /> },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const useDarkText = isScrolled || pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-6 px-4 pointer-events-none">
        {/* Floating Dock Navbar */}
        <div 
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "bg-white/95 backdrop-blur-2xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] border border-zinc-200/80 rounded-full p-2 w-full max-w-6xl",
            isScrolled ? "scale-y-100 translate-y-0" : "scale-y-100 translate-y-0"
          )}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center pl-4 pr-6 group">
            <Image 
              src="/LOGO.png"
              alt="ApexOOH Logo"
              width={160}
              height={40}
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Interactive Icon Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-zinc-100/50 p-1.5 rounded-full border border-zinc-200/50">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300",
                    isActive 
                      ? "bg-white shadow-sm text-brand-blue" 
                      : "text-zinc-600 hover:bg-white hover:shadow-sm hover:text-brand-blue"
                  )}
                >
                  <span className={cn("transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center pl-6 pr-2">
            <Link href="/contact">
              <Button 
                className="rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 border-none bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:bg-blue-600 hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2.5 mr-2 rounded-full transition-colors bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-[60] bg-white/95 backdrop-blur-xl border border-zinc-200 shadow-2xl rounded-3xl flex flex-col overflow-hidden lg:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <Image 
                src="/LOGO.png"
                alt="ApexOOH Logo"
                width={120}
                height={30}
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-zinc-100 rounded-full text-zinc-500 hover:text-zinc-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col p-6 space-y-2 overflow-y-auto">
              {[...NAV_LINKS, { name: "Contact", href: "/contact", icon: <Phone className="w-4 h-4" /> }].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 p-4 rounded-2xl font-bold text-zinc-700 hover:bg-brand-blue/10 hover:text-brand-blue transition-colors"
                >
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-zinc-100">
                    {link.icon}
                  </div>
                  <span className="text-lg">{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
