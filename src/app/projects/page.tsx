import { Suspense } from "react";
import { Metadata } from "next";
import { getOptimizedProjects } from "@/lib/projects";
import ProjectsClient from "./index.client";
import styles from "./loading-skeleton.module.css";

// Metadata for better SEO and social sharing
export const metadata: Metadata = {
  title: "Projects - Crafted with Purpose",
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
    title: "Projects - Crafted with Purpose",
    description:
      "Explore a collection of thoughtfully designed digital experiences that blend innovation with functionality.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Crafted with Purpose",
    description:
      "Explore a collection of thoughtfully designed digital experiences that blend innovation with functionality.",
  },
};

function getProjectsData() {
  // Use optimized data loading with caching
  const optimizedProjects = getOptimizedProjects();

  // Process only what's needed for the client component
  const processedProjects = optimizedProjects.map((project) => ({
    ...project,
    image: {
      src: project.optimizedMainImage.src,
      width: project.optimizedMainImage.width,
      height: project.optimizedMainImage.height,
      blurDataURL: project.optimizedMainImage.blurDataURL,
    },
  }));

  return processedProjects;
}

function ProjectsLoading() {
  return (
    <div className="flex flex-col gap-8 -mt-12 min-h-screen">
      {/* Hero Section Skeleton - No ViewTransitions to avoid conflicts */}
      <div className="w-full px-6 pt-8 flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge Skeleton */}
          <div className="relative inline-block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div
                className={`w-4 h-4 bg-white/20 rounded ${styles.skeletonPulse}`}
              />
              <div
                className={`h-4 w-32 bg-white/20 rounded ${styles.skeletonPulse}`}
              />
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2 mb-4">
            <div
              className={`h-8 md:h-12 lg:h-16 w-4/5 mx-auto bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-lg ${styles.skeletonPulse}`}
            />
            <div
              className={`h-8 md:h-12 lg:h-16 w-3/5 mx-auto bg-gradient-to-r from-white/15 via-white/8 to-white/15 rounded-lg ${styles.skeletonPulse}`}
            />
          </div>

          {/* Subtitle Skeleton */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <div
              className={`h-4 w-full bg-white/10 rounded ${styles.skeletonPulse}`}
            />
            <div
              className={`h-4 w-4/5 mx-auto bg-white/10 rounded ${styles.skeletonPulse}`}
            />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton - No ViewTransitions to avoid conflicts */}
      <div className="flex-1 w-full px-6 flex items-center justify-center">
        <div className="w-full h-full">
          <div className="flex gap-8 h-full min-h-[65vh] w-full min-w-[90svw] mx-auto">
            {/* Featured Project Skeleton (Left Panel) */}
            <div className="flex-1 w-8/12">
              <div className="group relative w-full h-full rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-gray-800/50 via-gray-700/30 to-gray-600/20">
                {/* Image Skeleton with shimmer */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 ${styles.shimmer}`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* View Project Button Skeleton */}
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div
                      className={`w-5 h-5 bg-white/20 rounded ${styles.skeletonPulse}`}
                    />
                    <div
                      className={`h-4 w-24 bg-white/20 rounded ${styles.skeletonPulse}`}
                    />
                    <div
                      className={`w-4 h-4 bg-white/20 rounded ${styles.skeletonPulse}`}
                    />
                  </div>
                </div>

                {/* Project Details Skeleton */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="max-w-2xl space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <div
                        className={`h-8 md:h-10 w-3/4 bg-white/20 rounded-lg ${styles.skeletonPulse}`}
                      />
                      <div
                        className={`h-8 md:h-10 w-1/2 bg-white/15 rounded-lg ${styles.skeletonPulse}`}
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div
                        className={`h-5 w-full bg-white/15 rounded ${styles.skeletonPulse}`}
                      />
                      <div
                        className={`h-5 w-4/5 bg-white/15 rounded ${styles.skeletonPulse}`}
                      />
                      <div
                        className={`h-5 w-3/5 bg-white/15 rounded ${styles.skeletonPulse}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full blur-2xl bg-white/20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 rounded-full blur-xl bg-white/20" />
              </div>
            </div>

            {/* Right Panel Skeleton - No ViewTransitions to avoid conflicts */}
            <div className="w-3/12">
              <div className="h-fit bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full">
                <div className="space-y-3">
                  {/* Project List Items - Simple skeleton without ViewTransitions */}
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className={`${
                          styles.skeletonItem
                        } relative p-4 rounded-xl border border-white/10 bg-white/5 ${
                          index === 0 ? "border-white/30 bg-white/10" : ""
                        }`}
                      >
                        <div className="flex gap-3 items-center">
                          {/* Project Thumbnail */}
                          <div
                            className={`w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-white/10 ${styles.skeletonPulse}`}
                          />

                          {/* Project Info */}
                          <div className="flex-1 min-w-0">
                            <div
                              className={`h-5 w-3/4 bg-white/15 rounded ${styles.skeletonPulse}`}
                            />
                          </div>

                          {/* Selection Indicator */}
                          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white/10">
                            <div
                              className={`w-3 h-3 rounded-full bg-white/20 ${styles.skeletonPulse}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const projectsData = getProjectsData();

  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsClient projects={projectsData} />
    </Suspense>
  );
}
