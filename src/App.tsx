import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { LogoFlight, Phase } from './components/LogoFlight';
import { Timeline } from './components/Timeline';
import { StoryScene } from './components/StoryScene';
import { YellowInterlude } from './components/YellowInterlude';
import { Lantern } from './components/Lantern';
import { Zellige } from './components/Zellige';
import { Signatures } from './components/Signatures';
import { MenuSection } from './components/MenuSection';
import { FindUsSection } from './components/FindUsSection';
import { Footer } from './components/Footer';
import { SCENES } from './data/scenes';

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

  const [pluie, pere, ici, chef] = SCENES;

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <AnimatePresence>{phase === 'intro' && <Intro onDone={finish} />}</AnimatePresence>
      <LogoFlight phase={phase} anchorRef={anchorRef} onLanded={landed} />

      <div aria-hidden className="grain" />
      <Timeline />
      <Header lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} ready={phase === 'done'} anchorRef={anchorRef} />
        <StoryScene scene={pluie} lang={lang} />
        <StoryScene scene={pere} lang={lang} />
        <StoryScene scene={ici} lang={lang} />
        <Lantern lang={lang} />
        <YellowInterlude lang={lang} />
        <Zellige />
        <StoryScene scene={chef} lang={lang} />
        <Zellige />
        <Signatures lang={lang} />
        <Zellige />

        {/* Tijdelijk: oude secties, volgen in stap 4 en verder het nieuwe ontwerp */}
        <div className="bg-[#FAF6EE] text-[#3B1F0F]">
          <MenuSection lang={lang} />
          <FindUsSection lang={lang} />
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
