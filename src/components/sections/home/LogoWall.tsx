"use client";

import { CLIENTS } from "@/data";
import Image from "next/image";

export function LogoWall() {
  const logos = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-12 md:py-24 bg-brand-light border-b border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-8 md:mb-16 text-center">
        <p className="text-brand-navy/60 font-bold tracking-widest uppercase text-[10px] md:text-xs">
          Trusted by industry-leading brands
        </p>
      </div>
      
      <div className="relative w-full flex items-center h-24">
        {/* Gradients to fade edges cleanly into the background */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[scroll_40s_linear_infinite] md:animate-[scroll_80s_linear_infinite] w-max gap-12 lg:gap-24 items-center px-8">
          {logos.map((client, i) => (
            <div key={`${client.id}-${i}`} className="flex-shrink-0">
              <div className="relative w-32 h-16 md:w-48 md:h-24 transition-transform duration-500 ease-premium hover:scale-105 cursor-default flex items-center justify-center grayscale-[1] hover:grayscale-0 opacity-60 hover:opacity-100">
                {client.logoUrl ? (
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 96px, 144px"
                    className="object-contain"
                  />
                ) : (
                  <span className="text-brand-navy/40 font-bold">{client.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
      `}</style>
    </section>
  );
}
