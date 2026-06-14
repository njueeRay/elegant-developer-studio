export const GITHUB_REPO_URL = "https://github.com/njueeRay/elegant-developer-studio";

export function getGitHubSourceUrl(path: string) {
  const normalizedPath = path.replace(/^\/+/, "");

  return `${GITHUB_REPO_URL}/blob/main/${normalizedPath}`;
}
