import { motion } from "motion/react";
import type { JSX, RefObject } from "react";
import { X } from "lucide-react";

export function WorkModal({
  activeItem,
  ref,
  onClose,
}: {
  activeItem: {
    company: string;
    logo: JSX.Element;
    title: string;
    description: string;
    duration: string;
    location: string;
    type: string;
    technologies: string[];
  };
  ref: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-4">
      <motion.div
        className="bg-card dark:bg-card border border-border flex  w-[95%] md:w-[90%] max-w-2xl  flex-col items-start gap-4 overflow-hidden p-4 md:p-6 shadow-lg max-h-[90vh]  relative"
        layoutId={`workItem-${activeItem.company}`}
        style={{ borderRadius: 12 }}
        ref={ref}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 -right-2 md:top-6 md:right-5  rounded-full  transition-colors z-10 cursor-pointer"
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
              <span>📍 {activeItem.location}</span>
              <span className="inline">|</span>
              <span>{activeItem.duration}</span>
              <span className="inline">|</span>
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

        {activeItem.technologies.length > 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="w-full"
          >
            <h4 className="font-semibold text-foreground mb-2 text-base md:text-lg">
              Technologies & Tools:
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeItem.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent/50 text-accent-foreground text-xs md:text-sm rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
