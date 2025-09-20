'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  id?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string | undefined;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  id,
  ...props
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Focus first option
          const firstOption = selectRef.current?.querySelector('[role="option"]') as HTMLElement;
          firstOption?.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent, optionValue: string) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onChange(optionValue);
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        const nextOption = (event.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
        nextOption?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevOption = (event.currentTarget as HTMLElement).previousElementSibling as HTMLElement;
        prevOption?.focus();
        break;
    }
  };

  return (
    <div ref={selectRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={id}
        className={cn(
          'relative w-full cursor-pointer appearance-none',
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'dark:bg-input/30 border-input flex h-10 min-w-0 rounded-xl border bg-card/80 px-4 py-2 text-base',
          'shadow-md transition-all duration-200 ease-out outline-none',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:bg-card/90',
          'hover:bg-card/90 hover:border-ring/50 hover:shadow-lg hover:scale-[1.01]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'backdrop-blur-sm text-left font-medium',
          'data-[state=open]:bg-card/90 data-[state=open]:border-ring/50',
          isOpen && 'bg-card/90 border-ring/50 shadow-lg',
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={props['aria-invalid']}
        aria-describedby={props['aria-describedby']}
      >
        <span className={cn(
          'block truncate',
          !selectedOption && 'text-muted-foreground'
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            'absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none',
            'transition-transform duration-200 ease-out',
            isOpen && 'rotate-180 text-foreground'
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 max-h-60 overflow-auto rounded-xl border border-border/50 bg-card/98 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-200 hover:shadow-2xl transition-all duration-300 ring-1 ring-border/20">
          <div role="listbox" className="py-2">
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                className={cn(
                  'relative cursor-pointer px-4 py-3 text-sm mx-2 rounded-lg',
                  'transition-all duration-200 ease-out',
                  'bg-transparent text-foreground',
                  'hover:bg-accent/10 hover:text-accent-foreground hover:scale-[0.98] hover:shadow-lg hover:shadow-black/20 hover:border-l-4 hover:border-l-accent',
                  'active:scale-[0.95] active:bg-accent/15',
                  'focus:bg-accent/10 focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-accent/20',
                  'data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent-foreground',
                  'group',
                  option.disabled && 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none hover:bg-transparent',
                  option.value === value && 'bg-muted/50 text-foreground hover:bg-accent/10 hover:text-accent-foreground'
                )}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.value);
                    setIsOpen(false);
                    buttonRef.current?.focus();
                  }
                }}
                onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                tabIndex={-1}
                aria-selected={option.value === value}
                data-highlighted={option.value === value}
              >
                <div className="flex items-center justify-between">
                  <span className="block truncate font-medium transition-all duration-200 group-hover:translate-x-1">
                    {option.label}
                  </span>
                  {option.value === value && (
                    <Check className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:scale-110 group-hover:text-accent-foreground" />
                  )}
                </div>
                {/* Subtle accent hover indicator line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent/40 transition-all duration-200 group-hover:w-1 opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
