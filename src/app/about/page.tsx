import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AboutProfile } from "@/components/content/about-profile";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Ray Studio 的个人简介：原则、时间线、能力边界、协作约定和联系入口。",
  path: "/about",
});

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
