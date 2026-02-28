import { Suspense } from "react";
import { Metadata } from "next";
import ProjectsClient from "./page.client";
import { ProjectsLoading } from "./components/projects.loading";
import { getOptimizedProjects } from "@/lib/project-optimization";
import { generateProjectsMetadata } from "@/lib/metadata-config";

export async function generateMetadata(): Promise<Metadata> {
  return generateProjectsMetadata();
}

export default async function ProjectsPage() {
  const optimizedProjects = await getOptimizedProjects();
  
  return (
    <div className=" flex flex-col gap-4 w-full justify-center items-center h-full flex-1">
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient projects={optimizedProjects} />
      </Suspense>
    </div>
  );
}
