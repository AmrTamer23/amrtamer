"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import logo from "../../../public/icon-512.png";
import { Link } from "next-view-transitions";

export function Header() {
  const router = useTransitionRouter();

  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/work", label: "Work" },
  ];

  useEffect(() => {
    router.prefetch("/projects");
    router.prefetch("/work");
  }, [router]);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="flex justify-center items-center order-1 sm:order-2 h-full">
        <Image src={logo} alt="logo" width={60} height={60} />
      </div>
      <nav className="flex gap-3 sm:gap-4 text-base sm:text-lg items-center justify-center sm:justify-end sm:w-1/3 order-3 ">
        {links.map(({ to, label }) => {
          return (
            <Link
              href={to}
              key={to}
              className="hover:opacity-70 select-none cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 active:bg-white/20 transition-all duration-200"
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
