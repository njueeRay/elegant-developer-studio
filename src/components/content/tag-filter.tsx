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
  const [activeLanguage, setActiveLanguage] = useState("All");
  const languages = useMemo(
    () => Array.from(new Set(posts.map((post) => post.language))),
    [posts],
  );
  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
        const matchesLanguage = activeLanguage === "All" || post.language === activeLanguage;

        return matchesTag && matchesLanguage;
      }),
    [activeLanguage, activeTag, posts],
  );

  return (
    <section className="content-explorer" aria-label="Writing explorer">
      <div className="writing-system-panel" aria-label="Writing system">
        <div>
          <span>writing.system</span>
          <strong>中文承载判断，English 保留技术语境</strong>
        </div>
        <p>
          博客现在按标签和语言共同组织：长文负责完整论证，中文内容负责阶段复盘、产品判断和可追溯的项目记忆。
        </p>
      </div>
      <FilterBar
        label="Filter writing"
        active={activeTag}
        items={["All", ...tags]}
        onChange={setActiveTag}
        resultCount={filtered.length}
        totalCount={posts.length}
        noun="essays"
      />
      <FilterBar
        label="Filter language"
        active={activeLanguage}
        items={["All", ...languages]}
        onChange={setActiveLanguage}
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
