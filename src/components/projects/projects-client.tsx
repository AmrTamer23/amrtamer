"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useTransition,
  Suspense,
  useCallback,
  lazy,
} from "react";
import { RightPanel } from "./right-panel";
import { SelectedProject } from "./selected-project";
import { AnimatePresence, motion } from "motion/react";
import { useQueryParam } from "@/hooks/use-query-params";
import { X } from "lucide-react";

const ProjectModal = lazy(
  () => import("./project-modal").then((m) => ({ default: m.ProjectModal }))
);

interface ProjectsClientProps {
  projects: OptimizedProject[];
}

type ProjectFilter = "all" | Project["status"];

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedProjectSlug, setSelectedProjectSlug] = useQueryParam(
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
  const [activeProjectSlug, setActiveProjectSlug] = useQueryParam("view", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const activeProject = useMemo(
    () => projects.find((p) => p.slug === activeProjectSlug) ?? null,
    [projects, activeProjectSlug]
  );

  const featuredContainer = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();

    mediaQuery.addEventListener("change", updateMobileState);
    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileDrawerOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !isMobileDrawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, isMobileDrawerOpen]);

  useEffect(() => {
    function onKeyDown(event: { key: string }) {
      if (event.key === "Escape") {
        if (isMobileDrawerOpen) {
          setIsMobileDrawerOpen(false);
          return;
        }
        setActiveProjectSlug(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileDrawerOpen, setActiveProjectSlug]);

  const handleProjectSelect = useCallback(
    (project: OptimizedProject) => {
      startTransition(() => {
        setSelectedProjectSlug(project.slug);
      });
      if (isMobile) {
        setIsMobileDrawerOpen(true);
      }
    },
    [isMobile, setSelectedProjectSlug]
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

      <AnimatePresence>
        {isMobile && isMobileDrawerOpen && featuredProject ? (
          <>
            <motion.button
              type="button"
              aria-label="Close project details drawer"
              className="fixed inset-0 z-30 bg-black/55 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileDrawerOpen(false)}
            />
            <motion.section
              className="fixed inset-x-0 bottom-0 z-40 sm:hidden max-h-[88svh] rounded-t-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-label={`${featuredProject.title} details`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <p className="text-sm font-medium text-[var(--text-strong)] truncate">
                  {featuredProject.title}
                </p>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  aria-label="Close drawer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 mobile-tap-target"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="max-h-[calc(88svh-4.25rem)] overflow-y-auto px-3 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
                <SelectedProject
                  featuredProject={featuredProject}
                  featuredContainer={featuredContainer}
                />
              </div>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex-1 w-full flex items-start h-full max-sm:items-stretch max-sm:px-2 max-sm:py-3">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 max-sm:gap-3">
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

          <div className="flex gap-4 h-full mx-auto max-sm:flex-col max-sm:gap-3 flex-1 justify-center items-start w-full">
            <RightPanel
              projects={filteredProjects}
              featuredProject={featuredProject}
              handleProjectSelect={handleProjectSelect}
              isAnimating={isPending}
            />
            <div className="hidden sm:contents">
              <SelectedProject
                featuredProject={featuredProject}
                featuredContainer={featuredContainer}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
