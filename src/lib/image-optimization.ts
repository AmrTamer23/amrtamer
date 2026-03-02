import { IMAGE_OPTIMIZATION } from "./constants/image-constants";

export interface OptimizedImageData {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

export async function optimizeImage(src: string): Promise<OptimizedImageData> {
  return {
    src,
    width: IMAGE_OPTIMIZATION.DEFAULT_DIMENSIONS.width,
    height: IMAGE_OPTIMIZATION.DEFAULT_DIMENSIONS.height,
    blurDataURL: IMAGE_OPTIMIZATION.DEFAULT_BLUR_PLACEHOLDER,
  };
}

export async function optimizeImages(
  sources: string[],
  limit?: number
): Promise<OptimizedImageData[]> {
  const imagesToProcess = limit ? sources.slice(0, limit) : sources;
  return Promise.all(imagesToProcess.map((src) => optimizeImage(src)));
}
