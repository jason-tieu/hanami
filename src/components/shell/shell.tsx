'use client';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import PageTransition from './page-transition';
import SakuraCanvas from '@/components/SakuraCanvas';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip to content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-brand text-brand-foreground px-4 py-2 rounded-md text-sm font-medium"
      >
        Skip to content
      </a>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:pl-64 relative">
        {/* Sakura petals for entire website (excluding sidebar) */}
        <SakuraCanvas enabled density={1.2} hue={345} opacity={0.4} zIndex={1} />
        <PageTransition>
          <div id="main">{children}</div>
        </PageTransition>
      </div>
    </div>
  );
}
