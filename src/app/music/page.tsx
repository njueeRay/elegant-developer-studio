import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ListMusic, Radio } from "lucide-react";
import { MiniPlayer } from "@/components/media/mini-player";
import { currentMix } from "@/data/media";

export const metadata: Metadata = {
  title: "Music - Ray Studio",
  description:
    "A focused studio mix page with a refined mini player, track list, and listening context for Ray Studio.",
};

export default function MusicPage() {
  return (
    <main className="studio-shell content-shell media-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="content-header media-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <p className="section-kicker rust">Music</p>
        <h1>A quiet studio mix for writing, refactoring, and design review.</h1>
        <p>{currentMix.description}</p>
        <div className="media-header-facts" aria-label="Music collection facts">
          <span>
            <Radio size={15} />
            Mock playback state
          </span>
          <span>
            <ListMusic size={15} />
            {currentMix.tracks.length} tracks
          </span>
        </div>
      </header>
      <MiniPlayer mix={currentMix} />
    </main>
  );
}
