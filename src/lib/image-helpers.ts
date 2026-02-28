import { IMAGE_LOADING, IMAGE_SIZES } from "./constants/image-constants";

/**
 * Image loading strategy configuration
 */
export interface ImageLoadingStrategy {
  loading: "eager" | "lazy";
  fetchPriority: "high" | "auto";
  priority: boolean;
}

/**
 * Returns the appropriate loading strategy based on priority
 * @param isPriority - Whether the image should be loaded with priority
 * @returns Loading strategy configuration
 */
export function getImageLoadingStrategy(
  isPriority: boolean
): ImageLoadingStrategy {
  return isPriority ? IMAGE_LOADING.PRIORITY : IMAGE_LOADING.REGULAR;
}

/**
 * Image props for Next.js Image component
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  loading: "eager" | "lazy";
  fetchPriority?: "high" | "auto";
  priority: boolean;
  placeholder: "blur" | "empty";
  sizes: string;
}

/**
 * Generates optimized image props for featured images
 * @param image - Optimized image data
 * @param alt - Alt text for the image
 * @param isPriority - Whether this is a priority image
 * @returns Complete image props object
 */
export function getFeaturedImageProps(
  image: { src: string; blurDataURL?: string },
  alt: string,
  isPriority: boolean
): Partial<OptimizedImageProps> {
  const loadingStrategy = getImageLoadingStrategy(isPriority);

  return {
    src: image.src,
    alt,
    ...loadingStrategy,
    placeholder: image.blurDataURL ? "blur" : "empty",
    blurDataURL: image.blurDataURL,
    sizes: IMAGE_SIZES.FEATURED,
  };
}

/**
 * Generates optimized image props for thumbnail images
 * @param image - Optimized image data
 * @param alt - Alt text for the image
 * @param isPriority - Whether this is a priority image
 * @returns Complete image props object
 */
export function getThumbnailImageProps(
  image: { src: string; blurDataURL?: string },
  alt: string,
  isPriority: boolean
): Partial<OptimizedImageProps> {
  const loadingStrategy = getImageLoadingStrategy(isPriority);

  return {
    src: image.src,
    alt,
    ...loadingStrategy,
    placeholder: image.blurDataURL ? "blur" : "empty",
    blurDataURL: image.blurDataURL,
    sizes: IMAGE_SIZES.THUMBNAIL,
    width: 64,
    height: 64,
  };
}

/**
 * Generates optimized image props for modal gallery thumbnails
 * @param image - Optimized image data or URL
 * @param alt - Alt text for the image
 * @param blurDataURL - Optional blur placeholder
 * @returns Complete image props object
 */
export function getGalleryThumbnailProps(
  image: string | { src: string; blurDataURL?: string },
  alt: string,
  blurDataURL?: string
): Partial<OptimizedImageProps> {
  const src = typeof image === "string" ? image : image.src;
  const blur =
    typeof image === "string" ? blurDataURL : image.blurDataURL || blurDataURL;

  return {
    src,
    alt,
    loading: "lazy",
    placeholder: blur ? "blur" : "empty",
    blurDataURL: blur,
    sizes: IMAGE_SIZES.GALLERY_THUMB,
  };
}

/**
 * Generates optimized image props for modal main images
 * @param src - Image source URL
 * @param alt - Alt text for the image
 * @param blurDataURL - Blur placeholder
 * @param isPriority - Whether this is a priority image
 * @returns Complete image props object
 */
export function getModalMainImageProps(
  src: string,
  alt: string,
  blurDataURL?: string,
  isPriority = false
): Partial<OptimizedImageProps> {
  const loadingStrategy = getImageLoadingStrategy(isPriority);

  return {
    src,
    alt,
    ...loadingStrategy,
    placeholder: blurDataURL ? "blur" : "empty",
    blurDataURL,
    sizes: IMAGE_SIZES.MODAL_MAIN,
  };
}
