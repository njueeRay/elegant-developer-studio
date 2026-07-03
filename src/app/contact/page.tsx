import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ContactHub } from "@/components/content/contact-hub";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Ray Studio 的公开联系入口：GitHub Issues、项目上下文、个人资料、写作和作品引用。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="studio-shell content-shell contact-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header contact-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={17} />
          Studio home
        </Link>
        <h1>Contact</h1>
        <p>
          A small public routing layer for project discussion, source context, writing,
          and focused collaboration.
        </p>
      </header>
      <ContactHub />
    </main>
  );
}
