import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { LogoFlight, Phase } from './components/LogoFlight';
import { Manifest } from './components/Manifest';
import { Chiffres } from './components/Chiffres';
import { Zellige } from './components/Zellige';
import { Vitrine } from './components/Vitrine';
import { Today } from './components/Today';
import { MenuSection } from './components/MenuSection';
import { FindUs } from './components/FindUs';
import { Footer } from './components/Footer';

const skipIntro = () => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return sessionStorage.getItem('bf_intro') === '1';
  } catch { return false; }
};

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [phase, setPhase] = useState<Phase>(() => (skipIntro() ? 'done' : 'intro'));
  const anchorRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    try { sessionStorage.setItem('bf_intro', '1'); } catch { /* geen opslag */ }
    setPhase('fly');
  }, []);

  const landed = useCallback(() => setPhase('done'), []);

  // Scroll vergrendeld tijdens opening en vlucht van het logo
  useEffect(() => {
    document.body.style.overflow = phase === 'done' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('lang', lang);
    el.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <AnimatePresence>{phase === 'intro' && <Intro onDone={finish} />}</AnimatePresence>
      <LogoFlight phase={phase} anchorRef={anchorRef} onLanded={landed} />

      <div aria-hidden className="grain" />
      <Header lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} ready={phase === 'done'} anchorRef={anchorRef} />
        <Manifest lang={lang} />
        <Chiffres lang={lang} />
        <Zellige />
        <Vitrine lang={lang} />
        <Today lang={lang} />
        <MenuSection lang={lang} />
        <Zellige />
        <FindUs lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
