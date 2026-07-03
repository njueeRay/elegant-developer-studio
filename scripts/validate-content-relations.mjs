import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const root = process.cwd();
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
  "/robots.txt",
  "/release-evidence.json",
  "/rss.xml",
  "/sitemap.xml",
  "/uses",
]);

function read(path) {
  return readFileSync(join(root, path), "utf8");
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

function extractMeta(path) {
  const source = read(path);
  const marker = "export const meta =";
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`${path} does not export meta`);
  }

  const objectStart = source.indexOf("{", markerIndex);
  const objectLiteral = extractBalanced(source, objectStart, "{", "}");

  return evaluateObjectLiteral(objectLiteral, path);
}

function extractKnowledgeEntries() {
  const source = read("src/data/knowledge.ts");
  const marker = "export const knowledgeEntries";
  const markerIndex = source.indexOf(marker);
  const assignmentIndex = source.indexOf("=", markerIndex);
  const arrayStart = source.indexOf("[", assignmentIndex);
  const arrayLiteral = extractBalanced(source, arrayStart, "[", "]");

  return evaluateObjectLiteral(arrayLiteral, "src/data/knowledge.ts");
}

function listContentMeta(dir) {
  return readdirSync(join(root, dir))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => extractMeta(join(dir, file)));
}

function normalizeInternalHref(href) {
  if (!href || typeof href !== "string") {
    return "";
  }

  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return "";
  }

  if (!href.startsWith("/")) {
    return "";
  }

  return href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
}

function assertSlugList({ owner, field, values, allowed, errors }) {
  if (!Array.isArray(values)) {
    errors.push(`${owner}.${field} must be an array`);
    return;
  }

  values.forEach((slug) => {
    if (!allowed.has(slug)) {
      errors.push(`${owner}.${field} references missing slug "${slug}"`);
    }
  });
}

function assertRoute({ owner, href, routes, errors }) {
  const path = normalizeInternalHref(href);

  if (path && !routes.has(path)) {
    errors.push(`${owner} points to missing internal route "${href}"`);
  }
}

const posts = listContentMeta("src/content/posts");
const projects = listContentMeta("src/content/projects");
const knowledgeEntries = extractKnowledgeEntries();

const postSlugs = new Set(posts.map((post) => post.slug));
const projectSlugs = new Set(projects.map((project) => project.slug));
const knowledgeSlugs = new Set(knowledgeEntries.map((entry) => entry.slug));
const routes = new Set(staticRoutes);
const evidenceTypes = new Set([
  "source",
  "deployment",
  "document",
  "test",
  "screenshot",
  "metric",
  "decision",
]);
const staleEvidencePattern =
  /\b(?:dpl_[a-z0-9]+|elegant-developer-studio-[a-z0-9-]+\.vercel\.app)\b/i;

posts.forEach((post) => routes.add(`/blog/${post.slug}`));
projects.forEach((project) => routes.add(`/projects/${project.slug}`));
knowledgeEntries.forEach((entry) => routes.add(`/knowledge/${entry.slug}`));

const errors = [];

posts.forEach((post) => {
  const owner = `post:${post.slug}`;

  assertSlugList({
    owner,
    field: "relatedPostSlugs",
    values: post.relatedPostSlugs,
    allowed: postSlugs,
    errors,
  });
  assertSlugList({
    owner,
    field: "relatedKnowledgeSlugs",
    values: post.relatedKnowledgeSlugs,
    allowed: knowledgeSlugs,
    errors,
  });
  assertSlugList({
    owner,
    field: "relatedProjectSlugs",
    values: post.relatedProjectSlugs,
    allowed: projectSlugs,
    errors,
  });
});

projects.forEach((project) => {
  assertRoute({ owner: `project:${project.slug}.href`, href: project.href, routes, errors });

  if (!Array.isArray(project.evidencePack) || project.evidencePack.length === 0) {
    errors.push(`project:${project.slug}.evidencePack must be a non-empty array`);
  } else {
    project.evidencePack.forEach((item, index) => {
      const owner = `project:${project.slug}.evidencePack[${index}]`;

      ["type", "label", "detail", "href", "source"].forEach((field) => {
        if (typeof item[field] !== "string" || !item[field].trim()) {
          errors.push(`${owner}.${field} must be a non-empty string`);
        }
      });

      if (typeof item.type === "string" && !evidenceTypes.has(item.type)) {
        errors.push(`${owner}.type must be one of ${Array.from(evidenceTypes).join(", ")}`);
      }

      assertRoute({ owner: `${owner}.href`, href: item.href, routes, errors });

      if (typeof item.route === "string") {
        assertRoute({ owner: `${owner}.route`, href: item.route, routes, errors });
      }

      if (typeof item.screenshot === "string" && !item.screenshot.startsWith("/")) {
        errors.push(`${owner}.screenshot must start with /`);
      }

      if (
        typeof item.metric === "string" &&
        /\b\d+\s+(?:e2e|test|tests|passed)\b/i.test(item.metric)
      ) {
        errors.push(
          `${owner}.metric must not hard-code volatile test counts; use release evidence or a durable coverage description`,
        );
      }

      ["href", "detail", "deploymentId", "metric", "verifiedBy"].forEach((field) => {
        if (typeof item[field] === "string" && staleEvidencePattern.test(item[field])) {
          errors.push(
            `${owner}.${field} must not reference stale Vercel deployment ids or temporary deployment URLs; use release evidence, VERSION_TRACE, RayNode, or the stable preview alias`,
          );
        }
      });
    });
  }
});

knowledgeEntries.forEach((entry) => {
  const owner = `knowledge:${entry.slug}`;

  ["summary", "signal", "protects", "citation"].forEach((field) => {
    if (typeof entry[field] !== "string" || !entry[field].trim()) {
      errors.push(`${owner}.${field} must be a non-empty string`);
    }
  });

  assertSlugList({
    owner,
    field: "relatedPostSlugs",
    values: entry.relatedPostSlugs,
    allowed: postSlugs,
    errors,
  });
  assertSlugList({
    owner,
    field: "relatedProjectSlugs",
    values: entry.relatedProjectSlugs,
    allowed: projectSlugs,
    errors,
  });

  entry.related.forEach((link) =>
    assertRoute({ owner: `${owner}.related:${link.label}`, href: link.href, routes, errors }),
  );
  entry.backlinks.forEach((link) =>
    assertRoute({ owner: `${owner}.backlink:${link.label}`, href: link.href, routes, errors }),
  );
});

if (errors.length > 0) {
  console.error("Content relation validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Content relation validation passed: ${posts.length} posts, ${projects.length} projects, ${knowledgeEntries.length} knowledge entries.`,
);
