'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
