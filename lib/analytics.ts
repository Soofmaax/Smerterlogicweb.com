export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const plausible = (window as any).plausible;
    if (typeof plausible === "function") {
      plausible(event, props ? { props } : undefined);
    }
  }
}