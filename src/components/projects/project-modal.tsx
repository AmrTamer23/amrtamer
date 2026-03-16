"use client";

import { useState, useRef, useEffect, memo, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageCache } from "@/hooks/use-image-cache";
import { normalizeProjectNarrative } from "@/lib/content-normalizers";
import { NarrativeBlock } from "@/components/ui/narrative-block";

interface ProjectModalProps {
  activeProject: OptimizedProject | null;
  onClose: () => void;
}

const DEFAULT_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABAUGB//EACgQAAIBAwMDAwUBAAAAAAAAAAECAwAEEQUSITFBUQYTYSIycYGRsf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOnWl5HdQiWJgyMMg1JZNrFKNzKN2c7sdPmq2jWf0iWZl3v3Y9zVSaJYZGjjTaijCqOgFB//2Q==";

function ProjectModalComponent({ activeProject, onClose }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { preloadImages } = useImageCache();

  const currentImageSrc = useMemo(() => {
    if (!activeProject) return "";

    if (activeProject.images && activeProject.images.length > 0) {
      return (
        activeProject.images[selectedImageIndex - 1] || activeProject.optimizedMainImage.src
      );
    }
    return activeProject.optimizedMainImage.src;
  }, [activeProject, selectedImageIndex]);

  const currentImageBlur = useMemo(() => {
    if (!activeProject) return undefined;

    if (
      selectedImageIndex > 0 &&
      activeProject.optimizedGalleryImages?.length > 0 &&
      activeProject.optimizedGalleryImages[selectedImageIndex - 1]
    ) {
      return activeProject.optimizedGalleryImages[selectedImageIndex - 1].blurDataURL;
    }

    return activeProject.optimizedMainImage.blurDataURL;
  }, [activeProject, selectedImageIndex]);

  const narrative = useMemo(
    () => (activeProject ? normalizeProjectNarrative(activeProject) : null),
    [activeProject]
  );

  useEffect(() => {
    if (activeProject) {
      triggerRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [activeProject]);

  useOnClickOutside(modalRef as React.RefObject<HTMLElement>, onClose);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (!activeProject) return;
      const totalImages = activeProject.images?.length ?? 0;
      if (totalImages === 0) return;
      if (event.key === "ArrowRight") {
        setSelectedImageIndex((prev) => {
          const next = prev + 1;
          return next > totalImages ? 1 : next;
        });
      } else if (event.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => {
          const next = prev - 1;
          return next < 1 ? totalImages : next;
        });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, activeProject]);

  useEffect(() => {
    if (activeProject) {
      if (activeProject.images?.length) {
        preloadImages([activeProject.mainImage, ...activeProject.images]);
      } else if (activeProject.mainImage) {
        preloadImages([activeProject.mainImage]);
      }
    }
  }, [activeProject, preloadImages]);

  return (
    <>
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 max-sm:p-2 max-sm:pb-[max(env(safe-area-inset-bottom),0.5rem)]">
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.title} project details`}
              className="bg-card border border-border flex h-fit max-h-[98svh] max-w-7xl w-full cursor-default flex-col items-start gap-4 overflow-hidden shadow-2xl max-sm:max-h-[96svh] max-sm:rounded-xl outline-none"
              layoutId={`project-modal-${activeProject.slug}`}
              style={{ borderRadius: 16 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                layout: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between w-full p-4 border-b border-border max-sm:flex-wrap max-sm:items-start max-sm:gap-2 max-sm:p-3">
                <div className="flex items-center gap-2 max-sm:flex-wrap max-sm:pr-11">
                  <div
                    className="w-4 h-4 rounded-full"
                    aria-hidden="true"
                    style={{ backgroundColor: activeProject.color }}
                  />
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {activeProject.title}
                  </h2>
                  {activeProject.status === "in-progress" && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      In Progress
                    </span>
                  )}
                  {activeProject.status === "planning" && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Planning
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="rounded-full h-11 w-11 mobile-tap-target"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-4 w-full max-sm:px-3 max-sm:pb-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-sm:gap-4">
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Project Gallery
                    </h3>

                    <motion.div
                      className="relative aspect-video rounded-lg overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <motion.div
                        key={selectedImageIndex}
                        className="absolute inset-0"
                        initial={{
                          opacity: 0,
                          scale: shouldReduceMotion ? 1 : 0.99,
                        }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <img
                          src={currentImageSrc}
                          alt={`${activeProject.title} — image ${selectedImageIndex}`}
                          className="w-full h-full object-contain bg-black"
                          loading={activeProject.isPriority ? "eager" : "lazy"}
                          fetchPriority={activeProject.isPriority ? "high" : "auto"}
                          style={
                            currentImageBlur
                              ? {
                                  backgroundImage: `url(${currentImageBlur})`,
                                  backgroundSize: "cover",
                                }
                              : undefined
                          }
                          onLoad={(e) => {
                            if (currentImageBlur) {
                              e.currentTarget.style.backgroundImage = "none";
                            }
                          }}
                        />
                      </motion.div>
                    </motion.div>

                    {activeProject.images && activeProject.images.length > 0 && (
                      <div
                        className={cn(
                          "grid grid-cols-3 gap-0.5 sm:grid-cols-4",
                          activeProject.images.length >= 7
                            ? "md:grid-cols-5"
                            : "md:grid-cols-4"
                        )}
                      >
                        {activeProject.images.map((image, index) => {
                          const optimizedImage = activeProject.optimizedGalleryImages?.[index];
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setSelectedImageIndex(index + 1)}
                              aria-label={`View ${activeProject.title} image ${index + 1}`}
                              aria-pressed={selectedImageIndex === index + 1}
                              className={cn(
                                "relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border bg-black mobile-tap-target",
                                selectedImageIndex === index + 1
                                  ? "border-opacity-100"
                                  : "opacity-70 hover:opacity-100 border-transparent"
                              )}
                              style={{
                                borderColor:
                                  selectedImageIndex === index + 1
                                    ? activeProject.color
                                    : "transparent",
                              }}
                            >
                              <img
                                src={image}
                                alt={`${activeProject.title} — image ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-contain"
                                loading="lazy"
                                style={
                                  optimizedImage?.blurDataURL
                                    ? {
                                        backgroundImage: `url(${optimizedImage.blurDataURL})`,
                                        backgroundSize: "cover",
                                      }
                                    : {
                                        backgroundImage: `url(${DEFAULT_BLUR})`,
                                        backgroundSize: "cover",
                                      }
                                }
                                onLoad={(e) => {
                                  e.currentTarget.style.backgroundImage = "none";
                                }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-1 flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Overview
                      </h3>
                      <p className="text-foreground/75 leading-relaxed max-sm:text-sm">
                        {narrative?.overview}
                      </p>
                    </div>
                    <NarrativeBlock title="Constraints" items={narrative?.constraints || []} />
                    <NarrativeBlock title="Decisions" items={narrative?.decisions || []} />
                    <NarrativeBlock title="Outcome" items={narrative?.impact || []} />
                    <NarrativeBlock title="Lessons" items={narrative?.lessons || []} />

                    {activeProject.techStack && activeProject.techStack.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm rounded-full border max-sm:text-xs"
                              style={{
                                backgroundColor: `${activeProject.color}20`,
                                borderColor: `${activeProject.color}40`,
                                color: activeProject.color,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeProject.link && (
                      <div className="pt-4">
                        <Button
                          size="lg"
                          className="rounded-md font-semibold w-full text-lg hover:opacity-80 transition-all duration-200 ease-in-out max-sm:text-base"
                          style={{
                            background: `linear-gradient(135deg, ${activeProject.color}, ${activeProject.color}dd)`,
                            color: "white",
                          }}
                          asChild
                        >
                          <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                            <span>View Live Project</span>
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export const ProjectModal = memo(ProjectModalComponent);
