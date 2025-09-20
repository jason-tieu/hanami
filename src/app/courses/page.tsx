'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Filter } from 'lucide-react';
import { useStorage } from '@/lib/storageContext';
import { Course } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';
import { AddCourseModal } from '@/components/AddCourseModal';

export default function CoursesPage() {
  const storage = useStorage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load courses from storage on mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const storageCourses = await storage.listCourses();
        setCourses(storageCourses);
      } catch (error) {
        console.error('Failed to load courses:', error);
        setCourses([]);
      }
    };

    loadCourses();
  }, [storage]);

  // Handle course added from modal
  const handleCourseAdded = (newCourse: Course) => {
    setCourses(prev => [...prev, newCourse]);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          </div>

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
