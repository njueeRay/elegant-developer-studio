import type { Metadata } from "next";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/site";

type PageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  locale?: string;
};

export function createMetadata({
  title,
  description = siteDescription,
  path = "/",
  image,
  type = "website",
  locale = "zh_CN",
}: PageMetadataInput = {}): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedTitle = title ? `${title} - ${siteName}` : `${siteName} - Elegant Developer Studio`;

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName,
      type,
      locale,
      images: image
        ? [
            {
              url: absoluteUrl(image),
              width: 1200,
              height: 900,
              alt: title ?? siteName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

export const metadataBase = new URL(siteUrl);
