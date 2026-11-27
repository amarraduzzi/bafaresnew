import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { YEAR_NOW, YEAR_START } from '../data/scenes';

const COUNT = (to: number, on: boolean, still: boolean) => {
  const [v, setV] = useState(still ? to : 0);
  useEffect(() => {
    if (!on || still) return;
    const a = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => a.stop();
  }, [on, to, still]);
  return v;
};

const Stat: React.FC<{ n: number; label: string; on: boolean; still: boolean }> = ({ n, label, on, still }) => {
  const v = COUNT(n, on, still);
  return (
    <div className="border-t-[5px] border-black pt-4">
      <p className="font-black tabular-nums leading-[0.85] tracking-tighter text-[22vw] sm:text-[9rem]">{v}</p>
      <p className="mt-3 font-extrabold text-lg sm:text-xl">{label}</p>
    </div>
  );
};

const STAR = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 === 0 ? 48 : 27;
  const a = ((i * 22.5 - 90) * Math.PI) / 180;
  return `${i === 0 ? 'M' : 'L'}${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(' ') + ' Z';

const TEXT: Record<Language, { years: string; dishes: string; hours: string; hoursV: string }> = {
  fr: { years: 'ans, et le même verre', dishes: 'plats au menu', hours: 'tous les jours', hoursV: '7h – 23h' },
  ar: { years: 'سنة، ونفس الكأس', dishes: 'طبقاً في القائمة', hours: 'كل يوم', hoursV: '7:00 – 23:00' },
  en: { years: 'years, and the same glass', dishes: 'dishes on the menu', hours: 'every day', hoursV: '7am – 11pm' },
};

// Geel vlak: het bewijs. Wat de tijd niet heeft kunnen wegnemen, in cijfers.
export const Chiffres: React.FC<{ lang: Language }> = ({ lang }) => {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, { once: true, amount: 0.35 });
  const reduce = !!useReducedMotion();
  const t = TEXT[lang];

  return (
    <section ref={ref} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative overflow-hidden bg-[#E5BE01] text-black py-20 sm:py-28 px-6 sm:px-12">
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute -end-24 -top-24 w-[420px] h-[420px] sm:w-[640px] sm:h-[640px] opacity-[0.13]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <path d={STAR} fill="none" stroke="#000" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="#000" strokeWidth="0.6" />
      </motion.svg>

      <div className="relative max-w-5xl mx-auto grid gap-12 md:grid-cols-3">
        <Stat n={YEAR_NOW - YEAR_START} label={t.years} on={on} still={reduce} />
        <Stat n={MENU_ITEMS.length} label={t.dishes} on={on} still={reduce} />
        <div className="border-t-[5px] border-black pt-4">
          <p dir="ltr" className="font-black leading-[0.85] tracking-tighter text-[13vw] sm:text-[5.2rem] whitespace-nowrap">{t.hoursV}</p>
          <p className="mt-3 font-extrabold text-lg sm:text-xl">{t.hours}</p>
        </div>
      </div>
    </section>
  );
};
