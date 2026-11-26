import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// Zachte regen die alleen loopt zolang de scène in beeld is.
export const RainCanvas: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, visible = false;
    const drops = Array.from({ length: 110 }, () => ({
      x: Math.random(), y: Math.random(),
      l: 0.02 + Math.random() * 0.035, v: 0.006 + Math.random() * 0.008,
      a: 0.12 + Math.random() * 0.22,
    }));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = r.width * dpr;
      h = canvas.height = r.height * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = Math.max(1, w / 500);
      for (const d of drops) {
        ctx.strokeStyle = `rgba(255,255,255,${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x * w, d.y * h);
        ctx.lineTo(d.x * w - d.l * w * 0.25, d.y * h + d.l * h);
        ctx.stroke();
        d.y += d.v; d.x -= d.v * 0.25;
        if (d.y > 1) { d.y = -0.05; d.x = Math.random() * 1.2; }
      }
      if (visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />;
};
