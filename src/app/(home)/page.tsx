import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import Link from "next/link";
import { AppViewTransition } from "@/components/view-transition";
import Image from "next/image";
import { SocialMedia } from "./components/social-media";

export default function Home() {
  return (
    <>
      <main
        id="main-content"
        className="flex items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full flex-col h-full max-w-7xl mx-auto"
        role="main"
        aria-label="Amr Tamer's professional profile"
      >
        <div className="flex-1 flex items-center justify-center w-full">
          <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-2xl relative border border-white/10 p-4 sm:p-6 lg:p-8 rounded-xl cursor-default backdrop-blur-sm bg-white/5">
            <GlowingEffect
              disabled={false}
              blur={1}
              proximity={9999}
              spread={100}
              variant="default"
              glow={true}
              movementDuration={1.5}
              borderWidth={2}
              aria-hidden="true"
            />

            <aside
              className="flex flex-col gap-4 sm:gap-6 items-center justify-center h-full relative z-20 sm:flex-shrink-0"
              aria-label="Profile image and social media links"
            >
              <div className="flex-col flex gap-4 sm:gap-6 items-center justify-center h-full relative z-20 sm:flex-shrink-0">
                <AppViewTransition name="profile-image">
                  <Image
                    src="https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYhhXudoWgzJQeLF6kocmEDwHZG9qd2uRI1Sif"
                    alt="Professional headshot of Amr Tamer, a software engineer with a friendly smile wearing professional attire"
                    width={120}
                    height={120}
                    className="rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover object-start focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
                    priority
                    fetchPriority="high"
                  />
                </AppViewTransition>
              </div>
              <SocialMedia className="hidden sm:flex" />
            </aside>

            <section
              className="flex flex-col gap-4 sm:gap-6 relative z-20 justify-center items-center sm:items-start w-full"
              aria-labelledby="profile-heading"
            >
              <AppViewTransition name="profile-info">
                <header className="h-fit flex flex-col gap-1 sm:gap-2 items-center sm:items-start justify-center text-center sm:text-left">
                  <div className="w-full">
                    <h1
                      id="profile-heading"
                      className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent text-center self-center"
                    >
                      Amr Tamer
                    </h1>
                  </div>
                  <p
                    className="text-sm sm:text-base lg:text-lg text-white/90 font-medium text-center sm:text-left"
                    role="heading"
                    aria-level={2}
                  >
                    Software Engineer
                  </p>
                </header>
              </AppViewTransition>

              <p className="text-sm sm:text-base lg:text-lg text-white/80 text-pretty leading-relaxed max-w-prose text-center sm:text-left">
                T-shaped Software Engineer with a focus on Frontend Engineering,
                an AWS Certified Cloud Practitioner, and a Computer Science
                student. Always eager to learn and explore new technologies to
                build impactful, scalable solutions.
              </p>

              <footer className="flex w-full justify-between sm:justify-end items-center mt-4">
                <div
                  className="flex sm:hidden flex-row"
                  aria-label="Social media links"
                >
                  <SocialMedia className="flex sm:hidden flex-row gap-6" />
                </div>
                <Link
                  href="https://drive.google.com/file/d/1jGmmXNN0SKI1HR1_cGhh6noji-sUt7a_/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white focus:text-white transition-colors font-bold underline-offset-8 text-sm sm:text-base lg:text-lg underline m-0 p-0 h-fit focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
                  aria-label="View Amr Tamer's resume (opens in new tab)"
                >
                  See My Resume!
                </Link>
              </footer>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
