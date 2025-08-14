import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { getReadableTextColor } from "@/lib/utils";

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
      className="flex-1 w-6/12 max-sm:order-1 max-sm:w-full max-w-5xl mx-auto aspect-[3/2] h-fit"
      ref={featuredContainer}
    >
      {featuredProject && (
        <div
          className={`group relative w-full h-full rounded-xl overflow-hidden border border-white/20 transition-all duration-500 max-sm:min-h-[50vh] ${
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
            fill
            className="featured-image absolute inset-0 object-cover transition-transform duration-700"
            sizes="(max-width: 768px) 95vw, 60vw"
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {featuredProject.status === "completed" && (
            <div className="featured-button absolute top-2 right-2 max-sm:top-4 max-sm:right-4">
              <Button
                // style={{
                //   background: `linear-gradient(35deg, ${featuredProject.color}, ${featuredProject.color}dd)`,
                // }}
                className="rounded-xl"
                style={{
                  background: `${featuredProject.color}`,
                  color: getReadableTextColor(featuredProject.color),
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewProject();
                }}
                size="lg"
                variant="primary"
              >
                <EyeIcon className="w-5 h-5 transition-transform max-sm:w-4 max-sm:h-4" />
                <span className="text-sm font-medium max-sm:text-xs">
                  View Project
                </span>
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

          <div className="featured-content absolute bottom-0 left-0 right-0 px-8 py-4 max-sm:p-4">
            <div className="max-w-2xl flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-white leading-tight max-sm:text-2xl">
                {featuredProject.title}
              </h2>

              <p className="text-white/80 text-xl leading-relaxed line-clamp-3 max-sm:text-base max-sm:line-clamp-2">
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
