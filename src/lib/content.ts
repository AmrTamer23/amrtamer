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

export type Role = {
  company: string;
  role: string;
  dates: string;
  meta: string;
  summary: string;
  logo: ImageMetadata;
  current?: boolean;
};

export const roles: Role[] = [
  {
    company: "Cloudypedia",
    role: "Frontend Software Engineer",
    dates: "11/2025 — Now",
    meta: "Remote · Canada",
    summary: "Frontend for internal dashboards that bring multiple data sources together.",
    logo: cloudypedia,
    current: true,
  },
  {
    company: "LearnU",
    role: "Full-Stack Software Engineer",
    dates: "08/2025 — 10/2025",
    meta: "Contract",
    summary: "Led the platform rebuild; 4,000+ learners and tutors onboarded in week one.",
    logo: learnu,
  },
  {
    company: "Pericare",
    role: "Full-Stack Software Engineer",
    dates: "05/2025 — 08/2025",
    meta: "Contract",
    summary: "Healthcare platform on NestJS, Prisma, and React with headless Shopify.",
    logo: pericare,
  },
  {
    company: "Hydex",
    role: "Frontend Engineer",
    dates: "10/2024 — 05/2025",
    meta: "Contract",
    summary: "Shipped the Next.js marketing site in two weeks; 100+ vendor sign-ups before launch.",
    logo: hydex,
  },
  {
    company: "Brandria",
    role: "Full-Stack Software Engineer",
    dates: "04/2024 — 09/2024",
    meta: "Cairo, Egypt",
    summary:
      "New Next.js site (+30% lead conversion); led Salamy.space’s frontend (10k+ monthly users).",
    logo: brandria,
  },
];

const UFS = "https://j1i4xv0jcr.ufs.sh/f/d4e8EKT5K8CY";

export type Project = {
  slug: string;
  name: string;
  category: string;
  stack: string;
  image: string;
  alt: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "learnu",
    name: "LearnU",
    category: "Education platform",
    stack: "Next.js, NestJS, PostgreSQL",
    image: `${UFS}lo86xf9SQEf0o3taNuBzwMZOWmv4srYJyd8b`,
    alt: "LearnU landing page: “Learn industry-ready skills & get certified” with course cards and partner logos",
    summary:
      "Course discovery, video learning, progress, and payments for students, tutors, and business teams.",
  },
  {
    slug: "pericare",
    name: "Pericare",
    category: "Healthcare",
    stack: "NestJS, Prisma, React",
    image: `${UFS}fPytMzN3TGFgXBywKz1NjQEuSPiCDUld5oVn`,
    alt: "Pericare admin dashboard showing a nursing space detail page with a location map",
    summary:
      "Maternal and child health: a mobile API and an admin dashboard with headless commerce.",
  },
  {
    slug: "anha-labs",
    name: "Anha Labs",
    category: "Lab operations",
    stack: "React, TanStack",
    image: `${UFS}E9j2xTQKoAwUbzteXOFQRyP6pBhJg21NYqVM`,
    alt: "Anha Labs toxicology entry table and PCR history dashboard",
    summary:
      "PCR and toxicology workflows with batch processing, QC visibility, and faster data entry.",
  },
];
