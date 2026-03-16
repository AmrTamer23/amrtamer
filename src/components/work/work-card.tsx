import { motion } from "motion/react";
import { BriefcaseBusiness, MapPin, Timer } from "lucide-react";
import { normalizeWorkNarrative } from "@/lib/content-normalizers";
import { EvidenceChip } from "@/components/ui/evidence-chip";
import { elevateHover } from "@/lib/motion-presets";

export function WorkCard({
  role,
  setActiveItem,
}: {
  role: WorkExperience;
  setActiveItem: (item: WorkExperience) => void;
}) {
  const narrative = normalizeWorkNarrative(role);

  return (
    <motion.article
      layoutId={`workItem-${role.company}`}
      className="group border-white/10 bg-[var(--surface-1)] hover:bg-[var(--surface-2)] flex w-full cursor-pointer flex-col items-start gap-3 md:gap-4 border p-4 max-sm:p-3.5 shadow-sm transition-colors rounded-xl mobile-tap-target"
      onClick={() => setActiveItem(role)}
      {...elevateHover}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 w-full">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {role.logo}
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <motion.div
            className="text-[var(--text-strong)] font-semibold text-lg line-clamp-1"
            layoutId={`workItemCompany-${role.company}`}
          >
            {role.company}
          </motion.div>
          <motion.div
            className="text-[var(--text-soft)] text-sm md:text-base line-clamp-2"
            layoutId={`workItemTitle-${role.company}`}
          >
            {role.title}
          </motion.div>
          <motion.div
            className="text-[var(--text-soft)] flex flex-wrap gap-3 text-xs md:text-sm mt-1"
            layoutId={`workItemExtras-${role.company}`}
          >
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Timer className="size-3.5" />
              {role.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <BriefcaseBusiness className="size-3.5" />
              {role.type}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        <div className="surface-2 rounded-lg p-3">
          <p className="text-meta mb-1">Scope</p>
          <p className="text-sm text-[var(--text-strong)]/90 line-clamp-3">
            {narrative.scope[0]}
          </p>
        </div>
        <div className="surface-2 rounded-lg p-3">
          <p className="text-meta mb-1">Result</p>
          <p className="text-sm text-[var(--text-strong)]/90 line-clamp-3">
            {narrative.result}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {narrative.achievements.slice(0, 2).map((achievement, index) => (
          <EvidenceChip key={`${role.company}-achievement-${index}`} value={achievement} />
        ))}
      </div>
    </motion.article>
  );
}
