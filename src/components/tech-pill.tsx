import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TechPillProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'brand' | 'accent';
  className?: string;
}

const variantStyles = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  brand: 'bg-brand text-brand-foreground hover:bg-brand/90',
  accent: 'bg-accent-brand text-accent-brand-foreground hover:bg-accent-brand/90',
};

export function TechPill({ children, variant = 'secondary', className }: TechPillProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'text-xs font-medium px-2 py-1 rounded-full',
        'transition-colors duration-200',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Badge>
  );
}
