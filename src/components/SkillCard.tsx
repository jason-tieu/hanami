"use client";
import React from "react";
import { motion } from "framer-motion";
import SkillModal from "@/components/SkillModal";
import type { Skill } from "@/components/skills";

const ACCENT = "rgb(255, 75, 138)";
const BASE   = "rgb(229, 231, 235)"; // ~text-neutral-200

export default function SkillCard({ skill }: { skill: Skill }) {
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [hoverEnabled, setHoverEnabled] = React.useState(true);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const Icon = skill.icon;

  // Hotspot writer
  const setHoverVars = (el: HTMLElement, x: number, y: number, show = true) => {
    el.style.setProperty("--ui-x", `${x}px`);
    el.style.setProperty("--ui-y", `${y}px`);
    el.style.setProperty("--ui-o", show ? "1" : "0");
  };

  // Reset hover state and CSS variables
  const resetHoverState = () => {
    setHovered(false);
    if (buttonRef.current) {
      buttonRef.current.style.setProperty("--ui-o", "0");
    }
  };

  // Handle modal state changes
  React.useEffect(() => {
    if (open) {
      // Modal is opening - reset hover state immediately
      resetHoverState();
      setHoverEnabled(false);
    } else {
      // Modal is closing - re-enable hover immediately
      setHoverEnabled(true);
    }
  }, [open]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      resetHoverState();
    };
  }, []);

  // Ripple
  const createRipple = (hostEl: HTMLElement, e: React.MouseEvent<HTMLElement>) => {
    const overlay = hostEl.querySelector(".skill-ripple-host") as HTMLElement | null;
    const rect = hostEl.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    if (overlay) {
      const ripple = document.createElement("span");
      ripple.className = "skill-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      overlay.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    }
  };

  // Mouse handlers for hotspot
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hoverEnabled) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    setHoverVars(el, e.clientX - r.left, e.clientY - r.top, true);
  };
  const onEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hoverEnabled) return;
    setHovered(true);
    onMove(e);
  };
  const onLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hoverEnabled) return;
    setHovered(false);
    (e.currentTarget as HTMLElement).style.setProperty("--ui-o", "0");
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={(e) => { 
          // Always allow clicks regardless of hover state
          createRipple(e.currentTarget, e); 
          resetHoverState(); // Reset immediately on click
          setOpen(true); 
        }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={resetHoverState} // Reset on mouse down for immediate feedback
        whileHover={hoverEnabled ? { y: -4, scale: 1.015 } : {}}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
        className="skill-card group relative w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-pink"
      >
        {/* ripple overlay */}
        <span className="skill-ripple-host" />

        {/* Icon */}
        <motion.div
          className="flex items-center justify-center mb-3"
          animate={{ color: (hovered && hoverEnabled) ? ACCENT : BASE }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="h-10 w-10 rounded-2xl bg-accent-pink/15 flex items-center justify-center">
            <Icon className="h-5 w-5" /> {/* lucide uses currentColor */}
          </div>
        </motion.div>

        {/* Text */}
        <div className="text-center">
          <motion.p
            className="font-semibold"
            animate={{ color: (hovered && hoverEnabled) ? ACCENT : BASE }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {skill.title}
          </motion.p>
          <motion.p
            className="text-xs"
            animate={{ color: (hovered && hoverEnabled) ? "rgba(255, 75, 138, 0.9)" : "rgb(156, 163, 175)" }} // ~text-neutral-400
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {skill.subtitle}
          </motion.p>
        </div>
      </motion.button>

      <SkillModal
        open={open}
        onClose={() => setOpen(false)}
        title={skill.title}
        subtitle={skill.subtitle}
        icon={<Icon className="h-4 w-4" />}
        bullets={skill.bullets}
        tags={skill.tags}
      />
    </>
  );
}
