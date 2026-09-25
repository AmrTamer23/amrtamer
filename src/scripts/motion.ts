import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

gsap.registerPlugin(ScrollTrigger);

// The head fallback only guards against this bundle failing to load.
window.__motionReady = true;

const EASE = "power3.out";
const root = document.documentElement;
const $$ = <T extends HTMLElement = HTMLElement>(selector: string) =>
  Array.from(document.querySelectorAll<T>(selector));

function intro() {
  gsap
    .timeline({ defaults: { ease: EASE } })
    .fromTo("[data-hero-header]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0)
    .fromTo(
      "[data-hero-fade]",
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 },
      0.05,
    );
}

function reveals() {
  for (const el of $$("[data-fade]")) {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
  }

  for (const group of $$("[data-stagger]")) {
    gsap.fromTo(
      group.children,
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
      },
    );
  }

  for (const frame of $$("[data-media]")) {
    const img = frame.querySelector<HTMLElement>("[data-media-img]");
    gsap.set(frame, { opacity: 1 });
    gsap
      .timeline({ scrollTrigger: { trigger: frame, start: "top 88%", once: true } })
      .fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0% round 6px)" },
        { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.1, ease: "expo.inOut" },
      )
      .fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
  }
}

gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  root.classList.add("motion");
  intro();
  reveals();
  return () => root.classList.remove("motion");
});

// Reduced-motion visitors never get pre-states, so content is always visible.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  root.classList.remove("motion");
}
