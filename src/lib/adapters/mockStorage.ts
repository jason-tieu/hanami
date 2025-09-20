import { 
  Unit,
  Assignment, 
  Exam, 
  Event, 
  GradeItem
} from '../types';
import { 
  StoragePort, 
  AssignmentFilters, 
  ExamFilters, 
  EventFilters, 
  GradeItemFilters 
} from '../storage';

// Internal database shape
interface DBShape {
  units: Unit[];
  assignments: Assignment[];
  exams: Exam[];
  events: Event[];
  grades: GradeItem[];
}

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Filter helpers
function matchesAssignmentFilters(assignment: Assignment, filters: AssignmentFilters): boolean {
  if (filters.unitId && assignment.unitId !== filters.unitId) return false;
  if (filters.status && assignment.status !== filters.status) return false;
  if (filters.dueBefore && assignment.dueAt > filters.dueBefore) return false;
  if (filters.dueAfter && assignment.dueAt < filters.dueAfter) return false;
  return true;
}

function matchesExamFilters(exam: Exam, filters: ExamFilters): boolean {
  if (filters.unitId && exam.unitId !== filters.unitId) return false;
  return true;
}

function matchesEventFilters(event: Event, filters: EventFilters): boolean {
  if (filters.unitId && event.unitId !== filters.unitId) return false;
  if (filters.type && event.type !== filters.type) return false;
  if (filters.from && event.startsAt < filters.from) return false;
  if (filters.to && event.endsAt > filters.to) return false;
  return true;
}

function matchesGradeItemFilters(gradeItem: GradeItem, filters: GradeItemFilters): boolean {
  if (filters.unitId && gradeItem.unitId !== filters.unitId) return false;
  return true;
}

