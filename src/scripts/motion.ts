import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";
const root = document.documentElement;
const $$ = <T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(selector));

function smoothScroll() {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Route in-page anchors through Lenis so jumps glide instead of snapping.
  const listeners = new AbortController();
  for (const link of $$<HTMLAnchorElement>('a[href^="#"]')) {
    link.addEventListener(
      "click",
      (event) => {
        const hash = link.getAttribute("href") ?? "";
        const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
        if (target === null) return;
        event.preventDefault();
        lenis.scrollTo(target, { duration: 1.4 });
        history.replaceState(null, "", hash === "#top" ? location.pathname : hash);
      },
      { signal: listeners.signal },
    );
  }

  return () => {
    listeners.abort();
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  const lines = $$("[data-hero-title] > span");

  gsap.set("[data-hero-title]", { opacity: 1 });
  const split = SplitText.create(lines, { type: "lines", mask: "lines" });

  tl.fromTo(
    "[data-hero-header]",
    { autoAlpha: 0, yPercent: -40 },
    { autoAlpha: 1, yPercent: 0, duration: 1 },
    0,
  )
    .from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.14 }, 0.1)
    .fromTo(
      "[data-hero-fade]",
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09 },
      0.6,
    )
    .add(() => split.revert());
}

function splitHeadings() {
  for (const el of $$("[data-split]")) {
    gsap.set(el, { opacity: 1 });
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          duration: 1.2,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => self.revert(),
        }),
    });
  }
}

function reveals() {
  for (const el of $$("[data-fade]")) {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
  }

  for (const group of $$("[data-stagger]")) {
    gsap.fromTo(
      group.children,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
      },
    );
  }

  for (const rule of $$("[data-rule]")) {
    gsap.to(rule, {
      scaleX: 1,
      duration: 1.4,
      ease: "expo.inOut",
      scrollTrigger: { trigger: rule, start: "top 92%", once: true },
    });
  }
}

function counters() {
  for (const el of $$("[data-count]")) {
    const end = Number(el.dataset.count);
    const state = { value: 0 };
    el.textContent = "0";
    gsap.to(state, {
      value: end,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = Math.round(state.value).toLocaleString("en-US");
      },
    });
  }
}

function media() {
  for (const frame of $$("[data-media]")) {
    const img = frame.querySelector<HTMLElement>("[data-media-img]");
    gsap.set(frame, { opacity: 1 });

    gsap
      .timeline({ scrollTrigger: { trigger: frame, start: "top 85%", once: true } })
      .fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0% round 6px)" },
        { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.5, ease: "expo.inOut" },
      )
      .fromTo(img, { scale: 1.25 }, { scale: 1.06, duration: 1.8, ease: EASE }, 0);

    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }
  }
}

function principles() {
  const block = document.querySelector("[data-principles]");
  if (!block) return;

  gsap.fromTo(
    "[data-amp]",
    { scale: 0.55, rotate: -24, autoAlpha: 0 },
    {
      scale: 1,
      rotate: 0,
      autoAlpha: 1,
      ease: "none",
      scrollTrigger: { trigger: block, start: "top 85%", end: "center 55%", scrub: 0.8 },
    },
  );

  // Columns slide in from their own side on the three-column layout; stacked, they rise.
  const sideBySide = window.matchMedia("(min-width: 1024px)").matches;
  for (const side of $$("[data-principle-side]")) {
    const offset = side.dataset.principleSide === "left" ? -64 : 64;
    gsap.fromTo(
      side,
      sideBySide ? { autoAlpha: 0, x: offset } : { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 1.3,
        ease: EASE,
        scrollTrigger: { trigger: block, start: "top 75%", once: true },
      },
    );
  }
}

function magnetic() {
  for (const el of $$("[data-magnetic]")) {
    const toX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const toY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      toX((event.clientX - rect.left - rect.width / 2) * 0.25);
      toY((event.clientY - rect.top - rect.height / 2) * 0.35);
    });
    el.addEventListener("pointerleave", () => {
      toX(0);
      toY(0);
    });
  }
}

async function init() {
  await document.fonts.ready;

  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      finePointer: "(hover: hover) and (pointer: fine)",
    },
    (context) => {
      const { motion, finePointer } = context.conditions ?? {};
      if (!motion) {
        root.classList.remove("motion");
        return;
      }

      root.classList.add("motion");
      const stopScroll = smoothScroll();
      heroIntro();
      splitHeadings();
      reveals();
      counters();
      media();
      principles();
      if (finePointer) magnetic();

      return stopScroll;
    },
  );

  window.__motionReady = true;
}

init();
