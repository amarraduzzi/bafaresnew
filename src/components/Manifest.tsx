import React, { useRef } from 'react';
import { motion, MotionValue, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import verre from '../assets/images/stat-verre.webp';

// Marmer-wit: de toonbank. De tekst "wordt gelezen" terwijl je scrolt, woord voor woord,
// naast de foto van het glas melk en de gele kan.
const COPY: Record<Language, { lead: string; words: string; hot: string[]; alt: string }> = {
  fr: {
    lead: 'Depuis 1957',
    words:
      "En 1957, une laiterie ouvrait ses portes à Diour Jamaa. Les modes ont passé, les rues ont changé. Ici, le verre de lait est resté le même. Ba Fares n'a pas résisté au temps : il l'a traversé, et il sert Rabat du premier petit-déjeuner à la harira du soir.",
    hot: ['1957,', 'même.', 'traversé,'],
    alt: 'Un verre de lait devant une cruche jaune sur le comptoir en marbre',
  },
  ar: {
    lead: 'منذ 1957',
    words:
      'في سنة 1957 فتحت لبنية أبوابها في ديور الجامع. تغيرت الموضة وتغيرت الشوارع. أما كأس الحليب هنا فبقي هو نفسه. با فارس لم يقاوم الزمن، بل عبره، وما زال يخدم الرباط من فطور الصباح إلى حريرة المساء.',
    hot: ['1957', 'نفسه.', 'عبره،'],
    alt: 'كأس حليب أمام إبريق أصفر على رخام المنضدة',
  },
  en: {
    lead: 'Since 1957',
    words:
      'In 1957, a dairy opened its doors in Diour Jamaa. Fashions passed, streets changed. Here, the glass of milk stayed the same. Ba Fares did not resist time: it walked through it, and it still serves Rabat from the first breakfast to the evening harira.',
    hot: ['1957,', 'same.', 'it,'],
    alt: 'A glass of milk in front of a yellow jug on the marble counter',
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
  const photoRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(photoRef, { once: true, amount: 0.15 });
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  const { scrollYProgress: pp } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const y = useTransform(pp, [0, 1], ['-6%', '6%']);
  const c = COPY[lang];
  const words = c.words.split(' ');

  return (
    <section ref={ref} id="histoire" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-[#F7F3EA] text-black py-20 sm:py-32 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="flex items-center gap-4 font-black text-xl sm:text-2xl">
          <span className="h-[5px] w-14 bg-black" />
          {c.lead}
        </p>

        <div className="mt-10 grid gap-10 lg:gap-16 lg:grid-cols-[1.3fr_1fr] items-start">
          {/* Foto: eerst op mobiel, rechts op desktop */}
          <div className="lg:order-2 lg:sticky lg:top-24">
            <div ref={photoRef} className="relative ms-4 mb-4 lg:max-w-[460px] lg:ms-auto">
              <span aria-hidden className="absolute -start-4 top-4 -bottom-4 -end-0 bg-[#E5BE01]" style={{ insetInlineEnd: '1rem' }} />
              <motion.div
                initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
                animate={seen || reduce ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-black"
              >
                <motion.img
                  src={verre}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  style={reduce ? undefined : { y, scale: 1.14 }}
                  className="absolute inset-0 w-full h-full object-cover object-[35%_55%] lg:object-center"
                />
              </motion.div>
            </div>
          </div>

          <p className="lg:order-1 font-black leading-[1.08] tracking-tight text-[7.4vw] sm:text-5xl xl:text-[3.6rem]">
            {words.map((w, i) => (
              <Word key={i} w={w} i={i} n={words.length} p={p} hot={c.hot.includes(w)} still={!!reduce} />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};
