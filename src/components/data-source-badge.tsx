import { DatabaseZap } from "lucide-react";

type DataSourceBadgeProps = {
  source: string;
  command?: string;
  route?: string;
  verifiedAt?: string;
  tone?: "rust" | "blue" | "sage" | "ink";
};

export function DataSourceBadge({
  source,
  command,
  route,
  verifiedAt,
  tone = "blue",
}: DataSourceBadgeProps) {
  return (
    <span
      className={`data-source-badge ${tone}`}
      title={[source, route, command, verifiedAt].filter(Boolean).join(" / ")}
    >
      <DatabaseZap size={12} aria-hidden="true" />
      <span>{source}</span>
      {route ? <code>{route}</code> : null}
      {command ? <code>{command}</code> : null}
      {verifiedAt ? <small>{verifiedAt}</small> : null}
    </span>
  );
}
