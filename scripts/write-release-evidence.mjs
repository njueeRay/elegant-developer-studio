import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const outputPath = join(root, "public/release-evidence.json");
const staticRoutes = [
  "/",
  "/about",
  "/blog",
  "/command-index.json",
  "/collaboration",
  "/contact",
  "/health.json",
  "/knowledge",
  "/lab",
  "/music",
  "/photos",
  "/projects",
  "/release-evidence.json",
  "/robots.txt",
  "/rss.xml",
  "/sitemap.xml",
  "/uses",
];

function run(command, args) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

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

function evaluateObjectLiteral(source, label) {
  try {
    return vm.runInNewContext(`(${source})`, Object.create(null), {
      timeout: 1000,
      displayErrors: true,
    });
  } catch (error) {
    throw new Error(`Could not parse ${label}: ${error.message}`);
  }
}

function extractMeta(path) {
  const source = read(path);
  const marker = "export const meta =";
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`${path} does not export meta`);
  }

  const objectStart = source.indexOf("{", markerIndex);
  return evaluateObjectLiteral(extractBalanced(source, objectStart, "{", "}"), path);
}

function extractKnowledgeEntries() {
  const source = read("src/data/knowledge.ts");
  const marker = "export const knowledgeEntries";
  const markerIndex = source.indexOf(marker);
  const assignmentIndex = source.indexOf("=", markerIndex);
  const arrayStart = source.indexOf("[", assignmentIndex);

  return evaluateObjectLiteral(
    extractBalanced(source, arrayStart, "[", "]"),
    "src/data/knowledge.ts",
  );
}

function listContentMeta(dir) {
  return readdirSync(join(root, dir))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => extractMeta(join(dir, file)));
}

function hasArg(name) {
  return process.argv.includes(name);
}

function qualityStatus(id) {
  if (!hasArg("--local-quality-passed")) {
    return "pending";
  }

  return ["content-relations", "lint", "build"].includes(id) ? "passed" : "pending";
}

const packageJson = JSON.parse(read("package.json"));
const posts = listContentMeta("src/content/posts");
const projects = listContentMeta("src/content/projects");
const knowledgeEntries = extractKnowledgeEntries();
const commitSha = run("git", ["rev-parse", "--short", "HEAD"]);
const fullCommitSha = run("git", ["rev-parse", "HEAD"]);
const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
const builtAt = new Date().toISOString();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://raynode.me";
const previewUrl = "https://elegant-developer-studio.vercel.app";
const repositoryUrl = "https://github.com/njueeRay/elegant-developer-studio";
const dynamicRoutes = [
  ...posts.map((post) => `/blog/${post.slug}`),
  ...projects.map((project) => `/projects/${project.slug}`),
  ...knowledgeEntries.map((entry) => `/knowledge/${entry.slug}`),
];
const publicRoutes = [...staticRoutes, ...dynamicRoutes].sort();

const evidence = {
  schemaVersion: 1,
  channel: "raynode",
  siteUrl,
  previewUrl,
  repositoryUrl,
  commitSha,
  fullCommitSha,
  branch,
  builtAt,
  generatedAt: builtAt,
  package: {
    name: packageJson.name,
    version: packageJson.version,
  },
  runtime: {
    framework: "Next.js 16 standalone",
    server: "RayNode",
    reverseProxy: "Caddy",
    processManager: "systemd",
    service: "elegant-developer-studio",
    runtimePath: "/srv/apps/elegant-developer-studio-runtime",
  },
  contentCounts: {
    posts: posts.length,
    projects: projects.length,
    knowledge: knowledgeEntries.length,
  },
  routesCount: publicRoutes.length,
  publicRoutes,
  qualityGates: [
    {
      id: "content-relations",
      command: "npm run validate:content",
      status: qualityStatus("content-relations"),
      required: true,
    },
    {
      id: "lint",
      command: "npm run lint",
      status: qualityStatus("lint"),
      required: true,
    },
    {
      id: "build",
      command: "npm run build",
      status: qualityStatus("build"),
      required: true,
    },
    {
      id: "local-e2e",
      command: "npm run test:e2e -- --workers=1",
      status: "manual",
      required: false,
    },
    {
      id: "production-smoke",
      command:
        "PLAYWRIGHT_BASE_URL=https://raynode.me npx playwright test --project=chromium --grep \"serves|primary surfaces|Phase 26 external proof|project case studies\" --workers=1",
      status: "manual",
      required: false,
    },
  ],
};

if (!existsSync(dirname(outputPath))) {
  mkdirSync(dirname(outputPath), { recursive: true });
}

writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`);

console.log(
  `Wrote public/release-evidence.json for ${commitSha}: ${posts.length} posts, ${projects.length} projects, ${knowledgeEntries.length} knowledge entries, ${publicRoutes.length} public routes.`,
);
