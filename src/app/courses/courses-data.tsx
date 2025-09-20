'use client';

import { useEffect, useState } from 'react';
import { Course } from '@/lib/types';
import { useStorage } from '@/lib/storageContext';
import { useSession } from '@/lib/supabase/SupabaseProvider';
import { CoursesList } from './courses-list';

export function CoursesData() {
  const storage = useStorage();
  const { session, isLoading } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  // Load courses when session becomes available
  useEffect(() => {
    const loadCourses = async () => {
      try {
        console.log('🔄 CoursesData: Loading courses from storage...');
        console.log('🔄 CoursesData: Session loading:', isLoading);
        console.log('🔄 CoursesData: Session:', !!session);
        
        // Wait for session to load
        if (isLoading) {
          console.log('⏳ CoursesData: Waiting for session to load...');
          return;
        }
        
        console.log('🔄 CoursesData: Calling storage.listCourses()...');
        const storageCourses = await storage.listCourses();
        console.log('✅ CoursesData: Loaded courses:', storageCourses);
        setCourses(storageCourses);
        setHasInitiallyLoaded(true);
      } catch (error) {
        console.error('❌ CoursesData: Failed to load courses:', error);
        setCourses([]);
        setHasInitiallyLoaded(true);
      } finally {
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
  }, [storage, isLoading, session]);

  // Handle course added from modal
  const handleCourseAdded = (newCourse: Course) => {
    console.log('➕ CoursesData: Course added to UI:', newCourse);
    setCourses(prev => [...prev, newCourse]);
  };

  // Show skeleton while loading OR if we haven't initially loaded yet
  if (isLoadingCourses || !hasInitiallyLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-muted/70 rounded-lg"></div>
              <div className="w-16 h-6 bg-muted/60 rounded-full"></div>
            </div>
            <div className="h-6 bg-muted/70 rounded w-2/3 mb-2"></div>
            <div className="h-5 bg-muted/60 rounded w-3/4 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted/60 rounded w-full"></div>
              <div className="h-4 bg-muted/60 rounded w-2/3"></div>
              <div className="h-4 bg-muted/60 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <CoursesList 
        courses={courses} 
        onCourseAdded={handleCourseAdded}
      />
    </div>
  );
}
