import { readFileSync, readdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";
import vm from "node:vm";

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function extractBalanced(source, startIndex, openChar, closeChar) {
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) {
      depth += 1;
    }

    if (char === closeChar) {
      depth -= 1;

      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  throw new Error(`Could not find balanced ${openChar}${closeChar} block`);
}

function evaluateLiteral(source, label, context = {}) {
  try {
    return vm.runInNewContext(`(${source})`, context, {
      timeout: 1000,
      displayErrors: true,
    });
  } catch (error) {
    throw new Error(`Could not parse ${label}: ${error.message}`);
  }
}

function extractExportLiteral(path, exportName, openChar, closeChar, context = {}) {
  const source = read(path);
  const marker = `export const ${exportName}`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`${path} does not export ${exportName}`);
  }

  const assignmentIndex = source.indexOf("=", markerIndex);
  const valueStart = source.indexOf(openChar, assignmentIndex);

  return evaluateLiteral(
    extractBalanced(source, valueStart, openChar, closeChar),
    `${path}:${exportName}`,
    context,
  );
}

function extractExportString(path, exportName) {
  const source = read(path);
  const marker = `export const ${exportName}`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`${path} does not export ${exportName}`);
  }

  const assignmentIndex = source.indexOf("=", markerIndex);
  const semicolonIndex = source.indexOf(";", assignmentIndex);

  return evaluateLiteral(source.slice(assignmentIndex + 1, semicolonIndex), `${path}:${exportName}`);
}

function extractMeta(path) {
  const source = read(path);
  const marker = "export const meta =";
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`${path} does not export meta`);
  }

  const objectStart = source.indexOf("{", markerIndex);
  return evaluateLiteral(extractBalanced(source, objectStart, "{", "}"), path);
}

function listContentMeta(dir) {
  return readdirSync(join(root, dir))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => extractMeta(join(dir, file)))
    .sort((a, b) => (b.date ?? b.year).localeCompare(a.date ?? a.year));
}

const iconContext = {
  Blocks: "Blocks",
  Braces: "Braces",
  Compass: "Compass",
  Layers3: "Layers3",
  MessageSquare: "MessageSquare",
  PenTool: "PenTool",
  Radar: "Radar",
};

const posts = listContentMeta("src/content/posts");
const projects = listContentMeta("src/content/projects");
const knowledgeEntries = extractExportLiteral("src/data/knowledge.ts", "knowledgeEntries", "[", "]");
const useTools = extractExportLiteral("src/data/uses.ts", "useTools", "[", "]");
const useWorkflows = extractExportLiteral("src/data/uses.ts", "useWorkflows", "[", "]");
const labComponents = extractExportLiteral("src/data/lab.ts", "labComponents", "[", "]");
const labExperiments = extractExportLiteral("src/data/lab.ts", "labExperiments", "[", "]");
const aboutIntro = extractExportString("src/data/about.ts", "aboutIntro");
const aboutProfile = extractExportLiteral("src/data/about.ts", "aboutProfile", "{", "}", {
  aboutIntro,
});
const aboutPrinciples = extractExportLiteral(
  "src/data/about.ts",
  "aboutPrinciples",
  "[",
  "]",
  iconContext,
);
const aboutTimeline = extractExportLiteral("src/data/about.ts", "aboutTimeline", "[", "]");
const aboutCapabilities = extractExportLiteral(
  "src/data/about.ts",
  "aboutCapabilities",
  "[",
  "]",
  iconContext,
);
const photos = extractExportLiteral("src/data/media.ts", "photos", "[", "]");
const tracks = extractExportLiteral("src/data/media.ts", "tracks", "[", "]");
const creativeIdeas = extractExportLiteral("src/data/collaboration.ts", "creativeIdeas", "[", "]");

