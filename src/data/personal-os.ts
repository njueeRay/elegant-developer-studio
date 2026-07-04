import type { LucideIcon } from "lucide-react";
import {
  BookOpenText,
  Bot,
  Boxes,
  GitBranch,
  Headphones,
  MessageSquareText,
  PenLine,
  Radio,
  Route,
} from "lucide-react";

export type PulseTone = "rust" | "blue" | "sage" | "ink";

export type StudioPulseItem = {
  id: string;
  label: string;
  title: string;
  detail: string;
  meta: string;
  href: string;
  source: string;
  command: string;
  tone: PulseTone;
  icon: LucideIcon;
};

export type AskPrompt = {
  id: string;
  label: string;
  command: string;
  response: string;
  href: string;
};

export type PersonalOsZooItem = {
  name: string;
  role: string;
  transfer: string;
  source: string;
  target: string;
  status: "Adopted" | "Prototype" | "Guardrail";
  command: string;
};

export type PersonalOsFlaw = {
  name: string;
  symptom: string;
  correction: string;
  status: "Fixed" | "Accepted guardrail";
};

export const studioPulseItems: StudioPulseItem[] = [
  {
    id: "writing",
    label: "Writing",
    title: "Interface notes",
    detail: "Long-form essays, Chinese product memory, and reading paths that should stay useful.",
    meta: "MDX / Blog / Knowledge",
    href: "/blog",
    source: "src/content/posts",
    command: 'studio.pulse("writing")',
    tone: "rust",
    icon: PenLine,
  },
  {
    id: "building",
    label: "Building",
    title: "Evidence-backed portfolio",
    detail: "Project pages now carry Evidence Pack links instead of relying on polished prose.",
    meta: "Phase 23 / Project Evidence",
    href: "/projects/lumen#project-evidence-title",
    source: "src/content/projects",
    command: 'studio.pulse("building")',
    tone: "blue",
    icon: GitBranch,
  },
  {
    id: "knowledge",
    label: "Knowledge",
    title: "Public memory graph",
    detail: "Knowledge nodes link back to writing, projects, source files, and Feishu phase records.",
    meta: "Knowledge / Feishu / Source",
    href: "/knowledge",
    source: "src/data/knowledge.ts",
    command: 'studio.pulse("knowledge")',
    tone: "sage",
    icon: BookOpenText,
  },
  {
    id: "listening",
    label: "Listening",
    title: "Focus mix",
    detail: "A quiet media layer keeps atmosphere present without turning the page into a player.",
    meta: "Music / MiniPlayer",
    href: "/music",
    source: "src/data/media.ts",
    command: 'studio.pulse("listening")',
    tone: "ink",
    icon: Headphones,
  },
];

export const askPrompts: AskPrompt[] = [
  {
    id: "how-built",
    label: "这个站怎么构建的？",
    command: 'ask.ray("how-built")',
    response:
      "Next.js + MDX + typed registries. The real system is the trace loop: route, source, docs, tests, deploy, and Feishu records move together.",
    href: "/lab",
  },
  {
    id: "recent-work",
    label: "最近在做什么？",
    command: 'ask.ray("recent-work")',
    response:
      "The current direction is Personal OS without dashboard gravity: writing, projects, knowledge, media, and source-backed evidence stay alive but restrained.",
    href: "/projects",
  },
  {
    id: "recommend",
    label: "推荐一个入口",
    command: 'ask.ray("recommend")',
    response:
      "Start with Knowledge for system logic, Blog for thinking style, Projects for proof, and Lab for reusable interface pieces.",
    href: "/knowledge",
  },
];

export const personalOsZooItems: PersonalOsZooItem[] = [
  {
    name: "StudioPulse",
    role: "Current state layer",
    transfer: "Borrow the live-status grammar from ursb.me, but keep only four source-backed studio loops.",
    source: "ursb.me status + data cards",
    target: "Home / About / Lab",
    status: "Adopted",
    command: "studio.pulse()",
  },
  {
    name: "AskMeTerminal",
    role: "Guided personal query",
    transfer: "Use prompt chips and a terminal-like response to expose site logic without a full AI chat surface.",
    source: "ursb.me intro chat",
    target: "Home / Contact / Lab",
    status: "Prototype",
    command: "ask.ray()",
  },
  {
    name: "DataSourceBadge",
    role: "Provenance cue",
    transfer: "Every personal OS module should show where its content comes from and where it can be inspected.",
    source: "ursb.me Data from ... pattern",
    target: "Projects / Knowledge / Uses",
    status: "Adopted",
    command: "source.trace()",
  },
  {
    name: "TerminalObjectList",
    role: "Developer object list",
    transfer: "Use command strings and compact rows for object lists, not decorative fake terminals.",
    source: "ursb.me command rows",
    target: "Lab / Blog / Knowledge",
    status: "Prototype",
    command: "object.list()",
  },
  {
    name: "DensityGuardrail",
    role: "Anti-dashboard rule",
    transfer: "Personal data is allowed only when it opens a real route, source, or decision.",
    source: "learn-any-uiux flaw ledger",
    target: "Project map / Design system",
    status: "Guardrail",
    command: "guard.density()",
  },
];

export const personalOsFlaws: PersonalOsFlaw[] = [
  {
    name: "Dashboard gravity",
    symptom: "The homepage could copy 20+ cards and lose the elegant studio posture.",
    correction: "Limit Phase 24.5 to Studio Pulse, Ask Me Terminal, and a Lab zoo.",
    status: "Fixed",
  },
  {
    name: "Fake terminal decoration",
    symptom: "Code-like UI can become style without function.",
    correction: "Every command string must either navigate, explain, copy, or reveal provenance.",
    status: "Accepted guardrail",
  },
  {
    name: "Cute-only interaction",
    symptom: "A pet or playful object can distract from writing and project evidence.",
    correction: "Prototype playful objects in Lab before putting them above the fold.",
    status: "Accepted guardrail",
  },
];

export const personalOsSignals = [
  {
    label: "Objects",
    value: personalOsZooItems.length.toString(),
    icon: Boxes,
  },
  {
    label: "Prompts",
    value: askPrompts.length.toString(),
    icon: MessageSquareText,
  },
  {
    label: "Routes",
    value: "4",
    icon: Route,
  },
  {
    label: "Live posture",
    value: "Calm",
    icon: Radio,
  },
  {
    label: "AI boundary",
    value: "Guided",
    icon: Bot,
  },
] as const;
