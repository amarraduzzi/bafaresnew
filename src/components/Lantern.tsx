import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { Language } from '../types';

const LINES: Record<Language, string[]> = {
  fr: ['Un quartier.', 'Un comptoir.', 'Un verre de lait.', 'Depuis 1957.'],
  ar: ['حيّ.', 'طاولة.', 'كأس حليب.', 'منذ 1957.'],
  en: ['A neighbourhood.', 'A counter.', 'A glass of milk.', 'Since 1957.'],
};

const HINT: Record<Language, string> = {
  fr: 'Passez la lumière sur le mur',
  ar: 'حرّك الضوء على الجدار',
  en: 'Move the light across the wall',
};

const Lines: React.FC<{ lines: string[]; lit?: boolean }> = ({ lines, lit }) => (
  <div className="w-full max-w-5xl mx-auto px-6 sm:px-16 font-black leading-[1] tracking-tight text-[12vw] sm:text-8xl">
    {lines.map((l, i) => {
      const last = i === lines.length - 1;
      const color = lit
        ? last ? 'text-[#E5BE01]' : 'text-white'
        : last ? 'text-[#E5BE01]/15' : 'text-white/10';
      return <p key={l} className={`${color} py-1`}>{l}</p>;
    })}
  </div>
);

// Donkere muur met een lantaarn: de tekst is verborgen en komt tevoorschijn waar
// het licht komt. Volgt muis/vinger; zonder aanraking zweeft het licht zelf rond.
export const Lantern: React.FC<{ lang: Language }> = ({ lang }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lines = LINES[lang];

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let raf = 0, visible = false, last = -1e9;
    let tx = 0.5, ty = 0.5, cx = 0.5, cy = 0.5;

    const tick = (t: number) => {
      if (t - last > 2000) {
        tx = 0.5 + 0.38 * Math.sin(t / 1700);
        ty = 0.5 + 0.34 * Math.sin(t / 2300 + 1);
      }
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty('--lx', `${cx * 100}%`);
      el.style.setProperty('--ly', `${cy * 100}%`);
      el.style.setProperty('--lr', `${Math.min(230, el.clientWidth * 0.45)}px`);
      if (visible) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      last = performance.now();
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerdown', move);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerdown', move);
    };
  }, [reduce]);

  const mask = 'radial-gradient(circle var(--lr, 200px) at var(--lx, 50%) var(--ly, 50%), #000 35%, transparent 100%)';

  return (
    <section
      id="lanterne"
      ref={ref}
      className="relative h-[100svh] min-h-[520px] bg-black overflow-hidden flex items-center"
      style={{ touchAction: 'pan-y' }}
    >
      <h2 className="sr-only">{lines.join(' ')}</h2>

      {!reduce && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle var(--lr, 200px) at var(--lx, 50%) var(--ly, 50%), rgba(229,190,1,.2), transparent 70%)' }}
        />
      )}

      <div aria-hidden className="relative w-full"><Lines lines={lines} /></div>

      <div
        aria-hidden
        className="absolute inset-0 flex items-center pointer-events-none"
        style={reduce ? undefined : { WebkitMaskImage: mask, maskImage: mask }}
      >
        <Lines lines={lines} lit />
      </div>

      <p className="absolute bottom-8 inset-x-0 text-center text-white/60 text-sm font-medium">{HINT[lang]}</p>
    </section>
  );
};
