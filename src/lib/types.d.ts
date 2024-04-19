export type Project = {
  name: string;
  description: string;
  features: string[];
  technologies: string;
  link: string;
  sourceCode: string | null;
  image: string;
};

export type Section = "home" | "projects" | "blog";
