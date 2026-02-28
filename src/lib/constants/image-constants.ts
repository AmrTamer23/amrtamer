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

/**
 * Image loading strategies
 */
export const IMAGE_LOADING = {
  /** Loading strategy for priority images */
  PRIORITY: {
    loading: "eager" as const,
    fetchPriority: "high" as const,
    priority: true,
  },
  
  /** Loading strategy for regular images */
  REGULAR: {
    loading: "lazy" as const,
    fetchPriority: "auto" as const,
    priority: false,
  },
} as const;

/**
 * Responsive image sizes
 */
export const IMAGE_SIZES = {
  /** Size hints for main featured images */
  FEATURED: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw",
  
  /** Size hints for favicon/thumbnail images */
  THUMBNAIL: "64px",
  
  /** Size hints for modal gallery thumbnails */
  GALLERY_THUMB: "(max-width: 640px) 30vw, (max-width: 768px) 25vw, 12vw",
  
  /** Size hints for modal main image */
  MODAL_MAIN: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 66vw",
} as const;
