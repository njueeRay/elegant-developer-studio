"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Photo } from "@/data/media";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];
  const featured = useMemo(() => photos.filter((photo) => photo.featured), [photos]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? index : (index + 1) % photos.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? index : (index - 1 + photos.length) % photos.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, photos.length]);

  return (
    <>
      <section className="photo-feature-band" aria-label="Featured photos">
        {featured.map((photo, index) => (
          <button
            key={photo.slug}
            type="button"
            className="photo-feature-card"
            onClick={() => setActiveIndex(photos.indexOf(photo))}
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              width={1100}
              height={760}
              className="photo-feature-image"
              unoptimized={photo.image.startsWith("http")}
              priority={index === 0}
            />
            <span>
              <small>{photo.mood}</small>
              <strong>{photo.title}</strong>
            </span>
          </button>
        ))}
      </section>

      <section className="photo-grid" aria-label="Photo notes">
        {photos.map((photo, index) => (
          <button
            key={photo.slug}
            type="button"
            className={`photo-tile ${photo.aspect}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              width={900}
              height={photo.aspect === "portrait" ? 1180 : 680}
              className="photo-tile-image"
              unoptimized={photo.image.startsWith("http")}
            />
            <span className="photo-tile-meta">
              <span>
                <strong>{photo.title}</strong>
                <small>
                  <MapPin size={13} />
                  {photo.location}
                </small>
              </span>
              <Expand size={17} />
            </span>
          </button>
        ))}
      </section>

      {activePhoto ? (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Close photo viewer"
            onClick={() => setActiveIndex(null)}
          >
            <X size={20} />
          </button>
          <button
            type="button"
            className="lightbox-nav previous"
            aria-label="Previous photo"
            onClick={() =>
              setActiveIndex((index) =>
                index === null ? index : (index - 1 + photos.length) % photos.length,
              )
            }
          >
            <ChevronLeft size={24} />
          </button>
          <figure>
            <Image
              src={activePhoto.image}
              alt={activePhoto.alt}
              width={1400}
              height={980}
              className="lightbox-image"
              unoptimized={activePhoto.image.startsWith("http")}
            />
            <figcaption>
              <span>
                <strong>{activePhoto.title}</strong>
                <small>
                  {activePhoto.location} / {activePhoto.camera}
                </small>
              </span>
              <p>{activePhoto.story}</p>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav next"
            aria-label="Next photo"
            onClick={() =>
              setActiveIndex((index) =>
                index === null ? index : (index + 1) % photos.length,
              )
            }
          >
            <ChevronRight size={24} />
          </button>
        </div>
      ) : null}
    </>
  );
}
