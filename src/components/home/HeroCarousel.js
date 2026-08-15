"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assetPath } from "@/lib/basePath";

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (next) =>
      setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || paused) return;

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative h-[85vh] max-h-[820px] min-h-[560px] overflow-hidden border-b border-border"
    >
      {/*
        Full-bleed photographic background: text/controls here are
        intentionally fixed white, not theme tokens — legibility is driven
        by the gradient scrim over the photo, not by light/dark mode.
      */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            aria-hidden={slideIndex !== index}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={assetPath(slide.image)}
              alt=""
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

            <div className="relative flex h-full items-center">
              <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
                <div className="max-w-lg">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    {slide.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-7 text-white/80">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.ctaHref}
                    tabIndex={slideIndex === index ? 0 : -1}
                    className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold uppercase tracking-wide text-zinc-950 transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
      >
        <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
      >
        <ChevronRight size={20} strokeWidth={1.8} aria-hidden="true" />
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`Ir para slide ${slideIndex + 1}`}
            aria-current={slideIndex === index}
            className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              slideIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
