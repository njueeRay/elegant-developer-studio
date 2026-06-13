"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Camera,
  Code2,
  FileText,
  LibraryBig,
  Mail,
  Music2,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";

export type CommandKind =
  | "action"
  | "post"
  | "project"
  | "knowledge"
  | "uses"
  | "photo"
  | "music"
  | "contact";

export type CommandItem = {
  id: string;
  kind: CommandKind;
  title: string;
  description: string;
  href: string;
  meta: string;
  keywords: string[];
};

const iconByKind: Record<CommandKind, ComponentType<{ size?: number }>> = {
  action: Sparkles,
  post: FileText,
  project: Code2,
  knowledge: LibraryBig,
  uses: Wrench,
  photo: Camera,
  music: Music2,
  contact: Mail,
};

const labelByKind: Record<CommandKind, string> = {
  action: "Quick actions",
  post: "Writing",
  project: "Projects",
  knowledge: "Knowledge",
  uses: "Uses",
  photo: "Photos",
  music: "Music",
  contact: "Contact",
};

const RECENT_STORAGE_KEY = "ray-studio-command-recent";
const MAX_RECENT_ITEMS = 5;

type RecentCommand = {
  id: string;
  visitedAt: number;
};

type CommandSection = {
  id: string;
  label: string;
  items: CommandItem[];
};

type DefaultCommandSection = CommandSection & {
  kind: CommandKind;
};

type PlannedSuggestion = {
  id: string;
  title: string;
  description: string;
  query: string;
};

const plannedSuggestions: PlannedSuggestion[] = [
  {
    id: "planned-lab",
    title: "Lab is planned",
    description: "The component lab will arrive after the interaction layer is stable.",
    query: "projects",
  },
  {
    id: "planned-about",
    title: "About is planned",
    description: "The resume and experience page is reserved for Phase 5.",
    query: "contact",
  },
];

const fallbackSuggestions = ["writing", "projects", "photos", "music"];

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getContextKinds(pathname: string): CommandKind[] {
  if (pathname.startsWith("/blog")) {
    return ["post", "action"];
  }

  if (pathname.startsWith("/projects")) {
    return ["project", "action"];
  }

  if (pathname.startsWith("/knowledge")) {
    return ["knowledge", "action", "post", "project"];
  }

  if (pathname.startsWith("/uses")) {
    return ["uses", "action", "knowledge", "project"];
  }

  if (pathname.startsWith("/photos")) {
    return ["photo", "action"];
  }

  if (pathname.startsWith("/music")) {
    return ["music", "action"];
  }

  return ["action", "post", "project", "photo", "music"];
}

function getContextLabel(pathname: string) {
  if (pathname.startsWith("/blog")) {
    return "Writing context";
  }

  if (pathname.startsWith("/projects")) {
    return "Project context";
  }

  if (pathname.startsWith("/knowledge")) {
    return "Knowledge context";
  }

  if (pathname.startsWith("/uses")) {
    return "Uses context";
  }

  if (pathname.startsWith("/photos")) {
    return "Photo context";
  }

  if (pathname.startsWith("/music")) {
    return "Music context";
  }

  return "Studio context";
}

function getContextBoost(item: CommandItem, contextKinds: CommandKind[]) {
  const index = contextKinds.indexOf(item.kind);

  if (index === -1) {
    return 0;
  }

  return Math.max(1, contextKinds.length - index);
}

function scoreItem(item: CommandItem, query: string, contextKinds: CommandKind[]) {
  const haystack = normalize(
    [item.title, item.description, item.meta, item.kind, ...item.keywords].join(" "),
  );
  const contextBoost = getContextBoost(item, contextKinds);

  if (!query) {
    return 1 + contextBoost;
  }

  if (normalize(item.title).includes(query)) {
    return 40 + contextBoost;
  }

  if (haystack.includes(query)) {
    return 20 + contextBoost;
  }

  return 0;
}

function readRecentCommands() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(RECENT_STORAGE_KEY);

    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value) as RecentCommand[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((entry) => typeof entry.id === "string" && typeof entry.visitedAt === "number")
      .sort((a, b) => b.visitedAt - a.visitedAt)
      .slice(0, MAX_RECENT_ITEMS);
  } catch {
    return [];
  }
}

function writeRecentCommands(entries: RecentCommand[]) {
  try {
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Recent commands are a convenience. Navigation should never depend on storage.
  }
}

function getResultId(itemId: string) {
  return `command-result-${itemId}`;
}

