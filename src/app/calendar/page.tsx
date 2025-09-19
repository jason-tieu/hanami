'use client';

import { CalendarDays, Plus } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function CalendarPage() {
  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Calendar
            </h1>
            <p className="text-lg text-muted-foreground">
              Monthly view of your academic schedule and events.
            </p>
          </div>

          <div className="flex justify-end mb-8">
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </UIButton>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-12 text-center">
            <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Calendar Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Monthly calendar view will be available here. Sync with your existing calendar or add events manually.
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
