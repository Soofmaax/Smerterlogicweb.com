import "@testing-library/jest-dom/vitest";

// Basic IntersectionObserver mock for components that rely on it (e.g. TableOfContents)
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class MockIntersectionObserver {
    callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe() {
      // no-op
    }

    unobserve() {
      // no-op
    }

    disconnect() {
      // no-op
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  // @ts-expect-error - we are polyfilling for tests
  window.IntersectionObserver = MockIntersectionObserver;
}