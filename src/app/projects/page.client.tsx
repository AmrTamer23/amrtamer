"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useTransition,
  Suspense,
} from "react";
import { RightPanel } from "./components/right-panel";
import { SelectedProject } from "./components/selected-project";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
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
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedProjectSlug, setSelectedProjectSlug] = useQueryState(
    "project",
    {
      defaultValue: projects[0]?.slug || "",
      parse: (value) => value || projects[0]?.slug || "",
      serialize: (value) => value,
      clearOnDefault: true,
    }
  );

  const featuredProject = useMemo(
    () => projects.find((p) => p.slug === selectedProjectSlug) || projects[0],
    [projects, selectedProjectSlug]
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const featuredContainer = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  useOnClickOutside(modalRef as React.RefObject<HTMLElement>, () =>
    setActiveProject(null)
  );

  useEffect(() => {
    function onKeyDown(event: { key: string }) {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (activeProject) {
      setSelectedImageIndex(1);
    }
  }, [activeProject]);

  const handleViewProject = (project: Project) => {
    setActiveProject(project);
  };

  return (
    <>
      <AnimatePresence>
        {activeProject ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-background/10 dark:bg-background/50 pointer-events-none fixed inset-0 z-10 bg-blend-luminosity backdrop-blur-xl"
            />
            <Suspense fallback={null}>
              <ProjectModal
                activeProject={activeProject}
                onClose={() => setActiveProject(null)}
              />
            </Suspense>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex-1 w-full flex items-center h-full max-sm:items-stretch max-sm:px-4 max-sm:py-4">
        <div className="flex gap-4 h-full  mx-auto max-sm:flex-col  max-sm:gap-6 flex-1 justify-center items-center">
          <SelectedProject
            featuredProject={featuredProject}
            featuredContainer={featuredContainer}
            onViewProject={handleViewProject}
          />

          <RightPanel
            projects={projects}
            featuredProject={featuredProject}
            handleProjectSelect={(project) => {
              setSelectedProjectSlug(project.slug);
            }}
            isAnimating={isAnimating || isPending}
          />
        </div>
      </div>
    </>
  );
}
