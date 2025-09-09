"use client";

import { GithubIcon, LinkedinIcon, MailIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

export function SocialMedia({ className }: { className?: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const socialLinks = [
    {
      href: "mailto:amrtamer2324@gmail.com",
      icon: MailIcon,
      label: "Send email to Amr Tamer",
      delay: 0.4,
    },
    {
      href: "https://www.linkedin.com/in/amrtamer23/",
      icon: LinkedinIcon,
      label: "View Amr Tamer's LinkedIn profile",
      delay: 0.6,
    },
    {
      href: "https://github.com/AmrTamer23",
      icon: GithubIcon,
      label: "Follow Amr Tamer on GitHub",
      delay: 0.8,
    },
  ];

  const MotionWrapper = prefersReducedMotion ? "div" : (motion.div as any);
  const MotionItem = prefersReducedMotion ? "div" : (motion.div as any);

  const containerProps = !prefersReducedMotion
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut",
        },
      }
    : {};

  return (
    <nav
      aria-label="Social media links"
      role="navigation"
      className="w-full items-center justify-center flex"
    >
      <MotionWrapper
        className={cn(
          "flex flex-col mt-0 items-center gap-4 sm:gap-6 justify-center sm:justify-center sm:w-1/3 order-2 sm:order-1",
          className
        )}
        {...containerProps}
      >
        {socialLinks.map(({ href, icon: Icon, label, delay }) => {
          const itemProps = !prefersReducedMotion
            ? {
                initial: { opacity: 0, scale: 0.8, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: {
                  duration: 0.6,
                  delay,
                  ease: "easeOut",
                },
                whileHover: {
                  transition: { duration: 0.2 },
                },
                whileTap: { scale: 0.95 },
              }
            : {};

          return (
            <MotionItem key={href} {...itemProps}>
              <Link
                href={href}
                target={href.startsWith("mailto:") ? "_self" : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                aria-label={label}
                className="inline-flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:ring-offset-2 focus:ring-offset-transparent transition-colors hover:bg-white/10"
              >
                <Icon
                  className="size-28  [&_path]:fill-white/80 hover:[&_path]:fill-white transition-colors"
                  aria-hidden="true"
                  focusable="false"
                />
              </Link>
            </MotionItem>
          );
        })}
      </MotionWrapper>
    </nav>
  );
}
