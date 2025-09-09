"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { workExperience } from "@/lib/work-history.data";
import { WorkModal } from "./work-modal";
import { WorkCard } from "./work-card";

export function WorkHistory() {
  const [activeItem, setActiveItem] = useState<{
    company: string;
    logo: JSX.Element;
    title: string;
    description: string;
    duration: string;
    location: string;
    type: string;
    technologies: string[];
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () =>
    setActiveItem(null)
  );

  useEffect(() => {
    function onKeyDown(event: { key: string }) {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

          {workExperience.map((role, index) => (
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
