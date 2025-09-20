'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import UIButton from '@/components/UIButton';
import { useStorage } from '@/lib/storageContext';
import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { useToast } from '@/lib/toast';
import { Course } from '@/lib/types';

interface AddCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCourseAdded: (course: Course) => void;
}

interface FormData {
  code: string;
  title: string;
  term: string;
  campus: string;
  instructor: string;
  credits: string;
  url: string;
  description: string;
}

interface FormErrors {
  code?: string;
  title?: string;
  term?: string;
  credits?: string;
  url?: string;
}

export function AddCourseModal({ open, onOpenChange, onCourseAdded }: AddCourseModalProps) {
  const storage = useStorage();
  const { user } = useSupabase();
  const { addToast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    code: '',
    title: '',
    term: '',
    campus: '',
    instructor: '',
    credits: '',
    url: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    }
    if (!formData.term.trim()) {
      newErrors.term = 'Term is required';
    }

    // Credits validation
    if (formData.credits && (isNaN(Number(formData.credits)) || Number(formData.credits) < 0)) {
      newErrors.credits = 'Credits must be a number ≥ 0';
    }

    // URL validation
    if (formData.url && formData.url.trim()) {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!validateForm()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        description: 'Please fix the errors below and try again.',
      });
      return;
    }

    if (!user) {
      addToast({
        type: 'error',
        title: 'Authentication Required',
        description: 'Please sign in to create courses.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const courseData: Omit<Course, 'id'> = {
        code: formData.code.trim(),
        title: formData.title.trim(),
        term: formData.term.trim(),
        ...(formData.campus.trim() && { campus: formData.campus.trim() }),
        ...(formData.instructor.trim() && { instructor: formData.instructor.trim() }),
        ...(formData.credits && { credits: Number(formData.credits) }),
        ...(formData.url.trim() && { url: formData.url.trim() }),
        ...(formData.description.trim() && { description: formData.description.trim() }),
      };

      const newCourse = await storage.createCourse(courseData);
      
      addToast({
        type: 'success',
        title: 'Course Added',
        description: `${newCourse.code} has been added successfully.`,
      });

      onCourseAdded(newCourse);
      handleClose();
    } catch (error) {
      console.error('Failed to create course:', error);
      addToast({
        type: 'error',
        title: 'Failed to Create Course',
        description: error instanceof Error ? error.message : 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      code: '',
      title: '',
      term: '',
      campus: '',
      instructor: '',
      credits: '',
      url: '',
      description: '',
    });
    setErrors({});
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-brand" />
            Add New Course
          </DialogTitle>
          <DialogDescription>
            Create a new course to track your academic progress.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-4">
            {/* Course Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-foreground mb-1">
                Course Code <span className="text-red-500">*</span>
              </label>
              <Input
                id="code"
                type="text"
                placeholder="e.g., COMP3506"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                className={errors.code ? 'border-red-500 focus-visible:ring-red-500' : ''}
                aria-invalid={!!errors.code}
                aria-describedby={errors.code ? 'code-error' : undefined}
              />
              {errors.code && (
                <p id="code-error" className="text-sm text-red-500 mt-1">
                  {errors.code}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                Course Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Algorithms & Data Structures"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-sm text-red-500 mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Term */}
            <div>
              <label htmlFor="term" className="block text-sm font-medium text-foreground mb-1">
                Term <span className="text-red-500">*</span>
              </label>
              <Input
                id="term"
                type="text"
                placeholder="e.g., Semester 1, 2025"
                value={formData.term}
                onChange={(e) => handleInputChange('term', e.target.value)}
                className={errors.term ? 'border-red-500 focus-visible:ring-red-500' : ''}
                aria-invalid={!!errors.term}
                aria-describedby={errors.term ? 'term-error' : undefined}
              />
              {errors.term && (
                <p id="term-error" className="text-sm text-red-500 mt-1">
                  {errors.term}
                </p>
              )}
            </div>

            {/* Campus */}
            <div>
              <label htmlFor="campus" className="block text-sm font-medium text-foreground mb-1">
                Campus
              </label>
              <Input
                id="campus"
                type="text"
                placeholder="e.g., St Lucia"
                value={formData.campus}
                onChange={(e) => handleInputChange('campus', e.target.value)}
              />
            </div>

            {/* Instructor */}
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-foreground mb-1">
                Instructor
              </label>
              <Input
                id="instructor"
                type="text"
                placeholder="e.g., Dr. Sarah Chen"
                value={formData.instructor}
                onChange={(e) => handleInputChange('instructor', e.target.value)}
              />
            </div>

            {/* Credits */}
            <div>
              <label htmlFor="credits" className="block text-sm font-medium text-foreground mb-1">
                Credits
              </label>
              <Input
                id="credits"
                type="number"
                min="0"
                placeholder="e.g., 2"
                value={formData.credits}
                onChange={(e) => handleInputChange('credits', e.target.value)}
                className={errors.credits ? 'border-red-500 focus-visible:ring-red-500' : ''}
                aria-invalid={!!errors.credits}
                aria-describedby={errors.credits ? 'credits-error' : undefined}
              />
              {errors.credits && (
                <p id="credits-error" className="text-sm text-red-500 mt-1">
                  {errors.credits}
                </p>
              )}
            </div>

            {/* URL */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-foreground mb-1">
                Course URL
              </label>
              <Input
                id="url"
                type="url"
                placeholder="https://learn.uq.edu.au/course/view.php?id=12345"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className={errors.url ? 'border-red-500 focus-visible:ring-red-500' : ''}
                aria-invalid={!!errors.url}
                aria-describedby={errors.url ? 'url-error' : undefined}
              />
              {errors.url && (
                <p id="url-error" className="text-sm text-red-500 mt-1">
                  {errors.url}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Brief description of the course..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 dark:bg-red-900/20 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200">
                Please fix the errors above before submitting.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <UIButton
              variant="ghost"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </UIButton>
            <UIButton
              variant="primary"
              className="flex-1"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Course
                </>
              )}
            </UIButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
