import { projects } from "./projects";
import { optimizeImage, optimizeImages } from "./image-optimization";
import { PROJECT_OPTIMIZATION } from "./constants/image-constants";

/**
 * Optimizes a single project with image blur placeholders
 * @param project - The project to optimize
 * @param isPriority - Whether this is a priority project
 * @returns Optimized project with blur data
 */
async function optimizeProject(
  project: Project,
  isPriority: boolean
): Promise<OptimizedProject> {
  // Optimize main image and favicon in parallel
  const [optimizedMainImage, optimizedFavicon] = await Promise.all([
    optimizeImage(project.mainImage),
    optimizeImage(project.favicon),
  ]);

  // Optimize gallery images for priority projects only
  let optimizedGalleryImages: Awaited<ReturnType<typeof optimizeImage>>[] = [];
  
  if (isPriority && project.images?.length > 0) {
    optimizedGalleryImages = await optimizeImages(
      project.images,
      PROJECT_OPTIMIZATION.GALLERY_IMAGES_LIMIT
    );
  }

  return {
    ...project,
    optimizedMainImage,
    optimizedFavicon,
    optimizedGalleryImages,
    isPriority,
  };
}

/**
 * Optimizes all projects with a two-tier priority strategy:
 *
 * **Priority projects** (first `PRIORITY_COUNT` by index):
 *   - Main image + blur placeholder
 *   - Favicon + blur placeholder
 *   - Gallery images (up to `GALLERY_IMAGES_LIMIT`) + blur placeholders
 *   - Loaded eagerly with high fetch priority
 *
 * **Secondary projects** (remaining):
 *   - Main image + blur placeholder
 *   - Favicon + blur placeholder
 *   - Gallery images are NOT pre-optimized (`optimizedGalleryImages` is empty)
 *   - Loaded lazily; gallery blur falls back to the main image blur in the modal
 *
 * This tradeoff keeps build time and cold-start overhead proportional to what
 * is visible above the fold, while still showing blur placeholders for all
 * non-gallery images.
 *
 * @returns Array of optimized projects
 */
export async function getOptimizedProjects(): Promise<OptimizedProject[]> {
  const optimizedProjects = await Promise.all(
    projects.map((project, index) => {
      const isPriority = index < PROJECT_OPTIMIZATION.PRIORITY_COUNT;
      return optimizeProject(project, isPriority);
    })
  );

  return optimizedProjects;
}

/**
 * Generates metadata preload hints for critical images
 * @returns Record of image preload hints
 */
export function generateImagePreloadHints(): Record<string, string> {
  const preloadImages: Record<string, string> = {};

  // Priority projects - preload main images, gallery, and favicons
  projects
    .slice(0, PROJECT_OPTIMIZATION.PRIORITY_COUNT)
    .forEach((project, index) => {
      if (project.mainImage) {
        preloadImages[`preload-main-${index}`] = project.mainImage;
      }
      if (project.images && project.images.length > 0) {
        project.images
          .slice(0, PROJECT_OPTIMIZATION.GALLERY_PRELOAD_LIMIT)
          .forEach((image, imgIndex) => {
            preloadImages[`preload-gallery-${index}-${imgIndex}`] = image;
          });
      }
      if (project.favicon) {
        preloadImages[`preload-favicon-${index}`] = project.favicon;
      }
    });

  return preloadImages;
}
