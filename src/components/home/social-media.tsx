"use client";

import { GithubIcon, LinkedinIcon, MailIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import React from "react";

export function SocialMedia({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

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

  const MotionWrapper: React.ElementType = prefersReducedMotion ? "div" : motion.div;
  const MotionItem: React.ElementType = prefersReducedMotion ? "div" : motion.div;

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
      className="items-center justify-center flex"
    >
      <MotionWrapper
        className={cn(
          "flex flex-row mt-0 items-center gap-1.5 justify-center",
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
              <a
                href={href}
                target={href.startsWith("mailto:") ? "_self" : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                aria-label={label}
                className="inline-flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/35 focus:ring-offset-2 focus:ring-offset-transparent transition-colors hover:bg-white/10"
              >
                <Icon
                  className="size-6 sm:size-7 [&_path]:fill-white/80 hover:[&_path]:fill-white transition-colors"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </MotionItem>
          );
        })}
      </MotionWrapper>
    </nav>
  );
}
