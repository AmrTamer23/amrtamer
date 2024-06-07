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

type Work = {
  location: string;
  role: string;
  date: string;
  company: string;
  companyLink: string;
  description: string;
  skills: string;
};
