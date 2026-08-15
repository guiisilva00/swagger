"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ className = "" }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const query = value.trim();
    router.push(
      query ? `/produtos?busca=${encodeURIComponent(query)}` : "/produtos"
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`relative ${className}`}
    >
      <label htmlFor="search" className="sr-only">
        Buscar produtos
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar produtos"
        className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-50 placeholder:text-zinc-500 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
      />
    </form>
  );
}
