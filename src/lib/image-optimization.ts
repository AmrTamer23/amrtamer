import { getPlaiceholder } from "plaiceholder";
import { IMAGE_OPTIMIZATION } from "./constants/image-constants";

export interface OptimizedImageData {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

interface BlurImageResult {
  base64: string;
  img: {
    src: string;
    width: number;
    height: number;
  };
}

/**
 * Generates a blur placeholder for an image URL
 * @param src - The image URL
 * @returns Blur data with dimensions
 */
export async function generateBlurPlaceholder(
  src: string
): Promise<BlurImageResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      IMAGE_OPTIMIZATION.FETCH_TIMEOUT
    );

    const response = await fetch(src, {
      signal: controller.signal,
      cache: "force-cache",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: IMAGE_OPTIMIZATION.BLUR_SIZE });

    return {
      ...plaiceholder,
      img: { src, height, width },
    };
  } catch (error) {
    console.error(`Failed to generate blur for ${src}:`, error);
    return {
      base64: IMAGE_OPTIMIZATION.DEFAULT_BLUR_PLACEHOLDER,
      img: {
        src,
        ...IMAGE_OPTIMIZATION.DEFAULT_DIMENSIONS,
      },
    };
  }
}

/**
 * Optimizes a single image with blur placeholder
 * @param src - The image URL
 * @returns Optimized image data
 */
export async function optimizeImage(
  src: string
): Promise<OptimizedImageData> {
  const blurData = await generateBlurPlaceholder(src);
  
  return {
    src: blurData.img.src,
    width: blurData.img.width,
    height: blurData.img.height,
    blurDataURL: blurData.base64,
  };
}

/**
 * Optimizes multiple images in parallel
 * @param sources - Array of image URLs
 * @param limit - Optional limit on number of images to process
 * @returns Array of optimized image data
 */
export async function optimizeImages(
  sources: string[],
  limit?: number
): Promise<OptimizedImageData[]> {
  const imagesToProcess = limit ? sources.slice(0, limit) : sources;
  
  return Promise.all(
    imagesToProcess.map((src) => optimizeImage(src))
  );
}
