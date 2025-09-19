'use client';

import { BookMarked, Plus } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function PlannerPage() {

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Study Planner
            </h1>
            <p className="text-lg text-muted-foreground">
              Plan your study sessions and track your learning progress.
            </p>
          </div>

          <div className="flex justify-end mb-8">
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Study Task
            </UIButton>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-12 text-center">
            <BookMarked className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Study Planner Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Plan study sessions, set goals, and track your learning progress with our study planner.
            </p>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Study Plan
            </UIButton>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
