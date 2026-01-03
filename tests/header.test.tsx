import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/site/header";
import * as nextNavigation from "next/navigation";

function mockPathname(path: string) {
  vi.spyOn(nextNavigation, "usePathname").mockReturnValue(path);
}

vi.mock("@/lib/analytics", () => ({
  track: vi.fn(),
}));

describe("Header locale switch", () =&gt; {
  it("bascule de FR vers EN en conservant le slug", () =&gt; {
    mockPathname("/projets");

    render(&lt;Header /&gt;);

    const langSwitch = screen.getByRole("link", { name: /EN/i });
    expect(langSwitch).toHaveAttribute("href", "/en/projects");
  });

  it("bascule de EN vers FR en conservant le slug et le segment", () =&gt; {
    mockPathname("/en/about");

    render(&lt;Header /&gt;);

    const langSwitch = screen.getByRole("link", { name: /FR/i });
    expect(langSwitch).toHaveAttribute("href", "/a-propos");
  });

  it("bascule correctement sur une sous-route", () =&gt; {
    mockPathname("/en/services/foo");

    render(&lt;Header /&gt;);

    const langSwitch = screen.getByRole("link", { name: /FR/i });
    expect(langSwitch).toHaveAttribute("href", "/services/foo");
  });
});