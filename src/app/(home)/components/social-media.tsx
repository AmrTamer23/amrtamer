"use client";

import { LinkedinIcon, MailIcon, XIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

export function SocialMedia({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(
        "flex flex-col mt-0 items-center gap-4 sm:gap-6 justify-center sm:justify-center sm:w-1/3  order-2 sm:order-1 ",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="mailto:amrtamer2324@gmail.com" target="_blank">
          <MailIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 hover:text-white transition-colors cursor-pointer" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="https://www.linkedin.com/in/amrtamer23/" target="_blank">
          <LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 hover:text-white transition-colors cursor-pointer" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="https://x.com/AmrT_23" target="_blank">
          <XIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 hover:text-white transition-colors cursor-pointer" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
