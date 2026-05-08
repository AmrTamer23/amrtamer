/**
 * Project optimization constants
 */
export const PROJECT_OPTIMIZATION = {
  /** Number of projects to treat as priority for optimization */
  PRIORITY_COUNT: 3,
  
  /** Number of gallery images to optimize for priority projects */
  GALLERY_IMAGES_LIMIT: 3,
  
  /** Number of gallery images to preload in metadata */
  GALLERY_PRELOAD_LIMIT: 2,
} as const;

/**
 * Image optimization constants
 */
export const IMAGE_OPTIMIZATION = {
  /** Timeout for image fetch requests in milliseconds */
  FETCH_TIMEOUT: 5000,
  
  /** Size parameter for blur placeholder generation */
  BLUR_SIZE: 10,
  
  /** Default blur placeholder for failed optimizations */
  DEFAULT_BLUR_PLACEHOLDER:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  
  /** Default dimensions for failed optimizations */
  DEFAULT_DIMENSIONS: {
    width: 200,
    height: 300,
  },
} as const;

