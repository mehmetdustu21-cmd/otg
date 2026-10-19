"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

export function TrackableLink({ eventName, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { eventName: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName, path: window.location.pathname })
    }).catch(() => undefined);
    onClick?.(event);
  }
  return <a {...props} onClick={handleClick} />;
}
