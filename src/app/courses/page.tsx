import { Suspense } from 'react';
import SectionWrapper from '@/components/SectionWrapper';
import { DebugAuth } from '@/components/DebugAuth';
import { CoursesActions } from './courses-actions';
import { CoursesData } from './courses-data';

export default function CoursesPage() {
  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your enrolled courses and track your academic progress.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-sm text-muted-foreground">
                Driver: <span className="font-mono bg-muted px-2 py-1 rounded" id="driver-display">Loading...</span>
              </div>
            )}
          </div>

          {/* Debug Auth */}
          <div className="animate-in fade-in slide-in-from-left-4 duration-600 delay-200">
            <DebugAuth />
          </div>

          {/* Actions */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-600 delay-300">
            <CoursesActions />
          </div>

          {/* Courses Data with Suspense - This will show loading.tsx while loading */}
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg"></div>
                    <div className="w-16 h-6 bg-muted/30 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-muted/50 rounded w-2/3 mb-2"></div>
                  <div className="h-5 bg-muted/30 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/30 rounded w-full"></div>
                    <div className="h-4 bg-muted/30 rounded w-2/3"></div>
                    <div className="h-4 bg-muted/30 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <CoursesData />
          </Suspense>
        </div>
      </SectionWrapper>
    </main>
  );
}
