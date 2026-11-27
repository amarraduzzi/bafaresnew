import React, { useState } from 'react';
import { ArrowUp, Instagram } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { YEAR_NOW } from '../data/scenes';
import { LegalNoticeModal } from './LegalNoticeModal';
import logo from '../assets/images/bafareslogo.jpg';

export const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [legal, setLegal] = useState(false);

  return (
    <footer dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-black text-white px-6 sm:px-12 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div className="flex items-center gap-5">
            <img src={logo} alt="Ba Fares" className="w-16 h-16 rounded-full object-cover ring-[3px] ring-[#E5BE01]" />
            <div>
              <p className="font-black text-3xl leading-none">Ba Fares</p>
              <p className="font-black text-[#E5BE01] text-xl mt-1">1957</p>
            </div>
          </div>
          <p className="max-w-sm text-white/70">{t.footer.tagline}</p>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-sm text-white/60">
          <p>© {YEAR_NOW} Ba Fares. {t.footer.rights}</p>
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/bafares.1957" target="_blank" rel="noopener noreferrer" aria-label="Instagram @bafares.1957" className="hover:text-[#E5BE01] transition-colors">
              <Instagram size={20} />
            </a>
            <button type="button" onClick={() => setLegal(true)} className="hover:text-[#E5BE01] transition-colors">
              {t.footer.legalNotice}
            </button>
            <a href="#hero" className="inline-flex items-center gap-2 font-bold text-white hover:text-[#E5BE01] transition-colors">
              <ArrowUp size={16} aria-hidden /> {t.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
      <LegalNoticeModal isOpen={legal} lang={lang} onClose={() => setLegal(false)} />
    </footer>
  );
};
