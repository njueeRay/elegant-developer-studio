"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Code2,
  Command,
  FileText,
  Mail,
  Music2,
  Pause,
  Play,
} from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";
import { SiteHeader } from "@/components/site-header";
import { StatusPanel } from "@/components/status-panel";
import type {
  HomeEditorialMediaSlot,
  HomeEditorialPostSlot,
  HomeEditorialProjectSlot,
} from "@/data/home-editorial";
import { currentMix } from "@/data/media";
import { socialLinks } from "@/data/home";
import type { PostMeta, ProjectMeta } from "@/lib/content";

type HighlightKind = "writing" | "work" | "media";

type EditorialPostSlot = HomeEditorialPostSlot & {
  post: PostMeta;
};

type EditorialProjectSlot = HomeEditorialProjectSlot & {
  project: ProjectMeta;
};

type EditorialLatestWritingSlot = Omit<HomeEditorialPostSlot, "postSlug"> & {
  postSlugs: readonly string[];
  posts: PostMeta[];
};

type EditorialKnowledgeSignal = {
  kind: "knowledge";
  eyebrow: string;
  entrySlugs: readonly string[];
  entries: Array<{
    slug: string;
    title: string;
    href: string;
  }>;
  proofHref: string;
  reasonCode: string;
  reason: string;
  selectionRule: string;
};

type ResolvedHighlight = {
  kind: HighlightKind;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  photoHref?: string;
  musicHref?: string;
  image?: string;
  tags?: readonly string[];
  reasonCode: string;
  reason: string;
  selectionRule: string;
};

const iconByKind: Record<HighlightKind, ComponentType<{ size?: number }>> = {
  writing: FileText,
  work: Code2,
  media: Music2,
};

