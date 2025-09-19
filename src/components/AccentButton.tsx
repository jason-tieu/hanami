'use client';
import * as React from 'react';
import clsx from 'clsx';

type AccentButtonProps = React.PropsWithChildren<{
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  asChild?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function AccentButton({
  className,
  variant = 'primary',
  asChild = false,
  onClick,
  children,
}: AccentButtonProps) {
  const base =
    'accent-btn relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium ' +
    'cursor-pointer select-none ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ' +
    'transition-all duration-200 ease-out ' +
    'active:scale-[0.98] hover:scale-[1.02] ' +
    'min-h-[44px]';

  const styles = {
    primary:
      'bg-gradient-to-r from-brand to-brand/80 text-white hover:from-brand/90 hover:to-brand/70 shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/40 border border-brand/20',
    secondary:
      'bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:from-brand/80 hover:to-brand/60 hover:text-white shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-brand/40 border border-black hover:border-transparent dark:from-neutral-800 dark:to-neutral-700 dark:text-white dark:hover:from-brand/80 dark:hover:to-brand/60 dark:shadow-black/25 dark:border-neutral-600/120 dark:hover:border-transparent',
    ghost:
      'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border hover:border-brand/40 shadow-sm hover:shadow-md hover:shadow-brand/20 dark:text-neutral-200 dark:hover:bg-brand/20 dark:hover:text-brand dark:border-neutral-700',
  } as const;

  // Shared ripple creator
  const createRipple = (hostEl: HTMLElement, e: React.MouseEvent<HTMLElement>) => {
    const overlay = hostEl.querySelector('.accent-ripple-host') as HTMLElement | null;
    const rect = hostEl.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    if (overlay) {
      const ripple = document.createElement('span');
      ripple.className = 'accent-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      overlay.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    }
  };

  // ---- asChild path: make the CHILD the interactive element ----
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<
      React.HTMLAttributes<HTMLElement>
    >;
    const childOnClick = child.props?.onClick as React.MouseEventHandler<HTMLElement> | undefined;

    const mergedOnClick: React.MouseEventHandler<HTMLElement> = e => {
      createRipple(e.currentTarget as HTMLElement, e);
      childOnClick?.(e);
      onClick?.(e);
    };

    return React.cloneElement(
      child,
      {
        className: clsx(base, styles[variant], child.props.className, className),
        onClick: mergedOnClick,
      },
      <>
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl accent-ripple-host" />
        <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
          {child.props.children}
        </span>
      </>,
    );
  }

  // ---- default path: normal <button> element ----
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    createRipple(e.currentTarget as HTMLElement, e);
    onClick?.(e);
  };

  return (
    <button type="button" className={clsx(base, styles[variant], className)} onClick={handleClick}>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl accent-ripple-host" />
      <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
        {children}
      </span>
    </button>
  );
}