const quickActions = [
  ["action-home", "action", "Open studio home", "Return to the first viewport and workbench.", "/", "Home", ["home", "studio", "workbench"]],
  ["action-writing", "action", "Browse writing", "Open the full essay archive.", "/blog", "Archive", ["blog", "writing", "essays"]],
  ["action-projects", "action", "View selected work", "Open project case studies and systems work.", "/projects", "Portfolio", ["projects", "work", "case study"]],
  ["action-about", "about", "Meet Ray", "Open the studio profile, principles, timeline, and contact routes.", "/about", aboutProfile.role, ["about", "profile", "principles", "timeline", "capabilities"]],
  ["action-uses", "uses", "Open uses", "Browse the studio tools, workflows, and publishing pipeline.", "/uses", `${useTools.length} tools`, ["uses", "tools", "stack", "workflow", "setup"]],
  ["action-knowledge", "knowledge", "Browse knowledge", "Open the public memory layer for patterns, snippets, and decisions.", "/knowledge", `${knowledgeEntries.length} entries`, ["knowledge", "notes", "snippets", "references", "decisions"]],
  ["action-lab", "lab", "Open component lab", "Browse reusable patterns, interaction proofs, and quality gates.", "/lab", `${labComponents.length} components`, ["lab", "components", "registry", "patterns", "quality"]],
  ["action-photos", "photo", "Open photos", "Browse the studio visual memory layer.", "/photos", `${photos.length} frames`, ["photos", "media", "gallery", "lightbox"]],
  ["action-music", "music", "Play studio mix", "Open the current writing and refactoring mix.", "/music", `${tracks.length} tracks`, ["music", "mix", "player", "now playing"]],
  ["action-contact", "contact", "Open contact routes", "Open the public contact routes, brief template, and project discussion path.", "/contact", "Routes", ["contact", "github", "issues", "about", "route", "brief"]],
  ["action-collaboration", "collaboration", "Read collaboration guide", "Open contribution flow, governance surfaces, creative audit, and idea backlog.", "/collaboration", "Governance", ["collaboration", "contributing", "governance", "ideas", "creative", "review"]],
  ["action-writing-chinese", "action", "Open Chinese writing", "Open the writing archive filtered to Chinese product memory and phase notes.", "/blog?language=%E4%B8%AD%E6%96%87", "Query", ["中文", "Chinese", "writing", "language", "blog", "query", "filter"]],
  ["action-writing-product-systems", "action", "Open Product Systems essays", "Open writing filtered to product systems and durable studio decisions.", "/blog?tag=Product+Systems", "Query", ["Product Systems", "writing", "blog", "query", "filter", "systems"]],
  ["action-knowledge-decisions", "action", "Open Decision knowledge", "Open knowledge entries that record durable product and architecture decisions.", "/knowledge?kind=Decision", "Query", ["knowledge", "decision", "query", "filter", "IA", "architecture"]],
  ["action-projects-github", "action", "Open GitHub-backed projects", "Open project case studies filtered to GitHub-backed implementation work.", "/projects?stack=GitHub", "Query", ["projects", "GitHub", "work", "query", "filter", "source"]],
].map(([id, kind, title, description, href, meta, keywords]) => ({
  id,
  kind,
  title,
  description,
  href,
  meta,
  keywords,
}));

