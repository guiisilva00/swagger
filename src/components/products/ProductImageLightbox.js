"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function ProductImageLightbox({ src, alt, open, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 flex flex-col bg-background transition-opacity duration-200 focus:outline-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar imagem ampliada"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground shadow-md hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        {/* Native pinch-zoom/pan works here since touch-action isn't restricted */}
        <div className="flex flex-1 items-center justify-center overflow-auto px-6 pb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
