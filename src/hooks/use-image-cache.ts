import { useCallback, useEffect, useRef } from "react";

interface ImageCacheEntry {
  loaded: boolean;
  loading: boolean;
  error?: boolean;
}

class ImageCache {
  private cache = new Map<string, ImageCacheEntry>();
  private loadingPromises = new Map<string, Promise<void>>();

  preloadImage(src: string): Promise<void> {
    if (this.cache.has(src)) {
      const entry = this.cache.get(src)!;
      if (entry.loaded) {
        return Promise.resolve();
      }
      if (entry.loading && this.loadingPromises.has(src)) {
        return this.loadingPromises.get(src)!;
      }
    }

    this.cache.set(src, { loaded: false, loading: true });

    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.cache.set(src, { loaded: true, loading: false });
        this.loadingPromises.delete(src);
        resolve();
      };

      img.onerror = () => {
        this.cache.set(src, { loaded: false, loading: false, error: true });
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  preloadImages(sources: string[]): Promise<void[]> {
    return Promise.allSettled(
      sources.map((src) => this.preloadImage(src))
    ).then(
      (results) =>
        results
          .map((result) =>
            result.status === "fulfilled" ? result.value : undefined
          )
          .filter(Boolean) as void[]
    );
  }

  isLoaded(src: string): boolean {
    return this.cache.get(src)?.loaded ?? false;
  }

  isLoading(src: string): boolean {
    return this.cache.get(src)?.loading ?? false;
  }

  hasError(src: string): boolean {
    return this.cache.get(src)?.error ?? false;
  }

  clear(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

const globalImageCache = new ImageCache();

export function useImageCache() {
  const preloadedRef = useRef(new Set<string>());

  const preloadImage = useCallback((src: string) => {
    if (!src || preloadedRef.current.has(src)) return Promise.resolve();

    preloadedRef.current.add(src);
    return globalImageCache.preloadImage(src);
  }, []);

  const preloadImages = useCallback((sources: string[]) => {
    const newSources = sources.filter(
      (src) => src && !preloadedRef.current.has(src)
    );
    newSources.forEach((src) => preloadedRef.current.add(src));

    return globalImageCache.preloadImages(newSources);
  }, []);

  const isLoaded = useCallback((src: string) => {
    return globalImageCache.isLoaded(src);
  }, []);

  const isLoading = useCallback((src: string) => {
    return globalImageCache.isLoading(src);
  }, []);

  const hasError = useCallback((src: string) => {
    return globalImageCache.hasError(src);
  }, []);

  useEffect(() => {
    return () => {
      preloadedRef.current.clear();
    };
  }, []);

  return {
    preloadImage,
    preloadImages,
    isLoaded,
    isLoading,
    hasError,
  };
}
