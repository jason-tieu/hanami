'use client';

import { useState } from 'react';
import { Calendar, Plus, Search, Filter, Clock, MapPin, User } from 'lucide-react';
import { mockExams, mockCourses } from '@/lib/mock';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function ExamsPage() {
  const [exams] = useState(mockExams);
  const [courses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');

  const getCourseCode = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.code || 'Unknown';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'midterm': return 'text-orange-500 bg-orange-500/10';
      case 'final': return 'text-red-500 bg-red-500/10';
      case 'quiz': return 'text-blue-500 bg-blue-500/10';
      case 'practical': return 'text-green-500 bg-green-500/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCourseCode(exam.courseId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Exams
            </h1>
            <p className="text-lg text-muted-foreground">
              View your exam schedule, locations, and important details.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </UIButton>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Exam
            </UIButton>
          </div>

          {/* Exams List */}
          <div className="space-y-4">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        {getCourseCode(exam.courseId)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(exam.type)}`}>
                        {exam.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-4">{exam.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Date: {formatDate(exam.startsAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {exam.duration ? formatDuration(exam.duration) : 'TBD'}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {exam.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Location: {exam.location}</span>
                          </div>
                        )}
                        
                        {exam.seat && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>Seat: {exam.seat}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {exam.instructions && (
                      <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Instructions:</span> {exam.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 flex gap-2">
                    <UIButton variant="secondary" className="text-sm px-3 py-1">
                      View Details
                    </UIButton>
                    <UIButton variant="ghost" className="text-sm px-3 py-1">
                      Edit
                    </UIButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No exams found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'No exams scheduled yet.'}
              </p>
              <UIButton variant="primary" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Exam
              </UIButton>
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  );
}
