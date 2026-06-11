"use client";

import { Braces, MousePointer2, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ArticleInteractions() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!pointerFine || reducedMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--reader-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--reader-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.style.removeProperty("--reader-x");
      document.documentElement.style.removeProperty("--reader-y");
    };
  }, []);

  return (
    <>
      <div className="reader-spotlight" aria-hidden="true" />
      {visible ? (
        <aside className="article-signal" aria-label="Article interaction notes">
          <div>
            <Braces size={16} />
            <span>reader mode</span>
          </div>
          <p>
            Hover headings for anchors. Code blocks copy with feedback. The soft
            light follows your cursor, but stays out of the text.
          </p>
          <button
            type="button"
            aria-label="Hide reader mode note"
            onClick={() => setVisible(false)}
          >
            <X size={14} />
          </button>
        </aside>
      ) : (
        <button
          type="button"
          className="article-signal-toggle"
          aria-label="Show reader mode note"
          onClick={() => setVisible(true)}
        >
          <MousePointer2 size={15} />
        </button>
      )}
    </>
  );
}
