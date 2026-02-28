import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, EyeIcon, Sparkles } from "lucide-react";
import { getReadableTextColor } from "@/lib/utils";
import { memo, useEffect, type RefObject } from "react";
import { useImageCache } from "@/hooks/use-image-cache";
import { Link } from "next-view-transitions";
import { NarrativeBlock } from "@/components/ui/narrative-block";
import { normalizeProjectNarrative } from "@/lib/content-normalizers";
import { panelTransition } from "@/lib/motion-presets";

function SelectedProjectComponent({
  featuredProject,
  featuredContainer,
  onViewProject,
}: {
  featuredProject: OptimizedProject | null;
  featuredContainer: RefObject<HTMLDivElement | null>;
  onViewProject?: (project: OptimizedProject) => void;
}) {
  const { preloadImages } = useImageCache();

  const handleViewProject = () => {
    if (
      featuredProject &&
      onViewProject &&
      featuredProject.status === "completed"
    ) {
      onViewProject(featuredProject);
    }
  };

  useEffect(() => {
    if (featuredProject?.images?.length) {
      preloadImages(featuredProject.images);
    }
  }, [featuredProject?.slug, preloadImages, featuredProject?.images]);

  if (!featuredProject) {
    return (
      <div
        className="flex-1 lg:w-8/12 max-sm:order-1 max-sm:w-full max-w-5xl mx-auto"
        ref={featuredContainer}
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/70">
          Select a project to view details.
        </div>
      </div>
    );
  }

  const statusLabel =
    featuredProject.status === "completed"
      ? "Completed"
      : featuredProject.status === "in-progress"
        ? "In Progress"
        : "Planning";
  const hasHeroImage = Boolean(featuredProject.optimizedMainImage?.src);
  const narrative = normalizeProjectNarrative(featuredProject);

  return (
    <div
      className="flex-1 lg:w-8/12 max-sm:order-1 max-sm:w-full max-w-5xl mx-auto"
      ref={featuredContainer}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`selected-${featuredProject.slug}`}
          className="group relative w-full rounded-2xl overflow-hidden border border-white/15 cursor-default max-sm:w-full bg-[var(--surface-1)] backdrop-blur-md"
          style={{
            background: `linear-gradient(145deg, ${featuredProject.color}16, rgba(255,255,255,0.02) 60%)`,
          }}
          initial={panelTransition.initial}
          animate={panelTransition.animate}
          exit={panelTransition.exit}
          transition={panelTransition.transition}
        >
          <div className="p-4 md:p-5 space-y-4">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/35">
              {hasHeroImage ? (
                <>
                  <Image
                    key={`selected-img-${featuredProject.slug}`}
                    src={featuredProject.optimizedMainImage.src}
                    alt={featuredProject.title}
                    fill
                    className="featured-image absolute inset-0 object-cover"
                    priority={featuredProject.isPriority}
                    fetchPriority={featuredProject.isPriority ? "high" : "auto"}
                    placeholder="blur"
                    blurDataURL={featuredProject.optimizedMainImage.blurDataURL}
                    unoptimized={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 65vw, 58vw"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </>
              ) : (
                <div className="absolute inset-0 grid place-items-center px-6 text-center">
                  <div className="space-y-2">
                    <Sparkles className="size-5 mx-auto text-white/70" />
                    <p className="text-white/70 text-sm">
                      Visual preview will be added as this project matures.
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 backdrop-blur-sm">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: featuredProject.color }}
                />
                <span className="text-xs uppercase tracking-[0.14em] text-white/95">
                  {statusLabel}
                </span>
              </div>

              {featuredProject.status === "completed" && (
                <div className="absolute top-3 right-3 z-[1]">
                  <Button
                    className="rounded-lg cursor-pointer hover:opacity-85 transition-all duration-200 items-center"
                    style={{
                      background: `${featuredProject.color}`,
                      color: getReadableTextColor(featuredProject.color),
                    }}
                    onClick={handleViewProject}
                    size="md"
                    variant="primary"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">Gallery & Details</span>
                  </Button>
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto] items-start">
              <div className="space-y-2">
                <p className="text-kicker">Project Case</p>
                <h2 className="text-section-title">{featuredProject.title}</h2>
                <p className="text-body">
                  {featuredProject.brief || narrative.overview}
                </p>
              </div>
              {featuredProject.link ? (
                <Button
                  className="rounded-md md:self-start"
                  variant="outline"
                  size="md"
                  asChild
                >
                  <Link
                    href={featuredProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Live Site</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[var(--surface-2)] p-4 space-y-1.5">
                <h3 className="text-meta">Problem</h3>
                <p className="text-sm text-[var(--text-strong)]/90 leading-relaxed">
                  {narrative.problem}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[var(--surface-2)] p-4 space-y-1.5">
                <h3 className="text-meta">My Role</h3>
                <p className="text-sm text-[var(--text-strong)]/90 leading-relaxed">
                  {narrative.role}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NarrativeBlock title="Constraints" items={narrative.constraints} />
              <NarrativeBlock title="Decisions" items={narrative.decisions} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NarrativeBlock title="Outcome" items={narrative.impact} />
              <NarrativeBlock title="Lessons" items={narrative.lessons} />
            </div>
            {/* 
            {featuredProject.status !== "completed" ? (
              <StatusPulse
                status={featuredProject.status}
                note={narrative.statusNote}
                lastUpdated={featuredProject.lastUpdated}
              />
            ) : null} */}

            <div className="rounded-xl border border-white/10 bg-[var(--surface-2)] p-4 space-y-2">
              <h3 className="text-meta">Tech Stack</h3>
              {featuredProject.techStack.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {featuredProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs rounded-full border"
                      style={{
                        backgroundColor: `${featuredProject.color}20`,
                        borderColor: `${featuredProject.color}50`,
                        color: featuredProject.color,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--text-soft)]">Stack details coming soon.</p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const SelectedProject = memo(SelectedProjectComponent);
