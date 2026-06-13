"use client";

import {
  CalendarDays,
  Check,
  Clipboard,
  Code2,
  Command,
  Copy,
  ExternalLink,
  GitBranch,
  PenLine,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";
import { FilterBar } from "@/components/content/filter-bar";
import type { PipelineStep, UseTool, UseWorkflow } from "@/data/uses";

type UsesExplorerProps = {
  tools: UseTool[];
  categories: string[];
  workflows: UseWorkflow[];
  pipeline: PipelineStep[];
};

const categoryIcon = {
  Design: PenLine,
  Code: Code2,
  Writing: Clipboard,
  Automation: Workflow,
} as const;

function writeWithTextarea(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  return Promise.resolve();
}

async function writeToClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
  } catch {
    // Clipboard can be blocked in preview browsers; the visible UI feedback should still work.
  }

  await writeWithTextarea(value);
}

function getToolRef(tool: UseTool) {
  return `uses:${tool.slug} | ${tool.name} | ${tool.category} | ${tool.role}`;
}

export function UsesExplorer({ tools, categories, workflows, pipeline }: UsesExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const filteredTools = useMemo(
    () =>
      activeCategory === "All"
        ? tools
        : tools.filter((tool) => tool.category === activeCategory),
    [activeCategory, tools],
  );
  const heroTools = tools.slice(0, 7);

  const copyValue = async (id: string, value: string) => {
    await writeToClipboard(value);
    setCopied(id);
    window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1600);
  };

  return (
    <section className="uses-explorer" aria-label="Uses explorer">
      <div className="uses-hero">
        <div className="uses-hero-copy">
          <div className="uses-status-strip" aria-label="Uses status">
            <span>
              <CalendarDays size={16} />
              Updated Jun 2026
            </span>
            <span>
              <Command size={16} />
              {tools.length} tools
            </span>
            <span>
              <GitBranch size={16} />
              {workflows.length} workflows
            </span>
          </div>

          <FilterBar
            label="Filter tools"
            active={activeCategory}
            items={["All", ...categories]}
            onChange={setActiveCategory}
            resultCount={filteredTools.length}
            totalCount={tools.length}
            noun="tools"
          />

          <button
            type="button"
            className="uses-command-button"
            onClick={() => window.dispatchEvent(new Event("studio:open-command"))}
          >
            <Command size={17} />
            Open Command Center
            <kbd>⌘ K</kbd>
          </button>
        </div>

        <div className="uses-shelf" aria-label="Current stack shelf">
          <div className="uses-shelf-art" aria-hidden="true">
            <span className="uses-shelf-book">The Art of Code</span>
            <span className="uses-shelf-book muted">Design Systems</span>
            <span className="uses-shelf-plant" />
            <span className="uses-shelf-frame">
              const clarity ={" "}
              <br />
              {"{ focus: true }"}
            </span>
          </div>
          <div className="uses-shelf-tools">
            {heroTools.map((tool) => {
              const Icon = categoryIcon[tool.category];

              return (
                <span className="uses-shelf-tool" key={tool.slug}>
                  <Icon size={18} />
                  {tool.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="uses-stack-strip" aria-label="Current stack">
        <div>
          <p className="section-kicker blue">Current stack</p>
          <strong>Core technologies and platforms I build with right now.</strong>
        </div>
        <button
          type="button"
          onClick={() => copyValue("stack", tools.map(getToolRef).join("\n"))}
        >
          {copied === "stack" ? <Check size={15} /> : <Copy size={15} />}
          {copied === "stack" ? "Copied" : "Copy all"}
        </button>
      </div>

      <div className="uses-tool-grid">
        {filteredTools.map((tool) => {
          const Icon = categoryIcon[tool.category];

          return (
            <article className="uses-tool-card" id={tool.slug} key={tool.slug}>
              <div className="uses-tool-icon">
                <Icon size={20} />
              </div>
              <div className="uses-tool-copy">
                <div className="uses-tool-heading">
                  <span>{tool.category}</span>
                  <kbd>⌘ {tool.shortcut}</kbd>
                </div>
                <h2>{tool.name}</h2>
                <p>{tool.role}</p>
                <small>{tool.description}</small>
                <strong>{tool.signal}</strong>
              </div>
              <button
                type="button"
                className="uses-tool-copy-button"
                aria-label={`Copy ${tool.name} reference`}
                onClick={() => copyValue(tool.slug, getToolRef(tool))}
              >
                {copied === tool.slug ? <Check size={15} /> : <Copy size={15} />}
                {copied === tool.slug ? "Copied" : "Copy ref"}
              </button>
            </article>
          );
        })}
      </div>

      <div className="uses-lower-grid">
        <section className="uses-workflow-panel" aria-labelledby="workspace-rhythm">
          <div className="uses-section-heading">
            <h2 id="workspace-rhythm">Workspace rhythm</h2>
            <p>A day in four movements. Deep work first, everything else around it.</p>
          </div>
          <div className="uses-workflow-list">
            {workflows.map((workflow) => (
              <div className="uses-workflow-row" key={workflow.step}>
                <span>{workflow.step}</span>
                <strong>{workflow.title}</strong>
                <time>{workflow.time}</time>
                <p>{workflow.description}</p>
                <kbd>⌘ {workflow.key}</kbd>
              </div>
            ))}
          </div>
          <p className="uses-ritual-note">
            Protect the morning. Design the afternoon. Close with trace.
          </p>
        </section>

        <section className="uses-pipeline-panel" aria-labelledby="publishing-pipeline">
          <div className="uses-section-heading">
            <h2 id="publishing-pipeline">Publishing pipeline</h2>
            <p>From idea to production, every step leaves a useful trail.</p>
          </div>
          <ol className="uses-pipeline">
            {pipeline.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="uses-automation-panel" aria-labelledby="automation-shelf">
          <div className="uses-section-heading">
            <h2 id="automation-shelf">Automation shelf</h2>
            <p>Small repeatable moves that remove friction without adding theatre.</p>
          </div>
          <div className="uses-automation-list">
            {["Code snippets", "Issue triage", "Deploy checks", "Doc sync"].map((item) => (
              <span key={item}>
                <ExternalLink size={15} />
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
