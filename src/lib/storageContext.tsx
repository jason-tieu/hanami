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
    // Use NEXT_PUBLIC_ prefix for client-side access
    const driver = process.env.NEXT_PUBLIC_STORAGE_DRIVER || 'mock';
    console.log('🔧 StorageProvider: Creating storage with driver:', driver);
    console.log('🔧 StorageProvider: NEXT_PUBLIC_STORAGE_DRIVER:', process.env.NEXT_PUBLIC_STORAGE_DRIVER);
    console.log('🔧 StorageProvider: Supabase client available:', !!supabase);
    
    // Use Supabase if driver is 'supabase' and client is available
    if (driver === 'supabase' && supabase) {
      console.log('✅ StorageProvider: Creating Supabase storage adapter');
      return createSupabaseStorage(supabase);
    }
    
    // Default to mock storage (for static exports, mock driver, or no Supabase client)
    console.log('⚠️ StorageProvider: Creating mock storage adapter');
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
