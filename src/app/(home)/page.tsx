import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { SocialMedia } from "./components/social-media";
import avatar from "../../../public/avatar.webp";

export default function Home() {
  return (
    <>
      <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-2xl relative border border-white/10 p-4 sm:p-6 lg:p-8 rounded-xl cursor-default backdrop-blur-sm bg-white/5">
        <GlowingEffect
          disabled={false}
          blur={1}
          proximity={100}
          spread={100}
          variant="default"
          glow={true}
          movementDuration={1}
          borderWidth={2}
          aria-hidden="true"
        />

        <aside
          className="flex flex-col gap-4 sm:gap-6 items-center justify-center h-full relative z-20 sm:flex-shrink-0"
          aria-label="Profile image and social media links"
        >
          <div className="flex-col flex gap-4 sm:gap-6 items-center justify-center h-full relative z-20 sm:flex-shrink-0">
            <Image
              src={avatar}
              alt="Professional headshot of Amr Tamer, a software engineer with a friendly smile wearing professional attire"
              width={120}
              height={120}
              className="rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover object-start focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent aspect-square"
              priority
              fetchPriority="high"
            />
          </div>
          <SocialMedia className="hidden sm:flex" />
        </aside>

        <section
          className="flex flex-col gap-4 sm:gap-6 relative z-20 justify-center items-center sm:items-start w-full"
          aria-labelledby="profile-heading"
        >
          <header className="h-fit flex flex-col gap-1 sm:gap-2 items-center sm:items-start justify-center text-center sm:text-left">
            <div className="w-full">
              <h1
                id="profile-heading"
                className="text-xl sm:text-2xl lg:text-3xl font-bold  text-white text-center self-center"
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

          <p className="text-sm sm:text-base lg:text-lg text-white/80 text-pretty leading-relaxed max-w-prose text-center sm:text-left">
            T-shaped Software Engineer with a focus on Frontend Engineering, an
            AWS Certified Cloud Practitioner, and a Computer Science student.
            Always eager to learn and explore new technologies to build
            impactful, scalable solutions.
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
    </>
  );
}
