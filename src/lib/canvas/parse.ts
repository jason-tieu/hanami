/**
 * Canvas data parsing utilities
 */

/**
 * Parse semester and year from course code
 * Pattern: _(\d{2})se([12]) → year=2000+YY, semester=1|2
 * 
 * @param code - Course code string (e.g., "COMP1001_24se1", "MATH2000_23se2")
 * @returns Object with year and semester, or null if no match
 */
export function parseSemesterYear(code?: string): { year: number; semester: number } | null {
  if (!code || typeof code !== 'string') {
    return null;
  }

  // Match pattern: _YYseS where YY is 2-digit year, S is 1 or 2
  const match = code.match(/_(\d{2})se([12])$/);
  
  if (!match) {
    return null;
  }

  const [, yearStr, semesterStr] = match;
  const year = 2000 + parseInt(yearStr, 10);
  const semester = parseInt(semesterStr, 10);

  // Validate year is reasonable (2000-2099)
  if (year < 2000 || year > 2099) {
    return null;
  }

  return { year, semester };
}

/**
 * Extract course code from Canvas course name or course_code
 * Removes common prefixes and suffixes
 * 
 * @param course - Canvas course object
 * @returns Cleaned course code or null
 */
export function extractCourseCode(course: { name: string; course_code?: string }): string | null {
  // Prefer course_code if available
  if (course.course_code && course.course_code.trim()) {
    return course.course_code.trim();
  }

  // Fallback to parsing from name
  const name = course.name.trim();
  if (!name) {
    return null;
  }

  // Common patterns to clean up:
  // - Remove semester/year suffixes: "COMP1001_24se1" → "COMP1001"
  // - Remove section info: "COMP1001 - Section A" → "COMP1001"
  // - Remove term info: "COMP1001 (Semester 1)" → "COMP1001"
  
  let cleaned = name;
  
  // Remove semester/year pattern
  cleaned = cleaned.replace(/_(\d{2})se[12]$/, '');
  
  // Remove section patterns
  cleaned = cleaned.replace(/\s*-\s*Section\s+[A-Z]\s*$/i, '');
  cleaned = cleaned.replace(/\s*\(Section\s+[A-Z]\)\s*$/i, '');
  
  // Remove term patterns
  cleaned = cleaned.replace(/\s*\(Semester\s+[12]\)\s*$/i, '');
  cleaned = cleaned.replace(/\s*\(Term\s+[12]\)\s*$/i, '');
  
  // Remove extra whitespace
  cleaned = cleaned.trim();
  
  return cleaned || null;
}

/**
 * Parse Canvas course URL from course object
 * 
 * @param course - Canvas course object
 * @param baseUrl - Canvas base URL
 * @returns Course URL or null
 */
export function parseCourseUrl(course: { id: number }, baseUrl: string): string | null {
  if (!baseUrl || !course.id) {
    return null;
  }

  // Ensure baseUrl doesn't end with slash
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  
  return `${cleanBaseUrl}/courses/${course.id}`;
}
