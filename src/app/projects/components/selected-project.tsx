import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { AppViewTransition } from "@/components/view-transition";

interface ProcessedProject {
  id: number;
  slug: string;
  title: string;
  brief: string;
  overview: string;
  problems: string;
  myRole: string;
  techStack: string[];
  status: "completed" | "in-progress" | "planning";
  color: string;
  images: string[];
  image: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
  isPriority?: boolean;
}

export function SelectedProject({
  featuredProject,
  featuredContainer,
  onViewProject,
}: {
  featuredProject: ProcessedProject | null;
  featuredContainer: any;
  onViewProject?: (project: ProcessedProject) => void;
}) {
  const handleViewProject = () => {
    if (
      featuredProject &&
      onViewProject &&
      featuredProject.status === "completed"
    ) {
      onViewProject(featuredProject);
    }
  };

  return (
    <div className="flex-1 w-8/12  " ref={featuredContainer}>
      {featuredProject && (
        <div
          className={`group relative w-full h-full rounded-3xl overflow-hidden border border-white/20 transition-all duration-500 ${
            featuredProject.status === "completed"
              ? "cursor-pointer"
              : "cursor-default"
          }`}
          style={{
            background: `linear-gradient(135deg, ${featuredProject.color}15, ${featuredProject.color}05)`,
          }}
          onClick={handleViewProject}
        >
          {/* Background Image */}
          <AppViewTransition name={`main-project-image-${featuredProject.id}`}>
            <Image
              src={featuredProject.image.src || "/placeholder.svg"}
              alt={featuredProject.title}
              className="featured-image absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              width={featuredProject.image.width}
              height={featuredProject.image.height}
              priority={featuredProject.isPriority}
              placeholder={featuredProject.image.blurDataURL ? "blur" : "empty"}
              blurDataURL={
                featuredProject.image.blurDataURL ||
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              }
              sizes="(max-width: 768px) 95vw, 60vw"
            />
          </AppViewTransition>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* View Project Button - Only show for completed projects */}
          {featuredProject.status === "completed" && (
            <div className="featured-button absolute top-6 right-6">
              <Button
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white border-0 shadow-xl transition-all duration-300 "
                style={{
                  background: `linear-gradient(135deg, ${featuredProject.color}, ${featuredProject.color}dd)`,
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent click
                  handleViewProject();
                }}
              >
                <EyeIcon className="w-5 h-5 transition-transform " />
                <span className="text-sm font-medium">View Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          )}

          {/* Status Badge */}
          {featuredProject.status !== "completed" && (
            <div className="absolute top-6 left-6">
              {featuredProject.status === "in-progress" && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                  🚧 Work in Progress
                </span>
              )}
              {featuredProject.status === "planning" && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                  📋 Planning
                </span>
              )}
            </div>
          )}

          {/* Project Details */}
          <div className="featured-content absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-2xl">
              <AppViewTransition
                name={`main-project-title-${featuredProject.id}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {featuredProject.title}
                </h2>
              </AppViewTransition>

              <AppViewTransition
                name={`main-project-description-${featuredProject.id}`}
              >
                <p className="text-white/80 text-lg leading-relaxed mb-6 line-clamp-3">
                  {featuredProject.brief}
                </p>
              </AppViewTransition>
            </div>
          </div>

          {/* Decorative Elements */}
          <div
            className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, ${featuredProject.color}60, transparent)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-32 h-32 opacity-15 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${featuredProject.color}40, transparent)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
