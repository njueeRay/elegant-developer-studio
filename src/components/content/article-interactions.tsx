"use client";

import { Braces, Copy, Focus, MousePointer2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { writeToClipboard } from "@/lib/clipboard";
import type { TocItem } from "@/lib/content";

type ArticleInteractionsProps = {
  slug: string;
  title: string;
  toc: TocItem[];
};

export function ArticleInteractions({ slug, title, toc }: ArticleInteractionsProps) {
  const [visible, setVisible] = useState(true);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const activeItem = toc.find((item) => item.id === activeId) ?? toc[0];

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

  useEffect(() => {
    if (toc.length === 0) {
      return;
    }

    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (headings.length === 0) {
      return;
    }

    const markActiveHeading = (id: string) => {
      headings.forEach((heading) => {
        heading.classList.toggle("reading-section-active", heading.id === id);
      });
    };

    const setActiveHeading = (id: string) => {
      setActiveId(id);
      markActiveHeading(id);
    };

    const updateFromScroll = () => {
      const threshold = window.innerHeight * 0.34;
      const current =
        headings
          .filter((heading) => heading.getBoundingClientRect().top <= threshold)
          .at(-1) ?? headings[0];

      setActiveHeading(current.id);
    };

    let animationFrame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry?.target.id) {
          return;
        }

        const nextId = visibleEntry.target.id;
        setActiveHeading(nextId);
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.2, 0.5, 0.8],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      headings.forEach((heading) => heading.classList.remove("reading-section-active"));
    };
  }, [toc]);

  const copySectionRef = async () => {
    const sectionId = activeItem?.id;
    const path = sectionId ? `/blog/${slug}#${sectionId}` : `/blog/${slug}`;
    const origin = window.location.origin;

    await writeToClipboard(`${origin}${path}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <>
      <div className="reader-spotlight" aria-hidden="true" />
      {visible ? (
        <aside className="article-signal" aria-label="Article reading focus" data-testid="reading-focus-lens">
          <header>
            <div>
              <Focus size={16} />
              <span>reading focus</span>
            </div>
            <button
              type="button"
              aria-label="Hide reader focus"
              onClick={() => setVisible(false)}
            >
              <X size={14} />
            </button>
          </header>
          <p data-testid="reading-focus-section">{activeItem?.title ?? title}</p>
          <code>{`read.focus("${activeItem?.id ?? slug}")`}</code>
          <button
            type="button"
            className="article-ref-button"
            data-testid="reading-focus-copy"
            onClick={copySectionRef}
          >
            {copied ? <Braces size={14} /> : <Copy size={14} />}
            {copied ? "Copied ref" : "Copy ref"}
          </button>
        </aside>
      ) : (
        <button
          type="button"
          className="article-signal-toggle"
          aria-label="Show reader focus"
          onClick={() => setVisible(true)}
        >
          <MousePointer2 size={15} />
        </button>
      )}
    </>
  );
}
