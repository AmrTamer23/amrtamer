"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import type { SVGProps } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { workExperience } from "@/lib/work-history.data";

export const Freelance = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TechCompany = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="2"
      y="3"
      width="20"
      height="14"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="8"
      y1="21"
      x2="16"
      y2="21"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="12"
      y1="17"
      x2="12"
      y2="21"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Startup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function WorkHistoryComponent() {
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
            className="bg-background/10 dark:bg-background/50 pointer-events-none absolute inset-0 z-10 bg-blend-luminosity backdrop-blur-xl"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem ? (
          <>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto">
              <motion.div
                className="bg-card dark:bg-card border border-border flex h-fit w-[90%] max-w-2xl cursor-pointer flex-col items-start gap-4 overflow-hidden p-6 shadow-lg rounded-xl"
                ref={ref}
                layoutId={`workItem-${activeItem.company}`}
                style={{ borderRadius: 12 }}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="text-2xl text-primary">{activeItem.logo}</div>

                  <div className="flex flex-col gap-1 flex-1">
                    <motion.div
                      className="text-muted-foreground text-base font-medium"
                      layoutId={`workItemCompany-${activeItem.company}`}
                    >
                      {activeItem.company}
                    </motion.div>

                    <motion.p
                      layoutId={`workItemTitle-${activeItem.company}`}
                      className="text-foreground text-lg font-semibold"
                    >
                      {activeItem.title}
                    </motion.p>

                    <motion.div
                      className="text-muted-foreground flex flex-row gap-2 text-base"
                      layoutId={`workItemExtras-${activeItem.company}`}
                    >
                      📍 {activeItem.location} | {activeItem.duration} |{" "}
                      {activeItem.type}
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="text-foreground text-base leading-relaxed space-y-4 w-full"
                >
                  <p>{activeItem.description}</p>

                  {activeItem.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">
                        Technologies & Tools:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent/50 text-accent-foreground text-sm rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex w-full max-w-2xl flex-col gap-4 p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4 leading-tight">
            Work Experience
          </h1>
          <p className="text-muted-foreground text-lg">
            My professional journey and career highlights
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-10 top-8 bottom-8 w-0.5 bg-border"></div>

          {workExperience.map((role, index) => (
            <div
              key={role.company}
              className="relative flex items-start gap-6 mb-6 last:mb-0"
            >
              {/* Timeline node with date */}
              <div className="relative  flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm">
                  <div className="text-xs font-semibold text-foreground text-center leading-tight">
                    {role.duration.split(" - ")[0]}
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-primary/10 "></div>
              </div>

              {/* Work item card */}
              <motion.div
                layoutId={`workItem-${role.company}`}
                className="group border-border bg-card dark:bg-card hover:bg-accent/50 flex w-full cursor-pointer flex-row items-center gap-4 border p-4 shadow-sm transition-colors rounded-lg flex-1"
                onClick={() => setActiveItem(role)}
                style={{ borderRadius: 8 }}
              >
                <div className="text-xl text-primary">{role.logo}</div>

                <div className="flex flex-col gap-1 flex-1">
                  <motion.div
                    className="text-foreground font-semibold text-lg"
                    layoutId={`workItemCompany-${role.company}`}
                  >
                    {role.company}
                  </motion.div>
                  <motion.div
                    className="text-muted-foreground text-base"
                    layoutId={`workItemTitle-${role.company}`}
                  >
                    {role.title}
                  </motion.div>

                  <motion.div
                    className="text-muted-foreground flex flex-row gap-2 text-sm"
                    layoutId={`workItemExtras-${role.company}`}
                  >
                    📍 {role.location} | {role.duration} | {role.type}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
