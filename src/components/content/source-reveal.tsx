import { ExternalLink } from "lucide-react";
import { getGitHubSourceUrl } from "@/lib/source-links";

type SourceRevealProps = {
  label: string;
  path: string;
  href?: string;
  line?: number;
  testId?: string;
  link?: boolean;
};

export function SourceReveal({ label, path, href, line, testId, link = true }: SourceRevealProps) {
  const sourceHref = href ?? getGitHubSourceUrl(path, line);
  const location = line ? `${path}:${line}` : path;
  const text = `${label} ${location}`;

  if (!link) {
    return (
      <span className="source-reveal" data-testid={testId}>
        {text}
      </span>
    );
  }

  return (
    <a
      className="source-reveal"
      data-testid={testId}
      href={sourceHref}
      rel="noreferrer"
      target="_blank"
      aria-label={`Open ${location} on GitHub`}
    >
      <span>{text}</span>
      <ExternalLink size={12} />
    </a>
  );
}
