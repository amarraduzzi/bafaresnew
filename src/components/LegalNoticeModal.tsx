import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Props { isOpen: boolean; lang: Language; onClose: () => void }

export const LegalNoticeModal: React.FC<Props> = ({ isOpen, lang, onClose }) => {
  if (!isOpen) return null;
  const t = translations[lang].legalModal;
  return (
    <div role="dialog" aria-modal="true" aria-label={t.title} onClick={onClose} className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/80">
      <div onClick={(e) => e.stopPropagation()} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative w-full max-w-lg bg-[#F7F3EA] text-black p-6 sm:p-8 border-[5px] border-black">
        <button type="button" onClick={onClose} aria-label={t.close} className="absolute top-3 end-3 p-2 hover:text-black/60">
          <X size={22} />
        </button>
        <h2 className="font-black text-2xl pe-8">{t.title}</h2>
        <span className="block h-[4px] w-14 bg-[#E5BE01] mt-3" />
        <p className="mt-5 font-bold">{t.company}</p>
        <p className="mt-3 text-black/75 leading-relaxed">{t.description}</p>
        <ul className="mt-5 grid gap-2 font-semibold">
          <li>{t.address}</li>
          <li dir="ltr" className={lang === 'ar' ? 'text-end' : ''}>{t.phone}</li>
          <li>{t.hours}</li>
        </ul>
        <button type="button" onClick={onClose} className="mt-7 bg-[#E5BE01] text-black font-extrabold px-6 py-3 hover:bg-black hover:text-[#E5BE01] transition-colors">
          {t.close}
        </button>
      </div>
    </div>
  );
};
