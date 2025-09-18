"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import { Home, FolderOpen, Briefcase, User, Mail, Github, Linkedin } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/jason-tieu", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jason-tieu-engineer/", icon: Linkedin },
  { name: "Email", href: "mailto:jason.tieu04@gmail.com", icon: Mail },
];

const normalize = (p: string) => (p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p);

export function Sidebar() {
  const pathname = usePathname();
  const activeHref = React.useMemo(() => {
    const np = normalize(pathname || "/");
    const found = navigation.find(it => normalize(it.href) === np);
    return found?.href ?? navigation[0].href;
  }, [pathname]);

  // Refs to nav container and each link
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});

  // Indicator position within the nav container
  const [indicator, setIndicator] = React.useState({ top: 0, height: 0, visible: false });

  const measure = React.useCallback(() => {
    const nav = navRef.current;
    const el = itemRefs.current[activeHref];
    if (!nav || !el) {
      setIndicator(s => ({ ...s, visible: false }));
      return;
    }

    // Compute TOP relative to the nav container using bounding rects (immune to window scroll)
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const top = elRect.top - navRect.top + nav.scrollTop; // add nav.scrollTop in case the nav itself scrolls
    const height = elRect.height;

    setIndicator({ top, height, visible: true });
  }, [activeHref]);

  React.useEffect(() => {
    measure();
  }, [measure]);

  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    // fonts/layout reflow
    if ('fonts' in document && document.fonts && 'ready' in document.fonts) {
      (document.fonts as FontFaceSet).ready.then(measure);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div className="hidden lg:flex lg:w-96 lg:flex-col lg:fixed lg:inset-y-0 z-20">
      {/* NOTE: removed transform-gpu to avoid transform-based layout offsets */}
      <div className="flex flex-col h-screen bg-background/15 backdrop-blur-sm border-r border-border/20 shadow-[4px_0_12px_rgba(255,75,138,0.2)]">
        <div className="flex flex-col h-full pt-5 pb-4">
          {/* Brand */}
          <div className="flex items-center px-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-brand-foreground font-bold text-sm">JT</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Jason Tieu</h1>
                <p className="text-xs text-muted-foreground">Full-Stack Development • Cloud & DevOps • AI/ML</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="mt-8 flex-1 px-2 space-y-1 relative">
            <MotionConfig transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.8 }}>
              {/* Indicator aligned with the link padding (left-2 right-2 matches link px-2) */}
              <motion.div
                aria-hidden
                className="absolute left-2 right-2 bg-brand/30 border-2 border-brand rounded-md shadow-lg pointer-events-none"
                initial={false}
                animate={{
                  top: indicator.top,
                  height: indicator.height,
                  opacity: indicator.visible ? 1 : 0,
                }}
                style={{ willChange: "transform" }}
              />
              {navigation.map((item) => {
                const isActive = normalize(item.href) === normalize(activeHref);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    ref={(el) => { itemRefs.current[item.href] = el; }}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md relative transition-colors hover:bg-brand/10"
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-brand" : "text-muted-foreground group-hover:text-brand"}`}
                    />
                    <span
                      className={`transition-colors font-semibold ${isActive ? "text-brand" : "text-muted-foreground group-hover:text-brand"}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </MotionConfig>
          </nav>

          {/* Social */}
          <div className="flex-shrink-0 px-2 py-4">
            <div className="flex space-x-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 text-muted-foreground hover:text-brand hover:bg-brand/10 transition-all duration-200 hover:scale-105"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
