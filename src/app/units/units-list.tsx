'use client';

import { useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { Unit } from '@/lib/types';
import UIButton from '@/components/UIButton';
import { AddUnitModal } from '@/components/AddUnitModal';

interface UnitsListProps {
  units: Unit[];
  onUnitAdded: (unit: Unit) => void;
}

export function UnitsList({ units, onUnitAdded }: UnitsListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Handle unit added from modal
  const handleUnitAdded = (newUnit: Unit) => {
    onUnitAdded(newUnit);
  };

  if (units.length === 0) {
    return (
      <>
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No units found</h3>
          <p className="text-muted-foreground mb-6">
            Get started by adding your first unit.
          </p>
          <UIButton 
            variant="primary" 
            className="flex items-center gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Unit
          </UIButton>
        </div>

        {/* Add Unit Modal */}
        <AddUnitModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onUnitAdded={handleUnitAdded}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit, index) => (
          <div 
            key={unit.id} 
            className="bg-card/50 border border-border rounded-2xl p-6 hover:bg-card/70 transition-colors duration-200 animate-in fade-in slide-in-from-bottom-2"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-brand" />
              </div>
              <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                {unit.term}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">{unit.code}</h3>
            <h4 className="text-base text-foreground mb-3">{unit.title}</h4>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-medium">Term:</span> {unit.term}</p>
              {unit.campus && (
                <p><span className="font-medium">Campus:</span> {unit.campus}</p>
              )}
              {unit.instructor && (
                <p><span className="font-medium">Instructor:</span> {unit.instructor}</p>
              )}
            </div>
            
            <div className="mt-6 flex gap-2">
              <UIButton 
                variant="secondary" 
                className="flex-1 text-sm px-3 py-1"
                style={{
                  '--hover-bg': 'black',
                  '--hover-text': 'white'
                } as React.CSSProperties}
              >
                View Details
              </UIButton>
              <UIButton variant="ghost" className="text-sm px-3 py-1">
                Edit
              </UIButton>
            </div>
          </div>
        ))}
      </div>

      {/* Add Unit Modal */}
      <AddUnitModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onUnitAdded={handleUnitAdded}
      />
    </>
  );
}
