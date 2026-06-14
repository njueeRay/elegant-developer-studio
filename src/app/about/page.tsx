import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AboutProfile } from "@/components/content/about-profile";

export const metadata: Metadata = {
  title: "About - Ray Studio",
  description:
    "A calm studio profile for Ray: principles, timeline, capabilities, working agreements, and contact.",
};

export default function AboutPage() {
  return (
    <main className="studio-shell content-shell about-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header about-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <h1>About</h1>
        <p>
          A studio profile for the person behind the writing, systems, tools, and experiments.
        </p>
      </header>
      <AboutProfile />
    </main>
  );
}
