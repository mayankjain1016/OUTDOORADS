"use client";

import { CLIENTS } from "@/data";
import Image from "next/image";

export function LogoWall() {
  const logos = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-10 md:py-24 bg-zinc-50 border-b border-zinc-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-12 text-center">
        <p className="text-zinc-500 font-medium tracking-[0.2em] uppercase text-xs">
          Trusted by industry-leading brands
        </p>
      </div>
      
      <div className="relative w-full flex items-center h-24">
        {/* Gradients to fade edges cleanly into the background */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[scroll_40s_linear_infinite] md:animate-[scroll_80s_linear_infinite] w-[300%] gap-12 lg:gap-24 items-center justify-around px-8">
          {logos.map((client, i) => (
            <div key={`${client.id}-${i}`} className="flex-shrink-0">
              <div className="relative w-24 h-12 md:w-36 md:h-16 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default flex items-center justify-center">
                {client.logoUrl ? (
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 96px, 144px"
                    className="object-contain"
                  />
                ) : (
                  <span className="text-zinc-400 font-bold">{client.name}</span>
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
