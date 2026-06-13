"use client";

import Link from "next/link";
import {
  Boxes,
  Check,
  Clipboard,
  Code2,
  Command,
  Copy,
  FlaskConical,
  ImageIcon,
  Layers3,
  MonitorCheck,
  Route,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { FilterBar } from "@/components/content/filter-bar";
import {
  getLabRegistryReference,
  type LabCategory,
  type LabComponent,
  type LabExperiment,
  type LabQualityGate,
  type LabStatus,
} from "@/data/lab";

type LabExplorerProps = {
  components: LabComponent[];
  categories: string[];
  experiments: LabExperiment[];
  gates: LabQualityGate[];
};

const iconByCategory: Record<LabCategory, typeof Boxes> = {
  Command,
  Content: Code2,
  Media: ImageIcon,
  System: Layers3,
  Profile: UserRound,
};

const statusLabel: Record<LabStatus, string> = {
  Stable: "Stable",
  Iterating: "Iterating",
  Planned: "Planned",
};

function writeWithTextarea(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  return Promise.resolve();
}

async function writeToClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
  } catch {
    // Clipboard permissions vary in preview browsers; the fallback keeps the UI useful.
  }

  await writeWithTextarea(value);
}

function getImportSnippet(component: LabComponent) {
  return `import { ${component.name} } from "${component.importPath}";`;
}

