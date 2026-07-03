import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { LabExplorer } from "@/components/content/lab-explorer";
import { PersonalOsZoo } from "@/components/personal-os-zoo";
import {
  getLabCategories,
  labComponents,
  labExperiments,
  labQualityGates,
} from "@/data/lab";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Lab",
  description:
    "Ray Studio 的组件实验室：可复用模式、交互证明、质量门禁和可追溯 UI 实验。",
  path: "/lab",
});

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
      <PersonalOsZoo />
      <LabExplorer
        categories={categories}
        components={labComponents}
        experiments={labExperiments}
        gates={labQualityGates}
      />
    </main>
  );
}
