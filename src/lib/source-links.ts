export const GITHUB_REPO_URL = "https://github.com/njueeRay/elegant-developer-studio";

export function getGitHubSourceUrl(path: string, line?: number) {
  const normalizedPath = path.replace(/^\/+/, "");
  const lineHash = line ? `#L${line}` : "";

  return `${GITHUB_REPO_URL}/blob/main/${normalizedPath}${lineHash}`;
}
