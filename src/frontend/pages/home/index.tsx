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
    <main className="flex items-center px-4 py-2 w-full flex-col h-full  max-w-7xl mx-auto">
      <div className="flex-1 flex items-center justify-center ">
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
          </div>
          <div className="flex flex-col gap-4 relative z-20">
            <div className="h-fit flex flex-col gap-1 items-start justify-center">
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
                  to="https://drive.google.com/file/d/1IIVzaZ6hIsrurBNjK8KZ5aayITDQClPp/view?usp=sharing"
                  target="_blank"
                  className="text-white/80 hover:text-white transition-colors font-bold underline-offset-4"
                >
                  See My Resume!
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
