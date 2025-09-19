'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="h-14 w-14 p-0 border border-border/120 dark:border-white/40 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-2xl cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm min-h-[44px] relative inline-flex items-center justify-center dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20"
      >
        <div className="h-6 w-6" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const cycleTheme = () => {
    // Add a brief fade effect during theme transition
    const body = document.body;
    body.style.transition = 'opacity 0.2s ease-in-out';
    body.style.opacity = '0.7';

    setTimeout(() => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }

      // Fade back in
      setTimeout(() => {
        body.style.opacity = '1';
        setTimeout(() => {
          body.style.transition = '';
        }, 200);
      }, 50);
    }, 100);
  };

  const getIcon = () => {
    // Show current mode: Sun for light, Moon for dark
    // Default to Sun if theme is undefined or system
    if (theme === 'dark') {
      return <Moon className="h-6 w-6" />;
    }
    return <Sun className="h-6 w-6" />;
  };

  const getLabel = () => {
    return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  };

  // Calculate bobbing animation based on scroll with inertia
  const scrollIntensity = Math.min(scrollY / 100, 4); // Max intensity at 400px scroll
  const inertia = scrollDirection === 'down' ? scrollIntensity * 3 : -scrollIntensity * 2.5;
  const bobOffset = inertia;
  const rotationIntensity = Math.min(scrollY / 200, 2);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            animate={{
              y: bobOffset,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              mass: 1.2,
            }}
          >
            <button
              type="button"
              className="h-14 w-14 p-0 border border-border/120 dark:border-white/40 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-2xl cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm min-h-[44px] relative inline-flex items-center justify-center dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20"
              onClick={cycleTheme}
              aria-label={getLabel()}
            >
              <motion.div
                animate={{
                  rotate:
                    scrollDirection === 'down' ? rotationIntensity * 8 : -rotationIntensity * 6,
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className="relative z-10"
              >
                {getIcon()}
              </motion.div>
              <span className="sr-only">{getLabel()}</span>
            </button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getLabel()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
