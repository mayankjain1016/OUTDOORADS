"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";

/**
 * Array of advertisement banners located in /public/HeroBanner/
 */
export const BILLBOARD_BANNERS = [
  "/HeroBanner/Banner1.png",
  "/HeroBanner/Banner2.png",
  "/HeroBanner/Banner3.png",
  "/HeroBanner/Banner4.png",
  "/HeroBanner/Banner5.png",
];

interface BillboardSlideshowProps {
  /** Optional custom list of image URLs */
  images?: string[];
  /** Transition interval in milliseconds (default: 4500ms) */
  intervalMs?: number;
  /** Optional extra classes */
  className?: string;
}

// Exact coordinate constants mapped to HeroBG.jpeg (1408 x 768 px)
const ORIGINAL_IMG_WIDTH = 1408;
const ORIGINAL_IMG_HEIGHT = 768;
const BILLBOARD_LEFT = 999;
const BILLBOARD_TOP = 174;
const BILLBOARD_WIDTH = 269; // (1268 - 999)
const BILLBOARD_HEIGHT = 188; // (362 - 174)

export function BillboardSlideshow({
  images = BILLBOARD_BANNERS,
  intervalMs = 4500,
  className = "",
}: BillboardSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    left: number | string;
    top: number | string;
    width: number | string;
    height: number | string;
  }>({
    left: `${(BILLBOARD_LEFT / ORIGINAL_IMG_WIDTH) * 100}%`,
    top: `${(BILLBOARD_TOP / ORIGINAL_IMG_HEIGHT) * 100}%`,
    width: `${(BILLBOARD_WIDTH / ORIGINAL_IMG_WIDTH) * 100}%`,
    height: `${(BILLBOARD_HEIGHT / ORIGINAL_IMG_HEIGHT) * 100}%`,
  });

  // Dynamically lock coordinates to the rendered HeroBG.jpeg regardless of screen size & aspect ratio
  useLayoutEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const updatePosition = () => {
      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;
      if (!parentWidth || !parentHeight) return;

      const parentAspect = parentWidth / parentHeight;
      const imageAspect = ORIGINAL_IMG_WIDTH / ORIGINAL_IMG_HEIGHT;

      let renderedWidth: number;
      let renderedHeight: number;
      let renderedLeft: number;
      let renderedTop: number;

      if (parentAspect > imageAspect) {
        // Parent is wider than image: covers full width, cropped top/bottom
        renderedWidth = parentWidth;
        renderedHeight = parentWidth / imageAspect;
        renderedLeft = 0;
        renderedTop = (parentHeight - renderedHeight) / 2;
      } else {
        // Parent is taller than image: covers full height, cropped left/right
        renderedHeight = parentHeight;
        renderedWidth = parentHeight * imageAspect;
        renderedTop = 0;
        renderedLeft = (parentWidth - renderedWidth) / 2;
      }

      const pixelLeft = renderedLeft + renderedWidth * (BILLBOARD_LEFT / ORIGINAL_IMG_WIDTH);
      const pixelTop = renderedTop + renderedHeight * (BILLBOARD_TOP / ORIGINAL_IMG_HEIGHT);
      const pixelWidth = renderedWidth * (BILLBOARD_WIDTH / ORIGINAL_IMG_WIDTH);
      const pixelHeight = renderedHeight * (BILLBOARD_HEIGHT / ORIGINAL_IMG_HEIGHT);

      setCoords({
        left: `${pixelLeft}px`,
        top: `${pixelTop}px`,
        width: `${pixelWidth}px`,
        height: `${pixelHeight}px`,
      });
    };

    let animationFrameId: number;
    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        updatePosition();
      });
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(parent);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute pointer-events-none z-10 overflow-hidden ${className}`}
      style={{
        top: coords.top,
        left: coords.left,
        width: coords.width,
        height: coords.height,
        // Pixel-perfect quad clipping to the inner frame of the building billboard
        clipPath: "polygon(0% 30.32%, 100% 0%, 100% 94.15%, 0% 100%)",
        transformOrigin: "center center",
      }}
      aria-label="Building Billboard Advertisement Slideshow"
    >
      {/* Slides container with 3D perspective to match the angled camera viewpoint */}
      <div 
        className="w-full h-full relative"
        style={{
          transform: "perspective(800px) rotateY(-11deg) rotateX(2deg) rotateZ(-3.2deg) scale(1.18)",
          transformOrigin: "52% 48%",
        }}
      >
        {images.map((src, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={src}
                alt={`Billboard Advertisement ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 40vw, 25vw"
                className="object-cover object-center w-full h-full"
              />
            </div>
          );
        })}
      </div>

      {/* Realistic printed billboard depth, frame shadow, and ambient light reflection */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_15px_rgba(0,0,0,0.45)] bg-gradient-to-tr from-black/20 via-transparent to-white/15 mix-blend-overlay" 
      />
      <div 
        className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-b from-black/10 via-transparent to-black/20 mix-blend-multiply" 
      />
    </div>
  );
}
