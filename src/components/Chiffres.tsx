import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { YEAR_NOW, YEAR_START } from '../data/scenes';
import usure from '../assets/images/stat-usure.webp';
import rghaif from '../assets/images/stat-rghaif.webp';
import nuit from '../assets/images/stat-nuit.webp';

const useCount = (to: number, on: boolean, still: boolean) => {
  const [v, setV] = useState(still ? to : 0);
  useEffect(() => {
    if (!on || still) return;
    const a = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => a.stop();
  }, [on, to, still]);
  return v;
};

interface ColProps {
  img: string;
  alt: string;
  num?: number;
  text?: string;
  label: string;
  index: number;
  still: boolean;
  className?: string;
}

// Eén bewijs: een foto, met het cijfer als gele plaat over de onderkant van de foto
const Col: React.FC<ColProps> = ({ img, alt, num, text, label, index, still, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(p, [0, 1], ['-7%', '7%']);
  const v = useCount(num ?? 0, on, still);

  return (
    <div ref={ref} className={`flex flex-row md:flex-col items-end md:items-stretch gap-5 md:gap-0 ${className}`}>
      <motion.div
        initial={still ? false : { clipPath: 'inset(100% 0 0 0)' }}
        animate={on || still ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        transition={{ duration: 0.9, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-[38%] md:w-full shrink-0 aspect-[4/5] overflow-hidden bg-black"
      >
        <motion.img
          src={img}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={still ? undefined : { y, scale: 1.16 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative md:-mt-10 md:me-6 bg-[#E5BE01] md:pt-3 md:pe-4 self-end md:self-auto flex-1 md:flex-none">
        <p
          dir="ltr"
          className="font-black tabular-nums leading-[0.85] tracking-tighter whitespace-nowrap text-[clamp(3.2rem,13vw,5.5rem)] md:text-[clamp(3.4rem,6.2vw,6.5rem)]"
        >
          {text ?? v}
        </p>
        <p className="mt-2 font-extrabold text-base sm:text-lg leading-tight">{label}</p>
      </div>
    </div>
  );
};

const TEXT: Record<Language, { years: string; dishes: string; hours: string; hoursV: string }> = {
  fr: { years: 'ans, et le même verre', dishes: 'plats au menu', hours: 'tous les jours', hoursV: '7h–23h' },
  ar: { years: 'سنة، ونفس الكأس', dishes: 'طبقاً في القائمة', hours: 'كل يوم', hoursV: '7:00–23:00' },
  en: { years: 'years, and the same glass', dishes: 'dishes on the menu', hours: 'every day', hoursV: '7am–11pm' },
};

// Geel vlak: het bewijs. Wat de tijd niet heeft kunnen wegnemen, in foto's en cijfers.
export const Chiffres: React.FC<{ lang: Language }> = ({ lang }) => {
  const reduce = !!useReducedMotion();
  const t = TEXT[lang];

  return (
    <section dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-[#E5BE01] text-black py-20 sm:py-28 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto grid gap-14 md:grid-cols-3 md:gap-8 items-start">
        <Col img={usure} alt="" num={YEAR_NOW - YEAR_START} label={t.years} index={0} still={reduce} />
        <Col img={rghaif} alt="" num={MENU_ITEMS.length} label={t.dishes} index={1} still={reduce} className="md:mt-20" />
        <Col img={nuit} alt="" text={t.hoursV} label={t.hours} index={2} still={reduce} className="md:mt-8" />
      </div>
    </section>
  );
};
