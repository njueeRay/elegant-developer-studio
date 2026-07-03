"use client";

import { ExternalLink, FileCheck2 } from "lucide-react";
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

function toTestId(projectSlug: string, label: string) {
  return `project-evidence-${projectSlug}-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export function ProjectEvidencePack({ projectSlug, evidencePack }: ProjectEvidencePackProps) {
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
        {evidencePack.map((item) => (
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
