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
    <section ref={ref} id="histoire" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-[#F7F3EA] text-black py-24 sm:py-36 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
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
