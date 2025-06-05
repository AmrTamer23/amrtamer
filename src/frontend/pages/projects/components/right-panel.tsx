export function RightPanel({
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
  return (
    <div className="w-3/12  ">
      <div className="h-fit bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full">
        <div className="space-y-3 max-h-[calc(100%-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent w-full">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer w-full ${
                featuredProject?.id === project.id
                  ? "border-white/30 bg-white/10  shadow-lg"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 "
              } ${isAnimating ? "pointer-events-none opacity-70" : ""}`}
            >
              <div className="flex gap-3 items-center">
                {/* Project Thumbnail */}
                <div className="w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={project.favicon || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 "
                    width={64}
                    height={52}
                  />
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0 flex items-center justify-start w-3/4">
                  <div className="flex items-center gap-2 mb-1 w-full">
                    <h4 className="text-white font-medium text-base truncate  w-full">
                      {project.title}
                    </h4>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    featuredProject?.id === project.id
                      ? "bg-gradient-to-r from-zinc-300/30 to-zinc-200/20 "
                      : ""
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full "
                    style={{
                      backgroundColor: project.color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
