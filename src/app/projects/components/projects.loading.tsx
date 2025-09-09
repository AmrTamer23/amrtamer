import styles from "../loading-skeleton.module.css";

export function ProjectsLoading() {
  return (
    <div className="flex-1 w-full flex items-center h-full max-sm:items-stretch max-sm:px-4 max-sm:py-4">
      <div className="flex gap-4 h-full  mx-auto max-sm:flex-col  max-sm:gap-6 flex-1 justify-center items-center">
        <div className="flex-1 lg:w-6/12 max-sm:order-1 max-sm:w-full max-w-5xl mx-auto aspect-[3/2] h-fit max-sm:aspect-[4/3] ">
          <div className="group relative w-full h-full rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br from-gray-800/50 via-gray-700/30 to-gray-600/20">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 ${styles.shimmer}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent max-sm:via-black/40" />

            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <div
                  className={`w-5 h-5 bg-white/20 rounded ${styles.skeletonPulse}`}
                />
                <div
                  className={`h-4 w-24 bg-white/20 rounded ${styles.skeletonPulse}`}
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-8 py-4 max-sm:p-4">
              <div className="max-w-2xl flex flex-col gap-2 max-sm:max-w-none">
                <div
                  className={`h-8 md:h-10 w-3/4 bg-white/20 rounded-lg ${styles.skeletonPulse}`}
                />
                <div
                  className={`h-5 w-full bg-white/15 rounded ${styles.skeletonPulse}`}
                />
                <div
                  className={`h-5 w-4/5 bg-white/15 rounded ${styles.skeletonPulse}`}
                />
              </div>
            </div>

            <div className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full blur-2xl bg-white/20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 rounded-full blur-xl bg-white/20" />
          </div>
        </div>

        <div className="max-w-xs mx-auto w-full max-sm:w-full max-sm:order-2 max-sm:pb-6 max-sm:max-w-none flex flex-col justify-start items-start h-fit max-sm:z-0">
          <div className="flex flex-col gap-2 overflow-y-auto max-sm:max-h-none max-sm:overflow-visible scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent w-full">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={`${
                    styles.skeletonItem
                  } group relative p-4 rounded-xl border transition-all duration-300 w-full ${
                    index === 0
                      ? "border-white/20 bg-white/5 shadow-lg"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex gap-3 items-center max-sm:gap-2">
                    <div
                      className={`w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-white/10 ${styles.skeletonPulse}`}
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div
                        className={`h-5 w-3/4 bg-white/15 rounded ${styles.skeletonPulse}`}
                      />
                    </div>
                    <div className="flex-shrink-0  rounded-full flex items-center justify-center opacity-90">
                      <div
                        className={`size-2.5 rounded-full bg-white/20 ${styles.skeletonPulse}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
