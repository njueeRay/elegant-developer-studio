"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Code2,
  Command,
  FileText,
  Mail,
  Music2,
  Pause,
  Play,
  Wrench,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { SiteHeader } from "@/components/site-header";
import { StatusPanel } from "@/components/status-panel";
import { currentMix } from "@/data/media";
import {
  highlights,
  knowledgeItems,
  socialLinks,
  workbenchItems,
  type Highlight,
  type HighlightKind,
  type WorkbenchItem,
} from "@/data/home";
import type { PostMeta, ProjectMeta } from "@/lib/content";

const iconByKind: Record<HighlightKind, ComponentType<{ size?: number }>> = {
  writing: FileText,
  work: Code2,
  media: Music2,
};

export function StudioHome({
  featuredPosts,
  featuredProjects,
}: {
  featuredPosts: PostMeta[];
  featuredProjects: ProjectMeta[];
}) {
  const [isPlaying, setIsPlaying] = useState(false);

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
          <div className="status-badge">
            <span className="status-dot" />
            Shipping: personal design system, writing, and tools
          </div>
          <button
            className="command-strip"
            data-testid="home-command-trigger"
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("studio:open-command"))}
          >
            <Command size={18} />
            <span>Search or open...</span>
            <kbd>Cmd K</kbd>
          </button>
          <SocialLinks />
        </div>

        <WorkbenchPanel />
      </section>

      <StatusPanel
        post={featuredPosts[0]}
        project={featuredProjects[0]}
        mix={currentMix}
      />

      <section className="highlight-rail" aria-label="Featured studio modules">
        {highlights.map((highlight) => (
          <HighlightCard
            key={highlight.title}
            highlight={highlight}
            featuredProject={featuredProjects[0]}
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
            {knowledgeItems.map((item) => (
              <li key={item}>
                <BookOpenText size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
              progress. The lab becomes its own surface in Phase 5.
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
          <h2>Latest from the studio</h2>
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
            {featuredPosts.map((post) => (
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
          </div>
        </div>
      </section>

    </main>
  );
}

function WorkbenchPanel() {
  return (
    <aside className="workbench-panel" aria-label="Current workbench">
      <div className="panel-title">
        <Wrench size={24} />
        <h2>Workbench</h2>
      </div>
      {workbenchItems.map((item) => (
        <WorkbenchRow key={item.title} item={item} />
      ))}
    </aside>
  );
}

function WorkbenchRow({ item }: { item: WorkbenchItem }) {
  return (
    <Link href="/projects" className="workbench-row">
      <div className={`workbench-icon ${item.status}`}>
        {item.status === "healthy" ? <Code2 size={24} /> : null}
        {item.status === "progress" ? <FileText size={24} /> : null}
        {item.status === "queued" ? <Music2 size={24} /> : null}
      </div>
      <div>
        <p>{item.label}</p>
        <h3>{item.title}</h3>
        <span>{item.detail}</span>
        <small>
          {item.status === "healthy" ? <CheckCircle2 size={14} /> : null}
          {item.meta}
        </small>
      </div>
      <ArrowRight className="row-arrow" size={20} />
    </Link>
  );
}

function HighlightCard({
  highlight,
  featuredProject,
  isPlaying,
  onTogglePlay,
}: {
  highlight: Highlight;
  featuredProject?: ProjectMeta;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  const Icon = iconByKind[highlight.kind];
  const href = highlight.kind === "work" && featuredProject
    ? `/projects/${featuredProject.slug}`
    : highlight.href;
  const title = highlight.kind === "work" && featuredProject
    ? featuredProject.title
    : highlight.title;
  const description = highlight.kind === "work" && featuredProject
    ? featuredProject.summary
    : highlight.description;
  const meta = highlight.kind === "work" && featuredProject
    ? `${featuredProject.role} / ${featuredProject.status}`
    : highlight.meta;
  const image = highlight.kind === "work" && featuredProject
    ? featuredProject.image
    : highlight.image;
  const tags = highlight.kind === "work" && featuredProject
    ? featuredProject.stack
    : highlight.tags;
  const content = (
    <>
      <div className="highlight-icon">
        <Icon size={24} />
      </div>
      <div className="highlight-body">
        <p className={`section-kicker ${highlight.kind === "work" ? "blue" : ""}`}>
          {highlight.eyebrow}
        </p>
        <h2>{title}</h2>
        <p>{description}</p>
        {tags ? (
          <div className="tag-row">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        <small>{meta}</small>
      </div>
      {image ? (
        <Image
          src={image}
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
      <article className="highlight-card media-card" id="media">
        {content}
        <button
          type="button"
          className="play-button"
          data-testid="home-media-play"
          onClick={onTogglePlay}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          {isPlaying ? "Pause" : "Play"}
        </button>
      </article>
    );
  }

  return (
    <Link
      href={href}
      className="highlight-card"
      id={highlight.kind === "work" ? "work" : undefined}
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
