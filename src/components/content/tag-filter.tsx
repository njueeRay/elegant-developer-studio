"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/content/filter-bar";
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
        resultCount={filtered.length}
        totalCount={posts.length}
        noun="essays"
      />
      <div className="post-list">
        {filtered.length > 0 ? (
          filtered.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <EmptyFilterState label="No essays match this filter yet." />
        )}
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
        resultCount={filtered.length}
        totalCount={projects.length}
        noun="projects"
      />
      <div className="project-grid">
        {filtered.length > 0 ? (
          filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        ) : (
          <EmptyFilterState label="No projects match this filter yet." />
        )}
      </div>
    </section>
  );
}

function EmptyFilterState({ label }: { label: string }) {
  return (
    <div className="filter-empty" role="status">
      <span>{label}</span>
    </div>
  );
}
