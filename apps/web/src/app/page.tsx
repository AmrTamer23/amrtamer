"use client";
import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import { LinkedinIcon, MailIcon, XIcon } from "@/lib/icons";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import { useTransitionRouter } from "next-view-transitions";

export default function Home() {
  const router = useTransitionRouter();
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

  const navigateTo = (path: string) => {
    if (isAnimating) return;

    setIsAnimating(true);

    router.push(path, {
      onTransitionReady: slideInOut,
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <main className=" mx-auto flex items-center justify-center px-4 py-2 w-full h-svh">
      <div className="flex gap-4  max-w-2xl relative rounded-2xl border p-6 md:rounded-3xl cursor-default">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="flex-col flex gap-6 items-center justify-center h-full relative z-20">
          <img
            src="https://avatars.githubusercontent.com/u/122938074?v=4"
            alt="logo"
            width={500}
            height={500}
            className="rounded-full max-w-24 max-h-24"
          />
          <div className="flex flex-col gap-4">
            <MailIcon className="w-6 h-6" />
            <LinkedinIcon className="w-6 h-6" />
            <XIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-col gap-4 relative z-20">
          <div className="h-24 flex flex-col gap-1 items-start justify-center">
            <h1 className="text-2xl font-bold">Amr Tamer</h1>
            <p className="text-base text-muted-foreground">Software Engineer</p>
          </div>
          <p className="text-base text-muted-foreground text-balance">
            T-shaped Software Engineer with a focus on Frontend Engineering, an
            AWS Certified Cloud Practitioner, and a Computer Science student.
            Always eager to learn and explore new technologies to build
            impactful, scalable solutions.
          </p>
          <div className="flex w-full justify-end font-mono text-sm underline underline-offset-4 [&_li]:cursor-pointer [&_li]:hover:text-primary [&_li]:after:content-['->']">
            <ul className="flex gap-4">
              <li onClick={() => navigateTo("/work")}>Work History</li>
              <li onClick={() => navigateTo("/projects")}>Projects</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
