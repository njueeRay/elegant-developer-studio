"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Camera,
  Code2,
  FileText,
  Mail,
  Music2,
  Search,
  Sparkles,
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
  photo: Camera,
  music: Music2,
  contact: Mail,
};

const labelByKind: Record<CommandKind, string> = {
  action: "Quick actions",
  post: "Writing",
  project: "Projects",
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

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scoreItem(item: CommandItem, query: string) {
  const haystack = normalize(
    [item.title, item.description, item.meta, item.kind, ...item.keywords].join(" "),
  );

  if (!query) {
    return 1;
  }

  if (normalize(item.title).includes(query)) {
    return 4;
  }

  if (haystack.includes(query)) {
    return 2;
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

export function GlobalCommandMenu({ items }: { items: CommandItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<RecentCommand[]>(readRecentCommands);

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
      .map((item) => ({ item, score: scoreItem(item, normalizedQuery) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 9)
      .map(({ item }) => item);
  }, [items, query]);

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

    const recentIds = new Set(recentItems.map((item) => item.id));
    const quickActions = items
      .filter((item) => item.kind === "action" && !recentIds.has(item.id))
      .slice(0, 4);
    const writing = items.filter((item) => item.kind === "post" && !recentIds.has(item.id)).slice(0, 2);
    const projects = items
      .filter((item) => item.kind === "project" && !recentIds.has(item.id))
      .slice(0, 2);

    return [
      recentItems.length > 0
        ? {
            id: "recent",
            label: "Recent",
            items: recentItems,
          }
        : null,
      {
        id: "quick-actions",
        label: "Quick actions",
        items: quickActions,
      },
      {
        id: "writing",
        label: "Writing",
        items: writing,
      },
      {
        id: "projects",
        label: "Projects",
        items: projects,
      },
    ].filter((section): section is CommandSection => Boolean(section && section.items.length));
  }, [filteredItems, items, query, recentItems]);

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
            placeholder="Search writing, work, photos, music..."
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
        <div className="command-results global-command-results" id="global-command-results" role="listbox">
          {flatItems.length > 0 ? (
            indexedSections.map((section) => (
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
            ))
          ) : (
            <p className="command-empty">
              No exact match. Try writing, photos, music, projects, or contact.
            </p>
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
