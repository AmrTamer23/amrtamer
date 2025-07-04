type Project = {
  id: number;
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
};

type OptimizedProject = Project & {
  optimizedMainImage: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
  isPriority: boolean;
};
