import type { ComponentProps, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/content/code-block";
import { InsightCard } from "@/components/content/insight-card";

function getText(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(getText).join("");
  }

  return "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Heading2({ children, ...props }: ComponentProps<"h2">) {
  const id = props.id ?? slugify(getText(children));

  return (
    <h2 id={id} {...props}>
      <a href={`#${id}`} aria-label={`Link to ${getText(children)}`}>
        #
      </a>
      {children}
    </h2>
  );
}

function Heading3({ children, ...props }: ComponentProps<"h3">) {
  const id = props.id ?? slugify(getText(children));

  return (
    <h3 id={id} {...props}>
      {children}
    </h3>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: Heading2,
    h3: Heading3,
    pre: CodeBlock,
    InsightCard,
    ...components,
  };
}
