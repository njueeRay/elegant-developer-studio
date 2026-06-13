export type UseCategory = "Design" | "Code" | "Writing" | "Automation";

export type UseTool = {
  slug: string;
  name: string;
  category: UseCategory;
  role: string;
  description: string;
  shortcut: string;
  signal: string;
};

export type UseWorkflow = {
  step: string;
  time: string;
  title: string;
  description: string;
  key: string;
};

export type PipelineStep = {
  title: string;
  detail: string;
};

export const useTools: UseTool[] = [
  {
    slug: "nextjs",
    name: "Next.js",
    category: "Code",
    role: "React framework",
    description: "The default surface for fast editorial pages, MDX routes, and production deploys.",
    shortcut: "N",
    signal: "App Router / Metadata / Static routes",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "Code",
    role: "Language",
    description: "Keeps content models, component props, and route contracts legible as the studio grows.",
    shortcut: "T",
    signal: "Strict enough for structure, light enough for iteration",
  },
  {
    slug: "mdx",
    name: "MDX",
    category: "Writing",
    role: "Content format",
    description: "Turns essays, project notes, and technical examples into versioned source files.",
    shortcut: "M",
    signal: "Portable writing with code-native components",
  },
  {
    slug: "vercel",
    name: "Vercel",
    category: "Automation",
    role: "Deployment",
    description: "Production previews, deploy history, and a tight feedback loop from commit to public URL.",
    shortcut: "V",
    signal: "Small releases, traceable deployments",
  },
  {
    slug: "figma",
    name: "Figma",
    category: "Design",
    role: "Interface design",
    description: "Used for visual direction, component thinking, and sharpening page-level intent.",
    shortcut: "F",
    signal: "Design before density",
  },
  {
    slug: "raycast",
    name: "Raycast",
    category: "Automation",
    role: "Launcher",
    description: "The command layer for quicklinks, scripts, clipboard, windows, and project jumps.",
    shortcut: "R",
    signal: "Keyboard-first access to repeated moves",
  },
  {
    slug: "cursor",
    name: "Cursor",
    category: "Code",
    role: "AI code editor",
    description: "A focused place for code edits, refactors, and local reasoning over the repo.",
    shortcut: "C",
    signal: "Agentic coding with local context",
  },
  {
    slug: "linear",
    name: "Linear",
    category: "Automation",
    role: "Issue tracking",
    description: "A model for calm planning, clear status, and lightweight operational surfaces.",
    shortcut: "L",
    signal: "Status without dashboard noise",
  },
  {
    slug: "github",
    name: "GitHub",
    category: "Code",
    role: "Source control",
    description: "The trace layer for commits, issues, milestones, and release decisions.",
    shortcut: "G",
    signal: "Every meaningful change gets provenance",
  },
  {
    slug: "feishu",
    name: "Feishu",
    category: "Writing",
    role: "Knowledge cloud",
    description: "Cloud reading, comments, project maps, and phase reviews synced from local Markdown.",
    shortcut: "D",
    signal: "Local source of truth, cloud collaboration layer",
  },
  {
    slug: "playwright",
    name: "Playwright",
    category: "Automation",
    role: "Browser QA",
    description: "Used for rendered checks, screenshots, interaction proof, and responsive validation.",
    shortcut: "P",
    signal: "Trust the browser, not just the build",
  },
  {
    slug: "openai",
    name: "OpenAI",
    category: "Design",
    role: "Concept partner",
    description: "Supports visual concepting, product reasoning, writing synthesis, and implementation reviews.",
    shortcut: "O",
    signal: "Use AI to clarify taste, not to hide weak structure",
  },
];

export const useWorkflows: UseWorkflow[] = [
  {
    step: "01",
    time: "09:00 - 12:00",
    title: "Deep work",
    description: "Write, design, or code before messages reshape the day.",
    key: "1",
  },
  {
    step: "02",
    time: "12:00 - 13:00",
    title: "Sync and respond",
    description: "Review comments, GitHub issues, Feishu notes, and small decisions.",
    key: "2",
  },
  {
    step: "03",
    time: "13:00 - 17:00",
    title: "Build and iterate",
    description: "Ship focused increments with visible QA and deploy traces.",
    key: "3",
  },
  {
    step: "04",
    time: "17:00 - 18:00",
    title: "Capture and close",
    description: "Update the project map, record the next slice, and leave clean trails.",
    key: "4",
  },
];

export const pipelineSteps: PipelineStep[] = [
  { title: "Idea", detail: "Knowledge / Feishu" },
  { title: "Draft", detail: "MDX / Figma" },
  { title: "Build", detail: "Next.js / TypeScript" },
  { title: "Review", detail: "Playwright / GitHub" },
  { title: "Deploy", detail: "Vercel / Trace" },
];

export function getUseCategories(tools: UseTool[]) {
  return Array.from(new Set(tools.map((tool) => tool.category)));
}
