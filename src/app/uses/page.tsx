import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UsesExplorer } from "@/components/content/uses-explorer";
import { getUseCategories, pipelineSteps, useTools, useWorkflows } from "@/data/uses";

export const metadata: Metadata = {
  title: "Uses - Ray Studio",
  description:
    "Tools, systems, and rituals Ray Studio trusts for writing, designing, coding, and shipping.",
};

export default function UsesPage() {
  const categories = getUseCategories(useTools);

  return (
    <main className="studio-shell content-shell uses-shell">
      <div className="ambient-grid" aria-hidden="true" />
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
