"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("flex flex-col space-y-4 mb-16", {
        "items-start text-left": align === "left",
        "items-center text-center": align === "center",
        "items-end text-right": align === "right",
      }, className)}
    >
      <div className={cn("h-1 w-12 bg-brand-accent rounded-full mb-2", {
        "mx-auto": align === "center",
        "ml-auto": align === "right",
      })} />
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-primary-900 font-heading uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-primary-500 max-w-2xl font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