export function StudioHome({
  featuredEssay,
  selectedWork,
  latestWriting,
  mediaEntry,
  knowledgeSignal,
}: {
  featuredEssay: EditorialPostSlot;
  selectedWork: EditorialProjectSlot;
  latestWriting: EditorialLatestWritingSlot;
  mediaEntry: HomeEditorialMediaSlot;
  knowledgeSignal: EditorialKnowledgeSignal;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommandReady, setIsCommandReady] = useState(false);
  const highlights: ResolvedHighlight[] = [
    {
      kind: "writing",
      eyebrow: featuredEssay.eyebrow,
      title: featuredEssay.post.title,
      description: featuredEssay.post.summary,
      meta: `${featuredEssay.post.readingTime} / ${featuredEssay.post.status}`,
      href: `/blog/${featuredEssay.post.slug}`,
      reasonCode: featuredEssay.reasonCode,
      reason: featuredEssay.reason,
      selectionRule: featuredEssay.selectionRule,
    },
    {
      kind: "work",
      eyebrow: selectedWork.eyebrow,
      title: selectedWork.project.title,
      description: selectedWork.project.summary,
      meta: `${selectedWork.project.role} / ${selectedWork.project.status}`,
      href: `/projects/${selectedWork.project.slug}`,
      image: selectedWork.project.image,
      tags: selectedWork.project.stack,
      reasonCode: selectedWork.reasonCode,
      reason: selectedWork.reason,
      selectionRule: selectedWork.selectionRule,
    },
    {
      kind: "media",
      eyebrow: mediaEntry.eyebrow,
      title: mediaEntry.title,
      description: mediaEntry.description,
      meta: mediaEntry.meta,
      href: mediaEntry.href,
      photoHref: mediaEntry.photoHref,
      musicHref: mediaEntry.musicHref,
      image: mediaEntry.image,
      reasonCode: mediaEntry.reasonCode,
      reason: mediaEntry.reason,
      selectionRule: mediaEntry.selectionRule,
    },
  ];

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => setIsCommandReady(true));

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <main className="studio-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />

      <section className="hero-section" aria-label="Ray Studio overview">
        <div className="line-index" aria-hidden="true">
          {["01", "02", "03", "04", "05", "06"].map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="hero-copy">
          <h1>Ray Studio</h1>
          <p className="hero-title">
            Design Engineer building precise, humane software.
          </p>
          <p className="hero-body">
            I design systems that compose, interfaces that respect, essays that
            clarify, and experiments that explore the edge of ideas and tools.
          </p>
          <div
            className="status-badge"
            aria-label="Live on RayNode, verified standalone Next.js runtime behind Caddy"
          >
            <span className="status-dot live" />
            <span className="status-badge-main">Live on RayNode</span>
            <span className="status-badge-detail">Next.js standalone / Caddy</span>
          </div>
          <div className="hero-actions" aria-label="Primary studio paths">
            <Link href="/blog" className="primary-link">
              <FileText size={16} />
              Read
            </Link>
            <Link href="/projects" className="text-link blue">
              Work <ArrowRight size={16} />
            </Link>
          </div>
          <button
            className="command-strip"
            data-testid="home-command-trigger"
            disabled={!isCommandReady}
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("studio:open-command"))}
          >
            <Command size={18} />
            <span>Search or open...</span>
            <kbd>Cmd K</kbd>
          </button>
          <SocialLinks />
        </div>
      </section>

      <StatusPanel
        post={featuredEssay.post}
        project={selectedWork.project}
        mix={currentMix}
      />

      <section className="highlight-rail" aria-label="Featured studio modules">
        {highlights.map((highlight) => (
          <HighlightCard
            key={highlight.title}
            highlight={highlight}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying((playing) => !playing)}
          />
        ))}
      </section>

      <section className="studio-lower-grid">
        <article className="knowledge-panel" id="knowledge">
          <div>
            <p className="section-kicker">Knowledge</p>
            <h2>Working knowledge & snippets</h2>
            <p>
              Shortform references, interface decisions, code snippets, and
              learning logs that should stay useful.
            </p>
          </div>
          <ul>
            {knowledgeSignal.entries.map((item) => (
              <li key={item.slug}>
                <BookOpenText size={16} />
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="editorial-reason compact" aria-label="Knowledge signal editorial reason">
            <code>{knowledgeSignal.reasonCode}</code>
            <span>{knowledgeSignal.reason}</span>
          </div>
          <Link href="/knowledge" className="text-link">
            Browse knowledge <ArrowRight size={16} />
          </Link>
        </article>

        <article className="lab-panel" id="lab">
          <div>
            <p className="section-kicker blue">Lab</p>
            <h2>Experiments & prototypes</h2>
            <p>
              Small interface experiments, AI workflows, and components in
              progress. The lab now works as the proving ground for reusable
              interaction patterns before they reach the homepage.
            </p>
          </div>
          <div className="lab-list">
            <span>Notebook UI exploration</span>
            <span>Agent loop playground</span>
          </div>
          <Link href="/lab" className="text-link blue">
            See experiments <ArrowRight size={16} />
          </Link>
        </article>

        <article className="uses-panel" id="uses">
          <div>
            <p className="section-kicker">Uses</p>
            <h2>Tools & workflows</h2>
            <p>
              The practical stack behind the studio: writing systems, design
              tools, code workflow, and rituals that make shipping repeatable.
            </p>
          </div>
          <div className="lab-list">
            <span>Toolchain map</span>
            <span>Shipping workflow</span>
          </div>
          <Link href="/uses" className="text-link">
            Open uses <ArrowRight size={16} />
          </Link>
        </article>

        <article className="about-panel" id="about">
          <div>
            <p className="section-kicker rust">About</p>
            <h2>Principles & profile</h2>
            <p>
              The human layer: operating principles, capability map,
              collaboration contract, and the narrative behind the work.
            </p>
          </div>
          <Link href="/about" className="text-link rust">
            Read profile <ArrowRight size={16} />
          </Link>
        </article>

        <article className="contact-panel" id="contact">
          <div>
            <p className="section-kicker rust">Let&apos;s connect</p>
            <h2>Say hello</h2>
            <p>
              Open to discussions about design engineering, thoughtful products,
              and systems that make complex work feel calm.
            </p>
          </div>
          <Link href="/contact" className="primary-link">
            <Mail size={16} />
            Open contact routes
          </Link>
        </article>
      </section>

      <section className="latest-section" id="writing">
        <div className="section-heading">
          <div>
            <h2>Editorially recent</h2>
            <p>{latestWriting.reason}</p>
          </div>
          <Link href="/blog" className="text-link rust">
            View all writing <ArrowRight size={16} />
          </Link>
        </div>
        <div className="latest-grid">
          <Image
            src="/assets/morning-studio-desk.png"
            alt="Notebook, coffee, and keyboard on a warm studio desk"
            width={900}
            height={675}
            className="latest-image"
          />
          <div className="latest-list">
            {latestWriting.posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="latest-row"
              >
                <span>
                  <FileText size={18} />
                  {post.title}
                </span>
                <span>{post.readingTime}</span>
              </Link>
            ))}
            <div className="editorial-reason compact" aria-label="Latest writing editorial reason">
              <code>{latestWriting.reasonCode}</code>
              <span>{latestWriting.selectionRule}</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

function HighlightCard({
  highlight,
  isPlaying,
  onTogglePlay,
}: {
  highlight: ResolvedHighlight;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  const Icon = iconByKind[highlight.kind];
  const content = (
    <>
      <div className="highlight-icon">
        <Icon size={24} />
      </div>
      <div className="highlight-body">
        <p className={`section-kicker ${highlight.kind === "work" ? "blue" : ""}`}>
          {highlight.eyebrow}
        </p>
        <h2>{highlight.title}</h2>
        <p>{highlight.description}</p>
        {highlight.tags ? (
          <div className="tag-row">
            {highlight.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        <small>{highlight.meta}</small>
        <div className="editorial-reason" aria-label={`${highlight.title} editorial reason`}>
          <code>{highlight.reasonCode}</code>
          <span>{highlight.reason}</span>
        </div>
      </div>
      {highlight.image ? (
        <Image
          src={highlight.image}
          alt=""
          width={360}
          height={270}
          className="highlight-image"
        />
      ) : (
        <div className="paper-ghost" aria-hidden="true" />
      )}
      <ArrowRight className="card-arrow" size={22} />
    </>
  );

  if (highlight.kind === "media") {
    return (
      <article className="highlight-card media-card" id="media" data-testid="home-editorial-media">
        {content}
        <div className="media-card-actions">
          <button
            type="button"
            className="play-button"
            data-testid="home-media-play"
            onClick={onTogglePlay}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            {isPlaying ? "Pause preview" : "Preview cue"}
          </button>
          <Link href={highlight.musicHref ?? highlight.href} className="text-link rust">
            Open mix <ArrowRight size={15} />
          </Link>
          {highlight.photoHref ? (
            <Link href={highlight.photoHref} className="text-link">
              Browse photos <ArrowRight size={15} />
            </Link>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <Link
      href={highlight.href}
      className="highlight-card"
      id={highlight.kind === "work" ? "work" : undefined}
      data-testid={`home-editorial-${highlight.kind}`}
    >
      {content}
    </Link>
  );
}

function SocialLinks() {
  const icons = {
    GitHub: Code2,
    Issues: Code2,
    Contact: BookOpenText,
  } as const;

  return (
    <div className="social-links" aria-label="Social links">
      {socialLinks.map((link) => {
        const Icon = icons[link.label];
        const content = (
          <>
            <Icon size={21} />
            <span>{link.label}</span>
          </>
        );

        if (link.href.startsWith("/")) {
          return (
            <Link key={link.label} href={link.href} aria-label={link.label}>
              {content}
            </Link>
          );
        }

        return (
          <a key={link.label} href={link.href} aria-label={link.label}>
            {content}
          </a>
        );
      })}
    </div>
  );
}
