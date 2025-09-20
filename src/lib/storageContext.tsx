'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import { StoragePort } from './storage';
import { createMockStorage } from './adapters/mockStorage';
import { createSupabaseStorage } from './adapters/supabaseAdapter';
import { useSupabase } from './supabase/SupabaseProvider';
import { mockCourses, mockAssignments, mockExams, mockEvents, mockGradeItems } from './mock';

// Create the storage context
const StorageContext = createContext<StoragePort | null>(null);

// Provider component
interface StorageProviderProps {
  children: ReactNode;
}

export function StorageProvider({ children }: StorageProviderProps) {
  const { supabase } = useSupabase();
  
  // Create the storage instance based on environment
  const storage = useMemo(() => {
    const driver = process.env.STORAGE_DRIVER || 'mock';
    
    if (driver === 'supabase') {
      // For Supabase, use the authenticated client from SupabaseProvider
      return createSupabaseStorage(supabase);
    }
    
    // For mock storage, pre-populate with mock data
    return createMockStorage({
      courses: mockCourses,
      assignments: mockAssignments,
      exams: mockExams,
      events: mockEvents,
      grades: mockGradeItems,
    });
  }, [supabase]);

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
}

// Hook to use storage
export function useStorage(): StoragePort {
  const storage = useContext(StorageContext);
  
  if (!storage) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  
  return storage;
}
