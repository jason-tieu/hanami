'use client';

export function AuthWidgetSkeleton() {
  return (
    <div className="px-2 py-4">
      <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/30 animate-pulse">
        <div className="w-8 h-8 bg-muted/50 rounded-full"></div>
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-muted/50 rounded w-3/4"></div>
          <div className="h-2 bg-muted/30 rounded w-1/2"></div>
        </div>
        <div className="w-4 h-4 bg-muted/30 rounded"></div>
      </div>
    </div>
  );
}
