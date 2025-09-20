import { SupabaseClient } from '@supabase/supabase-js';
import { 
  Course, 
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

export function createSupabaseStorage(supabase: SupabaseClient): StoragePort {
  return {
    // Courses
    async listCourses(): Promise<Course[]> {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },

    async getCourse(id: string): Promise<Course | null> {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // No rows returned
        throw error;
      }
      return data;
    },

    async createCourse(courseData: Omit<Course, 'id'>): Promise<Course> {
      console.log('🔄 SupabaseAdapter: createCourse called with:', courseData);
      
      // Get current user for RLS
      console.log('🔍 SupabaseAdapter: Getting current user...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('❌ SupabaseAdapter: Error getting user:', userError);
        throw new Error('Failed to get user information.');
      }
      
      if (!user) {
        console.log('❌ SupabaseAdapter: No user found');
        throw new Error('Please sign in to add courses.');
      }

      console.log('✅ SupabaseAdapter: User found:', user.email, 'ID:', user.id);

      const insertData = {
        ...courseData,
        owner_id: user.id,
      };
      
      console.log('📝 SupabaseAdapter: Inserting course with data:', insertData);
      
      const { data, error } = await supabase
        .from('courses')
        .insert([insertData])
        .select()
        .single();
      
      if (error) {
        console.error('❌ SupabaseAdapter: Database error:', error);
        throw error;
      }
      
      console.log('✅ SupabaseAdapter: Course created successfully:', data);
      return data;
    },

    async updateCourse(id: string, updates: Partial<Omit<Course, 'id'>>): Promise<Course | null> {
      const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // No rows returned
        throw error;
      }
      return data;
    },

    async deleteCourse(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },

    // Assignments
    async listAssignments(filters?: AssignmentFilters): Promise<Assignment[]> {
      let query = supabase
        .from('assignments')
        .select('*')
        .order('due_at', { ascending: true });

      if (filters?.courseId) {
        query = query.eq('course_id', filters.courseId);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.dueBefore) {
        query = query.lte('due_at', filters.dueBefore.toISOString());
      }
      if (filters?.dueAfter) {
        query = query.gte('due_at', filters.dueAfter.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    async getAssignment(id: string): Promise<Assignment | null> {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },

    async createAssignment(assignmentData: Omit<Assignment, 'id'>): Promise<Assignment> {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to add assignments.');
      }

      const { data, error } = await supabase
        .from('assignments')
        .insert([{
          ...assignmentData,
          owner_id: user.id,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async updateAssignment(id: string, updates: Partial<Omit<Assignment, 'id'>>): Promise<Assignment | null> {
      const { data, error } = await supabase
        .from('assignments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },

    async deleteAssignment(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },

    // Exams
    async listExams(filters?: ExamFilters): Promise<Exam[]> {
      let query = supabase
        .from('exams')
        .select('*')
        .order('starts_at', { ascending: true });

      if (filters?.courseId) {
        query = query.eq('course_id', filters.courseId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    async getExam(id: string): Promise<Exam | null> {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },

    async createExam(examData: Omit<Exam, 'id'>): Promise<Exam> {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to add exams.');
      }

      const { data, error } = await supabase
        .from('exams')
        .insert([{
          ...examData,
          owner_id: user.id,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async updateExam(id: string, updates: Partial<Omit<Exam, 'id'>>): Promise<Exam | null> {
      const { data, error } = await supabase
        .from('exams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },

    async deleteExam(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },

    // Events
    async listEvents(filters?: EventFilters): Promise<Event[]> {
      let query = supabase
        .from('events')
        .select('*')
        .order('starts_at', { ascending: true });

      if (filters?.courseId) {
        query = query.eq('course_id', filters.courseId);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.from) {
        query = query.gte('starts_at', filters.from.toISOString());
      }
      if (filters?.to) {
        query = query.lte('ends_at', filters.to.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to add events.');
      }

      const { data, error } = await supabase
        .from('events')
        .insert([{
          ...eventData,
          owner_id: user.id,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async updateEvent(id: string, updates: Partial<Omit<Event, 'id'>>): Promise<Event | null> {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },

    async deleteEvent(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },

    // Grades
    async listGradeItems(filters?: GradeItemFilters): Promise<GradeItem[]> {
      let query = supabase
        .from('grade_items')
        .select('*')
        .order('due_date', { ascending: true });

      if (filters?.courseId) {
        query = query.eq('course_id', filters.courseId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    async createGradeItem(gradeItemData: Omit<GradeItem, 'id'>): Promise<GradeItem> {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to add grade items.');
      }

      const { data, error } = await supabase
        .from('grade_items')
        .insert([{
          ...gradeItemData,
          owner_id: user.id,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async updateGradeItem(id: string, updates: Partial<Omit<GradeItem, 'id'>>): Promise<GradeItem | null> {
      const { data, error } = await supabase
        .from('grade_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },

    async deleteGradeItem(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('grade_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },

    // Utilities
    async clearAll(): Promise<void> {
      // Delete in order to respect foreign key constraints
      await supabase.from('grade_items').delete().neq('id', '');
      await supabase.from('assignments').delete().neq('id', '');
      await supabase.from('exams').delete().neq('id', '');
      await supabase.from('events').delete().neq('id', '');
      await supabase.from('courses').delete().neq('id', '');
    },

    async exportJSON(): Promise<string> {
      const [courses, assignments, exams, events, grades] = await Promise.all([
        this.listCourses(),
        this.listAssignments(),
        this.listExams(),
        this.listEvents(),
        this.listGradeItems(),
      ]);

      return JSON.stringify({
        courses,
        assignments,
        exams,
        events,
        grades,
      }, null, 2);
    },

    async importJSON(data: string): Promise<void> {
      const imported = JSON.parse(data) as {
        courses: Course[];
        assignments: Assignment[];
        exams: Exam[];
        events: Event[];
        grades: GradeItem[];
      };

      // Clear existing data first
      await this.clearAll();

      // Insert in order to respect foreign key constraints
      if (imported.courses.length > 0) {
        await supabase.from('courses').insert(imported.courses);
      }
      if (imported.assignments.length > 0) {
        await supabase.from('assignments').insert(imported.assignments);
      }
      if (imported.exams.length > 0) {
        await supabase.from('exams').insert(imported.exams);
      }
      if (imported.events.length > 0) {
        await supabase.from('events').insert(imported.events);
      }
      if (imported.grades.length > 0) {
        await supabase.from('grade_items').insert(imported.grades);
      }
    },
  };
}
