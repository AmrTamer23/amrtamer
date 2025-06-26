"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectModalProps {
  activeProject: Project | null;
  onClose: () => void;
}

export function ProjectModal({ activeProject, onClose }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useOnClickOutside(modalRef as React.RefObject<HTMLElement>, onClose);

  // Close modal on escape key
  useEffect(() => {
    function onKeyDown(event: { key: string }) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Reset to first gallery image when modal opens
  useEffect(() => {
    if (activeProject) {
      setSelectedImageIndex(1); // Start with first gallery image
    }
  }, [activeProject]);

  return (
    <>
      {/* Modal Background Overlay */}
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

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              className="bg-card dark:bg-card border border-border flex h-[90vh] w-[95%] max-w-6xl cursor-default flex-col items-start gap-6 overflow-hidden shadow-2xl"
              ref={modalRef}
              layoutId={`project-modal-${activeProject.id}`}
              style={{ borderRadius: 16 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between w-full p-6 border-b border-border">
                <div className="flex items-center gap-4">
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
              <div className="flex-1 overflow-y-auto p-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Images Section - Takes up 2 columns */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground ">
                      Project Gallery
                    </h3>

                    {/* Main Image - Larger */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden ">
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
                        className="object-cover transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={true}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>

                    {activeProject.images &&
                      activeProject.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {activeProject.images.map((image, index) => (
                            <div
                              key={index}
                              className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                                selectedImageIndex === index + 1
                                  ? "scale-95 border-opacity-100"
                                  : "hover:scale-105 opacity-70 hover:opacity-100 border-transparent"
                              }`}
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
                                className="object-cover"
                                sizes="(max-width: 768px) 25vw, 12vw"
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
                  <div className="lg:col-span-1 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Overview
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {activeProject.overview}
                      </p>
                    </div>

                    {activeProject.problems && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          The Challenge
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {activeProject.problems}
                        </p>
                      </div>
                    )}

                    {activeProject.myRole && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          My Role
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {activeProject.myRole}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack */}
                    {activeProject.techStack &&
                      activeProject.techStack.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            Tech Stack
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.techStack.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-sm rounded-full border"
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
                        <Link href={activeProject.link} target="_blank">
                          <Button
                            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold"
                            style={{
                              background: `linear-gradient(135deg, ${activeProject.color}, ${activeProject.color}dd)`,
                              color: "white",
                            }}
                          >
                            <span>View Live Project</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Button>
                        </Link>
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
