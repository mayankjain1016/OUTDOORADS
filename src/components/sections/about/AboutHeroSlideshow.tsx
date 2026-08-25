"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Array of 6 background banner images for the About Us Hero section.
 * Place your images in: /public/AboutUsBanners/
 * Expected filenames: img1.jpg, img2.jpg, img3.jpg, img4.jpg, img5.jpg, img6.jpg
 */
export const ABOUT_HERO_BANNERS = [
  "/AboutUsBanners/img1.jpg",
  "/AboutUsBanners/img2.jpg",
  "/AboutUsBanners/img3.jpg",
  "/AboutUsBanners/img4.jpg",
  "/AboutUsBanners/img5.jpg",
  "/AboutUsBanners/img6.jpg",
];

interface AboutHeroSlideshowProps {
  /** Optional custom array of image URLs (defaults to ABOUT_HERO_BANNERS) */
  images?: string[];
  /** Display duration per slide in milliseconds (default: 4500ms) */
  slideIntervalMs?: number;
  /** 3D Page flip animation duration in milliseconds (default: 1000ms) */
  flipDurationMs?: number;
  /** Optional overlay opacity className (default: "bg-black/60") */
  overlayClassName?: string;
  /** Optional additional container className */
  className?: string;
}

export function AboutHeroSlideshow({
  images = ABOUT_HERO_BANNERS,
  slideIntervalMs = 4500,
  flipDurationMs = 1000,
  overlayClassName = "bg-gradient-to-b from-black/75 via-black/50 to-black/80",
  className = "",
}: AboutHeroSlideshowProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalImages = images.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || totalImages <= 1) return;

    // Timer to trigger the 3D page flip
    const timer = setInterval(() => {
      const incomingIndex = (currentIndex + 1) % totalImages;
      setNextIndex(incomingIndex);
      setIsFlipping(true);

      // Once flip animation finishes, commit the next slide
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(incomingIndex);
        setIsFlipping(false);
      }, flipDurationMs);

    }, slideIntervalMs);

    return () => {
      clearInterval(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted, currentIndex, totalImages, slideIntervalMs, flipDurationMs]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];
  const incomingImage = images[nextIndex] || images[1 % totalImages];

  return (
    <div
      className={`absolute inset-0 w-full h-full min-h-full overflow-hidden pointer-events-none ${className}`}
      style={{
        perspective: "1600px",
        perspectiveOrigin: "center center",
      }}
      aria-hidden="true"
    >
      {/* ── Underneath Layer: Incoming Next Slide (Rendered only when flipping) ── */}
      {mounted && isFlipping && (
        <div
          key={`next-${nextIndex}`}
          className="absolute inset-0 w-full h-full z-[1]"
        >
          <div className="relative w-full h-full about-ken-burns">
            <Image
              src={incomingImage}
              alt={`About Banner ${nextIndex + 1}`}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* ── Top Layer: Current Active Slide (Performs page-turn when flipping) ── */}
      <div
        key={`current-${currentIndex}`}
        className={`absolute inset-0 w-full h-full z-[2] ${
          mounted && isFlipping ? "about-page-flip" : ""
        }`}
      >
        <div
          className={`relative w-full h-full ${
            mounted && !isFlipping ? "about-ken-burns" : ""
          }`}
        >
          <Image
            src={currentImage}
            alt={`About Banner ${currentIndex + 1}`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Dark Cinematic Overlay for Text Contrast ── */}
      <div
        className={`absolute inset-0 w-full h-full z-[10] pointer-events-none transition-opacity duration-700 ${overlayClassName}`}
      />
    </div>
  );
}
