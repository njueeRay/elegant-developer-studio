import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ListMusic, Radio } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { MiniPlayer } from "@/components/media/mini-player";
import { currentMix } from "@/data/media";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Music",
  description:
    "Ray Studio 的音乐页：工作室歌单、迷你播放器、曲目列表和写作/重构时的收听上下文。",
  path: "/music",
});

export default function MusicPage() {
  return (
    <main className="studio-shell content-shell media-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header media-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <p className="section-kicker rust">Music</p>
        <h1>A quiet studio mix for writing, refactoring, and design review.</h1>
        <p>{currentMix.description}</p>
        <p>{currentMix.purpose}</p>
        <div className="media-header-facts" aria-label="Music collection facts">
          <span>
            <Radio size={15} />
            {currentMix.playbackState}
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
