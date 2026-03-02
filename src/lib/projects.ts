export const projects: Project[] = [
  // {
  //   slug: "fomo-techno",
  //   title: "FOMO Techno",
  //   brief:
  //     "A platform that connects students with highly vetted mentors for guidance across various learning tracks.",
  //   overview:
  //     "A platform that connects students with highly vetted mentors for guidance across various learning tracks.",
  //   problems:
  //     "Students in the MENA region face challenges in accessing quality mentorship and guidance for their learning journeys.",
  //   myRole:
  //     "Contracted to deliver a robust mentorship platform. Built a pixel-perfect, responsive frontend aligned to the design system and UX flows; contributed backend features including the mentorship booking system and automated email workflows; collaborated closely with the client to ensure timely, high-quality delivery across frontend and backend.",
  //   constraints: [
  //     "Launch an end-to-end mentorship booking flow in a limited delivery window.",
  //     "Maintain parity with design system while supporting Arabic/English UX expectations.",
  //     "Keep student and mentor workflows fast on low bandwidth devices.",
  //   ],
  //   decisions: [
  //     "Built composable booking primitives to keep mentor availability logic reusable.",
  //     "Prioritized server-side rendering paths for discovery and landing experiences.",
  //     "Introduced queue-backed email workflows to decouple notifications from booking latency.",
  //   ],
  //   impact: [
  //     "Delivered booking and mentor discovery in a single cohesive release cycle.",
  //     "Reduced friction for first session scheduling by consolidating checkout steps.",
  //     "Enabled team velocity with a shared frontend-backend implementation playbook.",
  //   ],
  //   lessons: [
  //     "Early product analytics hooks reduce guesswork for post-launch iterations.",
  //     "Shared schema contracts between frontend and backend prevent late regressions.",
  //   ],
  //   statusNote:
  //     "Production release complete. Current focus is incremental UX and performance tuning.",
  //   lastUpdated: "2026-02-20",
  //   techStack: [
  //     "TypeScript",
  //     "React",
  //     "Next.js",
  //     "NestJS",
  //     "Prisma ORM",
  //     "PostgreSQL",
  //     "Redis",
  //     "TailwindCSS",
  //   ],
  //   status: "completed",
  //   color: "#0072AA",
  //   images: [
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYymTzZyasvh3xjqdU7JcZmOtC9LTlPaNHwbge",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYTF38YiOhlSRJ05fu9B1wVzF7avqAUTpYEyne",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYzdlYE1iBE6sL3rby71GN8OYwKIPAujpqdeRg",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYUt7DvQmzTJpgvhi062sRq8nN3wXIEe5PtFYf",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYF8xqudgSazVLWF1Xon4yZKAPmY6eGItlbR9x",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYXTufzN5whBsH7PDXQKF9NR0EtbvgTGA1mCq2",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYuQAchj60l7VT56jE291uoaXt8gqnO0K3LbFZ",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYKVxlxSe1akWGdmUFn9vq8ZxeNPLrDb406pAS",
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYeqq0rwYNsHoBZ4rqlUmueOInbYdDGX03Cc1Q",
  //   ],
  //   mainImage:
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYUbC08smzTJpgvhi062sRq8nN3wXIEe5PtFYf",
  //   favicon:
  //     "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYhYbwZ7WgzJQeLF6kocmEDwHZG9qd2uRI1Sif",
  //   link: "https://fomotechno.org",
  //   order: 2,
  // },

  {
    slug: "learnu",
    title: "LearnU",
    brief:
      "Educational platform for course discovery, video learning, progress tracking, and payments—supporting students, tutors, and business teams.",
    overview:
      "Educational platform for course discovery, video learning, progress tracking, and payments—supporting students, tutors, and business teams.",
    problems:
      "The product needed a single, coherent system for course creation, video delivery, enrollments, progress, certificates, and payments—replacing ad-hoc or scattered tooling.",
    myRole:
      "Owned end-to-end product delivery: API architecture and implementation (NestJS), learning platform and dashboard interfaces (Next.js/React), shared packages, and phased execution from courses to subscriptions.",
    constraints: [
      "Integrate with Better Auth and existing schema without blocking ongoing feature work.",
      "Ship in phased milestones (foundation -> video -> enrollment -> payments -> subscriptions) so each slice is usable and testable.",
      "Support Arabic (RTL) and English and keep a single UI baseline across platform and dashboard.",
    ],
    decisions: [
      "Backend: Modular NestJS services (Drizzle + PostgreSQL), prefixed IDs, mock payment provider with a swappable interface for Stripe.",
      "Platform architecture: Monorepo (Turborepo) with shared @learnu/ui, @learnu/config, @learnu/i18n; TanStack Query + Zustand; next-intl for i18n.",
      "Video: Cloudflare Stream + R2, signed URLs, and webhooks to keep uploads and encoding off the app server.",
      "Delivery: Phased rollout (course management -> uploads -> enrollment/progress -> payments) so each phase could be validated before the next.",
    ],
    impact: [
      "Four core phases (foundation, video, enrollment/progress, payments) implemented and documented; subscriptions and business features (Phase 5) in place.",
      "Shared UI and i18n baseline reduced duplication between platform and dashboard.",
      "Mock payment flow and provider abstraction allow local and staging testing without external payment APIs.",
    ],
    lessons: [
      "Phased delivery and a mock-first payment layer make it easier to iterate and demo.",
      "Shared packages and strict boundaries (API contracts, prefixed IDs) keep product surfaces and services in sync as the platform grows.",
    ],
    statusNote:
      "Phase 5 (subscriptions & business) complete; next: Phase 6 (reviews & analytics), Phase 7 (admin dashboard), Phase 8 (polish & production). Auth integration: moving from manual userId to session/guards and role checks on protected endpoints.",
    lastUpdated: "2026-02-28",
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS",
      "TanStack Query",
      "TanStack Router",
      "NestJS",
      "Drizzle",
      "PostgreSQL",
      "Better Auth",
      "Cloudflare Stream & R2",
      "next-intl (Arabic RTL + English)",
      "Zustand",
      "Framer Motion",
    ],
    status: "completed",
    color: "#0148FF",
    images: [],
    mainImage:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYlo86xf9SQEf0o3taNuBzwMZOWmv4srYJyd8b",
    favicon:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYh0QHSdWgzJQeLF6kocmEDwHZG9qd2uRI1Sif",
    order: 2,
    link: "https://learnu.online",
  },
  {
    slug: "pericare",
    title: "Pericare",
    brief:
      "Maternal and child health platform combining a mobile-facing API and an internal admin dashboard for content, commerce, and operations.",
    overview:
      "Maternal and child health platform combining a mobile-facing API and an internal admin dashboard for content, commerce, and operations.",
    problems:
      "Product, content, subscriptions, and partner workflows needed to be managed in one reliable system while supporting real user-facing healthcare journeys.",
    myRole:
      "Full-stack ownership across backend architecture (NestJS + Prisma) and admin experience implementation (TanStack Start + React), with focus on operational clarity and delivery speed.",
    constraints: [
      "Support Firebase-authenticated users and admins with strict route-level access boundaries.",
      "Keep integrations with Shopify and RevenueCat stable while evolving data models and dashboard workflows.",
      "Ship changes safely across a growing set of modules (users, learn content, events, products, partners, banners, nursing spaces).",
    ],
    decisions: [
      "Structured the backend as modular domain services (admin/public/webhook separation) with shared pagination and DTO conventions.",
      "Used Prisma-backed schema evolution with migrations to keep feature rollout incremental and traceable.",
      "Implemented provider-based media/CDN handling to avoid lock-in and support future storage backends.",
    ],
    impact: [
      "Delivered a unified admin surface for managing users, educational content, products/events, partners/codes, banners, and nursing spaces.",
      "Established a scalable integration layer for subscriptions and commerce events via RevenueCat and Shopify webhooks.",
      "Improved operational consistency through shared table/query patterns and cursor pagination across modules.",
    ],
    lessons: [
      "Domain-heavy platforms benefit from clear module boundaries early.",
      "Webhook-driven systems require explicit contracts and backfill tooling to recover from integration drift.",
      "Admin tooling quality directly impacts product iteration speed.",
    ],
    statusNote:
      "Milestone: partner attribution and commerce consistency hardening (including Shopify currency handling). Next: expand partner workflow automation and continue reliability improvements across dashboard pagination and data sync paths.",
    lastUpdated: "2026-03-02",
    techStack: [
      "TypeScript",
      "React",
      "TanStack Start",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Table",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Firebase",
      "Shopify Webhooks",
      "RevenueCat Webhooks",
    ],
    status: "completed",
    color: "#D81E61",
    images: [],
    mainImage:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYfPytMzN3TGFgXBywKz1NjQEuSPiCDUld5oVn",
    favicon:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYLbhei74jrcTQLvebn2xVJCapO75DBwPHXziN",
    order: 3,
  },
  {
    slug: "hydex",
    title: "Hydex",
    brief:
      "Product-facing dashboard and landing experience designed to drive clarity, conversion, and operational efficiency.",
    overview:
      "Product-facing dashboard and landing experience designed to drive clarity, conversion, and operational efficiency.",
    problems:
      "The product needed a cohesive dashboard for daily user workflows and a high-performing landing page that clearly communicates value.",
    myRole:
      "Owned dashboard and landing page delivery end-to-end, from UI architecture and data flows to backend integration and release coordination.",
    constraints: [
      "Build quickly while requirements continue to evolve across product and operations.",
      "Integrate with existing APIs and data models without introducing regressions.",
      "Maintain consistent UX and performance across authenticated and public-facing surfaces.",
    ],
    decisions: [
      "Implemented a modular dashboard structure with clear domain boundaries and reusable UI primitives.",
      "Built the landing page with SEO, performance budgets, and conversion-focused content hierarchy in mind.",
      "Standardized API contracts and validation patterns to reduce product-service drift.",
    ],
    impact: [
      "Shipped iterative dashboard features used by internal stakeholders for workflow visibility and faster execution.",
      "Delivered a landing page foundation that improved messaging consistency and reduced future launch effort.",
    ],
    lessons: [
      "Shipping in thin vertical slices improved feedback quality and reduced rework.",
      // "Treating dashboard and landing page as one system improved consistency, speed, and maintainability.",
    ],
    statusNote:
      "Milestone: workflow dashboard alpha. Next: permissioned action center and audit summaries.",
    lastUpdated: "2026-02-27",
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS",
      "Tanstack Start",
      "NestJs",
    ],
    status: "in-progress",
    color: "#8A31FE",
    images: [],
    mainImage:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYXkxT3a5whBsH7PDXQKF9NR0EtbvgTGA1mCq2",
    favicon:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYkHlsQwbeCRj4QuJmLMz7s2bHtFSgd1G5o0cK",
    order: 1,
    link: "https://hyde-x.com",
  },
  {
    slug: "anha-labs",
    title: "Anha Labs",
    brief:
      "Internal lab operations platform for PCR and toxicology workflows, focused on reliable batch processing, QC visibility, and faster data entry.",
    overview:
      "Internal lab operations platform for PCR and toxicology workflows, focused on reliable batch processing, QC visibility, and faster data entry.",
    problems:
      "PCR and toxicology operations depended on manual spreadsheet handling and fragmented QC review paths, which slowed turnaround and made tracking harder.",
    myRole:
      "Designed and implemented the frontend application architecture, including multi-step entry flows, API integrations, state persistence, and QC analytics views.",
    constraints: [
      "Integrate with existing lab APIs (batch submit, history retrieval, QC endpoints, ZIP generation) without changing upstream systems.",
      "Handle inconsistent Excel input formats and preserve user progress through long, multi-step workflows.",
    ],
    decisions: [
      "Built separate but consistent stepper-based workflows for PCR and toxicology, with clear step boundaries and review-before-submit gates.",
      "Used TanStack Store + localStorage persistence so in-progress entries survive refreshes and support last-used prefills.",
      "Standardized server interactions through a shared API service layer and TanStack Query caching for history and QC data.",
    ],
    impact: [
      "Delivered one authenticated internal app for PCR entry/history, toxicology entry/history, and processed QC analysis.",
      "Enabled automated file generation/download on submission and added filtered QC insights (violations, unaddressed items, sample/component breakdowns).",
      "Improved operator continuity by reducing re-entry work during interruptions.",
    ],
    lessons: [
      "Operational tooling benefits from resilient import pipelines (header/date normalization) and explicit review checkpoints before irreversible actions.",
      "Persisted workflow state and reusable defaults materially improve speed in repetitive lab operations.",
    ],
    statusNote:
      "Milestone: productionized PCR/toxicology entry + processed QC analytics. Next: complete dashboard KPIs and promote the raw toxicology QC drilldown flow in primary navigation.",
    lastUpdated: "2026-02-20",
    techStack: [
      "TypeScript",
      "React 19",
      "TanStack Start (Router + Query + Store)",
      "Tailwind CSS 4",
      "Supabase Auth",
      "Framer Motion",
      "XLSX / JSZip",
      "Vite",
    ],
    status: "completed",
    color: "#15B8A6",
    images: [],
    mainImage:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYE9j2xTQKoAwUbzteXOFQRyP6pBhJg21NYqVM",
    favicon:
      "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CYVAGnNcd8vJgL0BcDdORkefhbmZsyW7NtrTQj",
    order: 0,
  },
];
