"use client";

import { CLIENTS } from "@/data";

export function LogoWall() {
  const logos = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-10 md:py-24 bg-zinc-50 border-b border-zinc-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-12 text-center">
        <p className="text-zinc-500 font-medium tracking-[0.2em] uppercase text-xs">
          Trusted by industry-leading brands
        </p>
      </div>
      
      <div className="relative w-full flex items-center">
        {/* Gradients to fade edges cleanly into the background */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[scroll_15s_linear_infinite] md:animate-[scroll_40s_linear_infinite] w-[300%] gap-16 lg:gap-32 items-center justify-around px-8">
          {logos.map((client, i) => (
            <div key={`${client.id}-${i}`} className="flex-shrink-0">
              <div className="flex items-center justify-center text-zinc-400 font-heading font-bold text-xl md:text-2xl tracking-tight grayscale transition-colors duration-300 hover:text-zinc-800 cursor-default">
                {client.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
