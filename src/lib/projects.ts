import dallafavicon from "@/lib/assets/dalla/favicon.png";
import dalla from "@/lib/assets/dalla/dalla.webp";
import dalla1 from "@/lib/assets/dalla/dalla1.webp";
import crcl from "@/lib/assets/crcl.webp";
import brandria from "@/lib/assets/brandria.webp";
import shelley from "@/lib/assets/shelley.webp";

const projects: Project[] = [
  {
    id: 0,
    slug: "dalla-solutions",
    title: "Dalla Solutions",
    brief:
      "A MENA based solution the connects the region's leading companies with the best talent.",
    descriptionBefore:
      "My role was Frontend Software Engineer on Dalla's platform and admin dashboard",
    descriptionAfter:
      "The goal was to build a platform that serves the needs of the region's leading companies with a focus on the user experience and performance. Built with Turbo(for Monorepo Build) and Next.js, TypeScript, TailwindCSS.",
    color: "#234D65",
    images: [
      dalla.src,
      dalla1.src,
      "/project-1-3.jpg",
      "/project-1-4.jpg",
      "/project-1-5.jpg",
    ],
    mainImage: dalla,
    favicon: dallafavicon.src,
  },
  // {
  //   id: 1,
  //   slug: "crcl-admin",
  //   title: "CRCL Admin",
  //   brief: "",
  //   descriptionBefore: "A dashboard for managing CRCL's operations",
  //   descriptionAfter:
  //     "Ticketing System, Adding users with rules(ex: booth and opreation users) and multiple views based on the role of the user. Built with TypeScript, Next.js, TailwindCSS, Shadcn UI.",
  //   images: [
  //     crcl.src,
  //     "/project-2-2.jpg",
  //     "/project-2-3.jpg",
  //     "/project-2-4.jpg",
  //     "/project-2-5.jpg",
  //   ],
  //   color: "#F08541",
  //   mainImage: crcl,
  // },
  // {
  //   id: 2,
  //   slug: "shelley-and-blaine-photography",
  //   title: "Shelley and Blaine Photography",
  //   brief:
  //     "A website for a photography business, optimized for mobile and desktop.",
  //   descriptionBefore:
  //     "The mission was to replicate a website that was built in Webflow in Next.js to self host it with much lower cost than Webflow, with maintaining a good performance specially on mobile",
  //   descriptionAfter:
  //     "A reliable CMS to add blog posts and photos under each genre and integrate an analytics tool(PostHog), which I proposed to the client.",
  //   images: [
  //     shelley.src,
  //     "/project-3-2.jpg",
  //     "/project-3-3.jpg",
  //     "/project-3-4.jpg",
  //     "/project-3-5.jpg",
  //   ],
  //   color: "#989C9D",
  //   mainImage: shelley,
  // },
  // {
  //   id: 3,
  //   slug: "brandria",
  //   title: "Brandria",
  //   descriptionBefore: "Centralized system for managing smart home devices.",
  //   descriptionAfter: "",
  //   color: "#900011",
  //   images: [brandria.src],
  //   mainImage: brandria,
  //   brief: "",
  // },
];

export default projects;
