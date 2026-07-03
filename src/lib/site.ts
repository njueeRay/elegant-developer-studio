export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://raynode.me";

export const previewUrl = "https://elegant-developer-studio.vercel.app";

export const repositoryUrl = "https://github.com/njueeRay/elegant-developer-studio";

export const siteName = "Ray Studio";

export const siteDescription =
  "一个面向设计型工程师的个人工作室：写作、作品、知识、媒体、工具和可追溯的构建记录。";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
