import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onDone: () => void;
}

// Opening: zwart scherm met jaartal en plaats. Het logo zelf staat in LogoFlight
// (daar boven) en vliegt straks naar het rietje. Klik = overslaan.
export const Intro: React.FC<Props> = ({ onDone }) => {
  useEffect(() => {
    const t = window.setTimeout(onDone, 3200);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      role="presentation"
      onClick={onDone}
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer border-b-[8px] border-[#E5BE01]"
    >
      <div className="w-44 h-44 sm:w-56 sm:h-56" aria-hidden />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-8 text-white text-xl font-bold tracking-wide"
      >
        Depuis 1957
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="mt-1 text-white/60 text-sm"
      >
        Diour Jamaa, Rabat
      </motion.p>
    </motion.div>
  );
};
