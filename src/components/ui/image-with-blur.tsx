"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithBlurProps {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "auto" | "low";
  className?: string;
  wrapperClassName?: string;
  width?: number;
  height?: number;
}

/**
 * Renders an image with a blurred version of the same image as the loading placeholder
 * (no solid/gray background). The blur layer fades out when the main image loads.
 */
export function ImageWithBlur({
  src,
  alt,
  loading = "lazy",
  fetchPriority,
  className,
  wrapperClassName,
  width,
  height,
}: ImageWithBlurProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("absolute inset-0", wrapperClassName)}>
      <img
        src={src}
        alt=""
        aria-hidden
        loading={loading}
        decoding="async"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
          "scale-110 blur-xl",
          loaded && "opacity-0 pointer-events-none"
        )}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={loading === "eager" ? "sync" : "async"}
        fetchPriority={fetchPriority}
        className={cn("relative z-10 w-full h-full object-cover", className)}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
