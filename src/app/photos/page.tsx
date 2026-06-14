import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PhotoGrid } from "@/components/media/photo-grid";
import { photos } from "@/data/media";

export const metadata: Metadata = {
  title: "Photos - Ray Studio",
  description:
    "A small visual memory layer for Ray Studio: studio desks, prototype rooms, listening corners, and observed texture.",
};

export default function PhotosPage() {
  const featured = photos.find((photo) => photo.featured) ?? photos[0];

  return (
    <main className="studio-shell content-shell media-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header media-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <p className="section-kicker">Photos</p>
        <h1>Visual notes from the studio and the spaces around it.</h1>
        <p>
          Not a social feed, not a commercial photo portfolio. This is the
          quieter layer: light, desks, prototypes, rooms, and small observations
          that influence the work.
        </p>
        <div className="media-header-facts" aria-label="Photo collection facts">
          <span>
            <Camera size={15} />
            {photos.length} frames
          </span>
          <span>
            <MapPin size={15} />
            Featured: {featured.location}
          </span>
        </div>
      </header>
      <PhotoGrid photos={photos} />
    </main>
  );
}
