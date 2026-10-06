import type { ImageMetadata } from "astro";
import { projects } from "@/lib/content";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  image: string | ImageMetadata;
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

const kbf = projectBySlug("king-bell-fire");
const learnu = projectBySlug("learnu");
const pericare = projectBySlug("pericare");
const anha = projectBySlug("anha-labs");

export const cases: CaseStudy[] = [
  {
    slug: kbf.slug,
    name: kbf.name,
    category: kbf.category,
    image: kbf.image,
    alt: kbf.alt,
    overview:
      "The bilingual sales and operations system King Bell Fire, a fire-safety equipment supplier, runs on: leads, quotations with tiered price approvals, warehouse-confirmed sales orders, field attendance, and verifiable documents. Built with the owner and in daily use since August 2026. Screens here use sample data; the interactive demo is a white-labelled copy anyone can try.",
    problem:
      "Quotes lived in spreadsheets, price approvals happened over WhatsApp, and the warehouse learned about orders from paper invoices. Nobody could see which quotes were waiting, who had discounted what, or whether stock had actually left.",
    role: "Sole engineer from discovery to production: domain modelling and the PostgreSQL schema, the NestJS API, the Arabic-first Next.js app, document generation, and deployment, working directly with the owner and the sales, warehouse, and field teams.",
    meta: [
      { label: "Role", value: "Full-Stack Software Engineer" },
      { label: "Timeline", value: "06/2026 — 08/2026" },
      { label: "Outcome", value: "800+ quotations in its first five weeks live" },
    ],
    live: { href: "https://fieldline.amrtamer.dev/en", label: "Interactive demo" },
    constraints: [
      "Arabic-first with full English parity: every screen, PDF, and notification works right-to-left and left-to-right.",
      "Pricing authority is real money: discounts route to the right approver, and nothing below list price leaves without the owner’s sign-off.",
      "Stock, revenue, and the won deal change exactly once, when the warehouse confirms, even if two people press Confirm at the same moment.",
    ],
    decisions: [
      "One shared package holds the quotation state machine, pricing math, and approval tiers; the API enforces them and the UI imports the same functions.",
      "Permission-based access with role presets and branch scope, applied in the queries themselves, so a rep never receives another rep’s records.",
      "Row locks on warehouse confirmation, proven with deterministic concurrency tests, plus an append-only audit log of every change.",
      "Quotations render server-side on each company’s letterhead, with a QR code that checks the printed totals against the record.",
    ],
    impact: [
      "800+ quotations created by 11 people in the first five weeks live, replacing spreadsheets and WhatsApp threads.",
      "57% of quotations approve themselves on submit; the rest are reviewed in a median 34 minutes, and 98% of those are approved.",
      "The warehouse confirms orders in a median 1.1 hours, and a quote becomes a sales order in a median 41 hours.",
      "876 field check-ins from 34 people, 36% of them outside the office, each recorded with location and reason.",
    ],
    lessons: [
      "Encoding the business’s rules once, in a shared package, kept the API, the UI, and the documents from drifting as the rules evolved.",
      "In an operations tool the edge cases are the product: returns, late check-ins, re-reviews after an accepted quote is edited.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "NestJS",
      "Drizzle",
      "PostgreSQL",
      "Better Auth",
      "Socket.IO",
      "Headless Chromium PDFs",
      "Leaflet",
      "next-intl · Arabic RTL + English",
      "Turborepo",
    ],
  },
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
