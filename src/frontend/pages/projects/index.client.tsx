"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { EyeIcon, ArrowUpRight, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/card-glowing-effect";

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[60vh]">
            {/* Featured Project - Left/Center */}
            <div className="lg:col-span-2 relative" ref={featuredContainer}>
              {featuredProject && (
                <div
                  className="group relative w-full h-full rounded-3xl overflow-hidden border border-white/20 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${featuredProject.color}15, ${featuredProject.color}05)`,
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={featuredProject.image.src || "/placeholder.svg"}
                    alt={featuredProject.title}
                    className="featured-image absolute inset-0 w-full h-full object-cover transition-transform duration-700 "
                    width={featuredProject.image.width}
                    height={featuredProject.image.height}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Featured Badge with Custom Glowing Effect */}
                  <div className="featured-badge absolute top-6 left-6 z-20">
                    <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border border-white/30 bg-white/10 overflow-hidden">
                      {/* Animated Glow Background */}
                      <div
                        className="absolute inset-0 rounded-full opacity-60"
                        style={{
                          background: `conic-gradient(from 0deg, ${featuredProject.color}60, transparent, ${featuredProject.color}60, transparent, ${featuredProject.color}60)`,
                          animation: "spin 4s linear infinite",
                        }}
                      />
                      {/* Glow Blur Effect */}
                      <div
                        className="absolute inset-[-2px] rounded-full blur-sm opacity-40"
                        style={{
                          background: `conic-gradient(from 0deg, ${featuredProject.color}, transparent, ${featuredProject.color}, transparent, ${featuredProject.color})`,
                          animation: "spin 4s linear infinite",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-pulse relative z-10"
                        style={{ backgroundColor: featuredProject.color }}
                      />
                      <span className="text-sm font-semibold text-white relative z-10">
                        Featured
                      </span>
                    </div>
                  </div>

                  <style jsx>{`
                    @keyframes spin {
                      from {
                        transform: rotate(0deg);
                      }
                      to {
                        transform: rotate(360deg);
                      }
                    }
                  `}</style>

                  {/* View Project Button */}
                  <div className="featured-button absolute top-6 right-6">
                    <Button
                      className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white border-0 shadow-xl transition-all duration-300 "
                      style={{
                        background: `linear-gradient(135deg, ${featuredProject.color}, ${featuredProject.color}dd)`,
                      }}
                    >
                      <EyeIcon className="w-5 h-5 transition-transform " />
                      <span className="text-sm font-medium">View Project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </div>

                  {/* Project Details */}
                  <div className="featured-content absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        {featuredProject.title}
                      </h2>

                      <p className="text-white/80 text-lg leading-relaxed mb-6 line-clamp-3">
                        {featuredProject.brief}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full blur-2xl"
                    style={{
                      background: `radial-gradient(circle, ${featuredProject.color}60, transparent)`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-32 h-32 opacity-15 rounded-full blur-xl"
                    style={{
                      background: `radial-gradient(circle, ${featuredProject.color}40, transparent)`,
                    }}
                  />

                  {/* Loading Overlay */}
                  {isAnimating && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Project Selection Panel - Right */}
            <div className="lg:col-span-1">
              <div className="h-fit bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="space-y-3 max-h-[calc(100%-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        featuredProject?.id === project.id
                          ? "border-white/30 bg-white/10  shadow-lg"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 "
                      } ${isAnimating ? "pointer-events-none opacity-70" : ""}`}
                    >
                      <div className="flex gap-3">
                        {/* Project Thumbnail */}
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={project.image.src || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 "
                            width={64}
                            height={48}
                          />
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            <h4 className="text-white font-medium text-sm truncate">
                              {project.title}
                            </h4>
                          </div>
                          <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
                            {project.brief}
                          </p>
                        </div>

                        {/* Selection Indicator */}
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                            featuredProject?.id === project.id
                              ? "bg-gradient-to-r from-white/30 to-white/20 "
                              : ""
                          }`}
                        >
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}30, transparent)`,
                        }}
                      />

                      {/* Active Project Glow */}
                      {featuredProject?.id === project.id && (
                        <div
                          className="absolute inset-0 rounded-xl opacity-10 pointer-events-none"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}40, transparent)`,
                            boxShadow: `0 0 20px ${project.color}30`,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
