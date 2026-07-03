"use client";

import { ExternalLink, FileCheck2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DataSourceBadge } from "@/components/data-source-badge";
import { emitCommandTrace } from "@/lib/command-trace";
import type { ProjectMeta } from "@/lib/content";

type ProjectEvidencePackProps = {
  projectSlug: string;
  evidencePack: ProjectMeta["evidencePack"];
};

const toneByType: Record<ProjectMeta["evidencePack"][number]["type"], "rust" | "blue" | "sage" | "ink"> = {
  source: "blue",
  deployment: "sage",
  document: "rust",
  test: "ink",
  screenshot: "blue",
  metric: "sage",
  decision: "rust",
};

type ReleaseEvidence = {
  siteUrl: string;
  commitSha: string;
  builtAt: string;
  contentCounts: {
    posts: number;
    projects: number;
    knowledge: number;
  };
  routesCount: number;
  qualityGates: Array<{
    id: string;
    command: string;
    status: string;
  }>;
};

function toTestId(projectSlug: string, label: string) {
  return `project-evidence-${projectSlug}-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export function ProjectEvidencePack({ projectSlug, evidencePack }: ProjectEvidencePackProps) {
  const [releaseEvidence, setReleaseEvidence] = useState<ReleaseEvidence | null>(null);

  useEffect(() => {
    if (!["lumen", "studio-knowledge-base"].includes(projectSlug)) {
      return;
    }

    const controller = new AbortController();

    fetch("/release-evidence.json", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((evidence: ReleaseEvidence | null) => {
        if (evidence) {
          setReleaseEvidence(evidence);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") {
          console.warn("Could not load release evidence", error);
        }
      });

    return () => controller.abort();
  }, [projectSlug]);

  const evidenceCards = useMemo(() => {
    if (!releaseEvidence) {
      return evidencePack;
    }

    const passedRequiredGates = releaseEvidence.qualityGates.filter(
      (gate) => ["content-relations", "lint", "build"].includes(gate.id) && gate.status === "passed",
    ).length;
    const releaseEvidenceCard: ProjectMeta["evidencePack"][number] = {
      type: "deployment",
      label: "Generated release evidence",
      detail:
        `Generated deployment facts for commit ${releaseEvidence.commitSha}: ` +
        `${releaseEvidence.contentCounts.posts} posts, ${releaseEvidence.contentCounts.projects} projects, ` +
        `${releaseEvidence.contentCounts.knowledge} knowledge entries, and ${releaseEvidence.routesCount} public routes.`,
      href: "/release-evidence.json",
      source: "release-evidence.json",
      route: `/projects/${projectSlug}`,
      commit: releaseEvidence.commitSha,
      metric: `${passedRequiredGates}/3 required local gates marked passed`,
      verifiedBy: "release.evidence()",
      verifiedAt: releaseEvidence.builtAt.slice(0, 10),
    };

    return [...evidencePack, releaseEvidenceCard];
  }, [evidencePack, projectSlug, releaseEvidence]);

  return (
    <section className="project-evidence-pack" aria-labelledby="project-evidence-title">
      <div className="project-evidence-heading">
        <FileCheck2 size={19} />
        <div>
          <p className="section-kicker blue">Evidence Pack</p>
          <h2 id="project-evidence-title">Proof you can inspect</h2>
        </div>
      </div>
      <div className="project-evidence-grid">
        {evidenceCards.map((item) => (
          <a
            className={`project-evidence-card evidence-${item.type}`}
            data-testid={toTestId(projectSlug, item.label)}
            href={item.href}
            key={item.label}
            rel="noreferrer"
            target="_blank"
            onClick={() => {
              emitCommandTrace({
                command: `evidence.open("${projectSlug}/${item.type}")`,
                label: item.label,
                href: `/projects/${projectSlug}#project-evidence-title`,
                meta: `${item.source} / ${item.verifiedBy ?? "inspectable evidence"}`,
              });
            }}
          >
            <span className="project-evidence-type">{item.type}</span>
            <strong>{item.label}</strong>
            <p>{item.detail}</p>
            <DataSourceBadge
              source={item.source}
              command={item.verifiedBy}
              route={item.route}
              verifiedAt={item.verifiedAt}
              tone={toneByType[item.type]}
            />
            <dl className="project-evidence-object">
              {item.commit ? (
                <div>
                  <dt>commit</dt>
                  <dd>{item.commit}</dd>
                </div>
              ) : null}
              {item.deploymentId ? (
                <div>
                  <dt>deployment</dt>
                  <dd>{item.deploymentId}</dd>
                </div>
              ) : null}
              {item.metric ? (
                <div>
                  <dt>metric</dt>
                  <dd>{item.metric}</dd>
                </div>
              ) : null}
              {item.screenshot ? (
                <div>
                  <dt>screenshot</dt>
                  <dd>{item.screenshot}</dd>
                </div>
              ) : null}
            </dl>
            <small>
              Open evidence
              <ExternalLink size={12} />
            </small>
          </a>
        ))}
      </div>
    </section>
  );
}
