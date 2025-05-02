import dalla from "@/lib/assets/dalla.jpeg";
import crcl from "@/lib/assets/crcl.jpeg";
import shelley from "@/lib/assets/shelley.jpeg";
import brandria from "@/lib/assets/brandria.jpeg";
const projects: Project[] = [
  {
    id: 0,
    slug: "dalla-solutions",
    title: "Dalla Solutions",
    description: "A virtual diving experience through digital oceans.",
    color: "#234D65",
    images: [
      "/project-1-1.jpg",
      "/project-1-2.jpg",
      "/project-1-3.jpg",
      "/project-1-4.jpg",
      "/project-1-5.jpg",
    ],
    mainImage: dalla,
    brief: "",
  },
  {
    id: 1,
    slug: "crcl-admin",
    title: "CRCL Admin",
    brief: "",
    description: "Interactive visualization of astronomical data.",
    images: [
      "/project-2-1.jpg",
      "/project-2-2.jpg",
      "/project-2-3.jpg",
      "/project-2-4.jpg",
      "/project-2-5.jpg",
    ],
    color: "#F08541",
    mainImage: crcl,
  },
  {
    id: 2,
    slug: "shelley-and-blaine-photography",
    title: "Shelley and Blaine Photography",
    brief:
      "A website for a photography business, optimized for mobile and desktop.",
    description:
      "The mission was to replicate a website that was built in Webflow in Next.js to self host it with much lower cost than Webflow, with maintaining a good performance specially on mobile, a reliable CMS to add blog posts and photos under each genre and integrate an analytics tool(PostHog), which I proposed to the client.",
    images: [
      shelley.src,
      "/project-3-2.jpg",
      "/project-3-3.jpg",
      "/project-3-4.jpg",
      "/project-3-5.jpg",
    ],
    color: "#989C9D",
    mainImage: shelley,
  },
  {
    id: 3,
    slug: "brandria",
    title: "Brandria",
    description: "Centralized system for managing smart home devices.",
    color: "#900011",
    images: [],
    mainImage: brandria,
    brief: "",
  },
];

export default projects;
