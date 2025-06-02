import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

export function SelectedProject({
  featuredProject,
  featuredContainer,
  isAnimating,
}: {
  featuredProject: any;
  featuredContainer: any;
  isAnimating: boolean;
}) {
  return (
    <div className="lg:col-span-2 relative w-full" ref={featuredContainer}>
      {featuredProject && (
        <div
          className="group relative w-full h-full rounded-3xl overflow-hidden border border-white/20 transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${featuredProject.color}15, ${featuredProject.color}05)`,
          }}
        >
          {/* Background Image */}
          <img
            src={featuredProject.image.src || "/placeholder.svg"}
            alt={featuredProject.title}
            className="featured-image absolute inset-0 w-full h-full object-cover transition-transform duration-700 "
            width={featuredProject.image.width}
            height={featuredProject.image.height}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* View Project Button */}
          <div className="featured-button absolute top-6 right-6">
            <Button
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white border-0 shadow-xl transition-all duration-300 "
              style={{
                background: `linear-gradient(135deg, ${featuredProject.color}, ${featuredProject.color}dd)`,
              }}
            >
              <EyeIcon className="w-5 h-5 transition-transform " />
              <span className="text-sm font-medium">View Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>

          {/* Project Details */}
          <div className="featured-content absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {featuredProject.title}
              </h2>

              <p className="text-white/80 text-lg leading-relaxed mb-6 line-clamp-3">
                {featuredProject.brief}
              </p>
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

          {/* Loading Overlay */}
          {isAnimating && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
