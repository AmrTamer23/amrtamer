import { Suspense } from "react";
import { Metadata } from "next";
import { getOptimizedProjects } from "@/lib/projects";
import ProjectsClient from "./page.client";
import { ProjectsLoading } from "./components/projects.loading";
import { AppViewTransition } from "@/components/view-transition";
import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import { Sparkles } from "lucide-react";

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
  const optimizedProjects = getOptimizedProjects();

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

export default function ProjectsPage() {
  const projectsData = getProjectsData();

  return (
    <Suspense fallback={<ProjectsLoading />}>
      <div className=" flex flex-col gap-8 -mt-12">
        {/* Hero Section */}
        <div className="w-full px-6 pt-8 flex items-center justify-center">
          <div className="max-w-6xl mx-auto text-center">
            <div className="relative inline-block mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-zinc-300" />
                <span className="text-sm font-medium text-white/90">
                  Featured Projects
                </span>
              </div>
              <GlowingEffect
                disabled={false}
                blur={1}
                proximity={9999}
                spread={100}
                variant="default"
                glow={true}
                movementDuration={1.5}
                borderWidth={2}
                className="rounded-full"
              />
            </div>
            <AppViewTransition name="projects-title">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4 leading-tight">
                Crafted with Purpose
              </h1>
            </AppViewTransition>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Explore a collection of thoughtfully designed digital experiences
              that blend innovation with functionality.
            </p>
          </div>
        </div>

        <ProjectsClient projects={projectsData} />
      </div>
    </Suspense>
  );
}
