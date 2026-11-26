import React from 'react';
import { Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import logo from '../assets/images/bafareslogo.jpg';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LANGS: { id: Language; label: string }[] = [
  { id: 'fr', label: 'FR' },
  { id: 'ar', label: 'عربي' },
  { id: 'en', label: 'EN' },
];

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = translations[lang];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-black/85 to-transparent">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <a href="#pluie" aria-label="Ba Fares" className="shrink-0">
          <img src={logo} alt="Ba Fares" className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E5BE01]" />
        </a>

        <nav className="flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center rounded-full border border-white/25 overflow-hidden" role="group" aria-label="Langue">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                aria-pressed={lang === l.id}
                className={`px-2.5 py-1.5 text-xs font-bold transition-colors ${
                  lang === l.id ? 'bg-[#E5BE01] text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <a href="#menu" className="hidden sm:inline-block text-sm font-bold text-white hover:text-[#E5BE01] px-2">
            {t.nav.menu}
          </a>

          <a
            href="tel:0537660057"
            className="inline-flex items-center gap-2 bg-[#E5BE01] text-black font-extrabold text-sm px-4 py-2 rounded-full hover:bg-white transition-colors"
          >
            <Phone size={15} aria-hidden />
            <span className="hidden sm:inline">{t.nav.callCta}</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
