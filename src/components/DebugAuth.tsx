'use client';

import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { useStorage } from '@/lib/storageContext';

export function DebugAuth() {
  const { session, user, isLoading } = useSupabase();
  const storage = useStorage();

  const testCourseCreation = async () => {
    try {
      console.log('🧪 DebugAuth: Testing course creation...');
      console.log('🧪 DebugAuth: Session:', session);
      console.log('🧪 DebugAuth: User:', user);
      
      const testCourse = {
        code: 'DEBUG123',
        title: 'Debug Test Course',
        term: 'Debug Term',
      };
      
      console.log('🧪 DebugAuth: Calling storage.createCourse...');
      const result = await storage.createCourse(testCourse);
      console.log('✅ DebugAuth: Course created successfully:', result);
    } catch (error) {
      console.error('❌ DebugAuth: Course creation failed:', error);
    }
  };

  if (isLoading) {
    return <div>Loading auth state...</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-muted/50">
      <h3 className="font-semibold mb-2">Debug Auth State</h3>
      <div className="space-y-2 text-sm">
        <div>Session: {session ? '✅ Active' : '❌ None'}</div>
        <div>User: {user ? `✅ ${user.email}` : '❌ None'}</div>
        <div>User ID: {user?.id || 'N/A'}</div>
      </div>
      <button 
        onClick={testCourseCreation}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Test Course Creation
      </button>
    </div>
  );
}
