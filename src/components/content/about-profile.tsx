"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Command,
  Copy,
  GitBranch,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  aboutCapabilities,
  aboutCommandActions,
  aboutPrinciples,
  aboutProfile,
  aboutTechPalette,
  aboutTimeline,
  getAboutReference,
  workingAgreements,
} from "@/data/about";
import { writeToClipboard } from "@/lib/clipboard";

export function AboutProfile() {
  const [activePrinciple, setActivePrinciple] = useState(aboutPrinciples[0].slug);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [copied, setCopied] = useState(false);
  const selectedPrinciple = useMemo(
    () => aboutPrinciples.find((principle) => principle.slug === activePrinciple) ?? aboutPrinciples[0],
    [activePrinciple],
  );

  const copyIntro = async () => {
    await writeToClipboard(getAboutReference());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="about-profile" aria-label="About profile">
      <div className="about-hero">
        <div className="about-hero-copy">
          <div className="about-status-strip" aria-label="Profile facts">
            <span>
              <Sparkles size={15} />
              {aboutProfile.role}
            </span>
            <span>
              <MapPin size={15} />
              {aboutProfile.location}
            </span>
          </div>
          <h2>{aboutProfile.oneLine}</h2>
          <p>
            I care about interfaces that feel inevitable: legible structure, warm visual tone,
            precise interaction, and code that lets the system keep growing.
          </p>
          <div className="about-hero-actions">
            <button
              type="button"
              className="about-command-button"
              data-testid="about-command-trigger"
              onClick={() => window.dispatchEvent(new Event("studio:open-command"))}
            >
              <Command size={17} />
              Open Command Center
              <kbd>⌘ K</kbd>
            </button>
            <button
              type="button"
              className="about-copy-button"
              data-testid="about-copy-intro"
              onClick={copyIntro}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy intro"}
            </button>
          </div>
        </div>

        <aside className="about-desk" aria-label="Current studio signal">
          <div className="about-desk-light" aria-hidden="true" />
          <div className="about-notebook">
            <span>studio.log</span>
            <strong>clarity = craft + system</strong>
            <small>Next slice: About profile</small>
          </div>
          <div className="about-timeline-card" id="timeline">
            <div className="about-timeline-heading">
              <p className="section-kicker blue">Timeline</p>
              <span>{aboutTimeline[activeTimeline].year}</span>
            </div>
            <div className="about-timeline-list">
              {aboutTimeline.map((item, index) => (
                <button
                  type="button"
                  className={index === activeTimeline ? "active" : undefined}
                  key={item.year}
                  onClick={() => setActiveTimeline(index)}
                >
                  <span>{item.year}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
            <p>{aboutTimeline[activeTimeline].detail}</p>
          </div>
        </aside>
      </div>

      <div className="about-section-row" id="principles">
        <div className="about-section-heading">
          <p className="section-kicker rust">Principles</p>
          <h2>How I decide what belongs in the interface.</h2>
        </div>
        <div className="about-principle-grid">
          {aboutPrinciples.map((principle) => {
            const Icon = principle.icon;

            return (
              <button
                type="button"
                className={principle.slug === activePrinciple ? "active" : undefined}
                data-accent={principle.accent}
                key={principle.slug}
                onClick={() => setActivePrinciple(principle.slug)}
              >
                <Icon size={20} />
                <strong>{principle.title}</strong>
                <span>{principle.summary}</span>
              </button>
            );
          })}
        </div>
        <div className="about-principle-detail" data-accent={selectedPrinciple.accent}>
          <span>Selected principle</span>
          <strong>{selectedPrinciple.title}</strong>
          <p>{selectedPrinciple.detail}</p>
        </div>
      </div>

      <div className="about-lower-grid">
        <section className="about-capabilities" id="capabilities" aria-labelledby="about-capabilities-title">
          <div className="about-section-heading compact">
            <p className="section-kicker blue">Capabilities</p>
            <h2 id="about-capabilities-title">The work I can own end to end.</h2>
          </div>
          <div className="about-capability-list">
            {aboutCapabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <div className="about-capability-row" key={capability.name}>
                  <Icon size={18} />
                  <div>
                    <strong>{capability.name}</strong>
                    <small>{capability.proof}</small>
                  </div>
                  <span className="about-capability-meter" aria-hidden="true">
                    <i style={{ width: `${capability.level}%` }} />
                  </span>
                  <em>{capability.label}</em>
                </div>
              );
            })}
          </div>
          <div className="about-tech-palette" aria-label="Technical palette">
            {aboutTechPalette.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="about-agreements" aria-labelledby="about-agreements-title">
          <div className="about-section-heading compact">
            <p className="section-kicker sage">Working agreements</p>
            <h2 id="about-agreements-title">The collaboration contract.</h2>
          </div>
          <div className="about-agreement-list">
            {workingAgreements.map((agreement) => (
              <article key={agreement.title}>
                <span>{agreement.signal}</span>
                <strong>{agreement.title}</strong>
                <p>{agreement.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section
        className="about-contact-band"
        id="contact"
        aria-label="Contact and routes"
      >
        <div>
          <p className="section-kicker rust">Contact</p>
          <h2>Let’s build something with intention.</h2>
          <p>{aboutProfile.availability}</p>
          <a href={aboutProfile.contactHref}>
            <GitBranch size={16} />
            {aboutProfile.contactLabel}
          </a>
        </div>
        <div className="about-command-routes">
          {aboutCommandActions.map((action) => (
            <Link href={action.href} key={action.href}>
              <span>
                <Clock3 size={15} />
                ⌘ {action.shortcut}
              </span>
              <strong>{action.label}</strong>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
