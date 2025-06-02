"use client";
import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import { LinkedinIcon, MailIcon, XIcon } from "@/lib/icons";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import Header from "@/components/layout/header";
import { NavLink } from "react-router";

export default function Home() {
  return (
    <main className="flex items-center px-4 py-2 w-full flex-col h-full">
      <div className="flex-1 flex items-center justify-center mx-auto">
        <div className="flex gap-4 max-w-2xl relative border border-white/10 p-6 rounded-xl cursor-default backdrop-blur-sm bg-white/5">
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
              <MailIcon className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
              <LinkedinIcon className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
              <XIcon className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col gap-4 relative z-20">
            <div className="h-24 flex flex-col gap-1 items-start justify-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Amr Tamer
              </h1>
              <p className="text-base text-white/70">Software Engineer</p>
            </div>
            <p className="text-base text-white/60 text-balance">
              T-shaped Software Engineer with a focus on Frontend Engineering,
              an AWS Certified Cloud Practitioner, and a Computer Science
              student. Always eager to learn and explore new technologies to
              build impactful, scalable solutions.
            </p>
            <div className="flex w-full justify-end text-sm underline underline-offset-8 [&_li]:cursor-pointer [&_li]:hover:text-white">
              <ul className="flex gap-4">
                <NavLink
                  to="/resume"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Want to take a look at my resume?
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
