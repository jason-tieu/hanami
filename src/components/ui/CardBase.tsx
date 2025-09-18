'use client';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import React from 'react';

type Props = React.PropsWithChildren<{
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  onClick?: () => void;
  href?: string;
}>;

export default function CardBase({ className, as = 'div', children, onClick, href }: Props) {
  const Comp = href ? 'a' : as;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
    >
      <Comp
        href={href}
        onClick={onClick}
        className={clsx(
          'group relative overflow-hidden rounded-2xl border p-4',
          'border-white/10 bg-white/5 backdrop-blur',
          'shadow-sm hover:shadow-md transition-all',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/40',
          'hover:border-pink-500/30',
          className,
        )}
      >
        {/* subtle inner ring */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
        {/* hover sheen */}
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute -inset-x-8 -top-24 h-48 rotate-6 bg-gradient-to-b from-pink-400/10 to-transparent blur-2xl" />
        </span>
        {/* click ripple */}
        <span className="pointer-events-none absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-150">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-pink-400/10 blur-2xl" />
        </span>
        {children}
      </Comp>
    </motion.div>
  );
}
