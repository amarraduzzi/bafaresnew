import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { YEAR_NOW, YEAR_START } from '../data/scenes';
import logo from '../assets/images/bafareslogo.jpg';
import nowImg from '../assets/images/hero-now.webp';

const TEXT: Record<Language, { a: string; b: string; c: string; years: string }> = {
  fr: { a: "Le jaune n'a jamais changé.", b: 'Depuis 1957, au cœur de Diour Jamaa.', c: "Aujourd'hui, le même verre.", years: 'ans' },
  ar: { a: 'الأصفر لم يتغير أبداً.', b: 'منذ 1957، في قلب ديور الجامع.', c: 'اليوم، نفس الكأس.', years: 'سنة' },
  en: { a: 'The yellow never changed.', b: 'Since 1957, in the heart of Diour Jamaa.', c: 'Today, the same glass.', years: 'years' },
};

// De overgang van verleden naar heden. Vastgepind terwijl je scrolt:
// geel vlak, jaartal telt van 1957 naar nu, daarna opent een cirkel
// waarin het heden in kleur verschijnt.
export const YellowInterlude: React.FC<{ lang: Language }> = ({ lang }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const t = TEXT[lang];
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const yearMv = useTransform(p, [0.05, 0.55], [YEAR_START, YEAR_NOW], { clamp: true });
  const [year, setYear] = useState(YEAR_START);
  useMotionValueEvent(yearMv, 'change', (v) => setYear(Math.round(v)));

  const age = year - YEAR_START;
  const logoRot = useTransform(p, [0, 1], [0, 220]);
  const textA = useTransform(p, [0, 0.08, 0.5, 0.6], [0, 1, 1, 0]);
  const radius = useTransform(p, [0.55, 0.92], [0, 150]);
  const clip = useTransform(radius, (r) => `circle(${r}% at 50% 50%)`);
  const gray = useTransform(p, [0.7, 0.95], [1, 0]);
  const filter = useTransform(gray, (g) => `grayscale(${g})`);
  const imgScale = useTransform(p, [0.55, 1], [1.25, 1]);
  const textC = useTransform(p, [0.85, 0.97], [0, 1]);
  const textCy = useTransform(p, [0.85, 0.97], [30, 0]);

  if (reduce) {
    return (
      <section id="depuis" className="bg-[#E5BE01] text-black py-24 px-5 text-center">
        <img src={logo} alt="Ba Fares" className="w-32 h-32 mx-auto rounded-full object-cover ring-[6px] ring-black" />
        <p className="font-black text-[28vw] sm:text-[200px] leading-none mt-6">{YEAR_NOW}</p>
        <p className="text-2xl font-extrabold mt-4">{t.a}</p>
        <p className="text-lg font-bold mt-2">{t.b}</p>
      </section>
    );
  }

  return (
    <section ref={ref} id="depuis" className="relative h-[260svh] bg-[#E5BE01]">
      <div className="sticky top-0 h-[100svh] overflow-hidden text-black">
        {/* Geel: logo, jaartal, zin */}
        <motion.div style={{ opacity: textA }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 gap-4">
          <motion.img
            src={logo}
            alt="Ba Fares"
            style={{ rotate: logoRot }}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-[5px] ring-black"
          />
          <p aria-label={`${YEAR_START} - ${YEAR_NOW}`} className="font-black leading-[0.85] tabular-nums tracking-tighter text-[30vw] sm:text-[220px]">
            {year}
          </p>
          <p className="text-2xl sm:text-4xl font-extrabold max-w-xl leading-tight">{t.a}</p>
          <p className="text-base sm:text-lg font-bold border-t-[3px] border-black pt-3 tabular-nums">
            {t.b} · {age} {t.years}
          </p>
        </motion.div>

        {/* Het heden in kleur, opent als een cirkel */}
        <motion.div style={{ clipPath: clip, WebkitClipPath: clip }} className="absolute inset-0 bg-black">
          <motion.img
            src={nowImg}
            alt="Un verre de lait avec une paille jaune, aujourd'hui chez Ba Fares"
            loading="lazy"
            style={{ filter, scale: imgScale }}
            className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <motion.div style={{ opacity: textC, y: textCy }} className="absolute inset-x-0 bottom-0 p-6 sm:p-16">
            <span className="flex items-center gap-3 text-[#E5BE01] text-sm font-bold">
              <span className="h-[3px] w-10 bg-[#E5BE01]" />
              {YEAR_NOW}
            </span>
            <p className="mt-3 text-white font-black text-4xl sm:text-6xl leading-[0.95] max-w-2xl">{t.c}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
