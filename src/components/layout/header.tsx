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
      className={cn("w-full max-w-2xl mx-auto mix-blend-luminosity", className)}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 w-full ">
        <BrandTransition>
          <div className="flex justify-center items-center order-1 sm:order-2 ">
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
        <nav className="flex gap-3 sm:gap-4 text-base sm:text-lg items-center justify-center sm:justify-end sm:w-1/3 sm:-mt-5 order-3 ">
          {links.map(({ to, label }) => {
            return (
              <NavItemTransition key={to} href={to}>
                <button
                  onClick={() => handleNavigation(to)}
                  className="hover:opacity-70 select-none cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 active:bg-white/20 transition-all duration-200"
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
