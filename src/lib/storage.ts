import { 
  Unit,
  Assignment, 
  Exam, 
  Event, 
  GradeItem,
  AssignmentStatus,
  EventType
} from './types';

// Filter interfaces for list operations
export interface AssignmentFilters {
  unitId?: string;
  status?: AssignmentStatus;
  dueBefore?: Date;
  dueAfter?: Date;
}

export interface ExamFilters {
  unitId?: string;
}

export interface EventFilters {
  from?: Date;
  to?: Date;
  unitId?: string;
  type?: EventType;
}

export interface GradeItemFilters {
  unitId?: string;
}

// Storage port interface - defines the contract for all storage implementations
export interface StoragePort {
  // Units
  listUnits(): Promise<Unit[]>;
  getUnit(id: string): Promise<Unit | null>;
  createUnit(unit: Omit<Unit, 'id' | 'owner_id' | 'created_at'>): Promise<Unit>;
  updateUnit(id: string, updates: Partial<Omit<Unit, 'id' | 'owner_id' | 'created_at'>>): Promise<Unit | null>;
  deleteUnit(id: string): Promise<boolean>;


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
