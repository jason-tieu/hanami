'use client';

import { useState } from 'react';
import { Search, Filter, RefreshCw, Plus } from 'lucide-react';
import { Course } from '@/lib/types';
import { useToast } from '@/lib/toast';
import { useStorage } from '@/lib/storageContext';
import UIButton from '@/components/UIButton';
import { AddCourseModal } from '@/components/AddCourseModal';

export function CoursesActions() {
  const storage = useStorage();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Search will be handled by client-side filtering
  };

  // Handle course added from modal
  const handleCourseAdded = (newCourse: Course) => {
    console.log('➕ CoursesActions: Course added to UI:', newCourse);
    // Refresh the page to show new course
    window.location.reload();
  };

  // Refresh courses manually
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      console.log('🔄 CoursesActions: Manually refreshing courses...');
      const storageCourses = await storage.listCourses();
      console.log('✅ CoursesActions: Refreshed courses count:', storageCourses.length);
      console.log('✅ CoursesActions: Refreshed courses:', storageCourses);
      // Refresh the page to show updated courses
      window.location.reload();
      
      // Show refresh success toast
      addToast({
        type: 'success',
        title: 'Courses Refreshed',
        description: `Loaded ${storageCourses.length} courses from database.`,
      });
    } catch (error) {
      console.error('❌ CoursesActions: Failed to refresh courses:', error);
      addToast({
        type: 'error',
        title: 'Refresh Failed',
        description: 'Failed to refresh courses from database.',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearchChange}
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

      {/* Add Course Modal */}
      <AddCourseModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onCourseAdded={handleCourseAdded}
      />
    </>
  );
}
