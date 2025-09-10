"use client";
import Image from "next/image";
import { useCallback, memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useImageCache } from "@/hooks/use-image-cache";

function RightPanel({
  projects,
  featuredProject,
  handleProjectSelect,
  isAnimating,
}: {
  projects: any[];
  featuredProject: any;
  handleProjectSelect: (project: any) => void;
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
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  } as const;
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  } as const;
  return (
    <div className="max-w-xs mx-auto w-full max-sm:w-full max-sm:order-2 max-sm:pb-6 max-sm:max-w-none flex flex-col justify-start items-start h-fit max-sm:z-0">
      <motion.div
        className="flex flex-col gap-2 overflow-y-auto max-sm:max-h-none max-sm:overflow-visible scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent w-full"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.slug ?? project.id}
            id={`sidebar-${project.slug ?? project.id}`}
            variants={itemVariants}
            layout
          >
            <motion.div
              onClick={() => {
                if (project.status === "completed") {
                  handleProjectSelect(project);
                }
              }}
              onMouseEnter={() => prefetchProjectImage(project.mainImage)}
              className={cn(
                "group relative p-4 rounded-xl border transition-all duration-300  w-full ",
                (featuredProject?.slug ?? featuredProject?.id) ===
                  (project.slug ?? project.id)
                  ? "border-white/20 bg-white/5 shadow-lg"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 ",
                project.status === "in-progress" && "cursor-no-drop",
                project.status === "planning" && "cursor-progress",
                project.status === "completed" && "cursor-pointer",
                isAnimating ? "pointer-events-none opacity-70" : ""
              )}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 28,
                mass: 0.4,
              }}
              layout
            >
              <div className="flex gap-3 items-center max-sm:gap-2">
                <div className="w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0 relative max-sm:w-12 border border-white/10">
                  <Image
                    src={project.favicon || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                    width={64}
                    height={64}
                    loading={index > 0 ? "lazy" : "eager"}
                    sizes="64px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABAUGB//EACgQAAIBAwMDAwUBAAAAAAAAAAECAwAEEQUSITFBUQYTYSIycYGRsf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOnWl5HdQiWJgyMMg1JZNrFKNzKN2c7sdPmq2jWf0iWZl3v3Y9zVSaJYZGjjTaijCqOgFB//2Q=="
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1 w-full">
                    <h4 className="text-white font-medium text-base truncate flex-1 max-sm:text-sm">
                      {project.title}
                    </h4>
                  </div>
                  {project.status !== "completed" && (
                    <div className="flex items-center gap-1">
                      {project.status === "in-progress" && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          In Progress
                        </span>
                      )}
                      {project.status === "planning" && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Planning
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div
                  className={`flex-shrink-0  rounded-full flex items-center justify-center transition-all duration-300 ${
                    (featuredProject?.slug ?? featuredProject?.id) ===
                    (project.slug ?? project.id)
                      ? "opacity-125"
                      : "opacity-90"
                  }`}
                >
                  <div
                    className="size-2.5 rounded-full"
                    style={{
                      backgroundColor: project.color,
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export const MemoizedRightPanel = memo(RightPanel);
export { MemoizedRightPanel as RightPanel };
