import type { PostMeta } from "@/lib/content";

export type WritingTrackId =
  | "product-judgment"
  | "design-engineering"
  | "deployment-automation"
  | "ai-collaboration";

export type WritingTrack = {
  id: WritingTrackId;
  label: string;
  shortLabel: string;
  description: string;
  promise: string;
};

export type CitationGuide = {
  label: string;
  command: string;
  items: string[];
};

export const writingTracks: WritingTrack[] = [
  {
    id: "product-judgment",
    label: "产品判断",
    shortLabel: "Judgment",
    description: "关于取舍、可信度、作品集证据和个人主页定位的判断。",
    promise: "帮助后续 PRD、飞书评论、路线图和阶段复盘快速引用判断依据。",
  },
  {
    id: "design-engineering",
    label: "设计工程",
    shortLabel: "Design engineering",
    description: "关于界面承诺、命令交互、阅读体验和组件系统的设计工程笔记。",
    promise: "把 UI/UX 选择和实现约束放在同一个阅读路径里。",
  },
  {
    id: "deployment-automation",
    label: "部署与自动化",
    shortLabel: "Automation",
    description: "关于 RayNode、证据生成、质量门禁和可追溯发布的工程复盘。",
    promise: "让部署、验证和证据不再是聊天记录里的隐性知识。",
  },
  {
    id: "ai-collaboration",
    label: "AI 协作",
    shortLabel: "AI collaboration",
    description: "关于 agent handoff、Profile infrastructure 和长期协作记忆的系统思考。",
    promise: "让 AI 协作从上下文依赖变成可恢复、可审查、可复用的工作流。",
  },
];

export const writingIntents = [
  "AI 协作复盘",
  "Product teardown",
  "Systems essay",
  "Portfolio systems",
  "产品记忆",
  "Interaction note",
  "Interaction design",
  "Product judgment",
  "Design case study",
  "产品审计",
  "Design principle",
  "Developer tooling",
  "工程复盘",
];

export const intentToTrack: Record<string, WritingTrackId> = {
  "AI 协作复盘": "ai-collaboration",
  "Developer tooling": "ai-collaboration",
  "Product teardown": "design-engineering",
  "Systems essay": "design-engineering",
  "Interaction note": "design-engineering",
  "Interaction design": "design-engineering",
  "Design case study": "design-engineering",
  "Design principle": "design-engineering",
  "Portfolio systems": "product-judgment",
  "产品记忆": "product-judgment",
  "Product judgment": "product-judgment",
  "产品审计": "product-judgment",
  "工程复盘": "deployment-automation",
};

export const citationGuides: Record<"English" | "中文", CitationGuide> = {
  English: {
    label: "Technical context",
    command: 'read.context("technical")',
    items: ["Source notes", "Component decisions", "API / route contracts", "Implementation review"],
  },
  中文: {
    label: "适合引用到哪里",
    command: 'read.context("zh-reference")',
    items: ["飞书阶段复盘", "GitHub issue", "PR 说明", "路线图审查"],
  },
};

export function getWritingTrackForIntent(intent: string) {
  return writingTracks.find((track) => track.id === intentToTrack[intent]) ?? writingTracks[0];
}

export function getCitationGuide(language: PostMeta["language"]) {
  return citationGuides[language];
}

export function getWritingTrackSummaries(posts: PostMeta[]) {
  return writingTracks.map((track) => {
    const trackPosts = posts.filter((post) => intentToTrack[post.intent] === track.id);

    return {
      ...track,
      count: trackPosts.length,
      latestPost: trackPosts[0],
    };
  });
}
