import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { cp, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const skipQuality = args.has("--skip-quality");
const skipBuild = args.has("--skip-build");
const remote = process.env.RAYNODE_SSH ?? "ray@47.81.38.236";
const artifact = "/tmp/elegant-developer-studio-standalone.tgz";

function run(command, commandArgs, options = {}) {
  console.log(`$ ${[command, ...commandArgs].join(" ")}`);
  execFileSync(command, commandArgs, {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: "https://raynode.me",
    },
    ...options,
  });
}

function runQuiet(command, commandArgs) {
  return execFileSync(command, commandArgs, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function runShell(command, options = {}) {
  console.log(`$ ${command}`);
  const result = spawnSync(command, {
    cwd: root,
    shell: true,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: "https://raynode.me",
    },
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

async function buildArtifact() {
  const tempRoot = mkdtempSync(join(tmpdir(), "elegant-developer-studio-runtime-"));
  const runtimeRoot = join(tempRoot, "runtime");

  await mkdir(join(runtimeRoot, ".next"), { recursive: true });
  await cp(join(root, ".next/standalone"), runtimeRoot, { recursive: true });
  await cp(join(root, ".next/static"), join(runtimeRoot, ".next/static"), { recursive: true });
  await cp(join(root, "public"), join(runtimeRoot, "public"), { recursive: true });

  runShell(`COPYFILE_DISABLE=1 tar --no-xattrs -czf ${artifact} -C ${runtimeRoot} .`);
  rmSync(tempRoot, { recursive: true, force: true });
}

const commit = runQuiet("git", ["rev-parse", "--short", "HEAD"]);

if (!skipQuality) {
  run("npm", ["run", "validate:content"]);
  run("npm", ["run", "lint"]);
}

if (!skipBuild) {
  run("npm", ["run", "build"]);
}

run("npm", ["run", "release:evidence", "--", "--local-quality-passed"]);
run("npm", ["run", "validate:release-evidence"]);
await buildArtifact();

if (dryRun) {
  console.log(`Dry run complete for ${commit}. Artifact: ${artifact}`);
  process.exit(0);
}

run("scp", [artifact, `${remote}:${artifact}`], { cwd: root });

const remoteScript = `
set -euo pipefail
cd /srv/apps/elegant-developer-studio
git fetch --quiet origin main
git merge --ff-only --no-stat origin/main
rm -rf /srv/apps/elegant-developer-studio-runtime.next
mkdir -p /srv/apps/elegant-developer-studio-runtime.next
tar -xzf ${artifact} -C /srv/apps/elegant-developer-studio-runtime.next
rm -rf /srv/apps/elegant-developer-studio-runtime.prev
if [ -d /srv/apps/elegant-developer-studio-runtime ]; then
  mv /srv/apps/elegant-developer-studio-runtime /srv/apps/elegant-developer-studio-runtime.prev
fi
mv /srv/apps/elegant-developer-studio-runtime.next /srv/apps/elegant-developer-studio-runtime
sudo systemctl restart elegant-developer-studio
for attempt in 1 2 3 4 5; do
  if curl -fsSI --max-time 15 http://127.0.0.1:3001 >/dev/null; then
    break
  fi
  sleep 2
  if [ "$attempt" = "5" ]; then
    exit 1
  fi
done
systemctl is-active elegant-developer-studio
curl -fsSI --max-time 20 https://raynode.me >/dev/null
curl -fsSI --max-time 20 https://raynode.me/health.json >/dev/null
curl -fsSI --max-time 20 https://raynode.me/release-evidence.json >/dev/null
curl -fsSI --max-time 20 https://raynode.me/projects/lumen >/dev/null
cd /srv/apps/elegant-developer-studio
git rev-parse --short HEAD
`;

run("ssh", [remote, remoteScript], { cwd: root });

console.log(`RayNode deployment complete for ${commit}.`);
