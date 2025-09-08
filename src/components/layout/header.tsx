"use client";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import logo from "../../../public/icon-512.png";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function Header() {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/work", label: "Work" },
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

  useEffect(() => {
    router.prefetch("/projects");
    router.prefetch("/work");
  }, [router]);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between lg:justify-center relative z-10">
      <div className="flex justify-center items-center order-1 sm:order-2 h-full text-2xl font-bold font-xanh-mono">
        <div className="flex items-baseline gap-2">
          <span className="inline-block w-[10ch] whitespace-nowrap text-4xl tracking-wider">
            Amr Tamer
          </span>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key="breadcrumb-sep"
              className="hidden sm:inline opacity-50"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              aria-hidden="true"
              style={{
                width: "1ch",
              }}
              role="presentation"
            >
              {breadcrumb ? "/" : ""}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={breadcrumb}
              className="hidden sm:inline items-center text-2xl font-normal opacity-90"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-hidden="true"
              role="presentation"
              style={{
                width: "1ch",
              }}
            >
              {breadcrumb}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <nav className="flex gap-3 sm:gap-4 text-base sm:text-lg items-center justify-center sm:justify-end sm:w-1/3 order-3 ">
        {links.map(({ to, label }) => {
          return (
            <Link
              href={to}
              key={to}
              className={cn(
                " select-none cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 transition-all duration-200",
                pathname === to && "bg-white/15"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
