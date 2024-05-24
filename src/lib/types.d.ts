type Project = {
  name: string;
  domain: string;
  description: string;
  features: string[];
  technologies: string;
  link: string;
  sourceCode: string | null;
  image: string;
};

type Section = "home" | "projects" | "work" | "blog";
