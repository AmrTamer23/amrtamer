import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import { Button } from "@/components/ui/button";
import { EvidenceChip } from "@/components/ui/evidence-chip";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { SocialMedia } from "./components/social-media";
import avatar from "../../../public/avatar.webp";

export default function Home() {
  return (
    <section className="w-full max-w-5xl">
      <article className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5 w-full relative surface-1 rounded-2xl p-5 sm:p-7 lg:p-9 cursor-default overflow-hidden">
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
          className="flex flex-col gap-4 sm:gap-6 items-center lg:items-start justify-center h-full relative z-20 sm:flex-shrink-0"
          aria-label="Profile image and social media links"
        >
          <div className="flex-col flex gap-4 items-center lg:items-start justify-center h-full relative z-20 sm:flex-shrink-0">
            <Image
              src={avatar}
              alt="Professional headshot of Amr Tamer, a software engineer with a friendly smile wearing professional attire"
              width={120}
              height={120}
              className="rounded-2xl w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-cover object-start focus:outline-none focus:ring-2 focus:ring-white/35 focus:ring-offset-2 focus:ring-offset-transparent aspect-square border border-white/20"
              priority
              fetchPriority="high"
            />
            <div className="text-center lg:text-left">
              <p className="text-kicker">Current Focus</p>
              <p className="text-sm text-[var(--text-soft)]">Frontend systems, product UX, and delivery architecture.</p>
            </div>
          </div>
        </aside>

        <section
          className="flex flex-col gap-4 sm:gap-6 relative z-20 justify-center items-center sm:items-start w-full"
          aria-labelledby="profile-heading"
        >
          <header className="h-fit flex flex-col gap-2 items-center sm:items-start justify-center text-center sm:text-left">
            <p className="text-kicker">Editorial Engineer</p>
            <h1
              id="profile-heading"
              className="text-display text-center sm:text-left"
            >
              Building products where speed and quality are both non-negotiable.
            </h1>
            <p className="text-body max-w-3xl text-center sm:text-left">
              T-shaped software engineer focused on frontend architecture and product execution. I build interfaces that are fast to ship, measurable in impact, and easy for teams to evolve.
            </p>
          </header>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            <EvidenceChip value="Frontend Engineer · 2+ years hands-on delivery" />
            <EvidenceChip value="AWS Certified Cloud Practitioner" />
            <EvidenceChip value="TypeScript, Next.js, and product systems" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <div className="surface-2 rounded-xl p-3">
              <p className="text-meta mb-1">Role Focus</p>
              <p className="text-sm text-[var(--text-strong)]">Frontend architecture and cross-functional product execution.</p>
            </div>
            <div className="surface-2 rounded-xl p-3">
              <p className="text-meta mb-1">Timeline Snapshot</p>
              <p className="text-sm text-[var(--text-strong)]">2023-2026: Internship to full product ownership tracks.</p>
            </div>
            <div className="surface-2 rounded-xl p-3">
              <p className="text-meta mb-1">Strongest Skills</p>
              <p className="text-sm text-[var(--text-strong)]">React, Next.js, performance-first UI, delivery workflows.</p>
            </div>
          </div>

          <footer className="flex w-full flex-wrap gap-3 justify-between sm:justify-start items-center mt-1">
            <Button asChild size="lg" variant="primary" className="rounded-md">
              <Link href="/projects" aria-label="View projects">
                View Projects
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-md">
              <Link
                href="https://links.amrtamer.dev/cv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Amr Tamer's resume (opens in new tab)"
              >
                Resume
              </Link>
            </Button>
            <SocialMedia className="flex flex-row gap-1 !w-auto" />
          </footer>
        </section>
      </article>
    </section>
  );
}
