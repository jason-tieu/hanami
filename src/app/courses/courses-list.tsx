'use client';

import { useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { Course } from '@/lib/types';
import UIButton from '@/components/UIButton';
import { AddCourseModal } from '@/components/AddCourseModal';

interface CoursesListProps {
  courses: Course[];
  onCourseAdded: (course: Course) => void;
}

export function CoursesList({ courses, onCourseAdded }: CoursesListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Handle course added from modal
  const handleCourseAdded = (newCourse: Course) => {
    console.log('➕ CoursesList: Course added to UI:', newCourse);
    onCourseAdded(newCourse);
  };

  if (courses.length === 0) {
    return (
      <>
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-6">
            Get started by adding your first course.
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

        {/* Add Course Modal */}
        <AddCourseModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onCourseAdded={handleCourseAdded}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div 
            key={course.id} 
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-brand" />
              </div>
              {course.credits && (
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
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

      {/* Add Course Modal */}
      <AddCourseModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onCourseAdded={handleCourseAdded}
      />
    </>
  );
}
