import { Suspense } from "react";
import projects from "@/lib/projects";
import ProjectsClient from "./index.client";
import Header from "@/components/layout/header";
import styles from "./loading-skeleton.module.css";

function getProjectsData() {
  const processedProjects = projects.map((project) => ({
    ...project,
    image: {
      src: project.mainImage.src,
      width: project.mainImage.width,
      height: project.mainImage.height,
    },
  }));

  return processedProjects;
}

function ProjectsLoading() {
  const skeletonCards = Array(4).fill(0);

  return (
    <main className="  flex items-center  px-4 py-2 w-full h-svh flex-col bg-background ">
      <div className="w-full h-full">
        <section className="sticky-container relative w-screen h-screen flex justify-center items-center text-white">
          <div className="relative w-1/2 h-4/5 rounded-lg overflow-hidden md:w-[95%] lg:w-4/5">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className={`absolute w-full h-full rounded-lg overflow-hidden ${
                  index === 0 ? "z-10" : "z-0"
                }`}
                style={{
                  transform:
                    index === 0 ? "translateY(0%)" : "translateY(100%)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600">
                  <div
                    className={`absolute inset-0 opacity-50 ${styles.shimmer}`}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                      transform: "translateX(-100%)",
                    }}
                  />
                </div>

                <div
                  className="absolute top-4 left-4 p-2 rounded z-10 border border-white/20 backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                </div>

                <div className="absolute top-4 right-4 rounded z-10">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded border border-white/20"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <div className="w-6 h-6 bg-white/20 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
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
