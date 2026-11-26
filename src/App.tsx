import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import { Language } from './types';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { Timeline } from './components/Timeline';
import { StoryScene } from './components/StoryScene';
import { YellowInterlude } from './components/YellowInterlude';
import { MenuSection } from './components/MenuSection';
import { FindUsSection } from './components/FindUsSection';
import { Footer } from './components/Footer';
import { SCENES } from './data/scenes';

const seen = () => {
  try { return sessionStorage.getItem('bf_intro') === '1'; } catch { return false; }
};

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const reduce = useReducedMotion();
  const [intro, setIntro] = useState(() => !seen());

  const finish = useCallback(() => {
    try { sessionStorage.setItem('bf_intro', '1'); } catch { /* geen opslag */ }
    setIntro(false);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('lang', lang);
    el.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  const [pluie, pere, ici, chef] = SCENES;

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <AnimatePresence>{intro && !reduce && <Intro onDone={finish} />}</AnimatePresence>

      <div aria-hidden className="grain" />
      <Timeline />
      <Header lang={lang} setLang={setLang} />

      <main>
        <StoryScene scene={pluie} lang={lang} />
        <StoryScene scene={pere} lang={lang} />
        <StoryScene scene={ici} lang={lang} />
        <YellowInterlude lang={lang} />
        <StoryScene scene={chef} lang={lang} />

        {/* Tijdelijk: oude secties, volgen in stap 3 en 4 het nieuwe ontwerp */}
        <div className="bg-[#FAF6EE] text-[#3B1F0F]">
          <MenuSection lang={lang} />
          <FindUsSection lang={lang} />
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
