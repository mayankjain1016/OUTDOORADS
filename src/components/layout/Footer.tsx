import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white/60 pt-24 pb-12 relative overflow-hidden border-t-4 border-brand-orange">
      {/* Structural precise grid background (optional subtle detail) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 gap-x-12 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-8">
            <Link href="/" className="inline-block group">
              <div className="bg-white px-4 py-2 rounded-sm transition-transform duration-300 group-hover:scale-105 inline-flex">
                <Image 
                  src="/LOGO.png"
                  alt="Logo"
                  width={180}
                  height={45}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/80 text-lg leading-relaxed font-medium">
              Command attention with India&apos;s most premium outdoor advertising network. We build landmarks, not just ads.
            </p>
            <div className="flex items-center justify-start space-x-3 pt-2">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social, i) => (
                <a key={i} href="#" aria-label={social} className="h-10 w-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300">
                  <span className="text-xs font-bold tracking-wider">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-6">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-8 opacity-50">Company</h4>
            <ul className="space-y-4 text-sm font-semibold tracking-wide">
              <li><Link href="/city-showcase" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Showcase <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/inventory" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Inventory <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/clients" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Our Clients <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/gallery" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Gallery <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-8 opacity-50">Services</h4>
            <ul className="space-y-4 text-sm font-semibold tracking-wide">
              <li><Link href="#" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Digital OOH <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="#" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Transit Media <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="#" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Airport Branding <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="#" className="hover:text-brand-orange inline-flex items-center group transition-colors duration-300">Mall Activations <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-8 opacity-50">Contact</h4>
            <ul className="space-y-6 text-sm font-semibold tracking-wide">
              <li className="flex flex-col items-start">
                <span className="text-brand-orange mb-2 text-[10px] font-black uppercase tracking-widest">Office</span>
                <span className="text-white/80 leading-relaxed">5th floor Corporate Park,<br/>Sanjay Place, Agra</span>
              </li>
              <li className="flex flex-col items-start">
                <span className="text-brand-orange mb-2 text-[10px] font-black uppercase tracking-widest">Inquiries</span>
                <a href="tel:9997927300" className="text-white hover:text-brand-orange transition-colors">9997927300</a>
                <a href="mailto:oohadexpo@gmail.com" className="text-white hover:text-brand-orange transition-colors mt-1">oohadexpo@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-semibold tracking-wide text-white/40 gap-y-4">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} ADEXPO. All rights reserved.</p>
          </div>
          <div className="flex flex-row items-center space-x-6">
            <p>Developed by <a href="https://www.affobe.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-orange transition-colors">AFFOBE</a></p>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
