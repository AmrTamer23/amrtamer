import type { ImageMetadata } from "astro";
import cloudypedia from "@/assets/logos/cloudypedia.png";
import learnu from "@/assets/logos/learnu.png";
import pericare from "@/assets/logos/pericare.png";
import hydex from "@/assets/logos/hydex.png";
import brandria from "@/assets/logos/brandria.png";

export const links = {
  email: "mailto:inquiries@amrtamer.dev",
  emailLabel: "inquiries@amrtamer.dev",
  resume: "https://links.amrtamer.dev/cv",
  github: "https://github.com/amrtamer23",
  linkedin: "https://www.linkedin.com/in/amrtamer23/",
} as const;

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  {
    value: 4000,
    suffix: "+",
    label: "learners and tutors onboarded in LearnU’s first week after relaunch",
  },
  { value: 2, suffix: " wks", label: "to build and ship Hydex’s Next.js marketing site" },
  { value: 30, prefix: "+", suffix: "%", label: "lead conversion from Brandria’s new website" },
  { value: 10, suffix: "k+", label: "monthly users on Salamy.space, where I led the frontend" },
];

export type Role = {
  company: string;
  role: string;
  dates: string;
  meta: string;
  summary: string;
  logo: ImageMetadata;
};

export const currentRole: Role = {
  company: "Cloudypedia",
  role: "Frontend Software Engineer",
  dates: "11/2025 — Present",
  meta: "Remote · Canada",
  summary:
    "At Cloudypedia, a Google Cloud services partner: building the frontend for internal dashboards and systems that aggregate multiple sources for UX and business agility.",
  logo: cloudypedia,
};

export const previousRoles: Role[] = [
  {
    company: "LearnU",
    role: "Full-Stack Software Engineer",
    dates: "08/2025 — 10/2025",
    meta: "Contract",
    summary:
      "Led the platform rebuild with major UX and performance gains—4,000+ learners and tutors onboarded in week one. Built the admin dashboard for courses, approvals, and analytics.",
    logo: learnu,
  },
  {
    company: "Pericare",
    role: "Full-Stack Software Engineer",
    dates: "05/2025 — 08/2025",
    meta: "Contract",
    summary:
      "End-to-end healthcare platform on NestJS, Prisma/PostgreSQL, and React, with Shopify as headless commerce via webhooks. Admin for users, products, partners, and nursing spaces.",
    logo: pericare,
  },
  {
    company: "Hydex",
    role: "Frontend Engineer",
    dates: "10/2024 — 05/2025",
    meta: "Contract",
    summary:
      "Built the Next.js marketing site in two weeks. Brought in 200+ users across the UAE and Egypt, with 100+ signing up as vendors and ambassadors ahead of launch.",
    logo: hydex,
  },
  {
    company: "Brandria",
    role: "Full-Stack Software Engineer",
    dates: "04/2024 — 09/2024",
    meta: "Cairo, Egypt",
    summary:
      "Shipped Brandria’s new Next.js site (+30% lead conversion). Led the frontend of Salamy.space—10k+ monthly users—and extended its Strapi backend (+20% session duration).",
    logo: brandria,
  },
];

const UFS = "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CY";

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  stack: string;
  status: string;
  image: string;
  alt: string;
  summary: string;
  href?: string;
};

export const featuredProject = {
  slug: "learnu",
  index: "01",
  name: "LearnU",
  category: "Education platform",
  stack: "Next.js · NestJS · PostgreSQL",
  status: "Completed",
  image: `${UFS}lo86xf9SQEf0o3taNuBzwMZOWmv4srYJyd8b`,
  alt: "LearnU landing page: “Learn industry-ready skills & get certified” with course cards and partner logos",
  href: "https://learnu.online",
  outcome:
    "4,000+ learners and tutors onboarded in the first week after relaunch, on a rebuilt platform with major UX and performance gains.",
  role: "Owned delivery end to end: NestJS API architecture, Next.js learning and dashboard interfaces, shared packages, phased from courses to subscriptions.",
};

export const projects: Project[] = [
  {
    slug: "pericare",
    index: "02",
    name: "Pericare",
    category: "Healthcare",
    stack: "NestJS · Prisma · React",
    status: "Completed",
    image: `${UFS}fPytMzN3TGFgXBywKz1NjQEuSPiCDUld5oVn`,
    alt: "Pericare admin dashboard showing a nursing space detail page with a location map",
    summary:
      "Maternal and child health: a mobile-facing API plus an admin dashboard, with Shopify running headless commerce through webhooks.",
  },
  {
    slug: "anha-labs",
    index: "03",
    name: "Anha Labs",
    category: "Lab operations",
    stack: "8 technologies",
    status: "Completed",
    image: `${UFS}E9j2xTQKoAwUbzteXOFQRyP6pBhJg21NYqVM`,
    alt: "Anha Labs toxicology entry table and PCR history dashboard",
    summary:
      "Internal lab operations for PCR and toxicology workflows—reliable batch processing, QC visibility, and faster data entry.",
  },
];

export const principles = {
  fast: [
    "A production marketing site in two weeks, not two quarters.",
    "Phased delivery—LearnU went from courses to subscriptions in stages.",
    "CI/CD with GitHub Actions and Docker, so releases are routine.",
  ],
  last: [
    "Typed end to end: TypeScript, NestJS, Prisma and Drizzle on PostgreSQL.",
    "Admin dashboards that give stakeholders real-time visibility.",
    "Cloud-certified architecture: GCP Professional Cloud Architect, AWS.",
  ],
};

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Vue / Nuxt",
  "NestJS",
  "Prisma",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GCP",
];
