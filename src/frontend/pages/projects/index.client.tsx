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
    <div className=" flex flex-col gap-8 -mt-12">
      {/* Hero Section */}
      <div className="w-full px-6 pt-8 flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative inline-block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-zinc-300" />
              <span className="text-sm font-medium text-white/90">
                Featured Projects
              </span>
            </div>
            <GlowingEffect
              disabled={false}
              blur={1}
              proximity={9999}
              spread={100}
              variant="default"
              glow={true}
              movementDuration={1.5}
              borderWidth={2}
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4 leading-tight">
            Crafted with Purpose
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Explore a collection of thoughtfully designed digital experiences
            that blend innovation with functionality.
          </p>
        </div>
      </div>

      {/* Main Content - Featured Project + Selection Panel */}
      <div className="flex-1 w-full px-6 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[60vh] w-[80svw]">
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
    </div>
  );
}
