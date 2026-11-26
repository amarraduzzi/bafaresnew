import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import yaourt from '../assets/images/sig-yaourt.webp';
import rayeb from '../assets/images/sig-rayeb.webp';
import avocat from '../assets/images/sig-avocat.webp';
import harcha from '../assets/images/sig-harcha.webp';
import petitdej from '../assets/images/sig-petitdej.webp';
import harira from '../assets/images/sig-harira.webp';

type L = Record<Language, string>;

interface Signature {
  id: string;
  img: string;
  menuId: string; // de prijs komt uit menuData, zodat hij nooit afwijkt van het menu
  name: L;
  story: L;
}

const TEXT: Record<Language, { title: string; sub: string; currency: string }> = {
  fr: { title: 'Les Signatures', sub: 'Six choses à goûter chez Ba Fares.', currency: 'DH' },
  ar: { title: 'الأطباق المميزة', sub: 'ست أشياء يجب تذوقها عند با فارس.', currency: 'درهم' },
  en: { title: 'The Signatures', sub: 'Six things to taste at Ba Fares.', currency: 'MAD' },
};

const SIGNATURES: Signature[] = [
  {
    id: 'yaourt',
    img: yaourt,
    menuId: 'yaourt-bafares',
    name: { fr: 'Yaourt Ba Fares', ar: 'ياغورت با فارس', en: 'Ba Fares Yogurt' },
    story: {
      fr: "Épais, doux, parfumé à la fleur d'oranger.",
      ar: 'كثيف وناعم، معطر بماء الزهر.',
      en: 'Thick, soft, scented with orange blossom.',
    },
  },
  {
    id: 'rayeb',
    img: rayeb,
    menuId: 'rayeb-chantilly',
    name: { fr: 'Rayeb Chantilly', ar: 'ريب بالشانتيي', en: 'Rayeb with Whipped Cream' },
    story: {
      fr: 'Le rayeb bien frais, couronné de chantilly.',
      ar: 'الريب باردا، متوج بالشانتيي.',
      en: 'Chilled rayeb, crowned with whipped cream.',
    },
  },
  {
    id: 'avocat',
    img: avocat,
    menuId: 'jus-avocat-fruit-sec',
    name: { fr: 'Avocat Fruit Sec', ar: 'أفوكادو بالفواكه الجافة', en: 'Avocado with Dry Fruit' },
    story: {
      fr: 'Un jus épais, couvert d’amandes, de noix et de raisins secs.',
      ar: 'عصير كثيف، فوقه لوز وجوز وزبيب.',
      en: 'A thick juice topped with almonds, walnuts and raisins.',
    },
  },
  {
    id: 'harcha',
    img: harcha,
    menuId: 'harcha-beurre-miel',
    name: { fr: 'Harcha Beurre et Miel', ar: 'حرشة بالزبدة والعسل', en: 'Harcha with Butter & Honey' },
    story: {
      fr: 'La harcha chaude, le beurre qui fond, le miel qui coule.',
      ar: 'حرشة ساخنة، زبدة تذوب، وعسل يسيل.',
      en: 'Warm harcha, melting butter, running honey.',
    },
  },
  {
    id: 'petitdej',
    img: petitdej,
    menuId: 'ba-fares',
    name: { fr: 'Le petit-déj Ba Fares', ar: 'فطور با فارس', en: 'The Ba Fares breakfast' },
    story: {
      fr: "Omelette, harcha, rghaif, jben, miel, olives, jus d'orange et boisson chaude.",
      ar: 'عجة، حرشة، رغايف، جبن، عسل، زيتون، عصير برتقال ومشروب ساخن.',
      en: 'Omelette, harcha, rghaif, cheese, honey, olives, orange juice and a hot drink.',
    },
  },
  {
    id: 'harira',
    img: harira,
    menuId: 'harira-complet',
    name: { fr: 'Harira complète', ar: 'حريرة كاملة', en: 'Full Harira' },
    story: {
      fr: 'Chaque soir, avec dattes et chebakia.',
      ar: 'كل مساء، مع التمر والشباكية.',
      en: 'Every evening, with dates and chebakia.',
    },
  },
];

const priceOf = (menuId: string): number | undefined => MENU_ITEMS.find((m) => m.id === menuId)?.price;

