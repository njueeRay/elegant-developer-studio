"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Briefcase,
  Check,
  Clock3,
  Code2,
  Command,
  Copy,
  FileText,
  GitBranch,
  MessagesSquare,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import {
  contactBoundaries,
  contactBrief,
  contactFit,
  contactRoutes,
  contactStatus,
  type ContactRouteKind,
} from "@/data/contact";
import { writeToClipboard } from "@/lib/clipboard";

const iconByKind: Record<ContactRouteKind, LucideIcon> = {
  discussion: MessagesSquare,
  source: GitBranch,
  profile: UserRound,
  writing: FileText,
  work: Briefcase,
};

export function ContactHub() {
  const [copied, setCopied] = useState(false);

  const copyBrief = async () => {
    await writeToClipboard(contactBrief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="contact-hub" aria-label="Contact routes">
      <div className="contact-hero">
        <div className="contact-hero-copy">
          <div className="contact-status-strip" aria-label="Contact status">
            <span>
              <ShieldCheck size={15} />
              {contactStatus.availability}
            </span>
            <span>
              <Clock3 size={15} />
              {contactStatus.responseWindow}
            </span>
          </div>
          <h2>A precise contact surface, not a decorative form.</h2>
          <p>
            Start with the route that best matches the conversation. The current public
            path is GitHub Issues, with context links nearby so messages stay grounded in
            real pages, code, and project history.
          </p>
          <div className="contact-hero-actions">
            <button
              type="button"
              className="contact-command-button"
              data-testid="contact-command-trigger"
              onClick={() => window.dispatchEvent(new Event("studio:open-command"))}
            >
              <Command size={17} />
              Open Command Center
              <kbd>⌘ K</kbd>
            </button>
            <button
              type="button"
              className="contact-copy-button"
              data-testid="contact-copy-brief"
              onClick={copyBrief}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy contact brief"}
            </button>
          </div>
        </div>

        <aside className="contact-brief-panel" aria-label="Contact brief">
          <div className="contact-brief-terminal" aria-hidden="true">
            <span>contact.brief</span>
            <i />
            <i />
            <i />
          </div>
          <pre>{contactBrief}</pre>
          <p>{contactStatus.preferredLanguage}</p>
        </aside>
      </div>

      <div className="contact-route-grid">
        {contactRoutes.map((route) => {
          const Icon = iconByKind[route.kind];
          const content = (
            <>
              <span className="contact-route-icon">
                <Icon size={20} />
              </span>
              <span className="contact-route-copy">
                <small>{route.meta}</small>
                <strong>{route.title}</strong>
                <span>{route.description}</span>
              </span>
              <ArrowRight size={18} />
            </>
          );

          if (route.external) {
            return (
              <a className="contact-route-card" href={route.href} key={route.href}>
                {content}
              </a>
            );
          }

          return (
            <Link className="contact-route-card" href={route.href} key={route.href}>
              {content}
            </Link>
          );
        })}
      </div>

      <div className="contact-lower-grid">
        <section className="contact-panel-card" aria-labelledby="contact-fit-title">
          <div className="contact-section-heading">
            <p className="section-kicker blue">Best fit</p>
            <h2 id="contact-fit-title">Where a message is likely to become useful.</h2>
          </div>
          <div className="contact-principle-list">
            {contactFit.map((item) => (
              <span key={item}>
                <Check size={16} />
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="contact-panel-card" aria-labelledby="contact-boundary-title">
          <div className="contact-section-heading">
            <p className="section-kicker rust">Boundaries</p>
            <h2 id="contact-boundary-title">What this first version refuses to fake.</h2>
          </div>
          <div className="contact-principle-list">
            {contactBoundaries.map((item) => (
              <span key={item}>
                <Code2 size={16} />
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="contact-next-row">
        <BookOpenText size={18} />
        <span>
          Next improvement: add a real private channel only after the inbox, privacy
          expectation, and response contract are configured.
        </span>
      </div>
    </section>
  );
}
