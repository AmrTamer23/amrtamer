import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { useId } from "react";

export function SelectedProject({
  featuredProject,
  featuredContainer,
  onViewProject,
}: {
  featuredProject: Project | null;
  featuredContainer: any;
  onViewProject?: (project: Project) => void;
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
    <div
      className="flex-1 w-8/12  max-sm:order-1 max-sm:w-full max-sm:min-h-[50vh] "
      ref={featuredContainer}
    >
      {featuredProject && (
        <div
          className={`group relative w-full h-full rounded-3xl overflow-hidden border border-white/20 transition-all duration-500 max-sm:min-h-[50vh] ${
            featuredProject.status === "completed"
              ? "cursor-pointer"
              : "cursor-default"
          }`}
          style={{
            background: `linear-gradient(135deg, ${featuredProject.color}15, ${featuredProject.color}05)`,
          }}
          onClick={handleViewProject}
        >
          <Image
            src={featuredProject.mainImage || "/placeholder.svg"}
            alt={featuredProject.title}
            className="featured-image absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 95vw, 60vw"
            loading="eager"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {featuredProject.status === "completed" && (
            <div className="featured-button absolute top-6 right-6 max-sm:top-4 max-sm:right-4">
              <Button
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white border-0 shadow-xl transition-all duration-300 max-sm:px-4 max-sm:py-2 max-sm:gap-2"
                style={{
                  background: `linear-gradient(135deg, ${featuredProject.color}, ${featuredProject.color}dd)`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewProject();
                }}
              >
                <EyeIcon className="w-5 h-5 transition-transform max-sm:w-4 max-sm:h-4" />
                <span className="text-sm font-medium max-sm:text-xs">
                  View Project
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-sm:w-3 max-sm:h-3" />
              </Button>
            </div>
          )}

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

          <div className="featured-content absolute bottom-0 left-0 right-0 p-8 max-sm:p-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight max-sm:text-2xl max-sm:mb-2">
                {featuredProject.title}
              </h2>

              <p className="text-white/80 text-lg leading-relaxed mb-6 line-clamp-3 max-sm:text-base max-sm:mb-4 max-sm:line-clamp-2">
                {featuredProject.brief}
              </p>
            </div>
          </div>

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
