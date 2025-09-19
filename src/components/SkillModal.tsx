'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
  tags: string[];
};

export default function SkillModal({ open, onClose, title, subtitle, icon, bullets, tags }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (open) {
      // Use requestAnimationFrame to ensure focus happens after render
      requestAnimationFrame(() => {
        closeRef.current?.focus();
      });
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-black/70 dark:bg-black/70" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} details`}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-card border border-border/80 shadow-2xl p-6 dark:bg-[#0B0B0D] dark:border-white/20"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
          >
            <button
              ref={closeRef}
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-accent-pink/20 flex items-center justify-center text-accent-pink">
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-foreground">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand mt-1.5 text-sm">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map(t => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 dark:bg-white/10 dark:border-white/20 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
