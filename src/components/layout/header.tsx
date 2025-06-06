"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { MailIcon, LinkedinIcon, XIcon } from "@/lib/icons";

export default function Header({ className }: { className?: string }) {
  const [isAnimating, setIsAnimating] = useState(false);

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  // const navigateTo = (path: string) => {
  //   if (isAnimating) return;

  //   setIsAnimating(true);

  //   router.push(path, {
  //     onTransitionReady: slideInOut,
  //   });

  //   setTimeout(() => {
  //     setIsAnimating(false);
  //   }, 1500);
  // };
  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/work", label: "Work" },
  ];

  return (
    <header
      className={cn("w-full max-w-7xl mx-auto mix-blend-luminosity", className)}
    >
      <div className="flex flex-row items-center justify-between py-4 w-full">
        <div className="flex items-center gap-6 w-1/3 justify-center">
          <MailIcon className="w-6 h-6 text-white/80  transition-colors" />
          <LinkedinIcon className="w-6 h-6 text-white/80  transition-colors" />
          <XIcon className="w-6 h-6 text-white/80  transition-colors" />
        </div>

        <div className="text-5xl font-bold font-palaise tracking-wider w-1/3 text-center ">
          AT23
        </div>
        <nav className="flex gap-4 text-lg w-1/3  items-center justify-end">
          {links.map(({ to, label }) => {
            return (
              <NavLink key={to} to={to} prefetch="viewport">
                {label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
