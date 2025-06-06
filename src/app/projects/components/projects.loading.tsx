import styles from "../loading-skeleton.module.css";

export function ProjectsLoading() {
  return (
    <div className="flex flex-col gap-8 -mt-12 min-h-screen">
      <div className="flex-1 w-full px-6 flex items-center justify-center">
        <div className="w-full h-full">
          <div className="flex gap-8 h-full min-h-[65vh] w-full min-w-[90svw] mx-auto">
            <div className="flex-1 w-8/12">
              <div className="group relative w-full h-full rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-gray-800/50 via-gray-700/30 to-gray-600/20">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 ${styles.shimmer}`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div
                      className={`w-5 h-5 bg-white/20 rounded ${styles.skeletonPulse}`}
                    />
                    <div
                      className={`h-4 w-24 bg-white/20 rounded ${styles.skeletonPulse}`}
                    />
                    <div
                      className={`w-4 h-4 bg-white/20 rounded ${styles.skeletonPulse}`}
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="max-w-2xl space-y-4">
                    <div className="space-y-2">
                      <div
                        className={`h-8 md:h-10 w-3/4 bg-white/20 rounded-lg ${styles.skeletonPulse}`}
                      />
                      <div
                        className={`h-8 md:h-10 w-1/2 bg-white/15 rounded-lg ${styles.skeletonPulse}`}
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div
                        className={`h-5 w-full bg-white/15 rounded ${styles.skeletonPulse}`}
                      />
                      <div
                        className={`h-5 w-4/5 bg-white/15 rounded ${styles.skeletonPulse}`}
                      />
                      <div
                        className={`h-5 w-3/5 bg-white/15 rounded ${styles.skeletonPulse}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full blur-2xl bg-white/20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 rounded-full blur-xl bg-white/20" />
              </div>
            </div>

            {/* Right Panel Skeleton - No ViewTransitions to avoid conflicts */}
            <div className="w-3/12">
              <div className="h-fit bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full">
                <div className="space-y-3">
                  {/* Project List Items - Simple skeleton without ViewTransitions */}
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className={`${
                          styles.skeletonItem
                        } relative p-4 rounded-xl border border-white/10 bg-white/5 ${
                          index === 0 ? "border-white/30 bg-white/10" : ""
                        }`}
                      >
                        <div className="flex gap-3 items-center">
                          {/* Project Thumbnail */}
                          <div
                            className={`w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-white/10 ${styles.skeletonPulse}`}
                          />

                          {/* Project Info */}
                          <div className="flex-1 min-w-0">
                            <div
                              className={`h-5 w-3/4 bg-white/15 rounded ${styles.skeletonPulse}`}
                            />
                          </div>

                          {/* Selection Indicator */}
                          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white/10">
                            <div
                              className={`w-3 h-3 rounded-full bg-white/20 ${styles.skeletonPulse}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
