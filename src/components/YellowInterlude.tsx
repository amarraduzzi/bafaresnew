import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { Language } from '../types';
import { YEAR_NOW, YEAR_START } from '../data/scenes';
import logo from '../assets/images/bafareslogo.jpg';

const TEXT: Record<Language, { line: string; years: string }> = {
  fr: { line: 'Depuis 1957, au cœur de Diour Jamaa.', years: 'ans' },
  ar: { line: 'منذ 1957، في قلب ديور الجامع.', years: 'سنة' },
  en: { line: 'Since 1957, in the heart of Diour Jamaa.', years: 'years' },
};

// Het gele moment: volledig logo-geel, groot jaartal dat telt, logo in het midden.
export const YellowInterlude: React.FC<{ lang: Language }> = ({ lang }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(YEAR_START - 69);

  useEffect(() => {
    if (!inView) return;
    const c = animate(YEAR_START - 69, YEAR_START, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView]);

  const age = YEAR_NOW - YEAR_START;

  return (
    <section ref={ref} id="depuis" className="relative bg-[#E5BE01] text-black overflow-hidden py-24 px-5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        <img
          src={logo}
          alt="Ba Fares"
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover ring-[6px] ring-black"
        />
        <p
          aria-label="1957"
          className="font-black leading-none tabular-nums tracking-tighter text-[30vw] sm:text-[220px]"
        >
          {n}
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold max-w-xl leading-tight">{TEXT[lang].line}</p>
        <p className="text-lg font-bold border-t-[3px] border-black pt-3">
          {age} {TEXT[lang].years}
        </p>
      </div>
    </section>
  );
};
