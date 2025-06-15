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
      <div className="flex flex-row items-center justify-between py-4 w-full">
        <motion.div
          className="flex items-center gap-6 w-1/3 justify-center -mt-5"
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
              <MailIcon className="w-6 h-6 text-white/80 hover:text-white transition-colors cursor-pointer" />
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
              <LinkedinIcon className="w-6 h-6 text-white/80 hover:text-white transition-colors cursor-pointer" />
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
              <XIcon className="w-6 h-6 text-white/80 hover:text-white transition-colors cursor-pointer" />
            </Link>
          </motion.div>
        </motion.div>

        <BrandTransition>
          <div className="w-1/3 text-center select-none flex justify-center items-center">
            <Image
              src="https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYhdFEO5WgzJQeLF6kocmEDwHZG9qd2uRI1Sif"
              alt="AT23 Logo"
              width={125}
              height={125}
              className="object-contain -mt-10"
              priority
            />
          </div>
        </BrandTransition>
        <nav className="flex gap-4 text-lg w-1/3  items-center justify-end -mt-5">
          {links.map(({ to, label }) => {
            return (
              <NavItemTransition key={to} href={to}>
                <button
                  onClick={() => handleNavigation(to)}
                  className="hover:opacity-70 transition-opacity select-none cursor-pointer"
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
