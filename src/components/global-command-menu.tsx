"use client";

import Link from "next/link";
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

function normalize(value: string) {
  return value.toLowerCase().trim();
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

export function GlobalCommandMenu({ items }: { items: CommandItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeCommand = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        closeCommand();
      }
    };

    const onOpenCommand = () => setOpen(true);

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

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query);

    return items
      .map((item) => ({ item, score: scoreItem(item, normalizedQuery) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 9)
      .map(({ item }) => item);
  }, [items, query]);

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
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="command-results global-command-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const Icon = iconByKind[item.kind];

              return (
                <Link href={item.href} key={item.id} onClick={closeCommand}>
                  <span className="command-result-icon">
                    <Icon size={17} />
                  </span>
                  <span className="command-result-copy">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span className="command-result-meta">
                    {labelByKind[item.kind]} / {item.meta}
                  </span>
                  <ArrowRight size={16} />
                </Link>
              );
            })
          ) : (
            <p className="command-empty">
              No exact match. Try writing, photos, music, projects, or contact.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
