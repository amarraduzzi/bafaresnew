import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import yaourt from '../assets/images/sig-yaourt.webp';
import rayeb from '../assets/images/sig-rayeb.webp';
import avocat from '../assets/images/sig-avocat.webp';
import harcha from '../assets/images/sig-harcha.webp';
import petitdej from '../assets/images/sig-petitdej.webp';
import harira from '../assets/images/sig-harira.webp';

type L = Record<Language, string>;
interface Sig { id: string; img: string; menuId: string; name: L; story: L }

const TEXT: Record<Language, { title: string; cur: string }> = {
  fr: { title: 'Les Signatures', cur: 'DH' },
  ar: { title: 'الأطباق المميزة', cur: 'درهم' },
  en: { title: 'The Signatures', cur: 'MAD' },
};

const SIGS: Sig[] = [
  { id: 'yaourt', img: yaourt, menuId: 'yaourt-bafares',
    name: { fr: 'Yaourt Ba Fares', ar: 'ياغورت با فارس', en: 'Ba Fares Yogurt' },
    story: { fr: "Épais, doux, parfumé à la fleur d'oranger.", ar: 'كثيف وناعم، معطر بماء الزهر.', en: 'Thick, soft, scented with orange blossom.' } },
  { id: 'rayeb', img: rayeb, menuId: 'rayeb-chantilly',
    name: { fr: 'Rayeb Chantilly', ar: 'ريب بالشانتيي', en: 'Rayeb with Whipped Cream' },
    story: { fr: 'Le rayeb bien frais, couronné de chantilly.', ar: 'الريب باردا، متوج بالشانتيي.', en: 'Chilled rayeb, crowned with whipped cream.' } },
  { id: 'avocat', img: avocat, menuId: 'jus-avocat-fruit-sec',
    name: { fr: 'Avocat Fruit Sec', ar: 'أفوكادو بالفواكه الجافة', en: 'Avocado with Dry Fruit' },
    story: { fr: "Un jus épais, couvert d'amandes, de noix et de raisins secs.", ar: 'عصير كثيف، فوقه لوز وجوز وزبيب.', en: 'A thick juice topped with almonds, walnuts and raisins.' } },
  { id: 'harcha', img: harcha, menuId: 'harcha-beurre-miel',
    name: { fr: 'Harcha Beurre et Miel', ar: 'حرشة بالزبدة والعسل', en: 'Harcha with Butter & Honey' },
    story: { fr: 'La harcha chaude, le beurre qui fond, le miel qui coule.', ar: 'حرشة ساخنة، زبدة تذوب، وعسل يسيل.', en: 'Warm harcha, melting butter, running honey.' } },
  { id: 'petitdej', img: petitdej, menuId: 'ba-fares',
    name: { fr: 'Le petit-déj Ba Fares', ar: 'فطور با فارس', en: 'The Ba Fares breakfast' },
    story: { fr: "Omelette, harcha, rghaif, jben, miel, olives, jus d'orange et boisson chaude.", ar: 'عجة، حرشة، رغايف، جبن، عسل، زيتون، عصير برتقال ومشروب ساخن.', en: 'Omelette, harcha, rghaif, cheese, honey, olives, orange juice and a hot drink.' } },
  { id: 'harira', img: harira, menuId: 'harira-complet',
    name: { fr: 'Harira complète', ar: 'حريرة كاملة', en: 'Full Harira' },
    story: { fr: 'Chaque soir, avec dattes et chebakia.', ar: 'كل مساء، مع التمر والشباكية.', en: 'Every evening, with dates and chebakia.' } },
];

const priceOf = (id: string) => MENU_ITEMS.find((m) => m.id === id)?.price;

const Info: React.FC<{ s: Sig; lang: Language }> = ({ s, lang }) => {
  const price = priceOf(s.menuId);
  return (
    <>
      <h3 className="font-black leading-[0.95] tracking-tight text-4xl sm:text-6xl xl:text-7xl">{s.name[lang]}</h3>
      <div className="mt-5 flex items-center gap-4">
        <span className="h-[4px] w-16 bg-[#E5BE01]" />
        {price !== undefined && (
          <span className="font-black text-[#E5BE01] tabular-nums text-3xl sm:text-5xl">
            {price} <span className="text-lg sm:text-2xl font-bold">{TEXT[lang].cur}</span>
          </span>
        )}
      </div>
      <p className="mt-5 text-white/75 text-lg sm:text-xl leading-snug max-w-[30ch]">{s.story[lang]}</p>
    </>
  );
};

// De vitrine: de sectie blijft staan, elke foto wist de vorige weg
const Pinned: React.FC<{ lang: Language }> = ({ lang }) => {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(p, 'change', (v) => setIdx(Math.min(SIGS.length - 1, Math.max(0, Math.floor(v * SIGS.length)))));
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <section ref={ref} id="signatures" style={{ height: `${SIGS.length * 75 + 100}svh` }} className="relative bg-black text-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col lg:flex-row items-stretch lg:items-center gap-5 lg:gap-16 px-5 sm:px-10 lg:px-[7vw] pt-20 pb-6 lg:py-0">
        {/* Foto's */}
        <div className="relative w-full lg:w-auto lg:order-2 flex-1 lg:flex-none min-h-0 lg:h-[80svh] lg:aspect-[3/4] self-center">
          {SIGS.map((s, i) => (
            <motion.img
              key={s.id}
              src={s.img}
              alt={s.name[lang]}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              initial={false}
              animate={{ clipPath: i <= idx ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)', scale: i === idx ? 1 : 1.08 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              style={{ zIndex: i }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Tekst */}
        <div dir={dir} className="lg:order-1 lg:flex-1 relative lg:min-h-[48svh] flex flex-col justify-center">
          <p className="font-black text-white/60 text-base sm:text-lg mb-3 flex items-center gap-4">
            {TEXT[lang].title}
            <span dir="ltr" className="flex gap-1.5" aria-hidden>
              {SIGS.map((_, i) => (
                <span key={i} className={`h-[5px] w-6 transition-colors duration-300 ${i === idx ? 'bg-[#E5BE01]' : 'bg-white/20'}`} />
              ))}
            </span>
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <Info s={SIGS[idx]} lang={lang} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Minder beweging: gewoon onder elkaar
const Still: React.FC<{ lang: Language }> = ({ lang }) => (
  <section id="signatures" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-black text-white py-20 px-5 sm:px-10">
    <h2 className="font-black text-5xl mb-12">{TEXT[lang].title}</h2>
    <div className="grid gap-16 max-w-3xl">
      {SIGS.map((s) => (
        <article key={s.id}>
          <img src={s.img} alt={s.name[lang]} loading="lazy" className="w-full max-w-md aspect-[3/4] object-cover mb-6" />
          <Info s={s} lang={lang} />
        </article>
      ))}
    </div>
  </section>
);

export const Vitrine: React.FC<{ lang: Language }> = ({ lang }) => {
  const reduce = useReducedMotion();
  return reduce ? <Still lang={lang} /> : <Pinned lang={lang} />;
};
