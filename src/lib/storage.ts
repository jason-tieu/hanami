import { 
  Course, 
  Assignment, 
  Exam, 
  Event, 
  GradeItem,
  AssignmentStatus,
  EventType
} from './types';

// Filter interfaces for list operations
export interface AssignmentFilters {
  courseId?: string;
  status?: AssignmentStatus;
  dueBefore?: Date;
  dueAfter?: Date;
}

export interface ExamFilters {
  courseId?: string;
}

export interface EventFilters {
  from?: Date;
  to?: Date;
  courseId?: string;
  type?: EventType;
}

export interface GradeItemFilters {
  courseId?: string;
}

// Storage port interface - defines the contract for all storage implementations
export interface StoragePort {
  // Courses
  listCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | null>;
  createCourse(course: Omit<Course, 'id'>): Promise<Course>;
  updateCourse(id: string, updates: Partial<Omit<Course, 'id'>>): Promise<Course | null>;
  deleteCourse(id: string): Promise<boolean>;

  // Assignments
  listAssignments(filters?: AssignmentFilters): Promise<Assignment[]>;
  getAssignment(id: string): Promise<Assignment | null>;
  createAssignment(assignment: Omit<Assignment, 'id'>): Promise<Assignment>;
  updateAssignment(id: string, updates: Partial<Omit<Assignment, 'id'>>): Promise<Assignment | null>;
  deleteAssignment(id: string): Promise<boolean>;

  // Exams
  listExams(filters?: ExamFilters): Promise<Exam[]>;
  getExam(id: string): Promise<Exam | null>;
  createExam(exam: Omit<Exam, 'id'>): Promise<Exam>;
  updateExam(id: string, updates: Partial<Omit<Exam, 'id'>>): Promise<Exam | null>;
  deleteExam(id: string): Promise<boolean>;

  // Events
  listEvents(filters?: EventFilters): Promise<Event[]>;
  createEvent(event: Omit<Event, 'id'>): Promise<Event>;
  updateEvent(id: string, updates: Partial<Omit<Event, 'id'>>): Promise<Event | null>;
  deleteEvent(id: string): Promise<boolean>;

  // Grades
  listGradeItems(filters?: GradeItemFilters): Promise<GradeItem[]>;
  createGradeItem(gradeItem: Omit<GradeItem, 'id'>): Promise<GradeItem>;
  updateGradeItem(id: string, updates: Partial<Omit<GradeItem, 'id'>>): Promise<GradeItem | null>;
  deleteGradeItem(id: string): Promise<boolean>;

  // Utilities
  clearAll(): Promise<void>;
  exportJSON(): Promise<string>;
  importJSON(data: string): Promise<void>;
}
