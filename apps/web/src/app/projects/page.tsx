"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/header";
import ReactLenis, { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { EyeIcon, Link } from "lucide-react";
import projects from "@/lib/projects";
import { useTransitionRouter } from "next-view-transitions";

const cardData: Project[] = projects.map((project) => ({
  ...project,
  image: project.mainImage,
}));

export default function Page() {
  const container = useRef(null);
  const lenis = useLenis(({ scroll }) => {});
  const router = useTransitionRouter();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = document.querySelectorAll(".card");
      const images = document.querySelectorAll(".card img");
      const totalCards = cards.length;

      // Initial state setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i === 0 ? "0%" : "100%",
          scale: 1,
          rotation: 0,
        });
        gsap.set(images[i], { scale: 1 });
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-container",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
        },
      });

      // Create animations for each card except the last one
      for (let i = 0; i < totalCards - 1; i++) {
        const position = i;

        scrollTimeline
          .to(
            cards[i],
            {
              scale: 0.5,
              rotation: 10,
              duration: 1,
              ease: "none",
            },
            position
          )
          .to(
            images[i],
            {
              scale: 1.5,
              duration: 1,
              ease: "none",
            },
            position
          )
          .to(
            cards[i + 1],
            {
              y: "0%",
              duration: 1,
              ease: "none",
            },
            position
          );
      }

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis root>
      <div className="relative h-screen w-full *:mx-auto">
        <Header className="absolute top-0 left-[50%] translate-x-[-50%] w-full z-50 " />

        <div className="w-full h-full" ref={container}>
          <section className="sticky-container relative w-screen h-screen flex justify-center items-center text-white">
            <div className="relative w-1/2 h-4/5 rounded-lg overflow-hidden md:w-[95%] lg:w-4/5">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="card absolute w-full h-full rounded-lg overflow-hidden"
                >
                  <div
                    className="absolute top-4 left-4 p-2 rounded z-10 border border-white"
                    style={{
                      backgroundColor: card.color + "5",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p className="capitalize tracking-wider font-sans text-sm font-semibold leading-none antialiased">
                      {card.title}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4  rounded z-10 ">
                    <Button
                      className="capitalize tracking-wider font-sans text-sm font-semibold leading-none text-white"
                      style={{
                        backgroundColor: card.color,
                      }}
                      onClick={() => {
                        router.push(`/projects/${card.slug}`);
                      }}
                    >
                      <EyeIcon className="!w-6 !h-6" />

                      <span className="text-white">View Project</span>
                    </Button>
                  </div>
                  <img
                    src={card.mainImage.src || "/placeholder.svg"}
                    alt={card.title}
                    className="relative w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ReactLenis>
  );
}
