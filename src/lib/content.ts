import type { ComponentType } from "react";
import InterfacePromiseContent, {
  meta as interfacePromiseMeta,
} from "@/content/posts/interface-is-a-promise.mdx";
import CalmSystemsContent, {
  meta as calmSystemsMeta,
} from "@/content/posts/calm-systems-for-creative-work.mdx";
import CommandsAttentionContent, {
  meta as commandsAttentionMeta,
} from "@/content/posts/commands-that-respect-attention.mdx";
import ChineseProductMemoryContent, {
  meta as chineseProductMemoryMeta,
} from "@/content/posts/chinese-as-product-memory.mdx";
import RaynodeStandaloneDeploymentContent, {
  meta as raynodeStandaloneDeploymentMeta,
} from "@/content/posts/raynode-standalone-deployment.mdx";
import HomepageTruthSourceAuditContent, {
  meta as homepageTruthSourceAuditMeta,
} from "@/content/posts/homepage-truth-source-audit.mdx";
import AgentHandoffLoopContent, {
  meta as agentHandoffLoopMeta,
} from "@/content/posts/agent-handoff-loop.mdx";
import EvidenceWithoutPrecisionTheaterContent, {
  meta as evidenceWithoutPrecisionTheaterMeta,
} from "@/content/posts/evidence-without-precision-theater.mdx";
import DesigningCommandSurfacesContent, {
  meta as designingCommandSurfacesMeta,
} from "@/content/posts/designing-command-surfaces.mdx";
import HomepageDensityCaseStudyContent, {
  meta as homepageDensityCaseStudyMeta,
} from "@/content/posts/homepage-density-case-study.mdx";
import ExternalProofContent, {
  meta as externalProofMeta,
} from "@/content/posts/external-proof-over-portfolio-theater.mdx";
import AnyReaderTeardownContent, {
  meta as anyReaderTeardownMeta,
} from "@/content/posts/anyreader-deep-reading-interface-teardown.mdx";
import OpenProfileInfrastructureContent, {
  meta as openProfileInfrastructureMeta,
} from "@/content/posts/openprofile-as-agentic-profile-infrastructure.mdx";
import CaseStudyDiffContent, {
  meta as caseStudyDiffMeta,
} from "@/content/posts/case-study-diff-as-portfolio-format.mdx";
import UrsbObjectGrammarContent, {
  meta as ursbObjectGrammarMeta,
} from "@/content/posts/ursb-personal-site-object-grammar.mdx";
import OpenProfileContent, {
  meta as openProfileMeta,
} from "@/content/projects/openprofile-agent-workflow.mdx";
import AnyReaderProjectContent, {
  meta as anyReaderProjectMeta,
} from "@/content/projects/anyreader-interface-teardown.mdx";
import LumenContent, { meta as lumenMeta } from "@/content/projects/lumen.mdx";
import StudioKnowledgeContent, {
  meta as studioKnowledgeMeta,
} from "@/content/projects/studio-knowledge-base.mdx";
import CodexFeishuBridgeContent, {
  meta as codexFeishuBridgeMeta,
} from "@/content/projects/codex-feishu-bridge.mdx";

type MDXContent = ComponentType<Record<string, never>>;

export type TocItem = {
  id: string;
  title: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  updated: string;
  status: "Draft" | "Published";
  readingTime: string;
  language: "English" | "中文";
  intent: string;
  tags: string[];
  featured: boolean;
  summary: string;
  toc: TocItem[];
  relatedPostSlugs: string[];
  relatedKnowledgeSlugs: string[];
  relatedProjectSlugs: string[];
};

export type ProjectMeta = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  status: "Active" | "Shipped" | "Archived";
  role: string;
  stack: string[];
  href: string;
  externalUrl: string;
  repo: string;
  image: string;
  summary: string;
  impact: string[];
  evidencePack: Array<{
    type: "source" | "deployment" | "document" | "test" | "screenshot" | "metric" | "decision";
    priority: number;
    proofRole: "Primary" | "Supporting" | "Context";
    label: string;
    detail: string;
    why: string;
    href: string;
    source: string;
    route?: string;
    commit?: string;
    deploymentId?: string;
    screenshot?: string;
    metric?: string;
    verifiedBy?: string;
    verifiedAt?: string;
  }>;
  caseStudyDiff: Array<{
    before: string;
    after: string;
    proof: string;
    evidenceHref?: string;
  }>;
  featured: boolean;
};

export type Post = PostMeta & {
  kind: "post";
  Content: MDXContent;
};

export type Project = ProjectMeta & {
  kind: "project";
  Content: MDXContent;
};

