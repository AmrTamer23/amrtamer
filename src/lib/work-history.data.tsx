import CloudypediaLogo from "@/lib/assets/cloudypedia.webp";
import DigitalBrandriaLogo from "@/lib/assets/brandria_logo.webp";

export const workExperience: WorkExperience[] = [
  {
    company: "Digital Brandria",
    title: "Frontend Software Engineer",
    logo: (
      <img
        src={DigitalBrandriaLogo.src}
        alt="Digital Brandria Logo"
        className="w-16 sm:w-20 aspect-square rounded-xl"
      />
    ),
    description:
      "Started and maintained Salamy.Space's frontend, working extensively with Strapi's query builder mechanism while continuously enhancing the website's performance, UI/UX, and SEO. Additionally maintained Salamy.Space's backend and shipped new features to improve functionality. Implemented a new high-performance website for Brandria using TypeScript, React, and Next.js with a strong focus on user experience. Handled the complete deployment phase by setting up a comprehensive CI/CD pipeline using GitHub Actions to build and deploy the website with NGINX, Docker, and bash scripts on DigitalOcean droplets. Led a team of WordPress developers to deliver websites that satisfied customer requirements while managing the development team to implement a new company website that prioritized user experience using TypeScript, Next.js, and WordPress as a headless CMS.",
    result:
      "Improved delivery speed by standardizing frontend patterns and deployment automation across client and internal platforms.",
    scope: [
      "Owned frontend architecture and implementation for client-facing platforms.",
      "Contributed backend features and production release workflows.",
      "Led technical execution across a mixed stack delivery team.",
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
    title: "Frontend Intern",
    logo: (
      <img
        src={CloudypediaLogo.src}
        alt="Cloudypedia Logo"
        className="w-16 sm:w-20 aspect-video rounded-xl"
      />
    ),
    description:
      "During my 6-week Cloudypedia Summer Internship, I acquired a diverse skill set and gained valuable hands-on experience across various aspects of technology and development. I was introduced to Google Cloud, gaining foundational knowledge of cloud computing and its practical applications for modern web development. I honed my front-end development skills by working extensively with HTML for creating structured web pages, CSS for styling and visual presentation, JavaScript for adding interactivity and dynamic behavior, and React.js for building responsive user interfaces. Additionally, I leveraged libraries like axios, formik, and yup to streamline data management, form handling, and validation within web applications. I actively participated in the design process, focusing on UI/UX design and gaining proficiency in Figma as a collaborative design tool. This involved creating intuitive and visually appealing interfaces, conducting user research to inform design decisions, developing wireframes and prototypes to iterate on design concepts, and collaborating seamlessly with development teams using Figma's collaborative features.",
    result:
      "Built a practical frontend foundation that translated design ideas into functioning product interfaces.",
    scope: [
      "Implemented responsive interfaces and form-heavy user flows.",
      "Collaborated between design and engineering during prototyping iterations.",
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
