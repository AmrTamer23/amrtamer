"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { workExperience } from "@/lib/work-history.data";
import { WorkModal } from "./work-modal";
import { WorkCard } from "./work-card";
import { useCloseDismiss } from "@/hooks/use-close-dismiss";

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

      <div className="flex w-full max-w-2xl flex-col gap-4 ">
        <div className="relative">
          <div className="absolute left-8 md:left-10 top-8 bottom-8 w-0.5 bg-border"></div>

          {workExperience.map((role) => (
            <WorkCard
              key={role.company}
              role={role}
              setActiveItem={setActiveItem}
            />
          ))}
        </div>
      </div>
    </>
  );
}
