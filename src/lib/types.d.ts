type Project = {
  name: string;
  domain: string;
  description: string;
  fullDescription?: string;
  features: string[];
  technologies: string;
  link: string;
  sourceCode: string | null;
  image: string;
};

type Section = "home" | "projects" | "work" | "blog";
