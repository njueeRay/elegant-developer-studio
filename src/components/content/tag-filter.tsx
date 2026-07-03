"use client";

import { useMemo } from "react";
import { FilterBar } from "@/components/content/filter-bar";
import { PostCard } from "@/components/content/post-card";
import { ProjectCard } from "@/components/content/project-card";
import { getWritingTrackSummaries, intentToTrack } from "@/data/writing";
import type { PostMeta, ProjectMeta } from "@/lib/content";
import { useQueryFilter } from "@/lib/use-query-filter";

export function PostExplorer({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const languages = useMemo(
    () => Array.from(new Set(posts.map((post) => post.language))),
    [posts],
  );
  const trackSummaries = useMemo(() => getWritingTrackSummaries(posts), [posts]);
  const trackIds = useMemo(() => trackSummaries.map((track) => track.id), [trackSummaries]);
  const trackLabels = useMemo(
    () =>
      Object.fromEntries(
        trackSummaries.map((track) => [
          track.id,
          `${track.label} · ${track.count}`,
        ]),
      ),
    [trackSummaries],
  );
  const [activeTag, setActiveTag] = useQueryFilter({
    param: "tag",
    allowedValues: tags,
  });
  const [activeLanguage, setActiveLanguage] = useQueryFilter({
    param: "language",
    allowedValues: languages,
  });
  const [activeTrack, setActiveTrack] = useQueryFilter({
    param: "track",
    allowedValues: trackIds,
  });
  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
        const matchesLanguage = activeLanguage === "All" || post.language === activeLanguage;
        const matchesTrack = activeTrack === "All" || intentToTrack[post.intent] === activeTrack;

        return matchesTag && matchesLanguage && matchesTrack;
      }),
    [activeLanguage, activeTag, activeTrack, posts],
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
      <div className="writing-track-grid" aria-label="Writing tracks">
        {trackSummaries.map((track) => (
          <button
            type="button"
            key={track.id}
            className={activeTrack === track.id ? "active" : ""}
            data-testid={`writing-track-${track.id}`}
            aria-pressed={activeTrack === track.id}
            onClick={() => setActiveTrack(activeTrack === track.id ? "All" : track.id)}
          >
            <span>{track.shortLabel}</span>
            <strong>{track.label}</strong>
            <small>{track.count} essays</small>
            <p>{track.description}</p>
          </button>
        ))}
      </div>
      <FilterBar
        label="Filter writing track"
        active={activeTrack}
        items={["All", ...trackIds]}
        displayLabels={{ All: "All tracks", ...trackLabels }}
        onChange={setActiveTrack}
        resultCount={filtered.length}
        totalCount={posts.length}
        noun="essays"
      />
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
  const [activeTag, setActiveTag] = useQueryFilter({
    param: "stack",
    allowedValues: tags,
  });
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
