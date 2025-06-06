"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { EyeIcon, ArrowUpRight, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/card-glowing-effect";
import { RightPanel } from "./components/right-panel";
import { SelectedProject } from "./components/selected-project";
import {
  AppViewTransition,
  ListItemTransition,
} from "@/components/view-transition";

// Types for the processed project data
interface ProcessedProject {
  id: number;
  slug: string;
  title: string;
  brief: string;
  descriptionBefore: string;
  descriptionAfter: string;
  color: string;
  images: string[];
  image: {
    src: string;
    width: number;
    height: number;
  };
}

interface ProjectsClientProps {
  projects: ProcessedProject[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [featuredProject, setFeaturedProject] = useState(projects[0] || null);
  const [isAnimating, setIsAnimating] = useState(false);
  const featuredContainer = useRef<HTMLDivElement>(null);

  // Register GSAP plugins
  gsap.registerPlugin(useGSAP);

  const { contextSafe } = useGSAP({ scope: featuredContainer });

  // Animation function for project transitions
  const animateProjectChange = contextSafe((newProject: ProcessedProject) => {
    if (isAnimating || newProject.id === featuredProject?.id) return;

    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => {
        setFeaturedProject(newProject);
        setIsAnimating(false);
      },
    });

    // Animate out current content
    timeline
      .to(".featured-image", {
        scale: 1.1,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        ".featured-content",
        {
          y: 30,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        ".featured-badge",
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.3"
      )
      .to(
        ".featured-button",
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.3"
      )
      // Animate in new content
      .call(() => {
        setFeaturedProject(newProject);
      })
      .fromTo(
        ".featured-image",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      )
      .fromTo(
        ".featured-content",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .fromTo(
        ".featured-badge",
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .fromTo(
        ".featured-button",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
  });

  const handleProjectSelect = (project: ProcessedProject) => {
    animateProjectChange(project);
  };

  return (
    <div className="flex-1 w-full px-6 flex items-center justify-center">
      <div className="w-full h-full ">
        <div className="flex gap-8 h-full min-h-[65vh] w-full min-w-[90svw] mx-auto">
          <SelectedProject
            featuredProject={featuredProject}
            featuredContainer={featuredContainer}
            isAnimating={isAnimating}
          />

          <RightPanel
            projects={projects}
            featuredProject={featuredProject}
            handleProjectSelect={handleProjectSelect}
            isAnimating={isAnimating}
          />
        </div>
      </div>
    </div>
  );
}
