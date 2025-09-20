'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Filter, RefreshCw } from 'lucide-react';
import { useStorage } from '@/lib/storageContext';
import { useSession } from '@/lib/supabase/SupabaseProvider';
import { Course } from '@/lib/types';
import { useToast } from '@/lib/toast';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';
import { AddCourseModal } from '@/components/AddCourseModal';
import { DebugAuth } from '@/components/DebugAuth';

export default function CoursesPage() {
  const storage = useStorage();
  const { addToast } = useToast();
  const { session, user, isLoading } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load courses when session becomes available
  useEffect(() => {
    const loadCourses = async () => {
      try {
        console.log('🔄 CoursesPage: Loading courses from storage...');
        console.log('🔄 CoursesPage: Session loading:', isLoading);
        console.log('🔄 CoursesPage: Session:', !!session);
        console.log('🔄 CoursesPage: User:', !!user);
        
        // Wait for session to load
        if (isLoading) {
          console.log('⏳ CoursesPage: Waiting for session to load...');
          return;
        }
        
        // Note: For mock storage, we don't need a session
        
        console.log('🔄 CoursesPage: Calling storage.listCourses()...');
        const storageCourses = await storage.listCourses();
        console.log('✅ CoursesPage: Loaded courses:', storageCourses);
        setCourses(storageCourses);
      } catch (error) {
        console.error('❌ CoursesPage: Failed to load courses:', error);
        setCourses([]);
      }
    };

    loadCourses();
  }, [storage, isLoading]); // Remove session dependency to avoid double loading

  // Update driver display on client side to avoid hydration mismatch
  useEffect(() => {
    const driverElement = document.getElementById('driver-display');
    if (driverElement) {
      const driver = process.env.NEXT_PUBLIC_STORAGE_DRIVER || 'mock';
      driverElement.textContent = driver;
      console.log('🔧 CoursesPage: Driver display updated to:', driver);
    }
  }, []);

  // Handle course added from modal
  const handleCourseAdded = (newCourse: Course) => {
    console.log('➕ CoursesPage: Course added to UI:', newCourse);
    setCourses(prev => {
      const updated = [...prev, newCourse];
      console.log('📝 CoursesPage: Updated courses list:', updated);
      return updated;
    });
  };

  // Refresh courses manually
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      console.log('🔄 CoursesPage: Manually refreshing courses...');
      const storageCourses = await storage.listCourses();
      console.log('✅ CoursesPage: Refreshed courses count:', storageCourses.length);
      console.log('✅ CoursesPage: Refreshed courses:', storageCourses);
      setCourses(storageCourses);
      
      // Show refresh success toast
      addToast({
        type: 'success',
        title: 'Courses Refreshed',
        description: `Loaded ${storageCourses.length} courses from database.`,
      });
    } catch (error) {
      console.error('❌ CoursesPage: Failed to refresh courses:', error);
      addToast({
        type: 'error',
        title: 'Refresh Failed',
        description: 'Failed to refresh courses from database.',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading state while session is loading
  if (isLoading) {
    return (
      <main className="relative">
        <SectionWrapper className="overflow-hidden">
          <div className="relative z-20 mx-auto max-w-6xl px-6">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-12 bg-muted/50 rounded-lg animate-pulse mb-4"></div>
              <div className="h-6 bg-muted/30 rounded-lg animate-pulse w-2/3"></div>
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Driver: <span className="font-mono bg-muted px-2 py-1 rounded">Loading...</span>
                </div>
              )}
            </div>

            {/* Debug Auth Skeleton */}
            <div className="p-4 border rounded-lg bg-muted/50 animate-pulse">
              <div className="h-6 bg-muted/50 rounded w-1/3 mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted/30 rounded w-1/4"></div>
                <div className="h-4 bg-muted/30 rounded w-1/3"></div>
                <div className="h-4 bg-muted/30 rounded w-1/5"></div>
              </div>
            </div>

            {/* Actions Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 h-10 bg-muted/50 rounded-lg animate-pulse"></div>
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse w-20"></div>
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse w-20"></div>
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse w-24"></div>
            </div>

            {/* Courses Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg"></div>
                    <div className="w-16 h-6 bg-muted/30 rounded"></div>
                  </div>
                  <div className="h-6 bg-muted/50 rounded w-1/2 mb-2"></div>
                  <div className="h-5 bg-muted/30 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/30 rounded w-full"></div>
                    <div className="h-4 bg-muted/30 rounded w-2/3"></div>
                    <div className="h-4 bg-muted/30 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </main>
    );
  }

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-8">
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
          <DebugAuth />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </UIButton>
                    <UIButton 
                      variant="secondary" 
                      className="flex items-center gap-2"
                      onClick={handleRefresh}
                    >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </UIButton>
            <UIButton 
              variant="primary" 
              className="flex items-center gap-2"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Course
            </UIButton>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-brand" />
                  </div>
                  {course.credits && (
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      {course.credits} credits
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{course.code}</h3>
                <h4 className="text-base text-foreground mb-3">{course.title}</h4>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium">Term:</span> {course.term}</p>
                  {course.campus && (
                    <p><span className="font-medium">Campus:</span> {course.campus}</p>
                  )}
                  {course.instructor && (
                    <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                  )}
                </div>
                
                {course.description && (
                  <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                    {course.description}
                  </p>
                )}
                
                <div className="mt-6 flex gap-2">
                  <UIButton variant="secondary" className="flex-1 text-sm px-3 py-1">
                    View Details
                  </UIButton>
                  <UIButton variant="ghost" className="text-sm px-3 py-1">
                    Edit
                  </UIButton>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first course.'}
              </p>
              <UIButton 
                variant="primary" 
                className="flex items-center gap-2"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Course
              </UIButton>
            </div>
          )}

          {/* Add Course Modal */}
          <AddCourseModal
            open={isAddModalOpen}
            onOpenChange={setIsAddModalOpen}
            onCourseAdded={handleCourseAdded}
          />
        </div>
      </SectionWrapper>
    </main>
  );
}
