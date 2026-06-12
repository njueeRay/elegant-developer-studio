"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState, type ComponentProps } from "react";

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
  const [codeText, setCodeText] = useState("");
  const [lineCount, setLineCount] = useState(0);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const nextText = (preRef.current?.innerText ?? extractText(children)).trim();

    setCodeText(nextText);
    setLineCount(nextText ? nextText.split(/\r?\n/).length : 0);
  }, [children]);

  async function copyCode() {
    if (!codeText) {
      return;
    }

    await navigator.clipboard.writeText(codeText);
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
      <pre {...props} ref={preRef}>
        {children}
      </pre>
    </div>
  );
}
