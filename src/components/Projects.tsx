import { useEffect } from "react";
import ProjectItem from "./ui/ProjectItem";
import { projects } from "../lib/projectsData";

export default function Projects() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    const hiddenElements = document.querySelectorAll(".hide");
    hiddenElements.forEach((element) => {
      observer.observe(element);
    });
  }, []);
  return (
    <section id="projects" className="h-fit mt-16 mb-32 pt-32">
      <h1 className="text-7xl text-center">Featured Projects</h1>
      <section className="flex flex-col mt-10">
        {projects.map((project) => (
          <ProjectItem project={project} />
        ))}
      </section>
    </section>
  );
}
