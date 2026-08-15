"use client";

import { useState } from "react";
import Image from "next/image";
import ProductImageZoom from "./ProductImageZoom";
import ProductImageLightbox from "./ProductImageLightbox";

export default function ProductGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {images.length > 1 && (
        <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:w-20 sm:flex-col sm:overflow-visible">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver foto ${index + 1} de ${title}`}
              aria-current={index === activeIndex}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border bg-surface transition-colors sm:w-full ${
                index === activeIndex
                  ? "border-ring"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      <div className="order-1 flex-1 sm:order-2">
        <ProductImageZoom
          src={activeImage}
          alt={title}
          priority
          onOpen={() => setLightboxOpen(true)}
        />
      </div>

      <ProductImageLightbox
        src={activeImage}
        alt={title}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