function highlightText(text: string, query: string): ReactNode {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return text;
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(normalizedQuery)})`, "ig"));

  return parts.map((part, index) => {
    if (normalize(part) === normalizedQuery) {
      return (
        <mark className="command-highlight" key={`${part}-${index}`}>
          {part}
        </mark>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function getPlannedSuggestion(query: string) {
  const normalizedQuery = normalize(query);

  return plannedSuggestions.find((suggestion) => normalizedQuery.includes(suggestion.id.replace("planned-", "")));
}

export function GlobalCommandMenu({ items }: { items: CommandItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<RecentCommand[]>(readRecentCommands);
  const contextKinds = useMemo(() => getContextKinds(pathname), [pathname]);
  const contextLabel = useMemo(() => getContextLabel(pathname), [pathname]);

  const closeCommand = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setActiveIndex(0);
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        closeCommand();
      }
    };

    const onOpenCommand = () => {
      setActiveIndex(0);
      setOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("studio:open-command", onOpenCommand);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("studio:open-command", onOpenCommand);
    };
  }, [closeCommand]);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const recentItems = useMemo(() => {
    const itemById = new Map(items.map((item) => [item.id, item]));

    return recentCommands
      .map((entry) => itemById.get(entry.id))
      .filter((item): item is CommandItem => Boolean(item));
  }, [items, recentCommands]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query);

    return items
      .map((item) => ({ item, score: scoreItem(item, normalizedQuery, contextKinds) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 9)
      .map(({ item }) => item);
  }, [contextKinds, items, query]);

  const plannedSuggestion = useMemo(() => getPlannedSuggestion(query), [query]);

  const sections = useMemo<CommandSection[]>(() => {
    const normalizedQuery = normalize(query);

    if (normalizedQuery) {
      const sectionsByKind = new Map<CommandKind, CommandItem[]>();

      filteredItems.forEach((item) => {
        const sectionItems = sectionsByKind.get(item.kind) ?? [];
        sectionItems.push(item);
        sectionsByKind.set(item.kind, sectionItems);
      });

      return Array.from(sectionsByKind.entries()).map(([kind, sectionItems]) => ({
        id: kind,
        label: labelByKind[kind],
        items: sectionItems,
      }));
    }

    const primaryContextKind = contextKinds[0];
    const visibleRecentItems =
      primaryContextKind === "action"
        ? recentItems
        : recentItems.filter((item) => item.kind !== primaryContextKind);
    const recentIds = new Set(visibleRecentItems.map((item) => item.id));
    const availableItems = items.filter((item) => !recentIds.has(item.id));
    const sectionByKind = (kind: CommandKind, limit: number) =>
      availableItems.filter((item) => item.kind === kind).slice(0, limit);
    const contextSections = contextKinds
      .filter((kind) => kind !== "contact")
      .map((kind) => ({
        id: `context-${kind}`,
        label: kind === contextKinds[0] ? contextLabel : labelByKind[kind],
        items: sectionByKind(kind, kind === "action" ? 4 : 3),
      }));
    const contextKindSet = new Set(contextKinds);
    const rawDefaultSections: DefaultCommandSection[] = [
      {
        id: "quick-actions",
        kind: "action",
        label: "Quick actions",
        items: sectionByKind("action", 4),
      },
      {
        id: "writing",
        kind: "post",
        label: "Writing",
        items: sectionByKind("post", 2),
      },
      {
        id: "projects",
        kind: "project",
        label: "Projects",
        items: sectionByKind("project", 2),
      },
      {
        id: "uses",
        kind: "uses",
        label: "Uses",
        items: sectionByKind("uses", 3),
      },
      {
        id: "photos",
        kind: "photo",
        label: "Photos",
        items: sectionByKind("photo", 2),
      },
      {
        id: "music",
        kind: "music",
        label: "Music",
        items: sectionByKind("music", 1),
      },
    ];
    const defaultSections = rawDefaultSections
      .filter((section) => !contextKindSet.has(section.kind))
      .map((section) => ({
        id: section.id,
        label: section.label,
        items: section.items,
      }));

    return [
      visibleRecentItems.length > 0
        ? {
            id: "recent",
            label: "Recent",
            items: visibleRecentItems,
          }
        : null,
      ...contextSections,
      ...defaultSections,
    ].filter((section): section is CommandSection => Boolean(section && section.items.length));
  }, [contextKinds, contextLabel, filteredItems, items, query, recentItems]);

  const indexedSections = useMemo(() => {
    let index = 0;

    return sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        item,
        index: index++,
      })),
    }));
  }, [sections]);

  const flatItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const safeActiveIndex =
    flatItems.length === 0 ? -1 : Math.min(Math.max(activeIndex, 0), flatItems.length - 1);
  const activeItem = flatItems[safeActiveIndex];

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    document.getElementById(getResultId(activeItem.id))?.scrollIntoView({
      block: "nearest",
    });
  }, [activeItem]);

  const recordRecentCommand = useCallback((item: CommandItem) => {
    setRecentCommands((current) => {
      const next = [
        {
          id: item.id,
          visitedAt: Date.now(),
        },
        ...current.filter((entry) => entry.id !== item.id),
      ].slice(0, MAX_RECENT_ITEMS);

      writeRecentCommands(next);

      return next;
    });
  }, []);

  const openItem = useCallback(
    (item: CommandItem) => {
      recordRecentCommand(item);
      closeCommand();

      if (item.href.startsWith("mailto:") || item.href.startsWith("http")) {
        window.location.href = item.href;
        return;
      }

      router.push(item.href);
    },
    [closeCommand, recordRecentCommand, router],
  );

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        flatItems.length > 0 ? ((current < 0 ? 0 : current + 1) % flatItems.length) : -1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        flatItems.length > 0
          ? ((current < 0 ? flatItems.length - 1 : current - 1 + flatItems.length) % flatItems.length)
          : -1,
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(flatItems.length > 0 ? 0 : -1);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(flatItems.length > 0 ? flatItems.length - 1 : -1);
    }

    if (event.key === "Enter" && activeItem) {
      event.preventDefault();
      openItem(activeItem);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="command-backdrop" onMouseDown={closeCommand}>
      <div
        className="command-palette global-command"
        role="dialog"
        aria-modal="true"
        aria-label="Global command center"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="command-input">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            placeholder="Search writing, work, knowledge, uses..."
            role="searchbox"
            aria-controls="global-command-results"
            aria-activedescendant={activeItem ? getResultId(activeItem.id) : undefined}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
          />
          <kbd>Esc</kbd>
        </div>
        <div
          className="command-results global-command-results"
          id="global-command-results"
          role={flatItems.length > 0 ? "listbox" : undefined}
        >
          {flatItems.length > 0 ? (
            <>
              {plannedSuggestion ? (
                <div className="command-planned-note">
                  <strong>{plannedSuggestion.title}</strong>
                  <span>{plannedSuggestion.description}</span>
                </div>
              ) : null}
              {indexedSections.map((section) => (
                <div className="command-section" key={section.id} role="group" aria-label={section.label}>
                  <p className="command-section-label">{section.label}</p>
                  {section.items.map(({ item, index }) => {
                    const Icon = iconByKind[item.kind];
                    const isActive = index === safeActiveIndex;

                    return (
                      <Link
                        aria-selected={isActive}
                        className={isActive ? "command-result-active" : undefined}
                        href={item.href}
                        id={getResultId(item.id)}
                        key={item.id}
                        onClick={(event) => {
                          event.preventDefault();
                          openItem(item);
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        role="option"
                      >
                        <span className="command-result-icon">
                          <Icon size={17} />
                        </span>
                        <span className="command-result-copy">
                          <strong>{highlightText(item.title, query)}</strong>
                          <small>{highlightText(item.description, query)}</small>
                        </span>
                        <span className="command-result-meta">
                          {labelByKind[item.kind]} / {item.meta}
                        </span>
                        <ArrowRight size={16} />
                      </Link>
                    );
                  })}
                </div>
              ))}
            </>
          ) : (
            <div className="command-empty">
              <strong>No exact match for “{query}”.</strong>
              {plannedSuggestion ? (
                <p>
                  {plannedSuggestion.title}. {plannedSuggestion.description}
                </p>
              ) : (
                <p>Try a broader route or one of the active areas below.</p>
              )}
              <div className="command-suggestions" aria-label="Search suggestions">
                {(plannedSuggestion ? [plannedSuggestion.query, ...fallbackSuggestions] : fallbackSuggestions)
                  .filter((suggestion, index, suggestions) => suggestions.indexOf(suggestion) === index)
                  .slice(0, 4)
                  .map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        setActiveIndex(0);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="command-footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            Navigate
          </span>
          <span>
            <kbd>Enter</kbd>
            Open
          </span>
        </div>
      </div>
    </div>
  );
}
