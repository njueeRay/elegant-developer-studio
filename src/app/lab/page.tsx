import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { LabExplorer } from "@/components/content/lab-explorer";
import {
  getLabCategories,
  labComponents,
  labExperiments,
  labQualityGates,
} from "@/data/lab";

export const metadata: Metadata = {
  title: "Lab - Ray Studio",
  description:
    "A component laboratory for Ray Studio: reusable patterns, interaction proofs, quality gates, and traceable UI experiments.",
};

export default function LabPage() {
  const categories = getLabCategories(labComponents);

  return (
    <main className="studio-shell content-shell lab-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header lab-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <h1>Lab</h1>
        <p>
          Reusable patterns, interaction proofs, and component registry for the
          studio. This is where polished pieces become traceable building blocks.
        </p>
      </header>
      <LabExplorer
        categories={categories}
        components={labComponents}
        experiments={labExperiments}
        gates={labQualityGates}
      />
    </main>
  );
}
