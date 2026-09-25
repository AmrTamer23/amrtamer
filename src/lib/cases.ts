import { projects } from "@/lib/content";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  overview: string;
  problem: string;
  role: string;
  meta: { label: string; value: string }[];
  live?: { href: string; label: string };
  constraints: string[];
  decisions: string[];
  impact: string[];
  lessons: string[];
  stack: string[];
};

const projectBySlug = (slug: string) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
};

const learnu = projectBySlug("learnu");
const pericare = projectBySlug("pericare");
const anha = projectBySlug("anha-labs");

export const cases: CaseStudy[] = [
  {
    slug: learnu.slug,
    name: learnu.name,
    category: learnu.category,
    image: learnu.image,
    alt: learnu.alt,
    overview:
      "Educational platform for course discovery, video learning, progress tracking, and payments—supporting students, tutors, and business teams.",
    problem:
      "The product needed a single, coherent system for course creation, video delivery, enrollments, progress, certificates, and payments—replacing ad-hoc or scattered tooling.",
    role: "Owned end-to-end product delivery: API architecture and implementation (NestJS), learning platform and dashboard interfaces (Next.js / React), shared packages, and phased execution from courses to subscriptions.",
    meta: [
      { label: "Role", value: "Full-Stack Software Engineer" },
      { label: "Timeline", value: "08/2025 — 10/2025 · Contract" },
      { label: "Outcome", value: "4,000+ users onboarded in week one" },
    ],
    live: { href: "https://learnu.online", label: "learnu.online" },
    constraints: [
      "Integrate with Better Auth and the existing schema without blocking ongoing feature work.",
      "Ship in phased milestones—foundation, video, enrollment, payments, subscriptions—so each slice is usable and testable.",
      "Support Arabic (RTL) and English with a single UI baseline across platform and dashboard.",
    ],
    decisions: [
      "Modular NestJS services on Drizzle + PostgreSQL, prefixed IDs, and a swappable payment provider interface.",
      "Turborepo monorepo with shared UI, config, and i18n packages; TanStack Query + Zustand; next-intl.",
      "Cloudflare Stream + R2 with signed URLs and webhooks keep uploads and encoding off the app server.",
    ],
    impact: [
      "4,000+ learners and tutors onboarded within the first week after relaunch.",
      "Four core phases shipped and documented, with subscriptions and business features in place.",
      "A shared UI and i18n baseline cut duplication between the platform and the dashboard.",
    ],
    lessons: [
      "Phased delivery and a mock-first payment layer make it easier to iterate and demo.",
      "Shared packages and strict API boundaries keep product surfaces and services in sync as the platform grows.",
    ],
    stack: [
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
      "next-intl · Arabic RTL + English",
      "Zustand",
      "Framer Motion",
    ],
  },
  {
    slug: pericare.slug,
    name: pericare.name,
    category: pericare.category,
    image: pericare.image,
    alt: pericare.alt,
    overview:
      "Maternal and child health platform combining a mobile-facing API and an internal admin dashboard for content, commerce, and operations.",
    problem:
      "Product, content, subscriptions, and partner workflows needed to be managed in one reliable system while supporting real user-facing healthcare journeys.",
    role: "Full-stack ownership across backend architecture (NestJS + Prisma) and the admin experience (TanStack Start + React), with a focus on operational clarity and delivery speed.",
    meta: [
      { label: "Role", value: "Full-Stack Software Engineer" },
      { label: "Timeline", value: "05/2025 — 08/2025 · Contract" },
      { label: "Scope", value: "Mobile API + admin dashboard" },
    ],
    constraints: [
      "Support Firebase-authenticated users and admins with strict route-level access boundaries.",
      "Keep Shopify and RevenueCat integrations stable while evolving data models and dashboard workflows.",
      "Ship safely across a growing set of modules: users, learning content, events, products, partners, banners, nursing spaces.",
    ],
    decisions: [
      "Modular domain services with admin, public, and webhook separation, sharing pagination and DTO conventions.",
      "Prisma migrations for schema evolution, keeping feature rollout incremental and traceable.",
      "Provider-based media and CDN handling to avoid lock-in and support future storage backends.",
    ],
    impact: [
      "One admin surface for users, educational content, products and events, partners and codes, banners, and nursing spaces.",
      "A scalable integration layer for subscriptions and commerce events via RevenueCat and Shopify webhooks.",
      "More consistent operations through shared table and query patterns with cursor pagination across modules.",
    ],
    lessons: [
      "Domain-heavy platforms benefit from clear module boundaries early.",
      "Webhook-driven systems need explicit contracts and backfill tooling to recover from integration drift.",
    ],
    stack: [
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
  },
  {
    slug: anha.slug,
    name: anha.name,
    category: anha.category,
    image: anha.image,
    alt: anha.alt,
    overview:
      "Internal lab operations platform for PCR and toxicology workflows, focused on reliable batch processing, QC visibility, and faster data entry.",
    problem:
      "PCR and toxicology operations depended on manual spreadsheet handling and fragmented QC review paths, which slowed turnaround and made tracking harder.",
    role: "Designed and implemented the frontend application architecture, including multi-step entry flows, API integrations, state persistence, and QC analytics views.",
    meta: [
      { label: "Role", value: "Frontend architecture" },
      { label: "Scope", value: "PCR, toxicology, QC analytics" },
      { label: "Users", value: "Internal lab operators" },
    ],
    constraints: [
      "Integrate with existing lab APIs—batch submit, history, QC endpoints, ZIP generation—without changing upstream systems.",
      "Handle inconsistent Excel input formats and preserve progress through long, multi-step workflows.",
    ],
    decisions: [
      "Separate but consistent stepper workflows for PCR and toxicology, with review-before-submit gates.",
      "TanStack Store + localStorage persistence so in-progress entries survive refreshes and prefill last-used values.",
      "A shared API service layer with TanStack Query caching for history and QC data.",
    ],
    impact: [
      "One authenticated app for PCR entry and history, toxicology entry and history, and processed QC analysis.",
      "Automated file generation on submission, plus filtered QC insights: violations, unaddressed items, sample and component breakdowns.",
      "Less re-entry work for operators when they get interrupted.",
    ],
    lessons: [
      "Operational tooling needs resilient import pipelines and explicit review checkpoints before irreversible actions.",
      "Persisted workflow state and reusable defaults materially speed up repetitive lab work.",
    ],
    stack: [
      "TypeScript",
      "React 19",
      "TanStack Start · Router, Query, Store",
      "Tailwind CSS 4",
      "Supabase Auth",
      "Framer Motion",
      "XLSX / JSZip",
      "Vite",
    ],
  },
];

export const caseHref = (slug: string) => `/projects/${slug}`;
