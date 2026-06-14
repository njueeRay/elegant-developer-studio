import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  CheckCircle2,
  ExternalLink,
  GitPullRequest,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import {
  collaborationStatus,
  collaborationSteps,
  collaborationSurfaces,
  creativeAssessment,
  creativeIdeas,
} from "@/data/collaboration";

export const metadata: Metadata = {
  title: "Collaboration - Ray Studio",
  description:
    "A public collaboration guide for Ray Studio: contribution flow, governance surfaces, creative audit, and future interaction ideas.",
};

export default function CollaborationPage() {
  return (
    <main className="studio-shell content-shell collaboration-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header collaboration-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={17} />
          Studio home
        </Link>
        <p className="section-kicker blue">{collaborationStatus.phase}</p>
        <h1>Collaboration</h1>
        <p>{collaborationStatus.summary}</p>
      </header>

      <section className="collaboration-board" aria-label="Collaboration governance">
        <div className="collaboration-hero">
          <div className="collaboration-hero-copy">
            <div className="collaboration-status-line">
              <span>
                <GitPullRequest size={15} />
                Public by default
              </span>
              <span>
                <Braces size={15} />
                Traceable changes
              </span>
            </div>
            <h2>{collaborationStatus.title}</h2>
            <p>{collaborationStatus.currentBias}</p>
            <div className="collaboration-actions">
              <a
                href="https://github.com/njueeRay/elegant-developer-studio/issues/new?template=contact.yml"
                className="collaboration-primary"
              >
                Open structured issue
                <ExternalLink size={16} />
              </a>
              <Link href="/lab" className="collaboration-secondary">
                Inspect component lab
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <aside className="collaboration-principle-card" aria-label="Governance principle">
            <span>governance.rule</span>
            <strong>Every visible idea needs an entry path, an owner surface, and a verification trail.</strong>
            <p>
              The site should stay playful, but its playfulness must remain inspectable,
              reversible, and useful.
            </p>
          </aside>
        </div>

        <div className="collaboration-flow">
          {collaborationSteps.map((item) => (
            <article key={item.step}>
              <span>{item.step}</span>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
              <small>{item.output}</small>
            </article>
          ))}
        </div>

        <div className="collaboration-surface-grid">
          {collaborationSurfaces.map((surface) => (
            <article key={surface.title}>
              <div>
                <p className="section-kicker rust">{surface.owner}</p>
                <h2>{surface.title}</h2>
                <p>{surface.intent}</p>
              </div>
              <dl>
                <div>
                  <dt>Route</dt>
                  <dd>{surface.route}</dd>
                </div>
                <div>
                  <dt>Evidence</dt>
                  <dd>{surface.evidence}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <section className="collaboration-review" aria-labelledby="creative-review-title">
          <div className="collaboration-section-heading">
            <p className="section-kicker blue">Expert review</p>
            <h2 id="creative-review-title">My direct read of the current homepage.</h2>
            <p>{creativeAssessment.direction}</p>
          </div>
          <div className="collaboration-review-grid">
            <article>
              <h3>
                <CheckCircle2 size={18} />
                Strengths
              </h3>
              {creativeAssessment.strengths.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
            <article>
              <h3>
                <Lightbulb size={18} />
                Weaknesses
              </h3>
              {creativeAssessment.weaknesses.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
          </div>
        </section>

        <section className="creative-idea-section" aria-labelledby="creative-ideas-title">
          <div className="collaboration-section-heading">
            <p className="section-kicker rust">Creative backlog</p>
            <h2 id="creative-ideas-title">Ideas worth testing, not blindly shipping.</h2>
          </div>
          <div className="creative-idea-grid">
            {creativeIdeas.map((idea) => (
              <article id={idea.slug} key={idea.slug}>
                <div className="creative-idea-topline">
                  <span>{idea.priority}</span>
                  <small>{idea.category}</small>
                </div>
                <h3>
                  <Sparkles size={18} />
                  {idea.title}
                </h3>
                <p>{idea.description}</p>
                <dl>
                  <div>
                    <dt>Why</dt>
                    <dd>{idea.why}</dd>
                  </div>
                  <div>
                    <dt>Risk</dt>
                    <dd>{idea.risk}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
