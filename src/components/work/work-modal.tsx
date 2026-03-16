import { motion } from "motion/react";
import type { RefObject } from "react";
import { X } from "lucide-react";
import { normalizeWorkNarrative } from "@/lib/content-normalizers";
import { NarrativeBlock } from "@/components/ui/narrative-block";
import { EvidenceChip } from "@/components/ui/evidence-chip";

export function WorkModal({
  activeItem,
  ref,
  onClose,
}: {
  activeItem: WorkExperience;
  ref: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const narrative = normalizeWorkNarrative(activeItem);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-4 max-sm:p-2 max-sm:pb-[max(env(safe-area-inset-bottom),0.5rem)]">
      <motion.div
        className="bg-card dark:bg-card border border-border flex w-[95%] md:w-[90%] max-w-4xl flex-col items-start gap-4 overflow-hidden p-4 md:p-6 max-sm:p-3.5 shadow-lg max-h-[90vh] max-sm:max-h-[95svh] max-sm:overflow-y-auto relative"
        layoutId={`workItem-${activeItem.company}`}
        style={{ borderRadius: 12 }}
        ref={ref}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-5 rounded-full transition-colors z-10 cursor-pointer h-10 w-10 flex items-center justify-center mobile-tap-target"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 md:w-6 md:h-6 text-foreground" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 w-full pr-10">
          {activeItem.logo}

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <motion.div
              className="text-muted-foreground text-sm md:text-base font-medium"
              layoutId={`workItemCompany-${activeItem.company}`}
            >
              {activeItem.company}
            </motion.div>

            <motion.p
              layoutId={`workItemTitle-${activeItem.company}`}
              className="text-foreground text-base md:text-lg font-semibold line-clamp-2"
            >
              {activeItem.title}
            </motion.p>

            <motion.div
              className="text-muted-foreground flex flex-wrap gap-1 sm:gap-2 text-sm md:text-base"
              layoutId={`workItemExtras-${activeItem.company}`}
            >
              <span>{activeItem.location}</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>{activeItem.duration}</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>{activeItem.type}</span>
            </motion.div>
          </div>
        </div>

        <motion.p
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="text-foreground text-sm md:text-base leading-relaxed w-full"
        >
          {activeItem.description}
        </motion.p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <NarrativeBlock title="Scope" items={narrative.scope} />
          <NarrativeBlock title="Achievements" items={narrative.achievements} />
        </div>
        <section className="w-full">
          <h4 className="text-meta mb-2">What Changed</h4>
          <p className="text-sm text-[var(--text-strong)]/90 leading-relaxed">
            {narrative.result}
          </p>
        </section>

        <section className="w-full">
          <h4 className="text-meta mb-2">Stack Highlights</h4>
          <div className="flex flex-wrap gap-2">
            {narrative.stackHighlights.map((tech, index) => (
              <EvidenceChip key={`${tech}-${index}`} value={tech} />
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