export function createMockStorage(initial?: Partial<DBShape>): StoragePort {
  // Initialize database with provided data or empty collections
  const db: DBShape = {
    units: initial?.units || [],
    assignments: initial?.assignments || [],
    exams: initial?.exams || [],
    events: initial?.events || [],
    grades: initial?.grades || [],
  };

  return {
    // Units
    async listUnits(): Promise<Unit[]> {
      return [...db.units];
    },

    async getUnit(id: string): Promise<Unit | null> {
      return db.units.find(unit => unit.id === id) || null;
    },

    async createUnit(unitData: Omit<Unit, 'id' | 'owner_id' | 'created_at'>): Promise<Unit> {
      const unit: Unit = {
        ...unitData,
        id: generateId(),
        owner_id: 'mock-user-id',
        created_at: new Date().toISOString(),
      };
      db.units.push(unit);
      return unit;
    },

    async updateUnit(id: string, updates: Partial<Omit<Unit, 'id' | 'owner_id' | 'created_at'>>): Promise<Unit | null> {
      const index = db.units.findIndex(unit => unit.id === id);
      if (index === -1) return null;
      
      db.units[index] = { ...db.units[index], ...updates };
      return db.units[index];
    },

    async deleteUnit(id: string): Promise<boolean> {
      const index = db.units.findIndex(unit => unit.id === id);
      if (index === -1) return false;
      
      db.units.splice(index, 1);
      // Also remove related assignments, exams, events, and grades
      db.assignments = db.assignments.filter(assignment => assignment.unitId !== id);
      db.exams = db.exams.filter(exam => exam.unitId !== id);
      db.events = db.events.filter(event => event.unitId !== id);
      db.grades = db.grades.filter(grade => grade.unitId !== id);
      
      return true;
    },


    // Assignments
    async listAssignments(filters?: AssignmentFilters): Promise<Assignment[]> {
      if (!filters) return [...db.assignments];
      return db.assignments.filter(assignment => matchesAssignmentFilters(assignment, filters));
    },

    async getAssignment(id: string): Promise<Assignment | null> {
      return db.assignments.find(assignment => assignment.id === id) || null;
    },

    async createAssignment(assignmentData: Omit<Assignment, 'id'>): Promise<Assignment> {
      const assignment: Assignment = {
        ...assignmentData,
        id: generateId(),
      };
      db.assignments.push(assignment);
      return assignment;
    },

    async updateAssignment(id: string, updates: Partial<Omit<Assignment, 'id'>>): Promise<Assignment | null> {
      const index = db.assignments.findIndex(assignment => assignment.id === id);
      if (index === -1) return null;
      
      db.assignments[index] = { ...db.assignments[index], ...updates };
      return db.assignments[index];
    },

    async deleteAssignment(id: string): Promise<boolean> {
      const index = db.assignments.findIndex(assignment => assignment.id === id);
      if (index === -1) return false;
      
      db.assignments.splice(index, 1);
      return true;
    },

    // Exams
    async listExams(filters?: ExamFilters): Promise<Exam[]> {
      if (!filters) return [...db.exams];
      return db.exams.filter(exam => matchesExamFilters(exam, filters));
    },

    async getExam(id: string): Promise<Exam | null> {
      return db.exams.find(exam => exam.id === id) || null;
    },

    async createExam(examData: Omit<Exam, 'id'>): Promise<Exam> {
      const exam: Exam = {
        ...examData,
        id: generateId(),
      };
      db.exams.push(exam);
      return exam;
    },

    async updateExam(id: string, updates: Partial<Omit<Exam, 'id'>>): Promise<Exam | null> {
      const index = db.exams.findIndex(exam => exam.id === id);
      if (index === -1) return null;
      
      db.exams[index] = { ...db.exams[index], ...updates };
      return db.exams[index];
    },

    async deleteExam(id: string): Promise<boolean> {
      const index = db.exams.findIndex(exam => exam.id === id);
      if (index === -1) return false;
      
      db.exams.splice(index, 1);
      return true;
    },

    // Events
    async listEvents(filters?: EventFilters): Promise<Event[]> {
      if (!filters) return [...db.events];
      return db.events.filter(event => matchesEventFilters(event, filters));
    },

    async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
      const event: Event = {
        ...eventData,
        id: generateId(),
      };
      db.events.push(event);
      return event;
    },

    async updateEvent(id: string, updates: Partial<Omit<Event, 'id'>>): Promise<Event | null> {
      const index = db.events.findIndex(event => event.id === id);
      if (index === -1) return null;
      
      db.events[index] = { ...db.events[index], ...updates };
      return db.events[index];
    },

    async deleteEvent(id: string): Promise<boolean> {
      const index = db.events.findIndex(event => event.id === id);
      if (index === -1) return false;
      
      db.events.splice(index, 1);
      return true;
    },

    // Grades
    async listGradeItems(filters?: GradeItemFilters): Promise<GradeItem[]> {
      if (!filters) return [...db.grades];
      return db.grades.filter(gradeItem => matchesGradeItemFilters(gradeItem, filters));
    },

    async createGradeItem(gradeItemData: Omit<GradeItem, 'id'>): Promise<GradeItem> {
      const gradeItem: GradeItem = {
        ...gradeItemData,
        id: generateId(),
      };
      db.grades.push(gradeItem);
      return gradeItem;
    },

    async updateGradeItem(id: string, updates: Partial<Omit<GradeItem, 'id'>>): Promise<GradeItem | null> {
      const index = db.grades.findIndex(gradeItem => gradeItem.id === id);
      if (index === -1) return null;
      
      db.grades[index] = { ...db.grades[index], ...updates };
      return db.grades[index];
    },

    async deleteGradeItem(id: string): Promise<boolean> {
      const index = db.grades.findIndex(gradeItem => gradeItem.id === id);
      if (index === -1) return false;
      
      db.grades.splice(index, 1);
      return true;
    },

    // Utilities
    async clearAll(): Promise<void> {
      db.units = [];
      db.assignments = [];
      db.exams = [];
      db.events = [];
      db.grades = [];
    },

    async exportJSON(): Promise<string> {
      return JSON.stringify(db, null, 2);
    },

    async importJSON(data: string): Promise<void> {
      const imported = JSON.parse(data) as DBShape;
      db.units = imported.units || [];
      db.assignments = imported.assignments || [];
      db.exams = imported.exams || [];
      db.events = imported.events || [];
      db.grades = imported.grades || [];
    },
  };
}
