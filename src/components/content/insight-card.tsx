import type { ReactNode } from "react";

export function InsightCard({
  title,
  tone = "sage",
  children,
}: {
  title: string;
  tone?: "rust" | "blue" | "sage";
  children: ReactNode;
}) {
  return (
    <aside className={`insight-card ${tone}`}>
      <p>{title}</p>
      <div>{children}</div>
    </aside>
  );
}
