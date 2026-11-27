import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';

const price = (id: string) => MENU_ITEMS.find((m) => m.id === id)?.price;
const LOCALE: Record<Language, string> = { fr: 'fr-FR', ar: 'ar-MA', en: 'en-GB' };

const LINE = {
  fr: { today: (d: string) => `Aujourd'hui ${d} :`, eve: 'Chaque soir : Harira', dh: 'DH' },
  ar: { today: (d: string) => `اليوم ${d} :`, eve: 'كل مساء : حريرة', dh: 'درهم' },
  en: { today: (d: string) => `Today, ${d}:`, eve: 'Every evening: Harira', dh: 'MAD' },
};
const DISH: Record<string, Record<Language, string>> = {
  rfissa: { fr: 'Rfissa', ar: 'رفيسة', en: 'Rfissa' },
  couscous: { fr: 'Couscous', ar: 'كسكس', en: 'Couscous' },
  petitdej: { fr: 'Petit-déjeuner Ba Fares', ar: 'فطور با فارس', en: 'Ba Fares breakfast' },
};

// Een band die weet welke dag het is. Een reden om vandaag te komen.
export const Today: React.FC<{ lang: Language }> = ({ lang }) => {
  const reduce = useReducedMotion();
  const l = LINE[lang];

  const text = useMemo(() => {
    const now = new Date();
    const day = new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'long', timeZone: 'Africa/Casablanca' }).format(now);
    const wd = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Africa/Casablanca' }).format(now);
    let dish = `${DISH.petitdej[lang]} ${price('ba-fares')} ${l.dh}`;
    if (wd === 'Wed') dish = `${DISH.rfissa[lang]} ${price('rfissa')} ${l.dh}`;
    if (wd === 'Fri') dish = `${DISH.couscous[lang]} ${price('couscous-poulet')} / ${price('couscous-viande')} ${l.dh}`;
    return `${l.today(day)} ${dish}   ✦   ${l.eve} ${price('harira-complet')} ${l.dh}   ✦   `;
  }, [lang, l]);

  const row = (
    <span className="flex shrink-0 whitespace-nowrap font-black text-2xl sm:text-4xl py-4 sm:py-5">
      {text}
      {text}
    </span>
  );

  return (
    <div dir="ltr" aria-label={text} className="bg-[#E5BE01] text-black overflow-hidden border-y-[5px] border-black">
      {reduce ? (
        <p className="font-black text-xl sm:text-3xl px-6 py-5 text-center">{text}</p>
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        >
          {row}
          {row}
        </motion.div>
      )}
    </div>
  );
};
