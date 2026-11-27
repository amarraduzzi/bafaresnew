import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { YEAR_NOW, YEAR_START } from '../data/scenes';
import thenImg from '../assets/images/hero-then.webp';
import nowImg from '../assets/images/hero-now.webp';
import logo from '../assets/images/bafareslogo.jpg';

// Plek van het rietje in het beeld (in %). Hier begint de kleur.
const OX = 77;
const OY = 28;
const R_MAX = 125; // straal in % tot de kleur het hele beeld vult
const RING = 1.619; // straal-% omgerekend naar breedte-% van de ring
const RATIO = 1376 / 768;
// Zegel met het grote logo: plek (in % van het beeld) in de lege tegels boven het glas
const SEAL_X = 54;
const SEAL_Y = 18;

const COPY: Record<Language, { h: string; sub: string; time: string; scroll: string }> = {
  fr: { h: 'Le même verre.', sub: 'Ba Fares, Diour Jamaa, Rabat', time: 'Voyager dans le temps', scroll: 'Défiler' },
  ar: { h: 'نفس الكأس.', sub: 'با فارس، ديور الجامع، الرباط', time: 'سافر عبر الزمن', scroll: 'مرّر' },
  en: { h: 'The same glass.', sub: 'Ba Fares, Diour Jamaa, Rabat', time: 'Travel through time', scroll: 'Scroll' },
};

const SEAL_TEXT: Record<Language, string> = {
  fr: 'BA FARES · DEPUIS 1957 · RABAT · ',
  ar: 'BA FARES · 1957 · RABAT · DIOUR JAMAA · ',
  en: 'BA FARES · SINCE 1957 · RABAT · ',
};

interface Props {
  lang: Language;
  ready: boolean; // start pas als het logo bij het rietje is geland
  anchorRef: React.RefObject<HTMLDivElement | null>;
}

