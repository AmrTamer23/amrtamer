export const projects: Project[] = [
  {
    slug: "fomo-techno",
    title: "FOMO Techno",
    brief:
      "A platform that connects students with highly vetted mentors for guidance across various learning tracks.",
    overview:
      "A platform that connects students with highly vetted mentors for guidance across various learning tracks.",
    problems:
      "Students in the MENA region face challenges in accessing quality mentorship and guidance for their learning journeys.",
    myRole:
      "Contracted to deliver a robust mentorship platform. Built a pixel-perfect, responsive frontend aligned to the design system and UX flows; contributed backend features including the mentorship booking system and automated email workflows; collaborated closely with the client to ensure timely, high-quality delivery across frontend and backend.",
    constraints: [
      "Launch an end-to-end mentorship booking flow in a limited delivery window.",
      "Maintain parity with design system while supporting Arabic/English UX expectations.",
      "Keep student and mentor workflows fast on low bandwidth devices.",
    ],
    decisions: [
      "Built composable booking primitives to keep mentor availability logic reusable.",
      "Prioritized server-side rendering paths for discovery and landing experiences.",
      "Introduced queue-backed email workflows to decouple notifications from booking latency.",
    ],
    impact: [
      "Delivered booking and mentor discovery in a single cohesive release cycle.",
      "Reduced friction for first session scheduling by consolidating checkout steps.",
      "Enabled team velocity with a shared frontend-backend implementation playbook.",
    ],
    lessons: [
      "Early product analytics hooks reduce guesswork for post-launch iterations.",
      "Shared schema contracts between frontend and backend prevent late regressions.",
    ],
    statusNote:
      "Production release complete. Current focus is incremental UX and performance tuning.",
    lastUpdated: "2026-02-20",
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "NestJS",
      "Prisma ORM",
      "PostgreSQL",
      "Redis",
      "TailwindCSS",
    ],
    status: "completed",
    color: "#0072AA",
    images: [
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYymTzZyasvh3xjqdU7JcZmOtC9LTlPaNHwbge",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYTF38YiOhlSRJ05fu9B1wVzF7avqAUTpYEyne",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYzdlYE1iBE6sL3rby71GN8OYwKIPAujpqdeRg",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYUt7DvQmzTJpgvhi062sRq8nN3wXIEe5PtFYf",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYF8xqudgSazVLWF1Xon4yZKAPmY6eGItlbR9x",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYXTufzN5whBsH7PDXQKF9NR0EtbvgTGA1mCq2",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYuQAchj60l7VT56jE291uoaXt8gqnO0K3LbFZ",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYKVxlxSe1akWGdmUFn9vq8ZxeNPLrDb406pAS",
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYeqq0rwYNsHoBZ4rqlUmueOInbYdDGX03Cc1Q",
    ],
    mainImage:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYUbC08smzTJpgvhi062sRq8nN3wXIEe5PtFYf",
    favicon:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYhYbwZ7WgzJQeLF6kocmEDwHZG9qd2uRI1Sif",
    link: "https://fomotechno.org",
    order: 2,
  },
  {
    slug: "hydex",
    title: "Hydex",
    brief:
      "Internal operations platform focused on workflow reliability and analyst productivity.",
    overview:
      "Hydex is being shaped into a workflow control layer for operations teams handling high-frequency updates.",
    problems:
      "The team needed one internal system to orchestrate tasks previously spread across disconnected tools.",
    myRole:
      "Leading frontend architecture and product implementation strategy with a focus on speed, observability, and maintainability.",
    constraints: [
      "Integrate with existing internal APIs without disrupting ongoing operations.",
      "Ship iterative slices while key requirements are still evolving.",
    ],
    decisions: [
      "Adopted a modular dashboard architecture with strict state boundaries.",
      "Prioritized progressive delivery behind feature flags for each workflow lane.",
    ],
    impact: [
      "Early modules validated with internal operators before full rollout.",
      "Established a shared UI baseline to reduce duplicated implementation work.",
    ],
    lessons: [
      "Operational tooling benefits from smaller releases and direct user shadowing.",
    ],
    statusNote:
      "Milestone: workflow dashboard alpha. Next: permissioned action center and audit summaries.",
    lastUpdated: "2026-02-27",
    techStack: ["TypeScript", "React", "Next.js", "TailwindCSS"],
    status: "in-progress",
    color: "#D3FF02",
    images: [],
    mainImage: "",
    favicon:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYCXMAdXFkAF7iZo6letRbr9OnaDwP1fIUgLVY",
    order: 1,
  },
  {
    slug: "anha-labs",
    title: "ANHA Labs",
    brief:
      "Research-to-product initiative focused on turning experiments into validated web experiences.",
    overview:
      "ANHA Labs explores product hypotheses quickly and turns promising directions into scalable interfaces.",
    problems:
      "The team needed a repeatable way to move from prototypes to production-ready interfaces with less rework.",
    myRole:
      "Driving frontend system decisions and prototyping standards to shorten experiment-to-production cycles.",
    constraints: [
      "Balance rapid experimentation with long-term maintainability standards.",
      "Keep UI cohesion across multiple experiments running in parallel.",
    ],
    decisions: [
      "Defined shared UI tokens before feature implementation to prevent style drift.",
      "Set clear experiment templates with measurable exit criteria.",
    ],
    impact: [
      "Improved consistency across early experiments by enforcing shared component primitives.",
    ],
    lessons: [
      "Standardized templates accelerate iteration without sacrificing quality.",
    ],
    statusNote:
      "Milestone: design system baseline complete. Next: ship first public-facing experiment.",
    lastUpdated: "2026-02-25",
    techStack: ["TypeScript", "Next.js", "Design Systems"],
    status: "in-progress",
    color: "#15B8A6",
    images: [],
    mainImage: "",
    favicon:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYVAGnNcd8vJgL0BcDdORkefhbmZsyW7NtrTQj",
    order: 0,
  },
];
