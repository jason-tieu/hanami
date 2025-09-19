'use client';
import * as React from 'react';
import clsx from 'clsx';

type UIButtonProps = React.PropsWithChildren<{
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  asChild?: boolean; // when true, style & wire up the child element directly (e.g., <Link>)
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function UIButton({
  className,
  variant = 'primary',
  asChild = false,
  onClick,
  children,
}: UIButtonProps) {
  const base =
    'ui-btn relative inline-flex items-center justify-center rounded-2xl px-4 py-2 text-base font-medium ' +
    'cursor-pointer select-none ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ' +
    'transition-all duration-200 ease-out ' +
    'active:scale-[0.98] ' +
    'backdrop-blur-sm border border-border/120 ' +
    'min-h-[44px]';

  const styles = {
    primary:
      'bg-gradient-to-r from-accent-pink/80 to-accent-pink/60 text-black dark:text-white hover:from-accent-pink/90 hover:to-accent-pink/70 shadow-lg shadow-accent-pink/25 hover:shadow-xl hover:shadow-accent-pink/40 hover:scale-[1.02]',
    secondary:
      'bg-brand text-white hover:bg-secondary hover:text-black shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-secondary/40 dark:hover:bg-white dark:hover:text-black dark:hover:shadow-white/40 hover:scale-[1.02] border-0',
    ghost:
      'bg-muted text-muted-foreground hover:bg-accent border-border hover:border-accent-pink/60 hover:border-accent-foreground shadow-sm hover:shadow-lg hover:shadow-accent-pink/25 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-accent-pink/25 hover:scale-[1.02]',
  } as const;

  // Shared ripple
  const createRipple = (hostEl: HTMLElement, e: React.MouseEvent<HTMLElement>) => {
    const overlay = hostEl.querySelector('.ui-ripple-host') as HTMLElement | null;
    const rect = hostEl.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    if (overlay) {
      const ripple = document.createElement('span');
      ripple.className = 'ui-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      overlay.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    }
  };

  // Hover glow: write CSS vars to the interactive element
  const setHoverVars = (el: HTMLElement, x: number, y: number, show = true) => {
    el.style.setProperty('--ui-x', `${x}px`);
    el.style.setProperty('--ui-y', `${y}px`);
    el.style.setProperty('--ui-o', show ? '1' : '0');
  };

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    setHoverVars(el, e.clientX - r.left, e.clientY - r.top, true);
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    setHoverVars(el, e.clientX - r.left, e.clientY - r.top, true);
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty('--ui-o', '0');
  };

  // ---- asChild path: make the CHILD the interactive element ----
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<
      React.HTMLAttributes<HTMLElement>
    >;
    const childOnClick = child.props?.onClick as React.MouseEventHandler<HTMLElement> | undefined;
    const childOnMouseMove = child.props?.onMouseMove as
      | React.MouseEventHandler<HTMLElement>
      | undefined;
    const childOnMouseEnter = child.props?.onMouseEnter as
      | React.MouseEventHandler<HTMLElement>
      | undefined;
    const childOnMouseLeave = child.props?.onMouseLeave as
      | React.MouseEventHandler<HTMLElement>
      | undefined;

    const mergedOnClick: React.MouseEventHandler<HTMLElement> = e => {
      createRipple(e.currentTarget as HTMLElement, e);
      childOnClick?.(e);
      onClick?.(e);
    };

    const mergedOnMove: React.MouseEventHandler<HTMLElement> = e => {
      onMove(e);
      childOnMouseMove?.(e);
    };
    const mergedOnEnter: React.MouseEventHandler<HTMLElement> = e => {
      onEnter(e);
      childOnMouseEnter?.(e);
    };
    const mergedOnLeave: React.MouseEventHandler<HTMLElement> = e => {
      onLeave(e);
      childOnMouseLeave?.(e);
    };

    return React.cloneElement(
      child,
      {
        className: clsx(base, styles[variant], child.props.className, className),
        onClick: mergedOnClick,
        onMouseMove: mergedOnMove,
        onMouseEnter: mergedOnEnter,
        onMouseLeave: mergedOnLeave,
      },
      <>
        {/* Hover glow host lives on ::before; we still need ripple host + content */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl ui-ripple-host" />
        <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
          {child.props.children}
        </span>
      </>,
    );
  }

  // ---- default <button> path ----
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    createRipple(e.currentTarget as HTMLElement, e);
    onClick?.(e);
  };

  return (
    <button
      type="button"
      className={clsx(base, styles[variant], className)}
      onClick={handleClick}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl ui-ripple-host" />
      <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
        {children}
      </span>
    </button>
  );
}
