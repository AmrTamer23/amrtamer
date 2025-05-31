"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
interface ProjectPageData {
  project: Project;
  nextProject: Project;
  prevProject: Project;
}

export default function ProjectClient({
  project,
  nextProject,
  prevProject,
}: ProjectPageData) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const nextProjectProgressBarRef = useRef(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(projectNavRef.current, {
      opacity: 0,
      y: -100,
    });

    gsap.to(projectNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: "power3.out",
    });

    gsap.to(projectDescriptionRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleX: self.progress,
          });
        }
      },
    });

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        if (projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: -100,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onLeaveBack: () => {
        if (projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onUpdate: (self) => {
        if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
          gsap.set(nextProjectProgressBarRef.current, {
            scaleX: self.progress,
          });
        }

        if (self.progress >= 1 && !isTransitioning) {
          setShouldUpdateProgress(false);
          setIsTransitioning(true);

          const tl = gsap.timeline();

          tl.set(nextProjectProgressBarRef.current, {
            scaleX: 1,
          });

          tl.to(
            [
              footerRef.current?.querySelector(".project-footer-copy"),
              footerRef.current?.querySelector(".next-project-progress"),
            ],
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            }
          );

          tl.call(() => {
            window.location.href = `/projects/${nextProject.slug}`;
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress]);

  const router = useTransitionRouter();

  return (
    <ReactLenis root>
      <main
        className="w-full max-w-4x mx-auto bg-background h-full"
        style={{
          backgroundColor: project.color,
        }}
      >
        <div className="fixed top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div className="relative  h-svh flex justify-center items-center flex-col">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/5 left-1/2 -translate-x-1/2 w-fit flex items-center gap-2 px-4 py-3"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftIcon className="!w-8 !h-8" />
            <span className="text-base">Back</span>
          </Button>
          <h1 className="text-[7.5vw] text-center font-palaise">
            {project.title}
          </h1>

          <p
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center opacity-0"
            ref={projectDescriptionRef}
          >
            {project.brief}
          </p>
        </div>

        <p className="text-foreground text-lg max-w-4xl mx-auto text-left text-balance pb-14 leading-relaxed w-full">
          {project.descriptionBefore}
        </p>

        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {project.images &&
            project.images.map((image, index) => (
              <div className="w-full h-full" key={index}>
                <img src={image} alt="" />
              </div>
            ))}
        </div>

        {project.descriptionAfter && (
          <p className="text-foreground text-lg max-w-4xl mx-auto text-left text-balance py-14 leading-relaxed w-full">
            {project.descriptionAfter}
          </p>
        )}

        <div
          className="project-footer relative w-full h-svh flex items-center justify-center"
          ref={footerRef}
        >
          <h1 className="text-[7.5vw] text-center font-palaise">
            {nextProject.title}
          </h1>

          <div className="project-footer-copy">
            <p>Next Project</p>
          </div>

          <div className="next-project-progress">
            <div
              className="next-project-progress-bar"
              style={{
                backgroundColor: nextProject.color,
              }}
              ref={nextProjectProgressBarRef}
            ></div>
          </div>
        </div>
      </main>
    </ReactLenis>
  );
}
