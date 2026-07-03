import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { UsesExplorer } from "@/components/content/uses-explorer";
import { getUseCategories, pipelineSteps, useTools, useWorkflows } from "@/data/uses";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Uses",
  description:
    "Ray Studio 信任的工具、系统和工作仪式：写作、设计、编码、部署与发布流程。",
  path: "/uses",
});

export default function UsesPage() {
  const categories = getUseCategories(useTools);

  return (
    <main className="studio-shell content-shell uses-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header uses-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <h1>Uses</h1>
        <p>Tools, systems, and rituals I trust for writing, designing, coding, and shipping.</p>
      </header>
      <UsesExplorer
        categories={categories}
        pipeline={pipelineSteps}
        tools={useTools}
        workflows={useWorkflows}
      />
    </main>
  );
}
