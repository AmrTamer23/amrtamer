import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import Link from "next/link";
import { AppViewTransition } from "@/components/view-transition";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center px-4 py-2 w-full flex-col h-full  max-w-7xl mx-auto">
      <div className="flex-1 flex items-center justify-center ">
        <div className="flex gap-4 max-w-2xl relative border border-white/10 p-6 rounded-xl cursor-default backdrop-blur-sm bg-white/5">
          <GlowingEffect
            disabled={false}
            blur={1}
            proximity={9999}
            spread={100}
            variant="default"
            glow={true}
            movementDuration={1.5}
            borderWidth={2}
          />
          <div className="flex-col flex gap-6 items-center justify-center h-full relative z-20">
            <AppViewTransition name="profile-image">
              <Image
                src="https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYhhXudoWgzJQeLF6kocmEDwHZG9qd2uRI1Sif"
                alt="logo"
                width={100}
                height={100}
                className="rounded-full max-w-24 max-h-24 object-cover object-start"
                priority
                fetchPriority="high"
              />
            </AppViewTransition>
          </div>
          <div className="flex flex-col gap-4 relative z-20">
            <AppViewTransition name="profile-info">
              <div className="h-fit flex flex-col gap-1 items-start justify-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Amr Tamer
                </h1>
                <p className="text-base text-white/70">Software Engineer</p>
              </div>
            </AppViewTransition>
            <p className="text-base text-white/60 text-balance">
              T-shaped Software Engineer with a focus on Frontend Engineering,
              an AWS Certified Cloud Practitioner, and a Computer Science
              student. Always eager to learn and explore new technologies to
              build impactful, scalable solutions.
            </p>
            <div className="flex w-full justify-end text-sm underline underline-offset-8 [&_li]:cursor-pointer [&_li]:hover:text-white">
              <ul className="flex gap-4">
                <Link
                  href="https://drive.google.com/file/d/1IIVzaZ6hIsrurBNjK8KZ5aayITDQClPp/view?usp=sharing"
                  target="_blank"
                  className="text-white/80 hover:text-white transition-colors font-bold underline-offset-4"
                >
                  See My Resume!
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
