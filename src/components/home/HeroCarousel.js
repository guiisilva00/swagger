"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      className="relative overflow-hidden border-b border-zinc-800"
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            aria-hidden={slideIndex !== index}
            className="w-full shrink-0"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-6 py-24 sm:px-8 sm:py-32 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {slide.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-zinc-400">
                  {slide.description}
                </p>
                <Link
                  href={slide.ctaHref}
                  tabIndex={slideIndex === index ? 0 : -1}
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-zinc-50 px-6 text-sm font-semibold uppercase tracking-wide text-zinc-950 transition-colors hover:bg-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                >
                  {slide.ctaLabel}
                </Link>
              </div>

              {slide.image && (
                <div className="relative hidden h-64 w-64 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 md:flex">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="256px"
                    className="object-contain p-10"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`Ir para slide ${slideIndex + 1}`}
            aria-current={slideIndex === index}
            className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
              slideIndex === index ? "w-6 bg-zinc-50" : "w-1.5 bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
