"use client";

import { useEffect } from "react";

interface ProcessedProject {
  id: number;
  slug: string;
  title: string;
  brief: string;
  overview: string;
  problems: string;
  myRole: string;
  techStack: string[];
  status: "completed" | "in-progress" | "planning";
  color: string;
  images: string[];
  image: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
  favicon?: string;
  isPriority?: boolean;
}

interface ImagePrefetchProps {
  projects: ProcessedProject[];
}

export function ImagePrefetch({ projects }: ImagePrefetchProps) {
  useEffect(() => {
    // Create prefetch links for all project images
    const prefetchLinks: HTMLLinkElement[] = [];

    projects.forEach((project) => {
      // Prefetch main image
      const mainImageLink = document.createElement("link");
      mainImageLink.rel = "prefetch";
      mainImageLink.href = project.image.src;
      mainImageLink.as = "image";
      document.head.appendChild(mainImageLink);
      prefetchLinks.push(mainImageLink);

      // Prefetch gallery images
      project.images.forEach((imageSrc) => {
        const galleryImageLink = document.createElement("link");
        galleryImageLink.rel = "prefetch";
        galleryImageLink.href = imageSrc;
        galleryImageLink.as = "image";
        document.head.appendChild(galleryImageLink);
        prefetchLinks.push(galleryImageLink);
      });

      // Prefetch favicon
      if (project.favicon) {
        const faviconLink = document.createElement("link");
        faviconLink.rel = "prefetch";
        faviconLink.href = project.favicon;
        faviconLink.as = "image";
        document.head.appendChild(faviconLink);
        prefetchLinks.push(faviconLink);
      }
    });

    // Cleanup function to remove prefetch links when component unmounts
    return () => {
      prefetchLinks.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [projects]);

  return null; // This component doesn't render anything visible
}
