import { existsSync, readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

const defaultRoutes = [
  "/",
  "/blog",
  "/projects",
  "/knowledge",
  "/uses",
  "/about",
  "/lab",
  "/contact",
  "/health.json",
  "/release-evidence.json",
];

const args = new Set(process.argv.slice(2));
const baseUrl = (process.env.ROUTE_TIMING_BASE_URL ?? "http://127.0.0.1:3101").replace(/\/$/, "");
const thresholdMs = Number(process.env.ROUTE_TIMING_THRESHOLD_MS ?? "3000");
const useReleaseRoutes = args.has("--release-routes");
const failOnSlow = args.has("--fail-on-slow");
const failOnError = args.has("--fail-on-error") || failOnSlow;

function getRoutes() {
  if (!useReleaseRoutes) {
    return defaultRoutes;
  }

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

  return routes;
}

function percentile(values, percent) {
  if (values.length === 0) {
    return 0;
  }

  const index = Math.min(values.length - 1, Math.ceil((percent / 100) * values.length) - 1);

  return values[index];
}

async function measureRoute(route) {
  const url = new URL(route, `${baseUrl}/`).toString();
  const start = performance.now();

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "elegant-developer-studio-route-timing/1.0",
      },
      signal: AbortSignal.timeout(20_000),
    });
    const body = await response.arrayBuffer();
    const durationMs = Math.round(performance.now() - start);

    return {
      route,
      status: response.status,
      ok: response.ok,
      durationMs,
      bytes: body.byteLength,
    };
  } catch (error) {
    return {
      route,
      status: "ERR",
      ok: false,
      durationMs: Math.round(performance.now() - start),
      bytes: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const routes = getRoutes();
const results = [];

for (const route of routes) {
  results.push(await measureRoute(route));
}

const durations = results.map((result) => result.durationMs).sort((a, b) => a - b);
const slowRoutes = results
  .filter((result) => result.durationMs > thresholdMs)
  .sort((a, b) => b.durationMs - a.durationMs);
const failedRoutes = results.filter((result) => !result.ok);
const topSlow = [...results].sort((a, b) => b.durationMs - a.durationMs).slice(0, 10);

console.log(`Route timing report for ${baseUrl}`);
console.log(`- routes: ${results.length}`);
console.log(`- threshold: ${thresholdMs}ms`);
console.log(`- p50: ${percentile(durations, 50)}ms`);
console.log(`- p95: ${percentile(durations, 95)}ms`);
console.log(`- max: ${durations.at(-1) ?? 0}ms`);
console.log(`- slow routes: ${slowRoutes.length}`);
console.log(`- failed routes: ${failedRoutes.length}`);
console.log("");
console.log("Top slow routes:");

for (const result of topSlow) {
  const status = String(result.status).padEnd(3, " ");
  const bytes = `${result.bytes}b`.padStart(9, " ");
  const error = result.error ? ` ${result.error}` : "";

  console.log(`- ${String(result.durationMs).padStart(5, " ")}ms ${status} ${bytes} ${result.route}${error}`);
}

if (failedRoutes.length > 0) {
  console.log("");
  console.log("Failed routes:");

  for (const result of failedRoutes) {
    console.log(`- ${result.route}: ${result.status} ${result.error ?? ""}`.trim());
  }
}

if (failOnError && failedRoutes.length > 0) {
  process.exitCode = 1;
}

if (failOnSlow && slowRoutes.length > 0) {
  process.exitCode = 1;
}
