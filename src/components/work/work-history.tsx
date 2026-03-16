"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { workExperience } from "@/lib/work-history.data";
import { WorkModal } from "./work-modal";
import { WorkCard } from "./work-card";
import { useCloseDismiss } from "@/hooks/use-close-dismiss";
import { revealItem, revealStagger } from "@/lib/motion-presets";

export function WorkHistory() {
  const [activeItem, setActiveItem] = useState<WorkExperience | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useCloseDismiss(ref as React.RefObject<HTMLElement>, () =>
    setActiveItem(null)
  );

  return (
    <>
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background/10 dark:bg-background/50 pointer-events-none fixed inset-0 z-10 bg-blend-luminosity backdrop-blur-xl"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem ? (
          <WorkModal
            activeItem={activeItem}
            ref={ref}
            onClose={() => setActiveItem(null)}
          />
        ) : null}
      </AnimatePresence>

      <div className="flex w-full max-w-5xl flex-col gap-4 max-sm:gap-3">
        <motion.header
          variants={revealItem}
          initial="hidden"
          animate="visible"
          className="surface-1 rounded-2xl p-5 max-sm:p-4"
        >
          <p className="text-kicker mb-2">Career Evidence</p>
          <h1 className="text-section-title">Roles where I architected and shipped fullstack product delivery</h1>
          <p className="text-body mt-2">
            Each role highlights scope, execution approach, and measurable impact. Open any card for full context.
          </p>
        </motion.header>

        <motion.div
          variants={revealStagger}
          initial="hidden"
          animate="visible"
          className="relative space-y-4"
        >
          {workExperience.map((role) => (
            <motion.div key={role.company} variants={revealItem}>
              <WorkCard role={role} setActiveItem={setActiveItem} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
