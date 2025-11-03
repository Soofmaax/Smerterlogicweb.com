"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { track } from "@/lib/analytics";

type TrackedLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  eventName?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export function TrackedLink({
  children,
  className,
  eventName,
  onClick, // ignore external onClick to avoid passing functions from Server Components
  ...rest
}: TrackedLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (eventName) {
        try {
          track(eventName);
        } catch {
          // no-op
        }
      }
    },
    [eventName]
  );

  return (
    <Link {...rest} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}