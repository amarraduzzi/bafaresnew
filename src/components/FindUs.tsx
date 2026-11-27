import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Ba Fares Avenue Al Ghazali Imm Frej Diour Jamaa Rabat')}`;
const EMBED = 'https://www.google.com/maps?q=Avenue+Al+Ghazali+Imm+Frej+N2+Diour+Jamaa+Rabat+Maroc&output=embed';

// Google blokkeert de gratis embed op telefoons en in in-app browsers (Instagram, Facebook...).
// Daarom: iframe alleen op brede schermen, op mobiel een kaartkaart met knop naar Google Maps.
const useIsDesktop = () => {
  const q = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setDesktop(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return desktop;
};

const isOpen = () => {
  const h = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Africa/Casablanca' }).format(new Date()));
  return h >= 7 && h < 23;
};

// Marmer-wit, zoals de toonbank. De kaart is zwart-wit, het geel zit alleen in de knoppen.
export const FindUs: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].findUs;
  const [open, setOpen] = useState(isOpen);
  const desktop = useIsDesktop();
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpen()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="nous-trouver" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-[#F7F3EA] text-black py-20 sm:py-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-stretch">
        <div className="flex flex-col">
          <h2 className="font-black leading-[0.9] tracking-tight text-5xl sm:text-7xl">{t.title}</h2>
          <span className="block h-[5px] w-20 bg-black mt-6" />

          <p className="mt-8 inline-flex items-center gap-3 self-start bg-black text-white font-bold text-sm px-4 py-2">
            <span className={`w-2.5 h-2.5 rounded-full ${open ? 'bg-[#E5BE01]' : 'bg-white/40'}`} />
            {open ? t.openNow : t.closedNow}
          </p>

          <div className="mt-8 grid gap-6">
            <div className="flex gap-4">
              <MapPin className="shrink-0 mt-1" size={22} aria-hidden />
              <p className="text-lg sm:text-xl font-bold leading-snug">{t.addressValue}</p>
            </div>
            <div className="flex gap-4">
              <Phone className="shrink-0 mt-1" size={22} aria-hidden />
              <p dir="ltr" className="text-lg sm:text-xl font-bold">0537 660 057</p>
            </div>
            <p className="text-base sm:text-lg text-black/70 ps-[38px]">{t.hoursValue}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="tel:0537660057" className="inline-flex items-center gap-2 bg-[#E5BE01] text-black font-extrabold px-6 py-4 hover:bg-black hover:text-[#E5BE01] transition-colors">
              <Phone size={18} aria-hidden /> {t.callNow}
            </a>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-[3px] border-black font-extrabold px-6 py-[13px] hover:bg-black hover:text-white transition-colors">
              <Navigation size={18} aria-hidden /> {t.getDirections}
            </a>
          </div>
        </div>

        <div className="min-h-[340px] lg:min-h-[480px] border-[5px] border-black bg-neutral-200">
          {desktop ? (
            <iframe
              title="Ba Fares, Diour Jamaa, Rabat"
              src={EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[340px] lg:min-h-[480px] block"
              style={{ filter: 'grayscale(1) contrast(1.05)' }}
            />
          ) : (
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.getDirections}
              className="relative flex flex-col items-center justify-center gap-5 w-full h-full min-h-[340px] p-8 text-center overflow-hidden"
              style={{
                backgroundColor: '#e5e5e5',
                backgroundImage:
                  'linear-gradient(#d4d4d4 2px, transparent 2px), linear-gradient(90deg, #d4d4d4 2px, transparent 2px), linear-gradient(#d4d4d4 1px, transparent 1px), linear-gradient(90deg, #d4d4d4 1px, transparent 1px)',
                backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
              }}
            >
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black text-[#E5BE01] shadow-lg">
                <MapPin size={30} aria-hidden />
              </span>
              <span className="font-black text-xl leading-snug text-black max-w-[16rem]">{t.addressValue}</span>
              <span className="inline-flex items-center gap-2 bg-[#E5BE01] text-black font-extrabold px-6 py-4 border-[3px] border-black">
                <Navigation size={18} aria-hidden /> {t.getDirections}
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
