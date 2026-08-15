"use client";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className = "",
}) {
  const cell = size === "sm" ? "h-8 w-8" : "h-12 w-12";

  return (
    <div
      className={`inline-flex items-center rounded-md border border-zinc-800 ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
        className={`flex ${cell} items-center justify-center text-zinc-50 transition-colors hover:bg-zinc-900 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400`}
      >
        −
      </button>
      <span
        aria-live="polite"
        className={`flex ${size === "sm" ? "w-6" : "w-8"} items-center justify-center text-sm text-zinc-50`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
        className={`flex ${cell} items-center justify-center text-zinc-50 transition-colors hover:bg-zinc-900 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400`}
      >
        +
      </button>
    </div>
  );
}
