export interface Project {
  name: string;
  description: string;
  features: string[];
  technologies: string;
  link: string;
  sourceCode: string;
  image: string;
}

export type Sections = "home" | "projects" | "contact";
