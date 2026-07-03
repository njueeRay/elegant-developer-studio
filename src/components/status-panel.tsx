"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  TerminalSquare,
} from "lucide-react";
import { useState } from "react";
import { DataSourceBadge } from "@/components/data-source-badge";
import type { Mix } from "@/data/media";
import { askPrompts, studioPulseItems, type StudioPulseItem } from "@/data/personal-os";
import type { PostMeta, ProjectMeta } from "@/lib/content";
import { writeToClipboard } from "@/lib/clipboard";
import { emitCommandTrace } from "@/lib/command-trace";

type StatusPanelProps = {
  post?: PostMeta;
  project?: ProjectMeta;
  mix: Mix;
};

export function StatusPanel({ post, project, mix }: StatusPanelProps) {
  const leadTrack = mix.tracks[0];
  const [activePrompt, setActivePrompt] = useState(askPrompts[0]);
  const [copied, setCopied] = useState(false);
  const items: StudioPulseItem[] = [
    {
      ...studioPulseItems[0],
      title: post?.title ?? "Interface notes",
      detail:
        post?.summary ??
        "Drafting field notes about interfaces, systems, and calm software.",
      meta: post ? `${post.readingTime} / ${post.status}` : "Drafting / v0.1",
      href: post ? `/blog/${post.slug}` : "/blog",
    },
    {
      ...studioPulseItems[1],
      title: project?.title ?? "Studio OS",
      detail:
        project?.summary ??
        "Turning the personal site into a small operating surface for work.",
      meta: project ? `${project.role} / ${project.status}` : "Active / main",
      href: project ? `/projects/${project.slug}` : "/projects",
    },
    studioPulseItems[2],
    {
      ...studioPulseItems[3],
      title: leadTrack ? leadTrack.title : mix.title,
      detail: mix.description,
      meta: leadTrack ? `${leadTrack.artist} / ${leadTrack.context}` : mix.context,
      href: "/music",
    },
  ];
  const copyPrompt = async () => {
    await writeToClipboard(`${activePrompt.command}\n${activePrompt.response}`);
    emitCommandTrace({
      command: `ask.copy("${activePrompt.id}")`,
      label: activePrompt.label,
      href: activePrompt.href,
      meta: "Ask Me Terminal / prompt copied",
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="studio-pulse" className="studio-status-panel" aria-label="Current studio status">
      <div className="status-panel-heading">
        <span className="status-dot live" aria-hidden="true" />
        <div>
          <p className="section-kicker rust">Now in studio</p>
          <h2>Studio Pulse</h2>
          <p>
            A small Personal OS slice: current writing, building, knowledge, and
            media loops with inspectable sources.
          </p>
          <div className="studio-pulse-signal" aria-label="Studio pulse signal">
            <span />
            <code>{'pulse.live("studio")'}</code>
          </div>
        </div>
      </div>
      <div className="status-panel-stack">
        <div className="status-panel-grid">
          {items.map((item) => (
            <StatusCard key={item.id} item={item} />
          ))}
        </div>
        <div className="ask-me-terminal" aria-label="Ask Me Terminal">
          <div className="ask-me-terminal-topline">
            <TerminalSquare size={16} />
            <span>ask.ray</span>
            <small>guided prompts</small>
          </div>
          <div className="ask-me-prompt-row">
            {askPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt.id}
                data-active={activePrompt.id === prompt.id}
                onClick={() => setActivePrompt(prompt)}
              >
                {prompt.label}
              </button>
            ))}
          </div>
          <div className="ask-me-response" data-testid="home-ask-response">
            <code>{activePrompt.command}</code>
            <p>{activePrompt.response}</p>
            <div>
              <Link href={activePrompt.href}>
                Open route
                <ArrowRight size={14} />
              </Link>
              <button type="button" data-testid="home-copy-ask-response" onClick={copyPrompt}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusCard({ item }: { item: StudioPulseItem }) {
  const Icon = item.icon;

  return (
    <Link href={item.href} className={`status-panel-card ${item.tone}`}>
      <div className="status-panel-icon" aria-hidden="true">
        <Icon size={19} />
      </div>
      <div className="status-panel-copy">
        <p>{item.label}</p>
        <h3>{item.title}</h3>
        <span>{item.detail}</span>
        <small>{item.meta}</small>
        <code>{item.command}</code>
        <DataSourceBadge source={item.source} command={item.command} tone={item.tone} />
      </div>
      <ArrowRight className="status-panel-arrow" size={18} aria-hidden="true" />
    </Link>
  );
}
