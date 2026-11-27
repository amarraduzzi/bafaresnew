import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import logo from '../assets/images/bafareslogo.jpg';

const LANGS: { id: Language; label: string }[] = [
  { id: 'fr', label: 'FR' },
  { id: 'ar', label: 'عربي' },
  { id: 'en', label: 'EN' },
];

const NAV: Record<Language, { href: string; label: string }[]> = {
  fr: [{ href: '#histoire', label: 'Histoire' }, { href: '#signatures', label: 'Signatures' }, { href: '#menu', label: 'Menu' }, { href: '#nous-trouver', label: 'Contact' }],
  ar: [{ href: '#histoire', label: 'قصتنا' }, { href: '#signatures', label: 'المميزة' }, { href: '#menu', label: 'القائمة' }, { href: '#nous-trouver', label: 'اتصل بنا' }],
  en: [{ href: '#histoire', label: 'Story' }, { href: '#signatures', label: 'Signatures' }, { href: '#menu', label: 'Menu' }, { href: '#nous-trouver', label: 'Contact' }],
};

interface HeaderProps { lang: Language; setLang: (l: Language) => void }

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = translations[lang];
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${solid ? 'bg-black/90 backdrop-blur' : 'bg-gradient-to-b from-black/85 to-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <a href="#hero" aria-label="Ba Fares" className="shrink-0">
          <img src={logo} alt="Ba Fares" className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E5BE01]" />
        </a>

        <nav className="flex items-center gap-1.5 sm:gap-4">
          <div className="hidden md:flex items-center gap-1">
            {NAV[lang].map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-bold text-white hover:text-[#E5BE01] px-3 py-2 transition-colors">
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center rounded-full border border-white/25 overflow-hidden" role="group" aria-label="Langue">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                aria-pressed={lang === l.id}
                className={`px-2.5 py-1.5 text-xs font-bold transition-colors ${lang === l.id ? 'bg-[#E5BE01] text-black' : 'text-white/80 hover:text-white'}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <a href="tel:0537660057" className="inline-flex items-center gap-2 bg-[#E5BE01] text-black font-extrabold text-sm px-4 py-2 rounded-full hover:bg-white transition-colors">
            <Phone size={15} aria-hidden />
            <span className="hidden sm:inline">{t.nav.callCta}</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
