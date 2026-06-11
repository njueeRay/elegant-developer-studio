import type { TocItem } from "@/lib/content";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents" aria-label="Article table of contents">
      <p>On this page</p>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`}>
          {item.title}
        </a>
      ))}
    </nav>
  );
}
