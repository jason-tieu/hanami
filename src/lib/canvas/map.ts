/**
 * Canvas data mapping utilities
 */

import { CanvasSelfProfile, CanvasCourse } from './types';
import { parseSemesterYear, extractCourseCode, parseCourseUrl } from './parse';

/**
 * Map Canvas profile to lms_accounts fields
 */
export function mapCanvasProfileToAccountFields(profile: CanvasSelfProfile): Record<string, any> {
  return {
    external_user_id: profile.id.toString(),
    name: profile.name?.trim() || null,
    short_name: profile.short_name?.trim() || null,
    sortable_name: profile.sortable_name?.trim() || null,
    avatar_url: profile.avatar_url?.trim() || null,
    primary_email: profile.primary_email?.trim() || null,
    login_id: profile.login_id?.trim() || null,
    integration_id: profile.integration_id?.trim() || null,
    time_zone: profile.time_zone?.trim() || null,
    locale: profile.locale?.trim() || null,
    effective_locale: profile.effective_locale?.trim() || null,
    calendar_ics: profile.calendar?.ics?.trim() || null,
    last_profile_sync_at: new Date().toISOString(),
  };
}

/**
 * Map Canvas course to unit payload
 */
export function mapCanvasCourseToUnitPayload(course: CanvasCourse, baseUrl: string): {
  code: string | null;
  title: string;
  url: string | null;
  semester?: number | null;
  year?: number | null;
} {
  const code = extractCourseCode(course);
  const semesterYear = code ? parseSemesterYear(code) : null;
  const url = parseCourseUrl(course, baseUrl);

  return {
    code,
    title: course.name.trim(),
    url,
    semester: semesterYear?.semester || null,
    year: semesterYear?.year || null,
  };
}

/**
 * Pick enrollment role from Canvas course
 * Prefers active + student, then any active, then any enrollment; defaults to 'StudentEnrollment'
 */
export function pickEnrollmentRole(course: CanvasCourse): string {
  if (!course.enrollments || course.enrollments.length === 0) {
    return 'StudentEnrollment';
  }

  // Find active student enrollment
  const activeStudentEnrollment = course.enrollments.find(
    (enrollment) => 
      enrollment.enrollment_state === 'active' && 
      enrollment.type === 'StudentEnrollment'
  );

  if (activeStudentEnrollment) {
    return activeStudentEnrollment.type;
  }

  // Find any active enrollment
  const activeEnrollment = course.enrollments.find(
    (enrollment) => enrollment.enrollment_state === 'active'
  );

  if (activeEnrollment) {
    return activeEnrollment.type;
  }

  // Find any student enrollment (including completed/inactive)
  const studentEnrollment = course.enrollments.find(
    (enrollment) => enrollment.type === 'StudentEnrollment'
  );

  if (studentEnrollment) {
    return studentEnrollment.type;
  }

  // Find any enrollment (including completed/inactive)
  const anyEnrollment = course.enrollments[0];
  if (anyEnrollment) {
    return anyEnrollment.type;
  }

  // Default to student enrollment
  return 'StudentEnrollment';
}

/**
 * Check if course should be skipped based on workflow state and enrollments
 */
export function shouldSkipCourse(course: CanvasCourse): boolean {
  // Skip if workflow state is not available
  if (course.workflow_state !== 'available') {
    return true;
  }

  // Skip if no active enrollments
  if (!course.enrollments || course.enrollments.length === 0) {
    return true;
  }

  const hasActiveEnrollment = course.enrollments.some(
    (enrollment) => enrollment.enrollment_state === 'active'
  );

  return !hasActiveEnrollment;
}
