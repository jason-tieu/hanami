'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
      exit={{ opacity: 1, y: 0 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
