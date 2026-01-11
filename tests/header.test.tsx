import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/site/header";
import * as nextNavigation from "next/navigation";

let pathnameSpy: ReturnType<typeof vi.spyOn> | null = null;

function mockPathname(path: string) {
  if (!pathnameSpy) {
    pathnameSpy = vi.spyOn(nextNavigation, "usePathname");
  }
  pathnameSpy.mockReturnValue(path);
}

vi.mock("@/lib/analytics", () => ({
  track: vi.fn(),
}));

afterEach(() => {
  vi.restoreAllMocks();
  pathnameSpy = null;
});

describe("Header locale switch", () => {
  it("bascule de FR vers EN en conservant le slug", () => {
    mockPathname("/projets");

    render(<Header />);

    const langSwitch = screen.getByRole("link", { name: /EN/i });
    expect(langSwitch).toHaveAttribute("href", "/en/projects");
  });

  it("bascule de EN vers FR en conservant le slug et le segment", () => {
    mockPathname("/en/about");

    render(<Header />);

    const langSwitch = screen.getByRole("link", { name: /FR/i });
    expect(langSwitch).toHaveAttribute("href", "/a-propos");
  });

  it("bascule correctement sur une sous-route", () => {
    mockPathname("/en/services/foo");

    render(<Header />);

    const langSwitch = screen.getByRole("link", { name: /FR/i });
    expect(langSwitch).toHaveAttribute("href", "/services/foo");
  });
});