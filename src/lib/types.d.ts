type Project = {
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
  mainImage: string;
  favicon: string;
  link?: string;
  order: number;
};

type OptimizedProject = Project & {
  optimizedMainImage: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
  optimizedFavicon: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
  optimizedGalleryImages: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  }[];
  isPriority: boolean;
};

type WorkExperience = {
  company: string;
  logo: import("react").JSX.Element;
  title: string;
  description: string;
  duration: string;
  location: string;
  type: string;
  technologies: string[];
};
