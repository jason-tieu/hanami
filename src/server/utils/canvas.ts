/**
 * Canvas-specific utility functions
 */

/**
 * Clean syllabus HTML content
 * Strip tags and trim to ~5000 chars
 */
export function cleanSyllabus(html?: string): string | null {
  if (!html || typeof html !== 'string') {
    return null;
  }

  try {
    // Strip HTML tags and decode entities
    const text = html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Decode &amp;
      .replace(/&lt;/g, '<') // Decode &lt;
      .replace(/&gt;/g, '>') // Decode &gt;
      .replace(/&quot;/g, '"') // Decode &quot;
      .replace(/&#39;/g, "'") // Decode &#39;
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Truncate to ~5000 chars
    return text.length > 5000 ? text.substring(0, 5000) + '...' : text;
  } catch (error) {
    console.warn('Failed to clean syllabus:', error);
    return null;
  }
}

/**
 * Extract primary teacher name from course enrollments
 * Best effort from enrollments
 */
export function primaryTeacherName(course: any): string | null {
  if (!course?.enrollments || !Array.isArray(course.enrollments)) {
    return null;
  }

  try {
    // Look for teacher enrollments first
    const teacherEnrollment = course.enrollments.find(
      (enrollment: any) => 
        enrollment.type === 'TeacherEnrollment' && 
        enrollment.user?.name
    );

    if (teacherEnrollment?.user?.name) {
      return teacherEnrollment.user.name.trim();
    }

    // Look for TA enrollments
    const taEnrollment = course.enrollments.find(
      (enrollment: any) => 
        enrollment.type === 'TaEnrollment' && 
        enrollment.user?.name
    );

    if (taEnrollment?.user?.name) {
      return taEnrollment.user.name.trim();
    }

    // Look for any enrollment with a user name
    const anyEnrollment = course.enrollments.find(
      (enrollment: any) => enrollment.user?.name
    );

    if (anyEnrollment?.user?.name) {
      return anyEnrollment.user.name.trim();
    }

    return null;
  } catch (error) {
    console.warn('Failed to extract teacher name:', error);
    return null;
  }
}
