import CloudypediaLogo from "@/lib/assets/cloudypedia.webp";
import DigitalBrandriaLogo from "@/lib/assets/brandria_logo.webp";

export const workExperience: WorkExperience[] = [
  {
    company: "Digital Brandria",
    title: "Software Engineer",
    logo: (
      <img
        src={DigitalBrandriaLogo.src}
        alt="Digital Brandria Logo"
        className="w-16 sm:w-20 aspect-square rounded-xl"
      />
    ),
    description:
      "Owned end-to-end delivery across product surfaces at Salamy.Space and Brandria. Architected frontend experiences with TypeScript, React, and Next.js, contributed backend features and Strapi query workflows, and shipped performance and SEO improvements tied to product goals. Built and maintained CI/CD pipelines using GitHub Actions, Docker, NGINX, and bash scripts on DigitalOcean to standardize releases. Led implementation planning across a mixed team and aligned engineering execution with customer-facing milestones.",
    result:
      "Improved delivery speed and release reliability by standardizing fullstack implementation patterns and deployment automation.",
    scope: [
      "Owned architecture and implementation for client-facing platforms across frontend and backend touchpoints.",
      "Implemented backend-connected product features and production release workflows.",
      "Led technical execution and delivery planning across a mixed-stack engineering team.",
    ],
    achievements: [
      "Shipped a high-performance brand website with modern Next.js architecture.",
      "Set up CI/CD pipelines on DigitalOcean with reproducible deployments.",
      "Improved UX and technical SEO for product surfaces under active development.",
    ],
    stackHighlights: ["Next.js", "TypeScript", "Strapi", "Docker", "GitHub Actions"],
    duration: "Apr 2024 - Sep 2024",
    location: "Cairo, Egypt",
    type: "Full-time",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "WordPress",
    ],
  },
  {
    company: "Cloudypedia",
    title: "Software Engineer Intern",
    logo: (
      <img
        src={CloudypediaLogo.src}
        alt="Cloudypedia Logo"
        className="w-16 sm:w-20 aspect-video rounded-xl"
      />
    ),
    description:
      "Completed a 6-week engineering internship focused on product implementation and delivery fundamentals. Built responsive interfaces with HTML, CSS, JavaScript, and React while integrating form, validation, and data workflows with libraries like axios, formik, and yup. Gained foundational exposure to Google Cloud concepts and collaborated closely with design teams using Figma to translate research and prototypes into shipped product interactions.",
    result:
      "Built a practical fullstack-ready foundation by connecting UI implementation, data workflows, and product design collaboration.",
    scope: [
      "Implemented responsive product interfaces and form-heavy user flows.",
      "Collaborated between design and engineering to deliver testable feature iterations.",
    ],
    achievements: [
      "Delivered interactive UI modules using React and validation tooling.",
      "Applied UI/UX research findings directly into implementation iterations.",
    ],
    stackHighlights: ["React", "JavaScript", "Figma", "Formik", "Yup"],
    duration: "Jul 2023 - Sep 2023",
    location: "Remote, Canada",
    type: "Internship",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Figma",
      "Intro to GCP",
    ],
  },
];
