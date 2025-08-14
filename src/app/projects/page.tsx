import { Suspense } from "react";
import { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectsClient from "./page.client";
import { ProjectsLoading } from "./components/projects.loading";
import { ServerImagePrefetch } from "./components/server-image-prefetch";

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
    <>
      <div className=" flex flex-col gap-4 w-full pt-10">
        <div className="w-full px-6 flex items-center justify-center">
          <h1 className="text-6xl  font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4 leading-tight">
            Featured Projects
          </h1>
        </div>

        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsClient projects={projects} />
        </Suspense>
      </div>
      <ServerImagePrefetch projects={projects} />
    </>
  );
}
