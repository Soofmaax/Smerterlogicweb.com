import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/site/header";
import { usePathname } from "next/navigation";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  track: vi.fn(),
}));

const usePathnameMock = usePathname as unknown as ReturnType<typeof vi.fn>;

function mockPathname(path: string) {
  usePathnameMock.mockReturnValue(path);
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("Header locale switch", () => {
  it("bascule de FR vers EN en conservant le slug", () => {
    mockPathname("/projets");

    render(<Header />);

    // On cible le switch de langue via son aria-label explicite
    const langSwitch = screen.getByRole("link", { name: /Switch to English/i });
    expect(langSwitch).toHaveAttribute("href", "/en/projects");
  });

  it("bascule de EN vers FR en conservant le slug et le segment", () => {
    mockPathname("/en/about");

    render(<Header />);

    const langSwitch = screen.getByRole("link", { name: /Basculer en français/i });
    expect(langSwitch).toHaveAttribute("href", "/a-propos");
  });

  it("bascule correctement sur une sous-route", () => {
    mockPathname("/en/services/foo");

    render(<Header />);

    const langSwitch = screen.getByRole("link", { name: /Basculer en français/i });
    expect(langSwitch).toHaveAttribute("href", "/services/foo");
  });
});