// De hero: zwart-wit 1957 met één geel voorwerp. Vanuit het rietje stroomt de
// kleur over het beeld naar nu. Daarna kan de bezoeker zelf door de tijd schuiven.
export const Hero: React.FC<Props> = ({ lang, ready, anchorRef }) => {
  const t = translations[lang];
  const c = COPY[lang];
  const reduce = useReducedMotion();
  const p = useMotionValue(0);
  const [pv, setPv] = useState(0);
  const ctrl = useRef<ReturnType<typeof animate> | null>(null);
  const started = useRef(false);

  useMotionValueEvent(p, 'change', (v) => setPv(v));

  const clip = useTransform(p, (v) => `circle(${v * R_MAX}% at ${OX}% ${OY}%)`);
  const ringW = useTransform(p, (v) => `${v * R_MAX * RING}%`);
  const ringO = useTransform(p, [0, 0.02, 0.96, 1], [0, 1, 1, 0]);

  const play = () => {
    ctrl.current?.stop();
    ctrl.current = animate(p, 1, { duration: 4.2, ease: [0.65, 0, 0.35, 1] });
  };

  useEffect(() => {
    if (!ready || started.current) return;
    started.current = true;
    if (reduce) { p.set(1); return; }
    const id = window.setTimeout(play, 700);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reduce]);

  const year = Math.round(YEAR_START + (YEAR_NOW - YEAR_START) * pv);
  const mirror = lang === 'ar';
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const plate = {
    containerType: 'size',
    // Op een telefoon iets groter, met het glas in de bovenste helft
    '--pw': `calc(max(100cqw, calc(100cqh * ${RATIO})) * ${mobile ? 1.15 : 1})`,
  } as React.CSSProperties;
  const plateBox: React.CSSProperties = {
    width: 'var(--pw)',
    height: `calc(var(--pw) / ${RATIO})`,
    left: 'clamp(calc(100cqw - var(--pw)), calc(50cqw - var(--pw) * 0.68), 0px)',
    top: `clamp(calc(100cqh - var(--pw) / ${RATIO}), calc(${mobile ? 31 : 50}cqh - var(--pw) / ${RATIO} * 0.4), 0px)`,
  };

  return (
    <section id="hero" className="relative w-full h-[100svh] overflow-hidden bg-black" style={plate}>
      {/* Beeldplaat: toen (zwart-wit) onderaan, nu (kleur) in een groeiende cirkel erboven */}
      <div className="absolute inset-0" style={mirror ? { transform: 'scaleX(-1)' } : undefined}>
        <div className="absolute" style={plateBox}>
          <img src={thenImg} alt="" aria-hidden className="absolute inset-0 w-full h-full" />
          <motion.img
            src={nowImg}
            alt="Un verre de lait avec une paille jaune sur le comptoir de Ba Fares"
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: clip, WebkitClipPath: clip }}
          />

          {/* Gele golf aan de rand van de kleur */}
          <motion.div
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${OX}%`,
              top: `${OY}%`,
              width: ringW,
              aspectRatio: '1 / 1',
              translateX: '-50%',
              translateY: '-50%',
              opacity: ringO,
              border: '3px solid #E5BE01',
              boxShadow: '0 0 60px 10px rgba(229,190,1,.45), inset 0 0 60px 6px rgba(229,190,1,.25)',
            }}
          />

          {/* Vaste plek van het rietje: hier landt het logo */}
          <div
            ref={anchorRef}
            aria-hidden
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ left: `${OX}%`, top: `${OY}%` }}
          />

          {/* Pulserend punt op het rietje, tot het begint */}
          {pv < 0.02 && (
            <button
              type="button"
              onClick={play}
              aria-label={c.time}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center"
              style={{ left: `${OX}%`, top: `${OY}%` }}
            >
              <span className="absolute w-8 h-8 rounded-full bg-[#E5BE01]/50 animate-ping" />
              <span className="relative w-4 h-4 rounded-full bg-[#E5BE01] ring-2 ring-black/60" />
            </button>
          )}
        </div>
      </div>

      {/* Leesbaarheid van de tekst */}
      <div aria-hidden className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
      <div aria-hidden className="absolute inset-0 pointer-events-none hidden md:block ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-black/85 via-black/45 to-transparent" />
      <div aria-hidden className="grain-hero absolute inset-0 pointer-events-none" style={{ opacity: 1 - pv }} />

      {/* Zegel: het grote logo. Alleen toegevoegd, het beeld en de tekst eromheen blijven zoals ze zijn */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={mirror && !mobile ? { transform: 'scaleX(-1)' } : undefined}
      >
        <div className="absolute inset-0" style={mobile ? undefined : plateBox}>
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 aspect-square"
          style={
            mobile
              ? { left: '27%', top: 'max(150px, 20%)', width: 'clamp(112px, 30cqw, 150px)' }
              : { left: `${SEAL_X}%`, top: `${SEAL_Y}%`, width: 'clamp(116px, 11.5cqw, 210px)' }
          }
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.3 }}
        >
          <div className="absolute inset-0" style={mirror && !mobile ? { transform: 'scaleX(-1)' } : undefined}>
          <div className="absolute inset-0 rounded-full bg-black/55 backdrop-blur-[2px] shadow-[0_0_0_1.5px_rgba(229,190,1,.9),0_10px_40px_rgba(0,0,0,.55)]" />
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          >
            <defs>
              <path id="seal-ring" d="M 100,100 m -83,0 a 83,83 0 1,1 166,0 a 83,83 0 1,1 -166,0" />
            </defs>
            <text fill="#E5BE01" fontSize="13" fontWeight="800" fontFamily="Inter, sans-serif">
              <textPath href="#seal-ring" textLength="518" lengthAdjust="spacing">{SEAL_TEXT[lang]}</textPath>
            </text>
          </motion.svg>
          <div className="absolute rounded-full overflow-hidden bg-black shadow-[0_0_0_3px_#E5BE01]" style={{ inset: '19%' }}>
            <img src={logo} alt="" className="w-full h-full object-cover" style={{ filter: `grayscale(${1 - pv})` }} />
          </div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Tekst */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-6 md:px-16 pb-36 md:pb-0 pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
          <h1 className="text-white font-black leading-[0.95] tracking-tight text-4xl sm:text-5xl md:text-6xl">{c.h}</h1>
          <p
            aria-live="off"
            className="text-[#E5BE01] font-black leading-[0.85] tabular-nums tracking-tighter text-[24vw] md:text-[14vw] mt-2"
          >
            {year}
          </p>
          <p className="text-white/80 text-base md:text-lg font-medium mt-3">{c.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#menu" className="bg-[#E5BE01] text-black font-extrabold px-6 py-3 hover:bg-white transition-colors">
              {t.hero.ctaMenu}
            </a>
            <a href="#nous-trouver" className="border-2 border-white/70 text-white font-bold px-6 py-[10px] hover:border-[#E5BE01] hover:text-[#E5BE01] transition-colors">
              {t.hero.ctaFindUs}
            </a>
          </div>
        </div>
      </div>

      {/* Tijdschuiver */}
      <div className="absolute bottom-6 inset-x-0 px-6 md:px-16 flex items-center gap-3 text-white/80 text-xs font-bold">
        <span className="tabular-nums">{YEAR_START}</span>
        <div className="relative flex-1 max-w-md h-11 flex items-center">
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={pv}
            aria-label={c.time}
            aria-valuetext={String(year)}
            onChange={(e) => { ctrl.current?.stop(); p.set(Number(e.target.value)); }}
            className="time-range w-full"
            style={{ '--v': `${pv * 100}%` } as React.CSSProperties}
          />
          {/* Het logo is de schuifknop: zwart-wit in 1957, in kleur in 2026 */}
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full overflow-hidden bg-black pointer-events-none shadow-[0_0_0_3px_#E5BE01,0_4px_14px_rgba(0,0,0,.6)]"
            style={{ left: `calc(${pv} * (100% - 44px))` }}
          >
            <img src={logo} alt="" className="w-full h-full object-cover" style={{ filter: `grayscale(${1 - pv})` }} />
          </span>
        </div>
        <span className="tabular-nums">{YEAR_NOW}</span>
      </div>
      <p className="absolute bottom-16 md:bottom-14 inset-x-0 text-center text-white/60 text-xs font-medium pointer-events-none md:hidden">
        {c.time}
      </p>
    </section>
  );
};
