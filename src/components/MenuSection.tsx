import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CategoryId, Language, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { CATEGORIES } from '../data/categories';
import { translations } from '../data/translations';

const TEXT: Record<Language, { title: string; sub: string; count: string }> = {
  fr: { title: 'Le Menu', sub: 'Les prix du jour, comme sur le tableau.', count: 'plats' },
  ar: { title: 'القائمة', sub: 'أسعار اليوم، كما على اللوحة.', count: 'أطباق' },
  en: { title: 'The Menu', sub: "Today's prices, like on the board.", count: 'dishes' },
};

// De notities in menuData zijn Frans; hier de vertalingen
const NOTES: Record<string, Record<Language, string>> = {
  'Chaque soir': { fr: 'Chaque soir', ar: 'كل مساء', en: 'Every evening' },
  'Chaque mercredi': { fr: 'Chaque mercredi', ar: 'كل أربعاء', en: 'Every Wednesday' },
  'Chaque vendredi': { fr: 'Chaque vendredi', ar: 'كل جمعة', en: 'Every Friday' },
};

const TABS = CATEGORIES.filter((c) => c.id !== 'all');

// Eén cijfer op een klaptegel, zoals op een split-flap bord. Max 300 ms per klap.
const Flap: React.FC<{ ch: string; delay: number; animate: boolean }> = ({ ch, delay, animate }) => (
  <motion.span
    initial={animate ? { rotateX: -90, opacity: 0 } : false}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ duration: 0.26, delay, ease: 'easeOut' }}
    style={{ transformOrigin: '50% 50%' }}
    className="relative inline-block w-[1.25ch] sm:w-[1.35ch] py-[1px] text-center bg-[#151515] rounded-[3px] text-[#E5BE01] font-black tabular-nums after:content-[''] after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-black/80"
  >
    {ch}
  </motion.span>
);

const Price: React.FC<{ value: number; unit: string; index: number; animate: boolean }> = ({ value, unit, index, animate }) => {
  const base = Math.min(index * 0.03, 0.24);
  return (
    <span dir="ltr" className="shrink-0 inline-flex items-baseline gap-2 whitespace-nowrap" style={{ perspective: 500 }}>
      <span className="inline-flex gap-[3px] text-2xl sm:text-3xl leading-none">
        {String(value)
          .split('')
          .map((ch, i) => (
            <Flap key={i} ch={ch} delay={base + i * 0.04} animate={animate} />
          ))}
      </span>
      <span className="text-xs sm:text-sm font-bold text-white/60 group-hover:text-black/70 transition-colors">{unit}</span>
    </span>
  );
};

export const MenuSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const [active, setActive] = useState<CategoryId>(TABS[0].id);
  const reduce = useReducedMotion();
  const t = translations[lang];
  const tx = TEXT[lang];
  const barRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const items = useMemo<MenuItem[]>(() => MENU_ITEMS.filter((m) => m.category === active), [active]);
  const label = (c: (typeof TABS)[number]) => (lang === 'ar' ? c.labelAr : lang === 'en' ? c.labelEn : c.labelFr);

  // Houd de gekozen categorie zichtbaar in de balk (mobiel)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = barRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    el?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }, [active, reduce]);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <section id="menu" dir={dir} className="bg-black text-white pt-20 pb-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-black leading-[0.9] text-4xl sm:text-5xl">{tx.title}</h2>
        <p className="mt-4 text-white/70 text-lg">{tx.sub}</p>
      </div>

      {/* Categorieën: horizontale balk met een geel streepje dat meeschuift */}
      <div className="sticky top-16 z-20 bg-black/90 backdrop-blur border-b border-white/10 mt-10">
        <div className="max-w-6xl mx-auto">
          <div
            ref={barRef}
            role="tablist"
            aria-label={tx.title}
            className="flex gap-1 overflow-x-auto px-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((c) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(c.id)}
                  className={`relative shrink-0 px-3 sm:px-4 py-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors duration-200 ${
                    on ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {label(c)}
                  {on && (
                    <motion.span
                      layoutId="menu-underline"
                      transition={{ duration: reduce ? 0 : 0.28, ease: 'easeOut' }}
                      className="absolute inset-x-2 bottom-0 h-[4px] bg-[#E5BE01]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* L'enseigne: de categorie als groot bord, daaronder het prijsbord in twee kolommen */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mt-10 sm:mt-14 flex items-end justify-between gap-6 border-b-[6px] border-[#E5BE01] pb-4">
          <motion.h3
            key={active}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-black text-[#E5BE01] leading-[0.85] tracking-tighter text-[clamp(2.8rem,10.5vw,9rem)]"
          >
            {label(TABS.find((c) => c.id === active)!)}
          </motion.h3>
          <p className="shrink-0 pb-1 font-bold text-white/60 text-base sm:text-xl tabular-nums">
            {items.length} {tx.count}
          </p>
        </div>

        <ul key={active} role="tabpanel" className="mt-2 lg:columns-2 lg:gap-x-16">
          {items.map((item, i) => {
            const name = lang === 'ar' ? item.nameAr : lang === 'en' ? item.nameEn : item.nameFr;
            const desc = lang === 'ar' ? item.descAr : lang === 'en' ? item.descEn : item.descFr;
            const note = item.note ? NOTES[item.note]?.[lang] ?? item.note : undefined;
            return (
              <li
                key={item.id}
                className="group break-inside-avoid -mx-3 px-3 py-4 border-b border-white/[0.08] transition-colors duration-150 hover:bg-[#E5BE01] hover:text-black"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-bold text-lg sm:text-xl leading-tight">{name}</span>
                  <span aria-hidden className="flex-1 min-w-4 border-b-2 border-dotted border-white/25 group-hover:border-black/40 translate-y-[-5px]" />
                  <Price value={item.price} unit={t.menu.dh} index={i} animate={!reduce} />
                </div>
                {(note || (lang !== 'ar' && item.nameAr)) && (
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {lang !== 'ar' && (
                      <span dir="rtl" className="text-sm text-white/55 group-hover:text-black/60 transition-colors">
                        {item.nameAr}
                      </span>
                    )}
                    {note && <span className="text-sm font-bold text-[#E5BE01] group-hover:text-black transition-colors">{note}</span>}
                  </div>
                )}
                {desc && <p className="mt-1.5 text-sm sm:text-[15px] text-white/70 group-hover:text-black/75 leading-relaxed transition-colors">{desc}</p>}
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-sm text-white/50">{t.menu.notice}</p>
      </div>
    </section>
  );
};
