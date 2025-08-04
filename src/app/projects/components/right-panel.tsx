import Image from "next/image";

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
    <div className="w-3/12 max-sm:w-full max-sm:order-2 max-sm:pb-8">
      <div className="h-fit bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full">
        <div className="space-y-3 max-h-[calc(100%-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent w-full">
          {projects.map((project, index) => (
            <div key={project.id} id={`sidebar-${project.id}`}>
              <div
                onClick={() => handleProjectSelect(project)}
                className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer w-full ${
                  featuredProject?.id === project.id
                    ? "border-white/30 bg-white/10  shadow-lg"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 "
                } ${isAnimating ? "pointer-events-none opacity-70" : ""}`}
              >
                <div className="flex gap-3 items-center">
                  {/* Project Thumbnail */}
                  <div className="w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={project.favicon || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                      width={64}
                      height={64}
                      loading={index > 0 ? "lazy" : "eager"}
                      sizes="64px"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <h4 className="text-white font-medium text-base truncate flex-1">
                        {project.title}
                      </h4>
                    </div>
                    {/* Status badge below title */}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
