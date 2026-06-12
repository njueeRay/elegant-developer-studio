"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FilterBar } from "@/components/content/filter-bar";
import type { Photo } from "@/data/media";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const filterItems = useMemo(
    () => [
      "All",
      "Featured",
      ...Array.from(new Set(photos.flatMap((photo) => photo.tags))).sort(),
    ],
    [photos],
  );
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "All") {
      return photos;
    }

    if (activeFilter === "Featured") {
      return photos.filter((photo) => photo.featured);
    }

    return photos.filter((photo) => photo.tags.includes(activeFilter));
  }, [activeFilter, photos]);
  const activePhoto = activeIndex === null ? null : filteredPhotos[activeIndex];
  const highlights = useMemo(() => {
    if (activeFilter === "All") {
      return photos.filter((photo) => photo.featured);
    }

    return filteredPhotos.slice(0, 2);
  }, [activeFilter, filteredPhotos, photos]);

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setActiveIndex(null);
  }

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
          index === null ? index : (index + 1) % filteredPhotos.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null
            ? index
            : (index - 1 + filteredPhotos.length) % filteredPhotos.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, filteredPhotos.length]);

  return (
    <>
      <section className="photo-explorer" aria-label="Photo explorer">
        <FilterBar
          label="Filter photos"
          active={activeFilter}
          items={filterItems}
          onChange={handleFilterChange}
          resultCount={filteredPhotos.length}
          totalCount={photos.length}
          noun="frames"
        />
      </section>

      {highlights.length > 0 ? (
        <section className="photo-feature-band" aria-label="Featured photos">
          {highlights.map((photo, index) => (
            <button
              key={photo.slug}
              type="button"
              className="photo-feature-card"
              onClick={() => setActiveIndex(filteredPhotos.indexOf(photo))}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                width={1100}
                height={760}
                className="photo-feature-image"
                unoptimized={photo.image.startsWith("http")}
                priority={activeFilter === "All" && index === 0}
              />
              <span>
                <small>{photo.mood}</small>
                <strong>{photo.title}</strong>
              </span>
            </button>
          ))}
        </section>
      ) : null}

      <section className="photo-grid" aria-label="Photo notes">
        {filteredPhotos.map((photo, index) => (
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
                index === null
                  ? index
                  : (index - 1 + filteredPhotos.length) % filteredPhotos.length,
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
                index === null ? index : (index + 1) % filteredPhotos.length,
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
