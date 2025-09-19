'use client';

import { Clock, Plus, Calendar } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function TimetablePage() {
  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Timetable
            </h1>
            <p className="text-lg text-muted-foreground">
              View your weekly class schedule and time management.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Week View
            </UIButton>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </UIButton>
          </div>

          {/* Timetable Placeholder */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Timetable Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Weekly timetable view will be available here. Import your schedule or add events manually.
            </p>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Event
            </UIButton>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
