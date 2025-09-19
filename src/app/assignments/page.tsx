'use client';

import { useState } from 'react';
import { ClipboardList, Plus, Search, Filter, Calendar, BookOpen } from 'lucide-react';
import { mockAssignments, mockCourses } from '@/lib/mock';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function AssignmentsPage() {
  const [assignments] = useState(mockAssignments);
  const [courses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getCourseCode = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.code || 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'text-yellow-500 bg-yellow-500/10';
      case 'in_progress': return 'text-blue-500 bg-blue-500/10';
      case 'submitted': return 'text-green-500 bg-green-500/10';
      case 'graded': return 'text-purple-500 bg-purple-500/10';
      case 'late': return 'text-red-500 bg-red-500/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'text-blue-500';
      case 'project': return 'text-purple-500';
      case 'lab': return 'text-green-500';
      case 'quiz': return 'text-orange-500';
      case 'essay': return 'text-pink-500';
      case 'presentation': return 'text-indigo-500';
      default: return 'text-muted-foreground';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getCourseCode(assignment.courseId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Assignments
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your assignments, deadlines, and submission status.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="late">Late</option>
            </select>
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </UIButton>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Assignment
            </UIButton>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        {getCourseCode(assignment.courseId)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`text-xs font-medium ${getTypeColor(assignment.type)}`}>
                        {assignment.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">{assignment.title}</h3>
                    
                    {assignment.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {assignment.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {formatDate(assignment.dueAt)}</span>
                      </div>
                      {assignment.weight && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{assignment.weight}% of grade</span>
                        </div>
                      )}
                      {assignment.grade !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            Grade: {assignment.grade}/{assignment.maxGrade || 100}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-6 flex gap-2">
                    <UIButton variant="secondary" className="text-sm px-3 py-1">
                      View
                    </UIButton>
                    <UIButton variant="ghost" className="text-sm px-3 py-1">
                      Edit
                    </UIButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No assignments found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Get started by adding your first assignment.'}
              </p>
              <UIButton variant="primary" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Assignment
              </UIButton>
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  );
}
