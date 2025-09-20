'use client';

import { useState } from 'react';
import { Search, Filter, RefreshCw, Plus } from 'lucide-react';
import { Unit } from '@/lib/types';
import { useToast } from '@/lib/toast';
import UIButton from '@/components/UIButton';
import { AddUnitModal } from '@/components/AddUnitModal';

interface UnitsActionsProps {
  onRefresh?: (() => void) | null;
}

export function UnitsActions({ onRefresh }: UnitsActionsProps) {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Search will be handled by client-side filtering
  };

  // Handle unit added from modal
  const handleUnitAdded = (_newUnit: Unit) => {
    // Trigger refresh to show new unit
    if (onRefresh) {
      onRefresh();
    }
  };

  // Refresh units manually
  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    try {
      // Call the refresh function from UnitsData
      onRefresh();
      
      // Show refresh success toast
      addToast({
        type: 'success',
        title: 'Units Refreshed',
        description: 'Unit list is being refreshed from database.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Refresh Failed',
        description: 'Failed to refresh units from database.',
      });
    } finally {
      // Reset refreshing state after a short delay
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search units..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>
        <UIButton variant="secondary" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </UIButton>
        <UIButton 
          variant="secondary" 
          className="flex items-center gap-2"
          onClick={handleRefresh}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </UIButton>
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
