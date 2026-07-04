"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { writeToClipboard } from "@/lib/clipboard";

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
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [codeText, setCodeText] = useState("");
  const [lineCount, setLineCount] = useState(0);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const nextText = (preRef.current?.innerText ?? extractText(children)).trim();

    setCodeText(nextText);
    setLineCount(nextText ? nextText.split(/\r?\n/).length : 0);
  }, [children]);

  async function copyCode() {
    const nextText = (preRef.current?.innerText ?? codeText).trim();

    if (!nextText) {
      return;
    }

    const didCopy = await writeToClipboard(nextText);

    if (didCopy) {
      setCopyState("copied");
    } else {
      setCopyState("failed");
    }

    window.setTimeout(() => setCopyState("idle"), 1400);
  }

  return (
    <div className="code-frame">
      <div className="code-frame-toolbar">
        <span>
          snippet
          <small>{lineCount} lines</small>
        </span>
        <button
          type="button"
          data-testid="code-copy"
          onClick={copyCode}
          aria-label="Copy code"
        >
          {copyState === "copied" ? <Check size={14} /> : <Copy size={14} />}
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy"}
        </button>
      </div>
      <pre {...props} ref={preRef}>
        {children}
      </pre>
    </div>
  );
}
