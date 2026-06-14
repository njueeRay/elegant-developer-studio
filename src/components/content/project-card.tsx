import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitBranch, Radio } from "lucide-react";
import { SourceReveal } from "@/components/content/source-reveal";
import type { ProjectMeta } from "@/lib/content";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <article className="project-card">
      <Image
        src={project.image}
        alt=""
        width={720}
        height={540}
        className="project-card-image"
      />
      <div className="project-card-content">
        <div className="project-status-row">
          <span>
            <Radio size={14} />
            {project.status}
          </span>
          <span>
            <GitBranch size={14} />
            {project.year}
          </span>
        </div>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <div className="tag-row content-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <SourceReveal
          label="source"
          path={`src/content/projects/${project.slug}.mdx`}
          testId={`source-link-project-${project.slug}`}
        />
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="project-card-link"
        aria-label={`Open ${project.title} case study`}
      />
      <ArrowRight className="card-arrow" size={20} />
    </article>
  );
}
