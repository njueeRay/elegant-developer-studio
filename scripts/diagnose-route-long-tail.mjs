import { existsSync, readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

const defaultRoutes = [
  "/projects/anyreader-interface-teardown",
  "/projects/openprofile-agent-workflow",
  "/projects/lumen",
  "/blog/anyreader-deep-reading-interface-teardown",
  "/blog/openprofile-as-agentic-profile-infrastructure",
  "/blog/agent-handoff-loop",
  "/knowledge/external-proof-over-self-reference",
  "/knowledge/project-evidence-minimum-standard",
  "/knowledge/selection-anchors-are-product-state",
  "/release-evidence.json",
];

const args = new Set(process.argv.slice(2));
const baseUrl = (process.env.ROUTE_TIMING_BASE_URL ?? "http://127.0.0.1:3101").replace(/\/$/, "");
const thresholdMs = Number(process.env.ROUTE_TIMING_THRESHOLD_MS ?? "3000");
const rounds = Number(process.env.ROUTE_LONG_TAIL_ROUNDS ?? "6");
const delayMs = Number(process.env.ROUTE_LONG_TAIL_DELAY_MS ?? "120");
const useReleaseRoutes = args.has("--release-routes");
const failOnSlow = args.has("--fail-on-slow");
const failOnError = args.has("--fail-on-error") || failOnSlow;

function percentile(values, percent) {
  if (values.length === 0) {
    return 0;
  }

  const index = Math.min(values.length - 1, Math.ceil((percent / 100) * values.length) - 1);
  return values[index];
}

function getReleaseRoutes() {
  const evidencePath = new URL("../public/release-evidence.json", import.meta.url);

  if (!existsSync(evidencePath)) {
    throw new Error(
      "public/release-evidence.json is missing. Run `npm run release:evidence` first.",
    );
  }

  const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
  const routes = evidence.publicRoutes;

  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error("release evidence does not contain publicRoutes.");
  }

  return routes.filter((route) => route.startsWith("/blog/") || route.startsWith("/projects/") || route.startsWith("/knowledge/"));
}

function getRoutes() {
  const explicitRoutesArg = process.argv.find((arg) => arg.startsWith("--routes="));

  if (explicitRoutesArg) {
    return explicitRoutesArg
      .slice("--routes=".length)
      .split(",")
      .map((route) => route.trim())
      .filter(Boolean);
  }

  if (useReleaseRoutes) {
    return getReleaseRoutes();
  }

  return defaultRoutes;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function measureRoute(route, round) {
  const url = new URL(route, `${baseUrl}/`).toString();
  const start = performance.now();

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "elegant-developer-studio-long-tail-diagnosis/1.0",
      },
      signal: AbortSignal.timeout(30_000),
    });
    const body = await response.arrayBuffer();

    return {
      route,
      round,
      status: response.status,
      ok: response.ok,
      durationMs: Math.round(performance.now() - start),
      bytes: body.byteLength,
    };
  } catch (error) {
    return {
      route,
      round,
      status: "ERR",
      ok: false,
      durationMs: Math.round(performance.now() - start),
      bytes: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function summarizeRoute(route, results) {
  const durations = results.map((result) => result.durationMs).sort((a, b) => a - b);
  const slowResults = results.filter((result) => result.durationMs > thresholdMs);
  const failedResults = results.filter((result) => !result.ok);
  const first = results.find((result) => result.round === 1);
  const maxResult = [...results].sort((a, b) => b.durationMs - a.durationMs)[0];
  const warmDurations = results
    .filter((result) => result.round > 1)
    .map((result) => result.durationMs)
    .sort((a, b) => a - b);

  return {
    route,
    firstMs: first?.durationMs ?? 0,
    p50Ms: percentile(durations, 50),
    p95Ms: percentile(durations, 95),
    maxMs: maxResult?.durationMs ?? 0,
    warmMaxMs: warmDurations.at(-1) ?? 0,
    slowCount: slowResults.length,
    failedCount: failedResults.length,
    status: maxResult?.status ?? "ERR",
    bytes: maxResult?.bytes ?? 0,
    error: failedResults[0]?.error,
  };
}

const routes = getRoutes();
const allResults = [];

if (!Number.isInteger(rounds) || rounds < 1) {
  throw new Error("ROUTE_LONG_TAIL_ROUNDS must be a positive integer.");
}

for (let round = 1; round <= rounds; round += 1) {
  for (const route of routes) {
    allResults.push(await measureRoute(route, round));
    if (delayMs > 0) {
      await sleep(delayMs);
    }
  }
}

const summaries = routes
  .map((route) => summarizeRoute(route, allResults.filter((result) => result.route === route)))
  .sort((a, b) => b.maxMs - a.maxMs);
const slowSummaries = summaries.filter((summary) => summary.slowCount > 0);
const failedSummaries = summaries.filter((summary) => summary.failedCount > 0);
const allDurations = allResults.map((result) => result.durationMs).sort((a, b) => a - b);

console.log(`Long-tail route diagnosis for ${baseUrl}`);
console.log(`- routes: ${routes.length}`);
console.log(`- rounds: ${rounds}`);
console.log(`- samples: ${allResults.length}`);
console.log(`- threshold: ${thresholdMs}ms`);
console.log(`- sample p50: ${percentile(allDurations, 50)}ms`);
console.log(`- sample p95: ${percentile(allDurations, 95)}ms`);
console.log(`- sample max: ${allDurations.at(-1) ?? 0}ms`);
console.log(`- routes with slow samples: ${slowSummaries.length}`);
console.log(`- routes with failures: ${failedSummaries.length}`);
console.log("");
console.log("Route summary:");
console.log("route | first | p50 | p95 | max | warm max | slow | failed");

for (const summary of summaries) {
  console.log(
    [
      summary.route,
      `${summary.firstMs}ms`,
      `${summary.p50Ms}ms`,
      `${summary.p95Ms}ms`,
      `${summary.maxMs}ms`,
      `${summary.warmMaxMs}ms`,
      summary.slowCount,
      summary.failedCount,
    ].join(" | "),
  );
}

if (failedSummaries.length > 0) {
  console.log("");
  console.log("Failures:");

  for (const summary of failedSummaries) {
    console.log(`- ${summary.route}: ${summary.error ?? summary.status}`);
  }
}

if (failOnError && failedSummaries.length > 0) {
  process.exitCode = 1;
}

if (failOnSlow && slowSummaries.length > 0) {
  process.exitCode = 1;
}
