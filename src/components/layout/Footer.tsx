import Link from "next/link";
import Image from "next/image";



export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 md:pt-20 pb-8 md:pb-12 relative overflow-hidden border-t border-zinc-900">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-blue/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] pointer-events-none rounded-full" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 md:gap-12 lg:gap-8 mb-12 md:mb-20">
          
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-5 flex flex-col items-start text-left space-y-5 md:space-y-8 lg:pr-8">
            <Link href="/" className="inline-flex items-center group">
              <Image 
                src="/LOGO.png"
                alt="ApexOOH Logo"
                width={200}
                height={50}
                className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xl"
              />
            </Link>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm font-medium">
              Command attention with India&apos;s most premium outdoor advertising network. We build landmarks, not just ads.
            </p>
            <div className="flex items-center justify-start space-x-3 md:space-x-4 pt-1 md:pt-4">
              {[
                { icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>, name: "Twitter" },
                { icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, name: "LinkedIn" },
                { icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>, name: "Instagram" }
              ].map((social, i) => (
                <a key={i} href="#" aria-label={social.name} className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-blue/20">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2 space-y-4 md:space-y-6">
            <h4 className="text-white font-bold text-xs md:text-sm tracking-widest uppercase">Company</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium">
              <li><Link href="/city-showcase" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Showcase</Link></li>
              <li><Link href="/inventory" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Inventory</Link></li>
              <li><Link href="/clients" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Our Clients</Link></li>
              <li><Link href="/gallery" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Gallery</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 lg:col-span-2 space-y-4 md:space-y-6">
            <h4 className="text-white font-bold text-xs md:text-sm tracking-widest uppercase">Services</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium">
              <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Digital OOH</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Transit Media</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Airport Branding</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Mall Activations</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3 space-y-4 md:space-y-6 text-left mt-2 lg:mt-0">
            <h4 className="text-white font-bold text-xs md:text-sm tracking-widest uppercase">Contact</h4>
            <ul className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5 text-xs md:text-sm font-medium text-left w-full">
              <li className="col-span-1 min-[360px]:col-span-2 lg:col-span-1 flex flex-col items-start text-left">
                <span className="text-brand-blue/80 mb-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Office</span>
                <span className="text-zinc-200 leading-relaxed max-w-xs">Level 4, Trade Centre, BKC, Bandra East, Mumbai, 400051</span>
              </li>
              <li className="col-span-1 flex flex-col items-start text-left">
                <span className="text-brand-blue/80 mb-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Phone</span>
                <span className="text-zinc-200">+91 98765 43210</span>
              </li>
              <li className="col-span-1 flex flex-col items-start text-left">
                <span className="text-brand-blue/80 mb-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Email</span>
                <span className="text-brand-blue">hello@apexooh.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-center md:justify-between text-[10px] md:text-xs font-medium text-zinc-500 gap-y-3">
          <p className="text-center w-full md:w-auto">© {new Date().getFullYear()} ApexOOH Media. All rights reserved.</p>
          <div className="flex flex-row items-center justify-center space-x-4 sm:space-x-6 w-full md:w-auto">
            <Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
