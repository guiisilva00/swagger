"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Standard next-themes hydration guard: `resolvedTheme` is unknown
    // during SSR/first paint, so we render nothing until mounted client-side
    // to avoid a light/dark mismatch flash.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className={`flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      {mounted && (
        <span key={isDark ? "dark" : "light"} className="inline-flex animate-pulse-scale">
          {isDark ? (
            <Moon size={19} strokeWidth={1.6} aria-hidden="true" />
          ) : (
            <Sun size={19} strokeWidth={1.6} aria-hidden="true" />
          )}
        </span>
      )}
    </button>
  );
}
