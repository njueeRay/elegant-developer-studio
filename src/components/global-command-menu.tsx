"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Camera,
  Code2,
  FileText,
  FlaskConical,
  GitPullRequest,
  LibraryBig,
  Mail,
  Music2,
  Search,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import {
  emitCommandTrace,
  formatCommandTracePath,
} from "@/lib/command-trace";
import type { CommandIndexPayload, CommandItem, CommandKind } from "@/lib/command-index";

const iconByKind: Record<CommandKind, ComponentType<{ size?: number }>> = {
  action: Sparkles,
  post: FileText,
  project: Code2,
  knowledge: LibraryBig,
  lab: FlaskConical,
  uses: Wrench,
  about: UserRound,
  collaboration: GitPullRequest,
  photo: Camera,
  music: Music2,
  contact: Mail,
};

const labelByKind: Record<CommandKind, string> = {
  action: "Quick actions",
  post: "Writing",
  project: "Projects",
  knowledge: "Knowledge",
  lab: "Lab",
  uses: "Uses",
  about: "About",
  collaboration: "Collaboration",
  photo: "Photos",
  music: "Music",
  contact: "Contact",
};

const RECENT_STORAGE_KEY = "ray-studio-command-recent";
const MAX_RECENT_ITEMS = 5;
const COMMAND_INDEX_URL = "/command-index.json";

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

const plannedSuggestions: PlannedSuggestion[] = [];

const fallbackSuggestions = ["writing", "projects", "lab", "photos", "music"];

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

  if (pathname.startsWith("/lab")) {
    return ["lab", "action", "knowledge", "project"];
  }

  if (pathname.startsWith("/about")) {
    return ["about", "action", "post", "project"];
  }

  if (pathname.startsWith("/collaboration")) {
    return ["collaboration", "action", "lab", "knowledge"];
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

  if (pathname.startsWith("/lab")) {
    return "Lab context";
  }

  if (pathname.startsWith("/about")) {
    return "About context";
  }

  if (pathname.startsWith("/collaboration")) {
    return "Collaboration context";
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

function getTopLevelIntentBoost(item: CommandItem, query: string) {
  if (!query) {
    return 0;
  }

  if (
    ["external proof", "external", "proof", "evidence"].some((term) => query.includes(term)) &&
    [item.title, item.description, item.meta, ...item.keywords].some((value) =>
      normalize(value).match(/external|proof|evidence|openprofile|anyreader/),
    )
  ) {
    return 8;
  }

  if (["writing", "essay", "blog"].some((term) => query.includes(term)) && item.kind === "post") {
    return 6;
  }

  if (["project", "work", "case"].some((term) => query.includes(term)) && item.kind === "project") {
    return 6;
  }

  if (["knowledge", "decision", "pattern"].some((term) => query.includes(term)) && item.kind === "knowledge") {
    return 6;
  }

  return 0;
}

function scoreItem(item: CommandItem, query: string, contextKinds: CommandKind[]) {
  const haystack = normalize(
    [item.title, item.description, item.meta, item.kind, ...item.keywords].join(" "),
  );
  const contextBoost = getContextBoost(item, contextKinds);
  const topLevelBoost = getTopLevelIntentBoost(item, query);

  if (!query) {
    return 1 + contextBoost;
  }

  if (normalize(item.title).includes(query)) {
    return 40 + contextBoost + topLevelBoost;
  }

  if (haystack.includes(query)) {
    return 20 + contextBoost + topLevelBoost;
  }

  if (topLevelBoost > 0) {
    return topLevelBoost;
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

function writeCommandTrace(item: CommandItem) {
  if (item.href.startsWith("mailto:") || item.href.startsWith("http")) {
    return;
  }

  emitCommandTrace({
    command: `cmd.open("${formatCommandTracePath(item.href)}")`,
    label: item.title,
    href: item.href,
    meta: `${labelByKind[item.kind]} / ${item.meta}`,
  });
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

function isCommandIndexPayload(value: unknown): value is CommandIndexPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<CommandIndexPayload>;

  return (
    payload.schemaVersion === 1 &&
    Array.isArray(payload.items) &&
    typeof payload.count === "number" &&
    payload.items.length === payload.count
  );
}

export function GlobalCommandMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState<CommandItem[]>([]);
  const [loadStatus, setLoadStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [recentCommands, setRecentCommands] = useState<RecentCommand[]>(readRecentCommands);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const contextKinds = useMemo(() => getContextKinds(pathname), [pathname]);
  const contextLabel = useMemo(() => getContextLabel(pathname), [pathname]);

  const openCommand = useCallback(() => {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement && !dialogRef.current?.contains(activeElement)) {
      restoreFocusRef.current = activeElement;
    }

    setActiveIndex(0);
    setLoadStatus((current) => (current === "idle" ? "loading" : current));
    setOpen(true);
  }, []);

  const closeCommand = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);

    window.requestAnimationFrame(() => {
      if (restoreFocusRef.current?.isConnected) {
        restoreFocusRef.current.focus({ preventScroll: true });
      }
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          closeCommand();
        } else {
          openCommand();
        }
      }

      if (event.key === "Escape" && open) {
        closeCommand();
      }
    };

    const onOpenCommand = () => {
      openCommand();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("studio:open-command", onOpenCommand);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("studio:open-command", onOpenCommand);
    };
  }, [closeCommand, open, openCommand]);

  useEffect(() => {
    if (!open || loadStatus !== "loading") {
      return;
    }

    const controller = new AbortController();

    fetch(COMMAND_INDEX_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Command index responded with ${response.status}`);
        }

        return response.json() as Promise<unknown>;
      })
      .then((payload) => {
        if (!isCommandIndexPayload(payload)) {
          throw new Error("Command index payload does not match schema");
        }

        setItems(payload.items);
        setLoadStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setLoadStatus("error");
      });

    return () => controller.abort();
  }, [loadStatus, open]);

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
        id: "lab",
        kind: "lab",
        label: "Lab",
        items: sectionByKind("lab", 3),
      },
      {
        id: "uses",
        kind: "uses",
        label: "Uses",
        items: sectionByKind("uses", 3),
      },
      {
        id: "about",
        kind: "about",
        label: "About",
        items: sectionByKind("about", 3),
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

      if (item.href.startsWith("mailto:") || item.href.startsWith("http")) {
        closeCommand();
        window.location.href = item.href;
        return;
      }

      writeCommandTrace(item);
      closeCommand();
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

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((element) => element.offsetParent !== null);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="command-backdrop" onMouseDown={closeCommand}>
      <div
        className="command-palette global-command"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Global command center"
        onKeyDown={onDialogKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="command-input">
          <Search size={18} />
          <input
            autoFocus
            data-testid="global-command-search"
            value={query}
            placeholder="Search writing, work, knowledge, lab, uses, about..."
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
          {loadStatus === "loading" ? (
            <div className="command-loading" data-testid="global-command-loading" role="status">
              <strong>Loading command index...</strong>
              <p>Fetching writing, projects, knowledge, lab, uses, and studio actions.</p>
            </div>
          ) : loadStatus === "error" ? (
            <div className="command-empty" data-testid="global-command-error" role="alert">
              <strong>Command index could not load.</strong>
              <p>The shell is still available; retry the index before searching.</p>
              <div className="command-suggestions" aria-label="Command index recovery">
                <button
                  type="button"
                  onClick={() => {
                    setLoadStatus("loading");
                    setActiveIndex(0);
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : flatItems.length > 0 ? (
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
                        data-testid={`command-result-${item.id}`}
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