const posts: Post[] = [
  {
    ...(ursbObjectGrammarMeta as PostMeta),
    kind: "post" as const,
    Content: UrsbObjectGrammarContent,
  },
  {
    ...(externalProofMeta as PostMeta),
    kind: "post" as const,
    Content: ExternalProofContent,
  },
  {
    ...(anyReaderTeardownMeta as PostMeta),
    kind: "post" as const,
    Content: AnyReaderTeardownContent,
  },
  {
    ...(openProfileInfrastructureMeta as PostMeta),
    kind: "post" as const,
    Content: OpenProfileInfrastructureContent,
  },
  {
    ...(caseStudyDiffMeta as PostMeta),
    kind: "post" as const,
    Content: CaseStudyDiffContent,
  },
  {
    ...(raynodeStandaloneDeploymentMeta as PostMeta),
    kind: "post" as const,
    Content: RaynodeStandaloneDeploymentContent,
  },
  {
    ...(homepageTruthSourceAuditMeta as PostMeta),
    kind: "post" as const,
    Content: HomepageTruthSourceAuditContent,
  },
  {
    ...(agentHandoffLoopMeta as PostMeta),
    kind: "post" as const,
    Content: AgentHandoffLoopContent,
  },
  {
    ...(evidenceWithoutPrecisionTheaterMeta as PostMeta),
    kind: "post" as const,
    Content: EvidenceWithoutPrecisionTheaterContent,
  },
  {
    ...(designingCommandSurfacesMeta as PostMeta),
    kind: "post" as const,
    Content: DesigningCommandSurfacesContent,
  },
  {
    ...(homepageDensityCaseStudyMeta as PostMeta),
    kind: "post" as const,
    Content: HomepageDensityCaseStudyContent,
  },
  {
    ...(chineseProductMemoryMeta as PostMeta),
    kind: "post" as const,
    Content: ChineseProductMemoryContent,
  },
  {
    ...(interfacePromiseMeta as PostMeta),
    kind: "post" as const,
    Content: InterfacePromiseContent,
  },
  {
    ...(calmSystemsMeta as PostMeta),
    kind: "post" as const,
    Content: CalmSystemsContent,
  },
  {
    ...(commandsAttentionMeta as PostMeta),
    kind: "post" as const,
    Content: CommandsAttentionContent,
  },
].sort((a, b) => b.date.localeCompare(a.date));

const projects: Project[] = [
  {
    ...(openProfileMeta as ProjectMeta),
    kind: "project" as const,
    Content: OpenProfileContent,
  },
  {
    ...(anyReaderProjectMeta as ProjectMeta),
    kind: "project" as const,
    Content: AnyReaderProjectContent,
  },
  {
    ...(codexFeishuBridgeMeta as ProjectMeta),
    kind: "project" as const,
    Content: CodexFeishuBridgeContent,
  },
  { ...(lumenMeta as ProjectMeta), kind: "project" as const, Content: LumenContent },
  {
    ...(studioKnowledgeMeta as ProjectMeta),
    kind: "project" as const,
    Content: StudioKnowledgeContent,
  },
].sort((a, b) => b.year.localeCompare(a.year));

function toPostMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    date: post.date,
    updated: post.updated,
    status: post.status,
    readingTime: post.readingTime,
    language: post.language,
    intent: post.intent,
    tags: post.tags,
    featured: post.featured,
    summary: post.summary,
    toc: post.toc,
    relatedPostSlugs: post.relatedPostSlugs,
    relatedKnowledgeSlugs: post.relatedKnowledgeSlugs,
    relatedProjectSlugs: post.relatedProjectSlugs,
  };
}

function toProjectMeta(project: Project): ProjectMeta {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    year: project.year,
    status: project.status,
    role: project.role,
    stack: project.stack,
    href: project.href,
    externalUrl: project.externalUrl,
    repo: project.repo,
    image: project.image,
    summary: project.summary,
    impact: project.impact,
    evidencePack: project.evidencePack,
    caseStudyDiff: project.caseStudyDiff,
    featured: project.featured,
  };
}

export function getAllPosts() {
  return posts;
}

export function getAllPostMeta(): PostMeta[] {
  return posts.map(toPostMeta);
}

export function getFeaturedPosts(limit = 2) {
  return getAllPostMeta().filter((post) => post.featured).slice(0, limit);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAllProjects() {
  return projects;
}

export function getAllProjectMeta(): ProjectMeta[] {
  return projects.map(toProjectMeta);
}

export function getFeaturedProjects(limit = 2) {
  return getAllProjectMeta()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAllTags(items: Array<{ tags?: string[]; stack?: string[] }>) {
  const tags = items.flatMap((item) => item.tags ?? item.stack ?? []);
  return Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
