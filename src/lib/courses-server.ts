import { Course } from './types';

// Server-side data fetching for courses
// For now, return empty array to trigger loading state
// In production, this would fetch from your database
export async function getCourses(): Promise<Course[]> {
  // Simulate a delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return empty array to trigger "No courses found" state
  // This will be replaced with actual data fetching
  return [];
}
