"use client";

import Image from "next/image";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Waves,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatDuration, type Mix } from "@/data/media";

export function MiniPlayer({ mix }: { mix: Mix }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(24);
  const [volume, setVolume] = useState(68);
  const currentTrack = mix.tracks[trackIndex];
  const elapsed = useMemo(
    () => Math.round((currentTrack.duration * progress) / 100),
    [currentTrack.duration, progress],
  );

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          setTrackIndex((index) => (index + 1) % mix.tracks.length);
          return 0;
        }

        return value + 0.8;
      });
    }, 900);

    return () => window.clearInterval(timer);
  }, [mix.tracks.length, playing]);

  function selectTrack(index: number) {
    setTrackIndex(index);
    setProgress(0);
    setPlaying(true);
  }

  function previousTrack() {
    setTrackIndex((index) => (index - 1 + mix.tracks.length) % mix.tracks.length);
    setProgress(0);
  }

  function nextTrack() {
    setTrackIndex((index) => (index + 1) % mix.tracks.length);
    setProgress(0);
  }

  return (
    <section className="music-console" aria-label="Studio music player">
      <div className="now-playing-card">
        <div className="player-cover-wrap">
          <Image
            src={currentTrack.cover}
            alt=""
            width={620}
            height={620}
            className="player-cover"
            unoptimized={currentTrack.cover.startsWith("http")}
            priority
          />
          <span className={playing ? "signal-ring playing" : "signal-ring"}>
            <Waves size={22} />
          </span>
        </div>
        <div className="player-copy">
          <p className="section-kicker rust">{mix.context}</p>
          <h2>{currentTrack.title}</h2>
          <p>{currentTrack.artist}</p>
          <div className="player-context">
            <span>{currentTrack.context}</span>
            <span>{currentTrack.mood}</span>
          </div>
        </div>
        <div className="player-controls">
          <button type="button" aria-label="Previous track" onClick={previousTrack}>
            <SkipBack size={17} />
          </button>
          <button
            type="button"
            className="player-primary"
            aria-label={playing ? "Pause track" : "Play track"}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button type="button" aria-label="Next track" onClick={nextTrack}>
            <SkipForward size={17} />
          </button>
        </div>
        <div className="player-progress">
          <span>{formatDuration(elapsed)}</span>
          <input
            aria-label="Track progress"
            type="range"
            min="0"
            max="100"
            value={Math.round(progress)}
            onChange={(event) => setProgress(Number(event.target.value))}
          />
          <span>{formatDuration(currentTrack.duration)}</span>
        </div>
        <label className="volume-control">
          <Volume2 size={16} />
          <input
            aria-label="Volume"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
          <span>{volume}%</span>
        </label>
      </div>

      <div className="track-list" aria-label="Tracks">
        {mix.tracks.map((track, index) => (
          <button
            key={track.slug}
            type="button"
            className={index === trackIndex ? "active" : ""}
            onClick={() => selectTrack(index)}
          >
            <span className="track-index">{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>{track.title}</strong>
              <small>{track.context}</small>
            </span>
            <span>{formatDuration(track.duration)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
