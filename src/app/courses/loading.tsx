import { BookOpen, Search } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import { Skeleton } from '@/components/Skeleton';

export default function CoursesLoading() {
  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          {/* Header Skeleton */}
          <div className="mb-8 animate-in fade-in duration-200">
            <Skeleton className="h-12 w-48 mb-4" />
            <Skeleton className="h-6 w-96" />
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-sm text-muted-foreground">
                Driver: <span className="font-mono bg-muted px-2 py-1 rounded">Loading...</span>
              </div>
            )}
          </div>

          {/* Actions Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-in fade-in duration-200 delay-50">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-10 w-20 rounded-lg" />
            <Skeleton className="h-10 w-20 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>

          {/* Courses Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-card/80 border border-border rounded-2xl p-6 hover:bg-card/90 transition-colors animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-brand/50" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                
                {/* Course Code */}
                <Skeleton className="h-6 w-2/3 mb-2" />
                
                {/* Course Title */}
                <Skeleton className="h-5 w-3/4 mb-3" />
                
                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-1 mb-6">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Skeleton className="h-8 flex-1 rounded-lg" />
                  <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
