import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PhotoGrid } from "@/components/media/photo-grid";
import { photos } from "@/data/media";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Photos",
  description:
    "Ray Studio 的视觉记忆层：桌面、原型空间、收听角落和影响工作的细节观察。",
  path: "/photos",
  image: "/assets/morning-studio-desk.png",
});

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
