"use client";

import { useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/basePath";

const RATIO = 512 / 1130;

export default function HeroLogoMark({ width = 220, className = "", tabIndex }) {
  const [spinning, setSpinning] = useState(false);

  return (
    <button
      type="button"
      tabIndex={tabIndex}
      aria-label="SWAGGER"
      onClick={() => {
        // Touch devices have no :hover — replay the spin on tap instead.
        setSpinning(false);
        requestAnimationFrame(() => setSpinning(true));
      }}
      onAnimationEnd={() => setSpinning(false)}
      className={`logo-spin-in logo-spin-hover inline-block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        spinning ? "is-spinning" : ""
      } ${className}`}
      style={{ width }}
    >
      <Image
        src={assetPath("/brand/swagger-logo.webp")}
        alt=""
        width={width}
        height={Math.round(width * RATIO)}
        className="h-auto w-full select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
      />
    </button>
  );
}
