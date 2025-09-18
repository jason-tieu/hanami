import React from 'react';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = '', children }: SkeletonProps) {
  return <div className={`animate-pulse bg-muted/20 rounded ${className}`}>{children}</div>;
}

// Avatar skeleton
export function AvatarSkeleton({ className = '' }: { className?: string }) {
  return (
    <Skeleton className={`w-full h-96 lg:h-[500px] rounded-2xl ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-muted/10 to-muted/5 rounded-2xl flex items-center justify-center">
        <div className="w-24 h-24 bg-muted/30 rounded-full animate-pulse" />
      </div>
    </Skeleton>
  );
}

// Text skeleton
export function TextSkeleton({
  lines = 1,
  className = '',
  width = 'w-full',
}: {
  lines?: number;
  className?: string;
  width?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${width} ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </div>
  );
}

// Card skeleton
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-card/5 border border-border/10 rounded-2xl p-6 ${className}`}>
      <Skeleton className="h-32 w-full rounded-xl mb-4" />
      <TextSkeleton lines={2} className="mb-3" />
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

// Button skeleton
export function ButtonSkeleton({ className = '' }: { className?: string }) {
  return <Skeleton className={`h-12 w-32 rounded-xl ${className}`} />;
}

// Grid skeleton
export function GridSkeleton({
  items = 4,
  className = '',
  itemClassName = '',
}: {
  items?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <CardSkeleton key={i} className={itemClassName} />
      ))}
    </div>
  );
}

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <div className="relative z-20 mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <TextSkeleton lines={1} width="w-3/4" className="h-16" />
            <TextSkeleton lines={1} width="w-1/2" className="h-6" />
            <TextSkeleton lines={3} width="w-full" className="h-5" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonSkeleton className="h-14 w-40" />
            <ButtonSkeleton className="h-14 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <ButtonSkeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-1" />
            <TextSkeleton lines={1} width="w-48" className="h-4" />
          </div>
        </div>
        <div className="relative">
          <AvatarSkeleton />
        </div>
      </div>
    </div>
  );
}
