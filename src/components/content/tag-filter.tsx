"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/content/post-card";
import { ProjectCard } from "@/components/content/project-card";
import type { PostMeta, ProjectMeta } from "@/lib/content";

export function PostExplorer({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState("All");
  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? posts
        : posts.filter((post) => post.tags.includes(activeTag)),
    [activeTag, posts],
  );

  return (
    <section className="content-explorer" aria-label="Writing explorer">
      <FilterBar
        label="Filter writing"
        active={activeTag}
        items={["All", ...tags]}
        onChange={setActiveTag}
      />
      <div className="post-list">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

export function ProjectExplorer({
  projects,
  tags,
}: {
  projects: ProjectMeta[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState("All");
  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? projects
        : projects.filter((project) => project.stack.includes(activeTag)),
    [activeTag, projects],
  );

  return (
    <section className="content-explorer" aria-label="Project explorer">
      <FilterBar
        label="Filter work"
        active={activeTag}
        items={["All", ...tags]}
        onChange={setActiveTag}
      />
      <div className="project-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function FilterBar({
  label,
  active,
  items,
  onChange,
}: {
  label: string;
  active: string;
  items: string[];
  onChange: (item: string) => void;
}) {
  return (
    <div className="filter-bar" aria-label={label}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={active === item ? "active" : ""}
          aria-pressed={active === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
