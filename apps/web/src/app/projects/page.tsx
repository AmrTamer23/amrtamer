"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dalla from "@/lib/assets/dalla.jpeg";
import crcl from "@/lib/assets/crcl.jpeg";
import shelley from "@/lib/assets/shelley.jpeg";
import brandria from "@/lib/assets/brandria.jpeg";
import Header from "@/components/header";
import type { StaticImageData } from "next/image";
import ReactLenis, { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, EyeIcon } from "lucide-react";

const cardData: { title: string; image: StaticImageData; color: string }[] = [
  { title: "Dalla Solutions", image: dalla, color: "#234D65" },
  { title: "CRCL Admin", image: crcl, color: "#F08541" },
  { title: "Shelley and Blaine Photography", image: shelley, color: "#929495" },
  { title: "Brandria", image: brandria, color: "#900011" },
];

export default function Page() {
  const container = useRef(null);
  const lenis = useLenis(({ scroll }) => {});

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
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 w-full z-50 px-4">
          <Header />
        </div>

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
                        backgroundColor: card.color + "!important",
                      }}
                    >
                      <EyeIcon className="!w-6 !h-6" />
                      <span>View Project</span>
                    </Button>
                  </div>
                  <img
                    src={card.image.src || "/placeholder.svg"}
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
