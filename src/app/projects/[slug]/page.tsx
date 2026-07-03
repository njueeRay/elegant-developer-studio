import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, ExternalLink, GitCompareArrows } from "lucide-react";
import { ProjectEvidencePack } from "@/components/content/project-evidence-pack";
import { SiteHeader } from "@/components/site-header";
import { getAllProjects, getProject } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const Content = project.Content;

  return (
    <main className="studio-shell content-shell project-detail-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <article className="project-detail">
        <Link href="/projects" className="text-link">
          <ArrowLeft size={16} />
          Projects
        </Link>
        <header>
          <p className="section-kicker blue">{project.role}</p>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
          <div className="project-actions">
            <a href={project.externalUrl} className="primary-link">
              <ExternalLink size={16} />
              Open surface
            </a>
            <a href={project.repo} className="text-link">
              <Code2 size={16} />
              Source
            </a>
          </div>
        </header>
        <Image
          src={project.image}
          alt=""
          width={1200}
          height={820}
          className="project-hero-image"
          priority
        />
        <div className="project-facts">
          <div>
            <span>Status</span>
            <strong>{project.status}</strong>
          </div>
          <div>
            <span>Year</span>
            <strong>{project.year}</strong>
          </div>
          <div>
            <span>Stack</span>
            <strong>{project.stack.join(" / ")}</strong>
          </div>
        </div>
        <div className="article-content project-prose">
          <Content />
        </div>
        <ProjectEvidencePack projectSlug={project.slug} evidencePack={project.evidencePack} />
        <section className="case-study-diff" aria-labelledby="case-study-diff-title">
          <div className="case-study-diff-heading">
            <GitCompareArrows size={19} />
            <div>
              <p className="section-kicker blue">Case Study Diff</p>
              <h2 id="case-study-diff-title">What changed</h2>
            </div>
          </div>
          <div className="case-study-diff-grid">
            {project.caseStudyDiff.map((item) => (
              <article className="case-study-diff-card" key={item.before}>
                <div>
                  <span>Before</span>
                  <p>{item.before}</p>
                </div>
                <div>
                  <span>After</span>
                  <p>{item.after}</p>
                </div>
                <footer>
                  <span>Proof</span>
                  <strong>{item.proof}</strong>
                  {item.evidenceHref ? (
                    <a href={item.evidenceHref} rel="noreferrer" target="_blank">
                      Open evidence
                    </a>
                  ) : null}
                </footer>
              </article>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