function getDisplayName(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function LabExplorer({ components, categories, experiments, gates }: LabExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState(components[0]?.slug ?? "");
  const [copied, setCopied] = useState<string | null>(null);
  const filteredComponents = useMemo(
    () =>
      activeCategory === "All"
        ? components
        : components.filter((component) => component.category === activeCategory),
    [activeCategory, components],
  );
  const selectedComponent =
    filteredComponents.find((component) => component.slug === selectedSlug) ??
    filteredComponents[0] ??
    components[0];
  const stableCount = components.filter((component) => component.status === "Stable").length;
  const activeCategories = new Set(components.map((component) => component.category)).size;

  const copyValue = async (id: string, value: string) => {
    await writeToClipboard(value);
    setCopied(id);
    window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1600);
  };

  return (
    <section className="lab-explorer" aria-label="Component lab explorer">
      <div className="lab-hero">
        <div className="lab-hero-copy">
          <div className="lab-status-strip" aria-label="Lab status">
            <span>
              <FlaskConical size={16} />
              Phase 5
            </span>
            <span>
              <Boxes size={16} />
              {components.length} components
            </span>
            <span>
              <MonitorCheck size={16} />
              {stableCount} stable
            </span>
          </div>

          <FilterBar
            label="Filter components"
            active={activeCategory}
            items={["All", ...categories]}
            onChange={setActiveCategory}
            resultCount={filteredComponents.length}
            totalCount={components.length}
            noun="components"
          />

          <div className="lab-actions">
            <button
              type="button"
              className="lab-command-button"
              onClick={() => window.dispatchEvent(new Event("studio:open-command"))}
            >
              <Command size={17} />
              Open Command Center
              <kbd>⌘ K</kbd>
            </button>
            <button
              type="button"
              className="lab-copy-button"
              onClick={() => copyValue("registry", getLabRegistryReference(components))}
            >
              {copied === "registry" ? <Check size={15} /> : <Copy size={15} />}
              {copied === "registry" ? "Copied" : "Copy registry"}
            </button>
          </div>
        </div>

        {selectedComponent ? (
          <aside className="lab-preview" aria-label="Selected component preview">
            <div className="lab-preview-topline">
              <span>{selectedComponent.category}</span>
              <span data-status={selectedComponent.status}>
                {statusLabel[selectedComponent.status]}
              </span>
            </div>
            <div className="lab-preview-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h2>{getDisplayName(selectedComponent.name)}</h2>
            <p>{selectedComponent.description}</p>
            <div className="lab-preview-signal">
              <Sparkles size={16} />
              <strong>{selectedComponent.signal}</strong>
            </div>
            <div className="lab-preview-meta">
              <span>
                <Route size={15} />
                {selectedComponent.route}
              </span>
              <span>
                <Clipboard size={15} />
                {selectedComponent.source}
              </span>
            </div>
            <button
              type="button"
              className="lab-import-button"
              onClick={() => copyValue(selectedComponent.slug, getImportSnippet(selectedComponent))}
            >
              {copied === selectedComponent.slug ? <Check size={15} /> : <Copy size={15} />}
              {copied === selectedComponent.slug ? "Copied import" : "Copy import"}
            </button>
          </aside>
        ) : null}
      </div>

      <div className="lab-index-strip" aria-label="Lab summary">
        <div>
          <p className="section-kicker blue">Component registry</p>
          <strong>Reusable surfaces with source, route, proof, and next-use context.</strong>
        </div>
        <dl>
          <div>
            <dt>Categories</dt>
            <dd>{activeCategories}</dd>
          </div>
          <div>
            <dt>Experiments</dt>
            <dd>{experiments.length}</dd>
          </div>
          <div>
            <dt>Gates</dt>
            <dd>{gates.length}</dd>
          </div>
        </dl>
      </div>

      <div className="lab-layout">
        <div className="lab-component-list">
          {filteredComponents.map((component) => {
            const Icon = iconByCategory[component.category];
            const isSelected = selectedComponent?.slug === component.slug;

            return (
              <button
                type="button"
                className="lab-component-row"
                data-active={isSelected}
                id={component.slug}
                key={component.slug}
                onClick={() => setSelectedSlug(component.slug)}
              >
                <span className="lab-component-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <span className="lab-component-copy">
                  <span className="lab-component-meta">
                    {component.category} / {component.component}
                  </span>
                  <strong>{component.name}</strong>
                  <small>{component.evidence}</small>
                </span>
                <span className="lab-component-status" data-status={component.status}>
                  {statusLabel[component.status]}
                </span>
              </button>
            );
          })}
        </div>

        <aside className="lab-detail-panel" aria-label="Lab component details">
          {selectedComponent ? (
            <>
              <div className="lab-detail-heading">
                <p className="section-kicker">Selected pattern</p>
                <h2>{selectedComponent.component}</h2>
              </div>
              <p>{selectedComponent.description}</p>
              <div className="lab-reuse-list" aria-label="Reusable contexts">
                {selectedComponent.reusableFor.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="lab-code-line">
                <code>{getImportSnippet(selectedComponent)}</code>
              </div>
              <Link href={selectedComponent.route} className="lab-route-link">
                Open route
                <Route size={15} />
              </Link>
            </>
          ) : null}
        </aside>
      </div>

      <div className="lab-lower-grid">
        <section className="lab-experiment-panel" aria-labelledby="lab-experiment-title">
          <div className="lab-section-heading">
            <h2 id="lab-experiment-title">Experiment timeline</h2>
            <p>Small interaction bets enter the studio only after they earn a real role.</p>
          </div>
          <ol className="lab-experiment-list">
            {experiments.map((experiment) => (
              <li key={experiment.step}>
                <span>{experiment.step}</span>
                <strong>{experiment.title}</strong>
                <small data-status={experiment.status}>{statusLabel[experiment.status]}</small>
                <p>{experiment.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lab-quality-panel" aria-labelledby="lab-quality-title">
          <div className="lab-section-heading compact">
            <h2 id="lab-quality-title">Quality gates</h2>
            <p>Rules for keeping the Lab useful as the personal OS grows.</p>
          </div>
          <div className="lab-gate-list">
            {gates.map((gate) => (
              <article key={gate.name}>
                <ShieldCheck size={18} />
                <div>
                  <span>{gate.signal}</span>
                  <strong>{gate.name}</strong>
                  <p>{gate.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
