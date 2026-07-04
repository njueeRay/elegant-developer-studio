"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AmbientCursorField() {
  const pathname = usePathname();
  const isReadingSurface =
    pathname.startsWith("/blog/") || pathname.startsWith("/knowledge/");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    delete document.documentElement.dataset.cursorSurface;

    if (reducedMotion || isReadingSurface) {
      if (isReadingSurface) {
        document.documentElement.dataset.cursorSurface = "reading";
      }

      return () => {
        delete document.documentElement.dataset.cursorSurface;
      };
    }

    let animationFrame = 0;

    const updateCursor = (clientX: number, clientY: number) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);
        document.documentElement.dataset.cursor = "active";
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      updateCursor(event.clientX, event.clientY);
    };

    const onMouseMove = (event: MouseEvent) => {
      updateCursor(event.clientX, event.clientY);
    };

    updateCursor(window.innerWidth * 0.52, window.innerHeight * 0.38);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.style.removeProperty("--cursor-x");
      document.documentElement.style.removeProperty("--cursor-y");
      delete document.documentElement.dataset.cursor;
      delete document.documentElement.dataset.cursorSurface;
    };
  }, [isReadingSurface]);

  return null;
}
