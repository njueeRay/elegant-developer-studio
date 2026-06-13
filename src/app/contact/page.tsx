import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactHub } from "@/components/content/contact-hub";

export const metadata: Metadata = {
  title: "Contact - Ray Studio",
  description:
    "Public contact routes for Ray Studio: GitHub Issues, project context, profile, writing, and portfolio references.",
};

export default function ContactPage() {
  return (
    <main className="studio-shell content-shell contact-shell">
      <div className="ambient-grid" aria-hidden="true" />
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
