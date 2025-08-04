"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/icon-512.png";
import Link from "next/link";

export function Header() {
  const router = useRouter();

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
    <>
      <div className="flex justify-center items-center order-1 sm:order-2 h-full">
        <Image src={logo} alt="logo" width={60} height={60} />
      </div>
      <nav className="flex gap-3 sm:gap-4 text-base sm:text-lg items-center justify-center sm:justify-end sm:w-1/3 order-3 ">
        {links.map(({ to, label }) => {
          return (
            <Link
              href={to}
              className="hover:opacity-70 select-none cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 active:bg-white/20 transition-all duration-200"
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
