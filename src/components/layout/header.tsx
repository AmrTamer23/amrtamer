"use client";
import { useMemo } from "react";
import { usePathname } from "@/hooks/use-pathname";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { revealItem } from "@/lib/motion-presets";

export function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    // { to: "/work", label: "Work"   },
  ];

  const breadcrumb = useMemo(() => {
    if (!pathname || pathname === "/") return null;
    const segments = pathname.split("/").filter(Boolean);
    const current = segments[segments.length - 1] ?? "";
    const pretty = current
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    return pretty || "";
  }, [pathname]);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between lg:justify-between relative z-10 flex-col lg:flex-row gap-6 max-sm:gap-4 max-sm:px-1">
      <motion.div
        variants={revealItem}
        initial="hidden"
        animate="visible"
        className="flex justify-center items-center order-1 h-full max-sm:w-full"
      >
        <div
          className={cn(
            "flex items-baseline max-sm:flex-wrap max-sm:justify-center",
            breadcrumb ? "gap-2" : "gap-0 lg:gap-2"
          )}
        >
          <span
            className={cn(
              "inline-block font-display! whitespace-nowrap max-sm:whitespace-normal text-2xl sm:text-3xl lg:text-4xl tracking-wide text-[var(--text-strong)] font-[var(--font-display)] text-center"
            )}
          >
            Amr Tamer
          </span>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key="breadcrumb-sep"
              className={cn("opacity-50 lg:w-[1ch]")}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              aria-hidden="true"
              role="presentation"
            >
              {breadcrumb ? "/" : ""}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={breadcrumb}
              className={cn(
                "items-center text-base sm:text-xl lg:text-2xl font-normal text-[var(--text-soft)]"
              )}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              aria-hidden="true"
              role="presentation"
            >
              {breadcrumb}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
      <nav className="flex gap-2 text-sm sm:text-base items-center justify-center order-3 rounded-full border border-white/10 bg-[var(--surface-1)] px-2 py-1 max-sm:w-full max-sm:flex-wrap max-sm:justify-center max-sm:rounded-2xl max-sm:px-2.5 max-sm:py-2">
        {links.map(({ to, label }) => {
          const isActive = pathname === to;
          return (
            <a
              href={to}
              key={to}
              className={cn(
                "select-none cursor-pointer px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 max-sm:min-h-11 max-sm:px-4 mobile-tap-target",
                isActive
                  ? "bg-white/14 text-[var(--text-strong)]"
                  : "text-[var(--text-soft)] hover:text-[var(--text-strong)] hover:bg-white/8"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
