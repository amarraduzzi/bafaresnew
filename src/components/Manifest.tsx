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

const star = (n: number, ro: number, ri: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 === 0 ? ro : ri;
    const a = ((i * (180 / n) - 90) * Math.PI) / 180;
    return `${i === 0 ? 'M' : 'L'}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ') + ' Z';

const OUTER = star(16, 49, 33);
const MIDDLE = star(8, 33, 20);
const INNER = star(8, 17, 9);

// De grote zellige-ster: tekent zichzelf terwijl je leest en vult zich geel bij het laatste woord
const BigStar: React.FC<{ p: MotionValue<number>; still: boolean }> = ({ p, still }) => {
  const outer = useTransform(p, [0.0, 0.6], [0, 1]);
  const middle = useTransform(p, [0.2, 0.78], [0, 1]);
  const inner = useTransform(p, [0.4, 0.9], [0, 1]);
  const ring = useTransform(p, [0.6, 0.95], [0, 1]);
  const fill = useTransform(p, [0.88, 1], [0, 0.3]);
  const rot = useTransform(p, [0, 1], [0, 45]);
  const common = { fill: 'none', stroke: '#000', strokeWidth: 0.35, vectorEffect: 'non-scaling-stroke' as const };
  const line = { ...common, strokeWidth: 2 };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.svg
        viewBox="0 0 100 100"
        style={still ? undefined : { rotate: rot }}
        className="absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 sm:translate-x-0 sm:start-auto sm:-end-[18%] w-[135vw] sm:w-[min(980px,80vw)] aspect-square opacity-[0.28]"
      >
        <motion.path d={OUTER} fill="#E5BE01" stroke="none" style={still ? { opacity: 0.3 } : { opacity: fill }} />
        <motion.path d={OUTER} {...line} style={still ? undefined : { pathLength: outer }} />
        <motion.path d={MIDDLE} {...line} style={still ? undefined : { pathLength: middle }} />
        <motion.path d={INNER} {...line} style={still ? undefined : { pathLength: inner }} />
        <motion.circle cx="50" cy="50" r="40" {...line} style={still ? undefined : { pathLength: ring }} />
        <motion.circle cx="50" cy="50" r="4" {...line} style={still ? undefined : { pathLength: ring }} />
      </motion.svg>
    </div>
  );
};

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
      <BigStar p={p} still={!!reduce} />
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
