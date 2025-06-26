"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RightPanel } from "./components/right-panel";
import { SelectedProject } from "./components/selected-project";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { ProjectModal } from "./components/project-modal";
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

  const featuredProject =
    projects.find((p) => p.slug === selectedProjectSlug) || projects[0];
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const featuredContainer = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  gsap.registerPlugin(useGSAP);

  const { contextSafe } = useGSAP({ scope: featuredContainer });

  const animateProjectChange = contextSafe((newProject: Project) => {
    if (isAnimating || newProject.id === featuredProject?.id) return;

    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    // Phase 1: Fade out old content
    timeline
      .to(".featured-image", {
        scale: 1.1,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        ".featured-content",
        {
          y: 30,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        ".featured-badge",
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.3"
      )
      .to(
        ".featured-button",
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.3"
      )
      // ✅ Update state at the perfect moment - when old content is invisible
      .call(() => {
        setSelectedProjectSlug(newProject.slug);
      })
      // Phase 2: Fade in new content (now with correct project data)
      .fromTo(
        ".featured-image",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      )
      .fromTo(
        ".featured-content",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .fromTo(
        ".featured-badge",
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .fromTo(
        ".featured-button",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
  });

  const handleProjectSelect = (project: Project) => {
    animateProjectChange(project);
  };

  const handleViewProject = (project: Project) => {
    setActiveProject(project);
  };

  return (
    <>
      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background/10 dark:bg-background/50 pointer-events-none fixed inset-0 z-10 bg-blend-luminosity backdrop-blur-xl"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeProject ? (
          <ProjectModal
            activeProject={activeProject}
            onClose={() => setActiveProject(null)}
          />
        ) : null}
      </AnimatePresence>

      <div className="flex-1 w-full px-6 flex items-center justify-center">
        <div className="w-full h-full ">
          <div className="flex gap-8 h-full min-h-[65vh] w-full min-w-[90svw] mx-auto">
            <SelectedProject
              featuredProject={featuredProject}
              featuredContainer={featuredContainer}
              onViewProject={handleViewProject}
            />

            <RightPanel
              projects={projects}
              featuredProject={featuredProject}
              handleProjectSelect={handleProjectSelect}
              isAnimating={isAnimating}
            />
          </div>
        </div>
      </div>
    </>
  );
}