// Grote schermen (>= 1024px) krijgen de vastgepinde horizontale scroll
const useDesktop = () => {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const h = () => setOn(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return on;
};

// Eén product: foto, naam met stippellijn naar de prijs (zoals op een prijsbord), één zin
const Card: React.FC<{ s: Signature; lang: Language; className: string; imgClass: string; animate: boolean }> = ({
  s,
  lang,
  className,
  imgClass,
  animate,
}) => {
  const t = TEXT[lang];
  const price = priceOf(s.menuId);
  return (
    <article dir={lang === 'ar' ? 'rtl' : 'ltr'} className={className}>
      <motion.div
        initial={animate ? { clipPath: 'inset(100% 0 0 0)' } : false}
        whileInView={animate ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-neutral-900"
      >
        <img src={s.img} alt={s.name[lang]} loading="lazy" decoding="async" className={imgClass} />
      </motion.div>
      <div className="mt-4 flex items-baseline gap-3">
        <h3 className="font-black text-xl sm:text-2xl leading-tight text-white">{s.name[lang]}</h3>
        <span aria-hidden className="flex-1 border-b-2 border-dotted border-white/30 translate-y-[-4px]" />
        {price !== undefined && (
          <span className="font-black text-xl sm:text-2xl text-[#E5BE01] tabular-nums whitespace-nowrap">
            {price} <span className="text-sm font-bold">{t.currency}</span>
          </span>
        )}
      </div>
      <p className="mt-2 text-sm sm:text-base text-white/70 leading-snug max-w-[34ch]">{s.story[lang]}</p>
    </article>
  );
};

const Heading: React.FC<{ lang: Language; big?: boolean }> = ({ lang, big }) => {
  const t = TEXT[lang];
  return (
    <div>
      <h2 className={`font-black text-white leading-[0.9] ${big ? 'text-7xl xl:text-8xl' : 'text-5xl'}`}>{t.title}</h2>
      <span className="block h-[5px] w-20 bg-[#E5BE01] mt-6" />
      <p className={`mt-6 text-white/70 ${big ? 'text-xl max-w-[22ch]' : 'text-base max-w-[28ch]'}`}>{t.sub}</p>
    </div>
  );
};

// Desktop: de sectie blijft staan en de producten schuiven langs terwijl je scrolt
const Pinned: React.FC<{ lang: Language }> = ({ lang }) => {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distRef = useRef(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      const tr = trackRef.current;
      if (!tr) return;
      const dist = Math.max(0, tr.scrollWidth - window.innerWidth);
      distRef.current = dist;
      setHeight(Math.round(dist * 1.1 + window.innerHeight));
    };
    measure();
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [lang]);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const k = (v: number) => Math.min(1, Math.max(0, (v - 0.03) / 0.94));
  const x = useTransform(p, (v) => -distRef.current * k(v));
  const bar = useTransform(p, (v) => k(v));

  return (
    <section ref={ref} id="signatures" style={{ height: height ?? '300svh' }} className="relative bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center pt-20">
        <motion.div ref={trackRef} dir="ltr" style={{ x }} className="flex items-center gap-16 xl:gap-24 w-max px-[8vw] will-change-transform">
          <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="shrink-0 w-[30vw]">
            <Heading lang={lang} big />
          </div>
          {SIGNATURES.map((s) => (
            <Card
              key={s.id}
              s={s}
              lang={lang}
              animate
              className="shrink-0"
              imgClass="block h-[58svh] aspect-[3/4] object-cover"
            />
          ))}
        </motion.div>
        <div aria-hidden className="absolute bottom-6 left-[8vw] right-[8vw] h-[3px] bg-white/15">
          <motion.div style={{ scaleX: bar }} className="h-full bg-[#E5BE01] origin-left" />
        </div>
      </div>
    </section>
  );
};

// Mobiel, tablet en "minder beweging": gewoon swipen, de foto's snappen op hun plek
const Swipe: React.FC<{ lang: Language; animate: boolean }> = ({ lang, animate }) => (
  <section id="signatures" className="bg-black py-16 sm:py-20">
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="px-5 sm:px-10 mb-8">
      <Heading lang={lang} />
    </div>
    <div dir="ltr" className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 sm:px-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {SIGNATURES.map((s) => (
        <Card
          key={s.id}
          s={s}
          lang={lang}
          animate={animate}
          className="shrink-0 snap-center w-[78vw] sm:w-[46vw] max-w-[380px]"
          imgClass="block w-full aspect-[3/4] object-cover"
        />
      ))}
    </div>
  </section>
);

export const Signatures: React.FC<{ lang: Language }> = ({ lang }) => {
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  if (desktop && !reduce) return <Pinned lang={lang} />;
  return <Swipe lang={lang} animate={!reduce} />;
};
