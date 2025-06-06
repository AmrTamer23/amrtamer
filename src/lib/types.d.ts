type Project = {
  id: number;
  slug: string;
  title: string;
  brief: string;
  descriptionBefore: string;
  descriptionAfter: string;
  color: string;
  images: string[];
  mainImage: StaticImageData;
  favicon: string;
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
