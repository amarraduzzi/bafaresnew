import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';

// Marmer-wit: de toonbank. De tekst "wordt gelezen" terwijl je scrolt, woord voor woord.
const COPY: Record<Language, { lead: string; words: string; hot: string[] }> = {
  fr: {
    lead: 'Depuis 1957',
    words:
      "En 1957, une laiterie ouvrait ses portes à Diour Jamaa. Les modes ont passé, les rues ont changé. Ici, le verre de lait est resté le même. Ba Fares n'a pas résisté au temps : il l'a traversé, et il sert Rabat du premier petit-déjeuner à la harira du soir.",
    hot: ['1957,', 'même.', 'traversé,'],
  },
  ar: {
    lead: 'منذ 1957',
    words:
      'في سنة 1957 فتحت لبنية أبوابها في ديور الجامع. تغيرت الموضة وتغيرت الشوارع. أما كأس الحليب هنا فبقي هو نفسه. با فارس لم يقاوم الزمن، بل عبره، وما زال يخدم الرباط من فطور الصباح إلى حريرة المساء.',
    hot: ['1957', 'نفسه.', 'عبره،'],
  },
  en: {
    lead: 'Since 1957',
    words:
      'In 1957, a dairy opened its doors in Diour Jamaa. Fashions passed, streets changed. Here, the glass of milk stayed the same. Ba Fares did not resist time: it walked through it, and it still serves Rabat from the first breakfast to the evening harira.',
    hot: ['1957,', 'same.', 'it,'],
  },
};

// ---- Marmer: aderen die zichzelf tekenen, zoals op de toonbank in de foto's ----
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

interface VeinDef { d: string; w: number; o: number; a: number; b: number }

const walk = (r: () => number, x: number, y: number, ang: number, steps: number, wobble: number) => {
  let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
  const pts: [number, number, number][] = [];
  for (let i = 0; i < steps; i++) {
    ang += (r() - 0.5) * wobble;
    x += Math.cos(ang) * 17;
    y += Math.sin(ang) * 17;
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    pts.push([x, y, ang]);
  }
  return { d, pts };
};

const buildVeins = (): VeinDef[] => {
  const r = rng(1957);
  const out: VeinDef[] = [];
  for (let i = 0; i < 8; i++) {
    const startX = -100 + i * 150 + r() * 80;
    const m = walk(r, startX, -40, 0.95 + (r() - 0.5) * 0.5, 80, 0.5);
    const a = i * 0.055;
    out.push({ d: m.d, w: 1.1 + r() * 0.9, o: 0.5 + r() * 0.25, a, b: a + 0.5 });
    for (let k = 0; k < 2; k++) {
      const at = m.pts[10 + Math.floor(r() * 45)];
      const side = r() > 0.5 ? 1 : -1;
      const br = walk(r, at[0], at[1], at[2] + side * (0.45 + r() * 0.5), 14 + Math.floor(r() * 16), 0.6);
      const ba = a + 0.15 + r() * 0.2;
      out.push({ d: br.d, w: 0.6 + r() * 0.5, o: 0.35 + r() * 0.2, a: ba, b: Math.min(1, ba + 0.3) });
    }
  }
  return out;
};
const VEINS = buildVeins();

const Vein: React.FC<{ v: VeinDef; p: MotionValue<number>; still: boolean }> = ({ v, p, still }) => {
  const len = useTransform(p, [v.a, v.b], [0, 1], { clamp: true });
  return (
    <motion.path
      d={v.d}
      fill="none"
      stroke="#8a857a"
      strokeOpacity={v.o}
      strokeWidth={v.w}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      style={still ? undefined : { pathLength: len }}
    />
  );
};

const Marble: React.FC<{ p: MotionValue<number>; still: boolean }> = ({ p, still }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 60% 45% at 18% 22%, rgba(120,115,100,.07), transparent 70%), radial-gradient(ellipse 55% 40% at 85% 70%, rgba(120,115,100,.08), transparent 70%), radial-gradient(ellipse 40% 30% at 50% 100%, rgba(120,115,100,.06), transparent 70%)',
      }}
    />
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      {VEINS.map((v, i) => (
        <Vein key={i} v={v} p={p} still={still} />
      ))}
    </svg>
  </div>
);

const Word: React.FC<{ w: string; i: number; n: number; p: MotionValue<number>; hot: boolean; still: boolean }> = ({ w, i, n, p, hot, still }) => {
  const a = (i / n) * 0.85;
  const o = useTransform(p, [a, a + 0.08], [0.16, 1]);
  return (
    <motion.span
      style={still ? undefined : { opacity: o }}
      className={`inline-block me-[0.28em] ${hot ? 'bg-[#E5BE01] px-[0.12em] -mx-[0.12em]' : ''}`}
    >
      {w}
    </motion.span>
  );
};

export const Manifest: React.FC<{ lang: Language }> = ({ lang }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  const c = COPY[lang];
  const words = c.words.split(' ');

  return (
    <section ref={ref} id="histoire" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative overflow-hidden bg-[#F7F3EA] text-black py-24 sm:py-36 px-6 sm:px-12">
      <Marble p={p} still={!!reduce} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="flex items-center gap-4 font-black text-xl sm:text-2xl">
          <span className="h-[5px] w-14 bg-black" />
          {c.lead}
        </p>
        <p className="mt-10 font-black leading-[1.08] tracking-tight text-[8.2vw] sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <Word key={i} w={w} i={i} n={words.length} p={p} hot={c.hot.includes(w)} still={!!reduce} />
          ))}
        </p>
      </div>
    </section>
  );
};
