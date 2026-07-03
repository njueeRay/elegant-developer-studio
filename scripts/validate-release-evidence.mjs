import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const evidencePath = join(root, "public/release-evidence.json");
const staticRoutes = new Set([
  "/",
  "/about",
  "/blog",
  "/command-index.json",
  "/collaboration",
  "/contact",
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
]);

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function run(command, args) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
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

const errors = [];

if (!existsSync(evidencePath)) {
  errors.push("public/release-evidence.json is missing; run npm run release:evidence.");
} else {
  const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
  const posts = listContentMeta("src/content/posts");
  const projects = listContentMeta("src/content/projects");
  const knowledgeEntries = extractKnowledgeEntries();
  const expectedRoutes = new Set([
    ...Array.from(staticRoutes),
    ...posts.map((post) => `/blog/${post.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...knowledgeEntries.map((entry) => `/knowledge/${entry.slug}`),
  ]);
  const head = run("git", ["rev-parse", "--short", "HEAD"]);

  if (evidence.schemaVersion !== 1) {
    errors.push("release evidence schemaVersion must be 1");
  }

  if (evidence.commitSha !== head) {
    errors.push(`release evidence commitSha ${evidence.commitSha} does not match HEAD ${head}`);
  }

  if (evidence.siteUrl !== "https://raynode.me") {
    errors.push("release evidence siteUrl must be https://raynode.me");
  }

  if (evidence.contentCounts?.posts !== posts.length) {
    errors.push(`release evidence posts count must be ${posts.length}`);
  }

  if (evidence.contentCounts?.projects !== projects.length) {
    errors.push(`release evidence projects count must be ${projects.length}`);
  }

  if (evidence.contentCounts?.knowledge !== knowledgeEntries.length) {
    errors.push(`release evidence knowledge count must be ${knowledgeEntries.length}`);
  }

  if (evidence.routesCount !== expectedRoutes.size) {
    errors.push(`release evidence routesCount must be ${expectedRoutes.size}`);
  }

  if (!Array.isArray(evidence.publicRoutes)) {
    errors.push("release evidence publicRoutes must be an array");
  } else {
    expectedRoutes.forEach((route) => {
      if (!evidence.publicRoutes.includes(route)) {
        errors.push(`release evidence publicRoutes is missing ${route}`);
      }
    });
  }

  const requiredGates = new Set(["content-relations", "lint", "build"]);
  const gates = new Map((evidence.qualityGates ?? []).map((gate) => [gate.id, gate]));
  requiredGates.forEach((gate) => {
    if (!gates.has(gate)) {
      errors.push(`release evidence qualityGates is missing ${gate}`);
    }
  });
}

if (errors.length > 0) {
  console.error("Release evidence validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Release evidence validation passed.");
