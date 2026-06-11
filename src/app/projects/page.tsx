import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectExplorer } from "@/components/content/tag-filter";
import { getAllProjectMeta, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects - Ray Studio",
  description:
    "Selected work from Ray Studio: product systems, design engineering, documentation architecture, and studio tools.",
};

export default function ProjectsPage() {
  const projects = getAllProjectMeta();
  const tags = getAllTags(projects);

  return (
    <main className="studio-shell content-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="content-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <p className="section-kicker blue">Projects</p>
        <h1>Selected work with provenance, systems, and texture.</h1>
        <p>
          A focused portfolio surface for product systems, documentation
          architecture, experiments, and code-backed design work.
        </p>
      </header>
      <ProjectExplorer projects={projects} tags={tags} />
    </main>
  );
}
