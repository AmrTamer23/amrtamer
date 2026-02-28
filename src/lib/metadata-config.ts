import { Metadata } from "next";
import { generateImagePreloadHints } from "./project-optimization";

interface ProjectMetadataConfig {
  title: string;
  description: string;
  keywords: string[];
}

const PROJECT_METADATA: ProjectMetadataConfig = {
  title: "Featured Projects",
  description:
    "Explore a collection of thoughtfully designed digital experiences that blend innovation with functionality.",
  keywords: [
    "projects",
    "web development",
    "design",
    "portfolio",
    "digital experiences",
  ],
};

/**
 * Generates comprehensive metadata for the projects page
 * @returns Next.js Metadata object
 */
export function generateProjectsMetadata(): Metadata {
  const preloadImages = generateImagePreloadHints();

  return {
    title: PROJECT_METADATA.title,
    description: PROJECT_METADATA.description,
    keywords: PROJECT_METADATA.keywords,
    openGraph: {
      title: PROJECT_METADATA.title,
      description: PROJECT_METADATA.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: PROJECT_METADATA.title,
      description: PROJECT_METADATA.description,
    },
    other: preloadImages,
  };
}
