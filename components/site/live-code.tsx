"use client";

import * as React from "react";

/**
 * LiveCode: fetches real code via /api/code-snippet and types it out.
 * Props:
 *  - path: repo-relative path (must be whitelisted server-side)
 *  - title: display title
 */
export function LiveCode({ path, title = "Code source" }: { path: string; title?: string }) {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [typed, setTyped] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [typing, setTyping] = React.useState(true);

  const fetchCode = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/code-snippet?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      setCode(data.content || "// Aucun contenu");
      setTyped("");
    } catch {
      setCode("// Erreur de chargement du code");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!open || !typing || !code) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTyped(code);
      return;
    }
    let i = 0;
    const speed = 12; // ms per character
    const id = window.setInterval(() => {
      i += 1;
      setTyped(code.slice(0, i));
      if (i >= code.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [open, typing, code]);

  const toggleOpen = async () => {
    const next = !open;
    setOpen(next);
    if (next) await fetchCode();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code || typed);
    } catch {
      // ignore
    }
  };

  return (
    <div className="mt-4 rounded-[20px] border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="font-heading text-base font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">Tape l’extrait réel du repo (Hero component).</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleOpen}
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
          >
            {open ? "Fermer" : "Voir le code"}
          </button>
          {open && (
            <>
              <button
                type="button"
                onClick={() => setTyping((t) => !t)}
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
              >
                {typing ? "Stop typing" : "Play typing"}
              </button>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
              >
                Copier
              </button>
            </>
          )}
        </div>
      </div>
      {open && (
        <div className="mt-3 rounded-lg border bg-muted/40 p-3">
          {loading ? (
            <div className="text-sm text-muted-foreground">Chargement…</div>
          ) : (
            <pre className="whitespace-pre-wrap break-words text-xs md:text-sm">
              <code>{typing ? typed : code}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}