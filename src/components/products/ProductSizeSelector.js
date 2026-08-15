"use client";

export default function ProductSizeSelector({
  sizes,
  value,
  onChange,
  unavailableSizes = [],
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs uppercase tracking-wide text-muted">
        Tamanho
      </legend>
      <div role="radiogroup" className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const selected = value === size;
          const unavailable = unavailableSizes.includes(size);

          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`Tamanho ${size}${unavailable ? " (indisponível)" : ""}`}
              disabled={unavailable}
              onClick={() => onChange(size)}
              className={`flex h-11 min-w-11 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 ${
                selected
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border-strong text-foreground hover:border-ring"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
