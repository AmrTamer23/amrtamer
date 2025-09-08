"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ArrowUpRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  activeProject: Project | null;
  onClose: () => void;
}

export function ProjectModal({ activeProject, onClose }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Close modal when clicking outside
  useOnClickOutside(modalRef as React.RefObject<HTMLElement>, onClose);

  // Close modal on escape key
  useEffect(() => {
    function onKeyDown(event: { key: string }) {
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

  // Reset to first gallery image when modal opens
  useEffect(() => {
    if (activeProject) {
      setSelectedImageIndex(1); // Start with first gallery image
    }
  }, [activeProject]);

  return (
    <>
      {/* Project Modal */}
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 max-sm:p-2">
            <motion.div
              className="bg-card dark:bg-card border border-border flex h-fit max-h-[98svh] max-w-7xl w-full cursor-default flex-col items-start gap-4 overflow-hidden shadow-2xl max-sm:max-h-[96svh]"
              ref={modalRef}
              layoutId={`project-modal-${activeProject.slug}`}
              style={{ borderRadius: 16 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between w-full p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: activeProject.color }}
                  />
                  <h2 className="text-2xl font-bold text-foreground">
                    {activeProject.title}
                  </h2>
                  {activeProject.status === "in-progress" && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      🚧 Work in Progress
                    </span>
                  )}
                  {activeProject.status === "planning" && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      📋 Planning
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-4 w-full max-sm:px-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-sm:gap-4">
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Project Gallery
                    </h3>

                    <motion.div
                      className="relative aspect-video rounded-lg overflow-hidden"
                      layoutId={`project-hero-${activeProject.slug}`}
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
                        <Image
                          src={
                            activeProject.images &&
                            activeProject.images.length > 0
                              ? activeProject.images[selectedImageIndex - 1] ||
                                activeProject.mainImage
                              : activeProject.mainImage
                          }
                          alt={activeProject.title}
                          fill
                          className="object-contain bg-black"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 66vw"
                          priority={false}
                          loading="eager"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      </motion.div>
                    </motion.div>

                    {activeProject.images &&
                      activeProject.images.length > 0 && (
                        <div
                          className={cn(
                            "grid grid-cols-3 gap-0.5 sm:grid-cols-4",
                            activeProject.slug === "fomo-techno"
                              ? "md:grid-cols-5"
                              : "md:grid-cols-4"
                          )}
                        >
                          {activeProject.images.map((image, index) => (
                            <div
                              key={index}
                              className={cn(
                                "relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-1 bg-black",
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
                              onClick={() => setSelectedImageIndex(index + 1)}
                            >
                              <Image
                                src={image}
                                alt={`${activeProject.title} - Image ${
                                  index + 1
                                }`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 30vw, (max-width: 768px) 25vw, 12vw"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                              />
                            </div>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Content Section - Takes up 1 column */}
                  <div className="lg:col-span-1 flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Overview
                      </h3>
                      <p className="text-foreground/75 leading-relaxed max-sm:text-sm">
                        {activeProject.overview}
                      </p>
                    </div>

                    {activeProject.problems && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          The Challenge
                        </h3>
                        <p className="text-foreground/75 leading-relaxed max-sm:text-sm">
                          {activeProject.problems}
                        </p>
                      </div>
                    )}

                    {activeProject.myRole && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          My Role
                        </h3>
                        <p className="text-foreground/75 leading-relaxed max-sm:text-sm">
                          {activeProject.myRole}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack */}
                    {activeProject.techStack &&
                      activeProject.techStack.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg font-semibold text-foreground ">
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

                    {/* Project Link */}
                    {activeProject.link && (
                      <div className="pt-4">
                        <Button
                          size="lg"
                          className=" rounded-md font-semibold w-full text-lg hover:opacity-80 transition-all duration-200 ease-in-out max-sm:text-base"
                          style={{
                            background: `linear-gradient(135deg, ${activeProject.color}, ${activeProject.color}dd)`,
                            color: "white",
                          }}
                          asChild
                        >
                          <Link href={activeProject.link} target="_blank">
                            <span>Give it a Look?</span>
                          </Link>
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
