"use client";
import Image from "next/image";
import { useCallback, memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useImageCache } from "@/hooks/use-image-cache";
import { ArrowUpRight, Hammer, NotebookText } from "lucide-react";
import { elevateHover, revealStagger } from "@/lib/motion-presets";

function RightPanel({
  projects,
  featuredProject,
  handleProjectSelect,
  isAnimating,
}: {
  projects: OptimizedProject[];
  featuredProject: OptimizedProject | null;
  handleProjectSelect: (project: OptimizedProject) => void;
  isAnimating: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { preloadImage } = useImageCache();

  const prefetchProjectImage = useCallback(
    (src: string) => {
      if (src) {
        preloadImage(src);
      }
    },
    [preloadImage]
  );
  const listVariants = revealStagger;
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  } as const;

  const getStatusBadge = (status: Project["status"]) => {
    if (status === "completed") {
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/35";
    }
    if (status === "in-progress") {
      return "bg-amber-500/15 text-amber-300 border-amber-500/35";
    }
    return "bg-sky-500/15 text-sky-300 border-sky-500/35";
  };

  const getStatusLabel = (status: Project["status"]) => {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    return "Planning";
  };

  return (
    <div className="w-full max-w-sm mx-auto max-sm:w-full max-sm:order-2 max-sm:max-w-none flex flex-col justify-start items-start h-fit max-sm:z-0 lg:sticky lg:top-6">
      <motion.div
        className="flex flex-col gap-2 overflow-y-auto max-sm:max-h-none max-sm:overflow-visible scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent w-full"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-1 pb-2">
          <h2 className="text-meta">
            Project Index
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
            No projects in this filter yet.
          </div>
        ) : null}

        {projects.map((project) => (
          <motion.div
            key={project.slug}
            id={`sidebar-${project.slug}`}
            variants={itemVariants}
            layout
          >
            <motion.button
              type="button"
              disabled={isAnimating}
              onClick={() => handleProjectSelect(project)}
              onMouseEnter={() => prefetchProjectImage(project.mainImage)}
              aria-label={`View ${project.title} project details`}
              aria-current={featuredProject?.slug === project.slug ? "true" : undefined}
              className={cn(
                "group relative p-4 rounded-xl border transition-all duration-300 w-full text-left backdrop-blur-sm",
                featuredProject?.slug === project.slug
                  ? "border-white/30 bg-white/12 shadow-lg"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8",
                "cursor-pointer",
                isAnimating && "opacity-70 pointer-events-none"
              )}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 28,
                mass: 0.4,
              }}
              whileHover={shouldReduceMotion ? undefined : elevateHover.whileHover}
              whileTap={shouldReduceMotion ? undefined : elevateHover.whileTap}
              layout
            >
              <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl opacity-60" style={{ backgroundColor: project.color }} />

              <div className="flex gap-3 items-start max-sm:gap-2">
                <div className="w-14 aspect-square rounded-lg overflow-hidden flex-shrink-0 relative max-sm:w-12 border border-white/10 bg-black/35">
                  <Image
                    src={project.optimizedFavicon.src}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                    width={64}
                    height={64}
                    loading={project.isPriority ? "eager" : "lazy"}
                    sizes="64px"
                    placeholder="blur"
                    blurDataURL={project.optimizedFavicon.blurDataURL}
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1 w-full">
                    <h4
                      title={project.title}
                      className="text-[var(--text-strong)] font-medium text-base truncate flex-1 max-sm:text-sm"
                    >
                      {project.title}
                    </h4>
                  </div>
                  <span
                    className={cn(
                      "inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                      getStatusBadge(project.status)
                    )}
                  >
                    {getStatusLabel(project.status)}
                  </span>
                </div>

                <div
                  className={`flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                    featuredProject?.slug === project.slug
                      ? "opacity-100"
                      : "opacity-90"
                  }`}
                >
                  <div
                    className="size-2.5 rounded-full"
                    aria-label={`${project.title} project color`}
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/70 line-clamp-2">
                {project.brief ||
                  (project.status === "completed"
                    ? "Detailed case study and implementation notes are available."
                    : "Core details are being prepared as the project moves forward.")}
              </p>
              {project.status !== "completed" && project.statusNote ? (
                <p className="mt-2 text-[11px] text-white/65 line-clamp-1">
                  {project.statusNote}
                </p>
              ) : null}

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-white/65">
                  {project.status === "completed" ? (
                    <>
                      <ArrowUpRight className="size-3.5" />
                      <span>Open details</span>
                    </>
                  ) : project.status === "in-progress" ? (
                    <>
                      <Hammer className="size-3.5" />
                      <span>Track progress</span>
                    </>
                  ) : (
                    <>
                      <NotebookText className="size-3.5" />
                      <span>Roadmap notes</span>
                    </>
                  )}
                </div>
                <span className="text-[11px] text-white/55">
                  {project.techStack.length > 0
                    ? `${project.techStack.length} techs`
                    : "No stack yet"}
                </span>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export const MemoizedRightPanel = memo(RightPanel);
export { MemoizedRightPanel as RightPanel };
