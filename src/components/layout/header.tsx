"use client";
import { useTransition, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MailIcon, LinkedinIcon, XIcon } from "@/lib/icons";
import {
  BrandTransition,
  NavItemTransition,
} from "@/components/view-transition";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";

export default function Header({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/work", label: "Work" },
  ];

  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  useEffect(() => {
    router.prefetch("/projects");
    router.prefetch("/work");
  }, [router]);

  return (
    <header
      className={cn("w-full max-w-7xl mx-auto mix-blend-luminosity", className)}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 w-full gap-4 sm:gap-0">
        {/* Mobile-first responsive social links */}
        <motion.div
          className="flex items-center gap-4 sm:gap-6 justify-center sm:justify-center sm:w-1/3 sm:-mt-5 order-2 sm:order-1"
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
            <Link
              href="https://www.linkedin.com/in/amrtamer23/"
              target="_blank"
            >
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

        {/* Logo - centered on mobile, responsive sizing */}
        <BrandTransition>
          <div className="flex justify-center items-center order-1 sm:order-2 sm:w-1/3">
            <Image
              src="https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYhdFEO5WgzJQeLF6kocmEDwHZG9qd2uRI1Sif"
              alt="AT23 Logo"
              width={100}
              height={100}
              className="object-contain -mt-2 sm:-mt-10 w-20 h-20 sm:w-[125px] sm:h-[125px]"
              priority
            />
          </div>
        </BrandTransition>

        {/* Navigation - responsive text size and spacing */}
        <nav className="flex gap-3 sm:gap-4 text-base sm:text-lg items-center justify-center sm:justify-end sm:w-1/3 sm:-mt-5 order-3">
          {links.map(({ to, label }) => {
            return (
              <NavItemTransition key={to} href={to}>
                <button
                  onClick={() => handleNavigation(to)}
                  className="hover:opacity-70 transition-opacity select-none cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 active:bg-white/20 transition-all duration-200"
                  disabled={isPending}
                >
                  {label}
                </button>
              </NavItemTransition>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
