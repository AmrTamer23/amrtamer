import { Suspense } from "react";
import { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectsClient from "./page.client";
import { ProjectsLoading } from "./components/projects.loading";

export async function generateMetadata(): Promise<Metadata> {
  const preloadImages: Record<string, string> = {};

  projects.slice(0, 3).forEach((project, index) => {
    preloadImages[`preload-main-${index}`] = project.mainImage;
    if (project.images.length > 0) {
      preloadImages[`preload-gallery-${index}-0`] = project.images[0];
    }
  });

  projects.slice(3).forEach((project, index) => {
    preloadImages[`preload-main-secondary-${index}`] = project.mainImage;
  });

  return {
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
    openGraph: {
      title: "Featured Projects",
      description:
        "Explore a collection of thoughtfully designed digital experiences that blend innovation with functionality.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Featured Projects",
      description:
        "Explore a collection of thoughtfully designed digital experiences that blend innovation with functionality.",
    },
    other: preloadImages,
  };
}

export default function ProjectsPage() {
  return (
    <div className=" flex flex-col gap-4 w-full justify-center items-center h-full flex-1">
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient projects={projects} />
      </Suspense>
    </div>
  );
}
