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
  "/health.json",
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

function evaluateObjectLiteral(source, label, context = Object.create(null)) {
  try {
    return vm.runInNewContext(`(${source})`, context, {
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

function extractExportLiteral(path, exportName, openChar, closeChar) {
  const source = read(path);
  const marker = `export const ${exportName}`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`${path} does not export ${exportName}`);
  }

  const assignmentIndex = source.indexOf("=", markerIndex);
  const valueStart = source.indexOf(openChar, assignmentIndex);

  return evaluateObjectLiteral(
    extractBalanced(source, valueStart, openChar, closeChar),
    `${path}:${exportName}`,
  );
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
const writingIntents = extractExportLiteral("src/data/writing.ts", "writingIntents", "[", "]");
const writingTracks = extractExportLiteral("src/data/writing.ts", "writingTracks", "[", "]");
const intentToTrack = extractExportLiteral("src/data/writing.ts", "intentToTrack", "{", "}");
const citationGuides = extractExportLiteral("src/data/writing.ts", "citationGuides", "{", "}");
const homeEditorialPolicy = extractExportLiteral(
  "src/data/home-editorial.ts",
  "homeEditorialPolicy",
  "{",
  "}",
);
const photos = extractExportLiteral("src/data/media.ts", "photos", "[", "]");
const tracks = extractExportLiteral("src/data/media.ts", "tracks", "[", "]");
const mediaSource = read("src/data/media.ts");
const currentMixBlock = extractBalanced(
  mediaSource,
  mediaSource.indexOf("{", mediaSource.indexOf("export const currentMix")),
  "{",
  "}",
);
const currentMix = evaluateObjectLiteral(currentMixBlock, "src/data/media.ts:currentMix", { tracks });

const postSlugs = new Set(posts.map((post) => post.slug));
const projectSlugs = new Set(projects.map((project) => project.slug));
const knowledgeSlugs = new Set(knowledgeEntries.map((entry) => entry.slug));
const allowedLanguages = new Set(["English", "中文"]);
const allowedIntents = new Set(writingIntents);
const writingTrackIds = new Set(writingTracks.map((track) => track.id));
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
const evidenceRoles = new Set(["Primary", "Supporting", "Context"]);
const photoOrigins = new Set(["Generated", "Unsplash", "Personal", "Reference"]);
const memoryStrengths = new Set(["Personal", "Atmospheric", "Reference"]);
const trackSourceStates = new Set(["Mock", "Local", "External"]);
const staleEvidencePattern =
  /\b(?:dpl_[a-z0-9]+|elegant-developer-studio-[a-z0-9-]+\.vercel\.app)\b/i;

posts.forEach((post) => routes.add(`/blog/${post.slug}`));
projects.forEach((project) => routes.add(`/projects/${project.slug}`));
knowledgeEntries.forEach((entry) => routes.add(`/knowledge/${entry.slug}`));

const errors = [];

const homeSource = read("src/data/home.ts");

if (homeSource.includes("export const highlights")) {
  errors.push("src/data/home.ts must not define homepage highlights; use src/data/home-editorial.ts");
}

if (homeEditorialPolicy.schemaVersion !== 1) {
  errors.push("src/data/home-editorial.ts homeEditorialPolicy.schemaVersion must be 1");
}

if (!homeEditorialPolicy.principle?.includes("editorial surface")) {
  errors.push("homeEditorialPolicy.principle must state that the homepage is an editorial surface");
}

const homeSlots = homeEditorialPolicy.slots ?? {};

[
  ["featuredEssay", "reasonCode"],
  ["selectedWork", "reasonCode"],
  ["latestWriting", "reasonCode"],
  ["mediaEntry", "reasonCode"],
  ["knowledgeSignal", "reasonCode"],
].forEach(([slotName, field]) => {
  const slot = homeSlots[slotName];

  if (!slot) {
    errors.push(`homeEditorialPolicy.slots.${slotName} is required`);
    return;
  }

  if (!slot[field]?.startsWith("why.here(")) {
    errors.push(`homeEditorialPolicy.slots.${slotName}.${field} must use why.here(...)`);
  }

  if (!slot.reason || !slot.selectionRule) {
    errors.push(`homeEditorialPolicy.slots.${slotName} must include reason and selectionRule`);
  }
});

if (!postSlugs.has(homeSlots.featuredEssay?.postSlug)) {
  errors.push(`homeEditorialPolicy.slots.featuredEssay references missing post "${homeSlots.featuredEssay?.postSlug}"`);
}

if (!projectSlugs.has(homeSlots.selectedWork?.projectSlug)) {
  errors.push(
    `homeEditorialPolicy.slots.selectedWork references missing project "${homeSlots.selectedWork?.projectSlug}"`,
  );
}

assertSlugList({
  owner: "homeEditorialPolicy.slots.latestWriting",
  field: "postSlugs",
  values: homeSlots.latestWriting?.postSlugs,
  allowed: postSlugs,
  errors,
});

assertSlugList({
  owner: "homeEditorialPolicy.slots.knowledgeSignal",
  field: "entrySlugs",
  values: homeSlots.knowledgeSignal?.entrySlugs,
  allowed: knowledgeSlugs,
  errors,
});

[
  ["homeEditorialPolicy.slots.featuredEssay.proofHref", homeSlots.featuredEssay?.proofHref],
  ["homeEditorialPolicy.slots.selectedWork.proofHref", homeSlots.selectedWork?.proofHref],
  ["homeEditorialPolicy.slots.latestWriting.proofHref", homeSlots.latestWriting?.proofHref],
  ["homeEditorialPolicy.slots.mediaEntry.href", homeSlots.mediaEntry?.href],
  ["homeEditorialPolicy.slots.mediaEntry.photoHref", homeSlots.mediaEntry?.photoHref],
  ["homeEditorialPolicy.slots.mediaEntry.musicHref", homeSlots.mediaEntry?.musicHref],
  ["homeEditorialPolicy.slots.knowledgeSignal.proofHref", homeSlots.knowledgeSignal?.proofHref],
].forEach(([owner, href]) => assertRoute({ owner, href, routes, errors }));

posts.forEach((post) => {
  const owner = `post:${post.slug}`;

  if (!allowedLanguages.has(post.language)) {
    errors.push(`${owner}.language must be one of ${Array.from(allowedLanguages).join(", ")}`);
  }

  if (!allowedIntents.has(post.intent)) {
    errors.push(`${owner}.intent "${post.intent}" is not in src/data/writing.ts writingIntents`);
  }

  if (!writingTrackIds.has(intentToTrack[post.intent])) {
    errors.push(`${owner}.intent "${post.intent}" must map to a writing track`);
  }

  if (!citationGuides[post.language]?.items?.length) {
    errors.push(`${owner}.language "${post.language}" must have a citation guide`);
  }

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

  if (post.slug && post.relatedPostSlugs?.includes(post.slug)) {
    errors.push(`${owner}.relatedPostSlugs must not reference itself`);
  }

  ["relatedPostSlugs", "relatedKnowledgeSlugs", "relatedProjectSlugs"].forEach((field) => {
    if (!Array.isArray(post[field]) || post[field].length === 0) {
      errors.push(`${owner}.${field} must contain at least one public trail`);
    }
  });
});

if (writingTracks.length !== 4) {
  errors.push("src/data/writing.ts must define exactly 4 long-term writing tracks");
}

writingIntents.forEach((intent) => {
  if (!writingTrackIds.has(intentToTrack[intent])) {
    errors.push(`writing intent "${intent}" must map to a valid writing track`);
  }
});

writingTracks.forEach((track) => {
  const count = posts.filter((post) => intentToTrack[post.intent] === track.id).length;

  if (count === 0) {
    errors.push(`writing track "${track.id}" must have at least one post`);
  }
});

projects.forEach((project) => {
  assertRoute({ owner: `project:${project.slug}.href`, href: project.href, routes, errors });

  if (!Array.isArray(project.evidencePack) || project.evidencePack.length === 0) {
    errors.push(`project:${project.slug}.evidencePack must be a non-empty array`);
  } else {
    const priorities = new Set();

    project.evidencePack.forEach((item, index) => {
      const owner = `project:${project.slug}.evidencePack[${index}]`;

      ["type", "proofRole", "label", "detail", "why", "href", "source"].forEach((field) => {
        if (typeof item[field] !== "string" || !item[field].trim()) {
          errors.push(`${owner}.${field} must be a non-empty string`);
        }
      });

      if (!Number.isInteger(item.priority) || item.priority < 1) {
        errors.push(`${owner}.priority must be a positive integer`);
      } else if (priorities.has(item.priority)) {
        errors.push(`${owner}.priority must be unique within the project evidence pack`);
      } else {
        priorities.add(item.priority);
      }

      if (typeof item.type === "string" && !evidenceTypes.has(item.type)) {
        errors.push(`${owner}.type must be one of ${Array.from(evidenceTypes).join(", ")}`);
      }

      if (typeof item.proofRole === "string" && !evidenceRoles.has(item.proofRole)) {
        errors.push(`${owner}.proofRole must be one of ${Array.from(evidenceRoles).join(", ")}`);
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

photos.forEach((photo) => {
  const owner = `photo:${photo.slug}`;

  ["slug", "title", "sourceLabel", "whyPreserved"].forEach((field) => {
    if (typeof photo[field] !== "string" || !photo[field].trim()) {
      errors.push(`${owner}.${field} must be a non-empty string`);
    }
  });

  if (!photoOrigins.has(photo.origin)) {
    errors.push(`${owner}.origin must be one of ${Array.from(photoOrigins).join(", ")}`);
  }

  if (!memoryStrengths.has(photo.memoryStrength)) {
    errors.push(`${owner}.memoryStrength must be one of ${Array.from(memoryStrengths).join(", ")}`);
  }
});

tracks.forEach((track) => {
  const owner = `track:${track.slug}`;

  ["slug", "title", "usage", "whyQueued"].forEach((field) => {
    if (typeof track[field] !== "string" || !track[field].trim()) {
      errors.push(`${owner}.${field} must be a non-empty string`);
    }
  });

  if (!trackSourceStates.has(track.sourceState)) {
    errors.push(`${owner}.sourceState must be one of ${Array.from(trackSourceStates).join(", ")}`);
  }
});

["purpose", "playbackState", "trustBoundary"].forEach((field) => {
  if (typeof currentMix[field] !== "string" || !currentMix[field].trim()) {
    errors.push(`currentMix.${field} must be a non-empty string`);
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
