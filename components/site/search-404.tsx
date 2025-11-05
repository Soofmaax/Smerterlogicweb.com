"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function Search404() {
  const [q, setQ] = React.useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(`site:smarterlogicweb.com ${query}`)}`;
    window.location.href = url;
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-6 flex w-full max-w-md items-center gap-2">
      <label htmlFor="search-404" className="sr-only">Rechercher sur le site</label>
      <input
        id="search-404"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher sur le site"
        className="input-glow h-11 flex-1 rounded-md border border-foreground/20 bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Rechercher sur le site"
      />
      <button
        type="submit"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition hover:opacity-90"
        aria-label="Rechercher"
        title="Rechercher"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}