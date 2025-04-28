"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dalla from "@/lib/assets/dalla.jpeg";
import img1 from "@/lib/assets/img1.jpg";
import img2 from "@/lib/assets/img2.jpg";
import img3 from "@/lib/assets/img3.jpg";
import img4 from "@/lib/assets/img4.jpg";
import img5 from "@/lib/assets/img5.jpg";

const cardData = [
  { title: "Dalla", image: dalla },
  { title: "Inner Conflict", image: img2 },
  { title: "Fury & Flow", image: img3 },
  { title: "Rebellion", image: img4 },
  { title: "Liberation", image: img5 },
];

export default function Page() {
  const container = useRef(null);

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
    <>
      <div className="w-full" ref={container}>
        <section className="sticky-container relative w-screen h-screen p-8 flex justify-center items-center bg-[#0f0f0f] text-white overflow-hidden">
          <div className="relative w-1/2 h-4/5 rounded-lg overflow-hidden md:w-[95%] lg:w-4/5">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="card absolute w-full h-full rounded-lg overflow-hidden"
              >
                <div className="absolute top-4 left-4 p-2 rounded bg-black z-10">
                  <p className="uppercase font-sans text-xs font-semibold leading-none antialiased">
                    {card.title}
                  </p>
                </div>
                <img
                  src={card.image.src}
                  alt={card.title}
                  className="relative w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
