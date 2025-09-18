'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import UIButton from '@/components/UIButton';
import AccentButton from '@/components/AccentButton';
import { pageVariants, containerVariants, itemVariants } from '@/components/motion';

export default function NotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center space-y-8 max-w-2xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-9xl font-bold text-gradient">404</h1>
          <h2 className="text-3xl sm:text-4xl font-bold">Page Not Found</h2>
          <p className="text-lg text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved,
            deleted, or doesn&apos;t exist.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <UIButton asChild variant="primary" className="text-lg px-8 py-6">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </UIButton>
          <AccentButton asChild variant="secondary" className="text-lg px-8 py-6">
            <Link href="/projects" className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Browse Projects
            </Link>
          </AccentButton>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-8">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{' '}
            <Link
              href="/contact"
              className="text-brand hover:text-accent-brand underline underline-offset-4 transition-colors"
            >
              contact me
            </Link>
            .
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
