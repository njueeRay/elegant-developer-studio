import { execFileSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const baseUrl = process.env.RAYNODE_URL?.replace(/\/$/, "") ?? "https://raynode.me";
const fullRoutes = args.has("--full-routes");
const expectHead = args.has("--expect-head");
const timeoutMs = Number(process.env.RAYNODE_VERIFY_TIMEOUT_MS ?? 20000);

const requiredRoutes = [
  "/",
  "/health.json",
  "/release-evidence.json",
  "/command-index.json",
  "/blog",
  "/blog/chinese-as-product-memory",
  "/blog/raynode-standalone-deployment",
  "/blog?track=product-judgment",
  "/projects",
  "/projects/lumen",
  "/projects/studio-knowledge-base",
  "/knowledge",
  "/knowledge/deployment-is-product-surface",
  "/uses",
  "/lab",
  "/rss.xml",
  "/sitemap.xml",
  "/robots.txt",
];

function run(command, commandArgs) {
  return execFileSync(command, commandArgs, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function localHead() {
  return run("git", ["rev-parse", "--short", "HEAD"]);
}

async function requestJson(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return response.json();
}

async function checkRoute(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (response.status >= 400) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return {
    path,
    status: response.status,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const failures = [];

try {
  const [health, evidence, commandIndex] = await Promise.all([
    requestJson("/health.json"),
    requestJson("/release-evidence.json"),
    requestJson("/command-index.json"),
  ]);

  assert(health.status === "ok", "health status must be ok");
  assert(health.service === "elegant-developer-studio", "health service name is wrong");
  assert(evidence.siteUrl === baseUrl, `release evidence siteUrl must be ${baseUrl}`);
  assert(evidence.commitSha, "release evidence commitSha is missing");
  assert(evidence.routesCount === evidence.publicRoutes?.length, "routesCount must equal publicRoutes length");
  assert(evidence.contentCounts?.posts >= 14, "release evidence posts count is unexpectedly low");
  assert(evidence.contentCounts?.projects >= 5, "release evidence projects count is unexpectedly low");
  assert(evidence.contentCounts?.knowledge >= 16, "release evidence knowledge count is unexpectedly low");
  assert(commandIndex.schemaVersion === 1, "command index schemaVersion must be 1");
  assert(commandIndex.count === commandIndex.items?.length, "command index count must equal items length");

  if (expectHead) {
    const head = localHead();
    assert(evidence.commitSha === head, `release evidence commitSha ${evidence.commitSha} does not match HEAD ${head}`);
  }

  const routeSet = new Set(requiredRoutes);

  if (fullRoutes) {
    evidence.publicRoutes.forEach((route) => routeSet.add(route));
  }

  const routes = Array.from(routeSet);
  const results = [];

  for (const route of routes) {
    try {
      results.push(await checkRoute(route));
    } catch (error) {
      failures.push(error.message);
    }
  }

  console.log(
    [
      `RayNode health passed for ${baseUrl}`,
      `commit=${evidence.commitSha}`,
      `routes=${results.length}/${routes.length}`,
      `content=${evidence.contentCounts.posts} posts / ${evidence.contentCounts.projects} projects / ${evidence.contentCounts.knowledge} knowledge`,
      `commandItems=${commandIndex.count}`,
    ].join("\n"),
  );
} catch (error) {
  failures.push(error.message);
}

if (failures.length > 0) {
  console.error("RayNode health failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
