"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

export default function ProductImageZoom({ src, alt, priority, onOpen }) {
  const containerRef = useRef(null);
  const [zooming, setZooming] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  function handleMouseMove(event) {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setZooming(true)}
      onMouseLeave={() => setZooming(false)}
      onMouseMove={handleMouseMove}
      onClick={onOpen}
      className="relative aspect-square cursor-zoom-in overflow-hidden rounded-md border border-border bg-surface"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`object-contain p-10 transition-opacity duration-200 ${
          zooming ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-no-repeat transition-opacity duration-200 ${
          zooming ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "220%",
          backgroundPosition: `${position.x}% ${position.y}%`,
        }}
      />

      <span
        className={`pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1.5 text-xs text-muted shadow-sm backdrop-blur transition-opacity duration-200 sm:flex ${
          zooming ? "opacity-0" : "opacity-100"
        }`}
      >
        <ZoomIn size={13} strokeWidth={1.8} aria-hidden="true" />
        Passe o mouse para ampliar
      </span>
    </div>
  );
}
