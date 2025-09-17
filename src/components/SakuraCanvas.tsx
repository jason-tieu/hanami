"use client";
import React, { useEffect, useRef, useMemo } from "react";

type Props = {
  enabled?: boolean;
  density?: number;      // 0..1 multiplier
  maxPetals?: number;    // cap
  hue?: number;          // base color hue (default 345 ~ sakura pink)
  opacity?: number;      // global alpha for blend
  zIndex?: number;
};

interface Petal {
  x: number; y: number; z: number;
  vx: number; vy: number;
  rot: number; vr: number;
  size: number; wobble: number;
  hue: number; sat: number; light: number; alpha: number;
  reset(initial?: boolean): void;
  step(dt: number, mouse: { x: number; y: number; vx: number; vy: number; ts: number }): void;
  draw(): void;
}

const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

export default function SakuraCanvas({
  enabled = true,
  density = 0.7,
  maxPetals,
  hue = 345,
  opacity = 0.15,
  zIndex = 10,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, ts: 0 });
  const visRef = useRef({ hidden: false });

  const reduceMotion = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    []
  );

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !enabled) return;

    const ctx = c.getContext("2d", { alpha: true })!;
    let width = 0, height = 0, dpr = 1;

    const W = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = c.clientWidth | 0;
      height = c.clientHeight | 0;
      c.width = Math.max(1, (width * dpr) | 0);
      c.height = Math.max(1, (height * dpr) | 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Particle / Petal
    class Petal {
      x: number = 0; y: number = 0; z: number = 0; // z for parallax 0..1
      vx: number = 0; vy: number = 0;
      rot: number = 0; vr: number = 0;
      size: number = 0; wobble: number = 0;
      hue: number = 0; sat: number = 0; light: number = 0; alpha: number = 0;
      shape: number = 0; // 0-4 for different petal shapes
      skew: number = 0; // organic asymmetry
      notch: number = 0; // notch depth for notch variant
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.z = Math.random(); // near 0 = far
        this.size = 12 + Math.random() * 18 * (0.6 + 0.4 * (1 - this.z));
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -this.size;
        this.vx = (Math.random() - 0.5) * 0.4; // increased base breeze for more spread
        this.vy = 0.2 + 0.6 * (1 - this.z);   // fall speed
        this.rot = Math.random() * Math.PI * 2;
        this.vr = (Math.random() - 0.5) * 0.02;
        this.wobble = Math.random() * Math.PI * 2;
        this.hue = hue + (Math.random() * 8 - 4); // Less hue variance for consistency
        this.sat = 80 + Math.random() * 15; // High saturation to match brand
        this.light = 60 + Math.random() * 15; // Match brand pink lightness
        this.alpha = 0.9 + Math.random() * 0.1; // Very opaque
        this.shape = Math.floor(Math.random() * 6); // 0-5 for different petal shapes
        this.skew = (Math.random() - 0.5) * 0.18; // organic asymmetry
        this.notch = 0.15 + Math.random() * 0.13; // notch depth variation
      }
      step(dt: number, mouse: typeof mouseRef.current) {
        // Cursor influence (scaled by parallax) - increased for more spread
        const influence = 0.18 * (1 - this.z); // increased from 0.12, closer petals react more
        this.vx += mouse.vx * influence;
        this.vy += mouse.vy * influence * 0.5;

        // Gentle sideways breeze + wobble - increased for more spread
        this.wobble += 0.04 + (1 - this.z) * 0.02;
        const wobbleX = Math.cos(this.wobble) * 0.25; // increased from 0.15
        const wobbleY = Math.sin(this.wobble) * 0.08; // increased from 0.05

        this.x += (this.vx + wobbleX) * dt;
        this.y += (this.vy + wobbleY) * dt;
        this.rot += this.vr * dt;

        // Wrap around
        if (this.y > height + this.size) this.reset();
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;

        // Damp velocities for stability
        this.vx *= 0.98;
        this.vy = Math.min(this.vy * 0.995 + 0.002, 2.2);
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.globalAlpha = this.alpha * opacity;
        
        // White to pink gradient based on z-depth
        const gradientIntensity = this.z; // 0 = far (white), 1 = close (pink)
        const gradientHue = hue;
        const gradientSat = 80 + gradientIntensity * 15;
        const gradientLight = 95 - gradientIntensity * 35; // 95% (white) to 60% (pink)
        
        ctx.fillStyle = `hsl(${gradientHue} ${gradientSat}% ${gradientLight}%)`;
        ctx.shadowColor = `hsla(${gradientHue} ${gradientSat}% ${Math.max(60, gradientLight - 10)}% / 0.8)`;
        ctx.shadowBlur = 12 * (1 - this.z);

        const w = this.size * (1.15 + (1 - this.z) * 0.45);
        const h = this.size * (0.65 + (1 - this.z) * 0.12);
        const skew = this.skew;
        const notch = this.notch;
        
        // Dimensions for petal shapes
        const hw = w * 0.5; // half width
        const hh = h * 0.5; // half height

        ctx.beginPath();
        
        // 6 distinct petal variants using switch statement
        switch (this.shape) {
          case 0: // teardrop
            // Classic single-lobe teardrop with slight skew
            ctx.moveTo(0, -hh);
            ctx.bezierCurveTo(hw, -hh * (1 - skew), hw, hh * 0.2, 0, hh);
            ctx.bezierCurveTo(-hw, hh * 0.2, -hw, -hh * (1 - skew), 0, -hh);
            break;
          case 1: // notch
            // Sakura-like notch at tip
            const tip = hh;
            const n = Math.min(hh * notch, hh * 0.35);
            ctx.moveTo(0, -hh);
            ctx.bezierCurveTo(hw * 0.9, -hh * 0.7, hw * 0.9, hh * 0.0, 0, tip - n);
            ctx.lineTo(0 + n * 0.45, tip);
            ctx.lineTo(0 - n * 0.45, tip);
            ctx.lineTo(0, tip - n);
            ctx.bezierCurveTo(-hw * 0.9, 0, -hw * 0.9, -hh * 0.7, 0, -hh);
            break;
          case 2: // doubleLobe
            // Subtle dual-lobe (like overlapping petals)
            const l = hw * 0.6;
            ctx.moveTo(0, -hh);
            ctx.bezierCurveTo(hw, -hh * 0.4, hw, 0, l, hh * 0.5);
            ctx.quadraticCurveTo(0, hh, -l, hh * 0.5);
            ctx.bezierCurveTo(-hw, 0, -hw, -hh * 0.4, 0, -hh);
            break;
          case 3: // oblong
            // Long, slimmer petal
            ctx.moveTo(0, -hh);
            ctx.bezierCurveTo(hw * 0.65, -hh * 0.6, hw * 0.5, hh * 0.4, 0, hh);
            ctx.bezierCurveTo(-hw * 0.5, hh * 0.4, -hw * 0.65, -hh * 0.6, 0, -hh);
            break;
          case 4: // folded
            // Slight fold (spine) with asymmetry
            ctx.moveTo(0, -hh);
            ctx.bezierCurveTo(hw * (0.7 + skew), -hh * 0.3, hw * 0.4, hh * 0.3, 0, hh);
            ctx.bezierCurveTo(-hw * 0.6, hh * 0.2, -hw * (0.7 - skew), -hh * 0.5, 0, -hh);
            break;
          case 5: // ellipse
            // Normal ellipse for variety
            ctx.ellipse(0, 0, hw, hh, 0, 0, Math.PI * 2);
            break;
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Subtle inner highlight stroke
        ctx.globalAlpha = this.alpha * opacity * 0.35;
        ctx.strokeStyle = `hsl(${gradientHue} ${gradientSat}% ${Math.min(95, gradientLight + 15)}%)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    const targetPetals =
      typeof maxPetals === "number"
        ? maxPetals
        : (isMobile() ? 50 : 120) * density;

    const ensurePetals = (n: number) => {
      const arr = petalsRef.current;
      while (arr.length < n) arr.push(new Petal());
      while (arr.length > n) arr.pop();
    };

    // Mouse velocity tracking
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(16, now - mouseRef.current.ts);
      const nx = e.clientX, ny = e.clientY;
      const dx = nx - mouseRef.current.x;
      const dy = ny - mouseRef.current.y;
      mouseRef.current.vx = dx / dt; // px per ms
      mouseRef.current.vy = dy / dt;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
      mouseRef.current.ts = now;
    };

    const onVisibility = () => {
      visRef.current.hidden = document.hidden;
    };

    const loop = (() => {
      let last = performance.now();
      return function frame(now: number) {
        if (reduceMotion || visRef.current.hidden) {
          // Draw nothing or ultra-slow idle state
          ctx.clearRect(0, 0, width, height);
          rafRef.current = requestAnimationFrame(frame);
          return;
        }

        const dt = Math.min(2.5, (now - last) / (1000 / 60)); // normalize to ~60fps units
        last = now;

        ctx.clearRect(0, 0, width, height);
        const petals = petalsRef.current;
        for (let i = 0; i < petals.length; i++) {
          petals[i].step(dt, mouseRef.current);
          petals[i].draw();
        }
        rafRef.current = requestAnimationFrame(frame);
      };
    })();

    // init
    const resizeObs = new ResizeObserver(W);
    resizeObs.observe(c);
    
    // Initial setup with a small delay to ensure container is ready
    setTimeout(() => {
      W();
      ensurePetals(Math.floor(targetPetals));
    }, 100);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObs.disconnect();
      petalsRef.current = [];
      ctx.clearRect(0, 0, width, height);
    };
  }, [enabled, density, maxPetals, hue, opacity, zIndex, reduceMotion]);

  // Style: full-bleed overlay, no hit-testing
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          opacity,
        }}
      />
    </div>
  );
}
