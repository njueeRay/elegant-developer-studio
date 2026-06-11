"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState, type ComponentProps } from "react";

function extractText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(extractText).join("");
  }

  if (
    value &&
    typeof value === "object" &&
    "props" in value &&
    value.props &&
    typeof value.props === "object" &&
    "children" in value.props
  ) {
    return extractText(value.props.children);
  }

  return "";
}

export function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => extractText(children).trim(), [children]);
  const lineCount = useMemo(
    () => (text ? text.split(/\r?\n/).length : 0),
    [text],
  );

  async function copyCode() {
    if (!text) {
      return;
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="code-frame">
      <div className="code-frame-toolbar">
        <span>
          snippet
          <small>{lineCount} lines</small>
        </span>
        <button type="button" onClick={copyCode} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre {...props}>{children}</pre>
    </div>
  );
}
