"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useTransition,
  Suspense,
  useCallback,
} from "react";
import { RightPanel } from "./components/right-panel";
import { SelectedProject } from "./components/selected-project";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
const ProjectModal = dynamic(
  () => import("./components/project-modal").then((m) => m.ProjectModal),
  {
    ssr: false,
    loading: () => null,
  }
);
import { useQueryState } from "nuqs";

interface ProjectsClientProps {
  projects: OptimizedProject[];
}

type ProjectFilter = "all" | Project["status"];

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedProjectSlug, setSelectedProjectSlug] = useQueryState(
    "project",
    {
      defaultValue: projects[0]?.slug || "",
      parse: (value) => value || projects[0]?.slug || "",
      serialize: (value) => value,
      clearOnDefault: false,
    }
  );

  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return projects;
    return projects.filter((project) => project.status === projectFilter);
  }, [projects, projectFilter]);

  const featuredProject = useMemo(
    () =>
      filteredProjects.find((p) => p.slug === selectedProjectSlug) ||
      filteredProjects[0] ||
      projects[0] ||
      null,
    [filteredProjects, projects, selectedProjectSlug]
  );
  const [activeProjectSlug, setActiveProjectSlug] = useQueryState("view", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const activeProject = useMemo(
    () => projects.find((p) => p.slug === activeProjectSlug) ?? null,
    [projects, activeProjectSlug]
  );

  const featuredContainer = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function onKeyDown(event: { key: string }) {
      if (event.key === "Escape") {
        setActiveProjectSlug(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setActiveProjectSlug]);

  const handleViewProject = useCallback((project: OptimizedProject) => {
    setActiveProjectSlug(project.slug);
  }, [setActiveProjectSlug]);

  const handleProjectSelect = useCallback(
    (project: OptimizedProject) => {
      startTransition(() => {
        setSelectedProjectSlug(project.slug);
      });
    },
    [setSelectedProjectSlug]
  );

  const handleCloseModal = useCallback(() => {
    setActiveProjectSlug(null);
  }, [setActiveProjectSlug]);

  useEffect(() => {
    if (!featuredProject) return;
    if (!filteredProjects.some((project) => project.slug === selectedProjectSlug)) {
      startTransition(() => {
        setSelectedProjectSlug(featuredProject.slug);
      });
    }
  }, [featuredProject, filteredProjects, selectedProjectSlug, setSelectedProjectSlug]);

  const statusCounts = useMemo(
    () => ({
      all: projects.length,
      completed: projects.filter((project) => project.status === "completed").length,
      "in-progress": projects.filter((project) => project.status === "in-progress")
        .length,
      planning: projects.filter((project) => project.status === "planning").length,
    }),
    [projects]
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {activeProject ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-background/10 dark:bg-background/50 pointer-events-none fixed inset-0 z-10 bg-blend-luminosity backdrop-blur-xl"
            />
            <Suspense fallback={null}>
              <ProjectModal
                key={activeProject.slug}
                activeProject={activeProject}
                onClose={handleCloseModal}
              />
            </Suspense>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex-1 w-full flex items-start h-full max-sm:items-stretch max-sm:px-1 max-sm:py-3">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-5">
          {/* <section className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-5 py-4 max-sm:px-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-kicker">
                  Selected Work
                </p>
                <h1 className="text-section-title">
                  Product work with decisions, constraints, and outcomes
                </h1>
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["all", "All"],
                    ["completed", "Completed"],
                    ["in-progress", "In Progress"],
                    ["planning", "Planning"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setProjectFilter(key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border ${
                      projectFilter === key
                        ? "border-white/30 bg-white/15 text-white"
                        : "border-white/10 bg-white/[0.04] text-white/75 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}{" "}
                    <span className="text-[11px] text-white/60">
                      ({statusCounts[key]})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section> */}

          <div className="flex gap-4 h-full mx-auto max-sm:flex-col max-sm:gap-4 flex-1 justify-center items-start w-full">
            <RightPanel
              projects={filteredProjects}
              featuredProject={featuredProject}
              handleProjectSelect={handleProjectSelect}
              isAnimating={isPending}
            />

          <SelectedProject
            featuredProject={featuredProject}
            featuredContainer={featuredContainer}
          />
          </div>
        </div>
      </div>
    </>
  );
}
