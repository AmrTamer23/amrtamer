"use client";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/work", label: "Work" },
  ];

  return (
    <div className="w-full ">
      <div className="flex flex-row items-baseline justify-between px-2 py-2 w-full">
        <div className="flex items-center gap-2 w-1/3">
          <ModeToggle />
        </div>
        <div className="text-5xl font-bold font-palaise tracking-wider w-1/3 text-center">
          AT23
        </div>
        <nav className="flex gap-4 text-lg w-1/3  items-center justify-end">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} href={to}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
