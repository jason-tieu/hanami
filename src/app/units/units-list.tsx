'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Filter } from 'lucide-react';
import { Unit } from '@/lib/types';
import { hasPeriod } from '@/lib/formatters/period';
import { groupUnits } from '@/lib/groupUnits';
import UIButton from '@/components/UIButton';
import { AddUnitModal } from '@/components/AddUnitModal';
import { UnitCard } from '@/components/UnitCard';
import { UnitDetailsModal } from '@/components/UnitDetailsModal';

interface UnitsListProps {
  units: Unit[];
  onUnitAdded: (unit: Unit) => void;
}

export function UnitsList({ units, onUnitAdded }: UnitsListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [onlyWithPeriod, setOnlyWithPeriod] = useState(true);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  // Handle unit added from modal
  const handleUnitAdded = (newUnit: Unit) => {
    onUnitAdded(newUnit);
  };

  // Handle unit details modal
  const handleViewDetails = (unitId: string) => {
    setSelectedUnitId(unitId);
  };

  const handleCloseDetails = () => {
    setSelectedUnitId(null);
  };

  // Load filter state from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const onlyWithPeriodParam = urlParams.get('onlyWithPeriod');
    if (onlyWithPeriodParam !== null) {
      setOnlyWithPeriod(onlyWithPeriodParam === '1');
    }
  }, []);

  // Update URL when filter changes
  const handleFilterChange = (value: boolean) => {
    setOnlyWithPeriod(value);
    const url = new URL(window.location.href);
    url.searchParams.set('onlyWithPeriod', value ? '1' : '0');
    window.history.replaceState({}, '', url.toString());
  };

  // Filter units based on period filter
  const filteredUnits = onlyWithPeriod ? units.filter(hasPeriod) : units;
  
  // Group and sort units
  const { groups, orderedKeys } = groupUnits(filteredUnits);

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

        {/* Unit Details Modal */}
        {selectedUnitId && (
          <UnitDetailsModal
            unitId={selectedUnitId}
            open={!!selectedUnitId}
            onClose={handleCloseDetails}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* Filter Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {filteredUnits.length} of {units.length} units
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Only with Period</label>
          <button
            onClick={() => handleFilterChange(!onlyWithPeriod)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              onlyWithPeriod ? 'bg-brand' : 'bg-muted'
            }`}
            aria-label="Toggle period filter"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                onlyWithPeriod ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {orderedKeys.map(period => (
          <div key={period}>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {period} ({groups[period].length} unit{groups[period].length !== 1 ? 's' : ''})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups[period].map((unit, index) => (
                <div
                  key={unit.id}
                  className="animate-in fade-in slide-in-from-bottom-2"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <UnitCard unit={unit} onViewDetails={handleViewDetails} />
                </div>
              ))}
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

      {/* Unit Details Modal */}
      {selectedUnitId && (
        <UnitDetailsModal
          unitId={selectedUnitId}
          open={!!selectedUnitId}
          onClose={handleCloseDetails}
        />
      )}

    </>
  );
}
