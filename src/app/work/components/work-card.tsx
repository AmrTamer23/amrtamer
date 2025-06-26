import { motion } from "motion/react";
import type { JSX } from "react";

export function WorkCard({
  role,
  setActiveItem,
}: {
  role: {
    company: string;
    logo: JSX.Element;
    title: string;
    description: string;
    duration: string;
    location: string;
    type: string;
    technologies: string[];
  };
  setActiveItem: (item: any) => void;
}) {
  return (
    <div
      key={role.company}
      className="relative flex items-start gap-4 md:gap-6 mb-6 last:mb-0"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm">
          <div className="text-[10px] md:text-xs font-semibold text-foreground text-center leading-tight px-1">
            {role.duration.split(" - ")[0]}
          </div>
        </div>

        <div className="absolute inset-0 w-16 md:w-20 h-16 md:h-20 rounded-full bg-primary/10 "></div>
      </div>

      <motion.div
        layoutId={`workItem-${role.company}`}
        className="group border-border bg-card dark:bg-card hover:bg-accent/50 flex w-full cursor-pointer flex-col items-start gap-3 md:gap-4 border  p-4 shadow-sm transition-colors flex-1"
        onClick={() => setActiveItem(role)}
        style={{ borderRadius: 12 }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full">
          {role.logo}

          <div className="flex flex-col gap-1 flex-1 min-w-0 justify-center items-center sm:items-start">
            <motion.div
              className="text-foreground font-semibold text-base md:text-lg line-clamp-1"
              layoutId={`workItemCompany-${role.company}`}
            >
              {role.company}
            </motion.div>
            <motion.div
              className="text-muted-foreground text-sm md:text-base line-clamp-2"
              layoutId={`workItemTitle-${role.company}`}
            >
              {role.title}
            </motion.div>

            <motion.div
              className="text-muted-foreground flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs md:text-sm justify-center items-center sm:items-start"
              layoutId={`workItemExtras-${role.company}`}
            >
              <span>📍 {role.location}</span>
              <span className="hidden sm:inline">|</span>
              <span>{role.duration}</span>
              <span className="hidden sm:inline">|</span>
              <span>{role.type}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
