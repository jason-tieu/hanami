'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AvatarSkeleton } from './Skeleton';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  skeletonClassName?: string;
}

export default function ImageWithSkeleton({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality,
  skeletonClassName = '',
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback: if image doesn't load within 3 seconds, assume it's loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`${className} bg-muted/10 border border-border/20 rounded-2xl flex items-center justify-center`}
      >
        <div className="text-muted-foreground text-sm">Failed to load image</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <AvatarSkeleton className={skeletonClassName} />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        {...(width !== undefined && { width })}
        {...(height !== undefined && { height })}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        {...(sizes !== undefined && { sizes })}
        {...(quality !== undefined && { quality })}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