const items = [
  ...quickActions,
  ...posts.map((post) => ({
    id: `post-${post.slug}`,
    kind: "post",
    title: post.title,
    description: post.summary,
    href: `/blog/${post.slug}`,
    meta: post.readingTime,
    keywords: post.tags,
  })),
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    kind: "project",
    title: project.title,
    description: project.summary,
    href: `/projects/${project.slug}`,
    meta: project.status,
    keywords: project.stack,
  })),
  ...knowledgeEntries.map((entry) => ({
    id: `knowledge-${entry.slug}`,
    kind: "knowledge",
    title: entry.title,
    description: entry.summary,
    href: `/knowledge/${entry.slug}`,
    meta: entry.kind,
    keywords: [entry.kind, entry.status, entry.source, ...entry.tags],
  })),
  ...useTools.map((tool) => ({
    id: `uses-${tool.slug}`,
    kind: "uses",
    title: tool.name,
    description: tool.description,
    href: `/uses#${tool.slug}`,
    meta: tool.category,
    keywords: [tool.category, tool.role, tool.signal],
  })),
  ...useWorkflows.map((workflow) => ({
    id: `uses-workflow-${workflow.step}`,
    kind: "uses",
    title: workflow.title,
    description: workflow.description,
    href: "/uses#workspace-rhythm",
    meta: "Workflow",
    keywords: ["uses", "workflow", "rhythm", workflow.time],
  })),
  ...labComponents.map((component) => ({
    id: `lab-${component.slug}`,
    kind: "lab",
    title: component.name,
    description: component.description,
    href: `/lab#${component.slug}`,
    meta: component.status,
    keywords: ["lab", component.category, component.component, component.source, ...component.reusableFor],
  })),
  ...labExperiments.map((experiment) => ({
    id: `lab-experiment-${experiment.step}`,
    kind: "lab",
    title: experiment.title,
    description: experiment.description,
    href: "/lab#lab-experiment-title",
    meta: experiment.status,
    keywords: ["lab", "experiment", experiment.status],
  })),
  ...aboutPrinciples.map((principle) => ({
    id: `about-principle-${principle.slug}`,
    kind: "about",
    title: principle.title,
    description: principle.summary,
    href: "/about#principles",
    meta: "Principle",
    keywords: ["about", "principle", principle.accent],
  })),
  ...aboutTimeline.map((item) => ({
    id: `about-timeline-${item.year}`,
    kind: "about",
    title: item.title,
    description: item.detail,
    href: "/about#timeline",
    meta: item.year,
    keywords: ["about", "timeline", item.role],
  })),
  ...aboutCapabilities.map((capability) => ({
    id: `about-capability-${capability.name}`,
    kind: "about",
    title: capability.name,
    description: capability.proof,
    href: "/about#capabilities",
    meta: capability.label,
    keywords: ["about", "capability", capability.label],
  })),
  ...photos
    .filter((photo) => photo.featured)
    .map((photo) => ({
      id: `photo-${photo.slug}`,
      kind: "photo",
      title: photo.title,
      description: photo.story,
      href: "/photos",
      meta: photo.mood,
      keywords: photo.tags,
    })),
  ...creativeIdeas.map((idea) => ({
    id: `creative-${idea.slug}`,
    kind: "collaboration",
    title: idea.title,
    description: idea.description,
    href: `/collaboration#${idea.slug}`,
    meta: idea.priority,
    keywords: ["collaboration", "creative", "idea", idea.category, idea.priority],
  })),
];

const json = JSON.stringify({ schemaVersion: 1, count: items.length, items });
const kindCounts = items.reduce((counts, item) => {
  counts[item.kind] = (counts[item.kind] ?? 0) + 1;
  return counts;
}, {});
const keywordBytes = Buffer.byteLength(JSON.stringify(items.flatMap((item) => item.keywords)));
const htmlCarriesIndex = read("src/app/layout.tsx").includes("getCommandItems()");
const report = {
  generatedAt: new Date().toISOString(),
  itemCount: items.length,
  kindCounts,
  estimatedJsonBytes: Buffer.byteLength(json),
  estimatedGzipBytes: gzipSync(json).length,
  keywordBytes,
  firstScreenCarriesCommandIndex: htmlCarriesIndex,
  route: "/command-index.json",
  recommendation:
    items.length > 120 || Buffer.byteLength(json) > 50000
      ? "懒加载已是必要项；继续观察是否需要服务端搜索。"
      : "当前规模适合按需加载 JSON；暂不需要复杂搜索服务。",
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("Command index report");
  console.log(`- items: ${report.itemCount}`);
  console.log(`- estimated JSON: ${report.estimatedJsonBytes} bytes`);
  console.log(`- estimated gzip: ${report.estimatedGzipBytes} bytes`);
  console.log(`- keyword bytes: ${report.keywordBytes} bytes`);
  console.log(`- first screen carries index: ${report.firstScreenCarriesCommandIndex ? "yes" : "no"}`);
  console.log("- kind distribution:");
  Object.entries(kindCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([kind, count]) => console.log(`  - ${kind}: ${count}`));
  console.log(`- recommendation: ${report.recommendation}`);
}
